import {
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Switch,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import AccountingYearSelect from "components/Common/AccountingYearSelect";
import FetchingSpinner from "components/Common/FetchingSpinner";
import BasicLayout from "components/Layouts/BasicLayout";
import StatementSection from "components/Statement/StatementSection";
import { ClientsContext } from "contexts/ClientsContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genUserClient } from "services/backend/apiClients";
import { IClientDto } from "services/backend/nswagts";
import { ClientFilter } from "types/ClientFilter";
import { logger } from "utils/logger";

import SortBySelect from "../Common/SortBySelect";
import AccountList from "./AccountList/AccountList";
import DownloadCsvBtn from "./DownloadCsvBtn";
import { ActiveFilter, SearchFilter } from "./Filters/ClientFilters";
import MailManyModal, { MailManyProps } from "./MailMany/MailManyModal";
import NewAccountModal from "./NewAccountModal";
import SearchBar from "./SearchBar";

const Accounts: FC = () => {
  const { t } = useLocales();

  const [clients, dispatchClients] = useReducer(ListReducer<IClientDto>("id"), []);
  const [searchString, setSearchString] = useState<string>("");
  const [sortId, setSortId] = useState<number>(0);
  //  const [filters, setFilters] = useState<ClientFilter[]>([SearchFilter]);
  const [isFetching, setIsFetching] = useState(false);
  const [showDeactive, setShowDeactive] = useState(false);

  const filters = useMemo(() => {
    const filters = [SearchFilter];
    if (!showDeactive) filters.push(ActiveFilter);
    return filters;
  }, [showDeactive]);

  const accountingYears = useMemo(() => {
    const startYear = 2021;
    const thisYear = new Date().getFullYear();
    const years = [];
    for (let i = thisYear; i >= startYear; i--) {
      years.push(i);
    }
    return years;
  }, []);

  const [accountingYear, setAccountingYear] = useState<number>(accountingYears[0]);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    try {
      const userClient = await genUserClient();
      const data = await userClient.getAllClients();

      console.log(data);

      if (data && data.length > 0)
        dispatchClients({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mailAllClients, dispatchMailAllClients] = useReducer(ListReducer<IClientDto>("id"), []);
  const [mailReason, setMailReason] = useState<MailManyProps["mailReason"]>();

  const inviteAll = useCallback(() => {
    const notInvited = clients.filter(client => {
      return (
        client.statements.find(statement => statement.accountingYear == accountingYear) == undefined
      );
    });
    dispatchMailAllClients({ type: ListReducerActionType.Reset, data: [] });
    if (notInvited.length > 0)
      dispatchMailAllClients({
        type: ListReducerActionType.AddOrUpdate,
        data: notInvited
      });
    setMailReason("invite");
    onOpen();
  }, [clients, accountingYear, dispatchMailAllClients, onOpen, setMailReason]);

  const remindAll = useCallback(() => {
    const toBeReminded = clients.filter(client => {
      return (
        client.statements.find(
          statement =>
            statement.accountingYear == accountingYear &&
            (statement.status == 0 || statement.status == 1)
        ) != undefined
      );
    });

    dispatchMailAllClients({ type: ListReducerActionType.Reset, data: toBeReminded });
    setMailReason("reminder");
    onOpen();
  }, [clients, accountingYear, dispatchMailAllClients, onOpen, setMailReason]);

  return (
    <ClientsContext.Provider
      value={{
        clients: clients,
        dispatchAccounts: dispatchClients,
        fetchData: fetchData,
        isFetching: isFetching
      }}>
      <BasicLayout maxW="1500px">
        <Stack spacing={4}>
          <Heading>{t("accounts.accounts")}</Heading>
          <Flex justifyContent="space-between" alignItems="center">
            <HStack>
              <DownloadCsvBtn accountingYear={accountingYear} />
              <AccountingYearSelect
                options={accountingYears}
                value={accountingYear}
                cb={setAccountingYear}
              />
              <SortBySelect value={sortId} cb={setSortId} />
            </HStack>
            <HStack spacing={5}>
              <SearchBar cb={value => setSearchString(value)} />
              <NewAccountModal onSubmit={fetchData} />
            </HStack>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <FetchingSpinner isFetching={isFetching} text={t("accounts.fetching")} />
            <HStack>
              <Text>{t("accounts.showDeactive")}</Text>
              <Switch checked={showDeactive} onChange={e => setShowDeactive(e.target.checked)} />
            </HStack>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <HStack></HStack>
            <HStack>
              <Button onClick={inviteAll}>Inviter alle</Button>
              <Button onClick={remindAll}>Send rykker til alle</Button>
              <MailManyModal
                mailToClients={mailAllClients.filter(client => ActiveFilter.predicate(client))}
                dispatchMailToClients={dispatchMailAllClients}
                isOpen={isOpen}
                onClose={onClose}
                mailReason={mailReason}
                revisionYear={accountingYear}
                fetchData={fetchData}
              />
            </HStack>
          </Flex>
          <AccountList
            data={clients.filter(client => filters.every(f => f.predicate(client, searchString)))}
            accountingYear={accountingYear}
            sortBy={sortId}
          />
        </Stack>
      </BasicLayout>
    </ClientsContext.Provider>
  );
};
export default Accounts;
