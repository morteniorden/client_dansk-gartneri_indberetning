import { Flex, Heading, HStack, Stack, Switch, Text } from "@chakra-ui/react";
import AccountingYearSelect from "components/Common/AccountingYearSelect";
import FetchingSpinner from "components/Common/FetchingSpinner";
import BasicLayout from "components/Layouts/BasicLayout";
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
