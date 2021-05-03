import { Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import AccountingYearSelect from "components/Common/AccountingYearSelect";
import FetchingSpinner from "components/Common/FetchingSpinner";
import BasicLayout from "components/Layouts/BasicLayout";
import { ClientsContext } from "contexts/ClientsContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genUserClient } from "services/backend/apiClients";
import { IClientDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import AccountList from "./AccountList/AccountList";
import DownloadCsvBtn from "./DownloadCsvBtn";
import NewAccountModal from "./NewAccountModal";

const Accounts: FC = () => {
  const { t } = useLocales();

  const [clients, dispatchClients] = useReducer(ListReducer<IClientDto>("id"), []);
  const [isFetching, setIsFetching] = useState(false);

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
      <BasicLayout maxW="1000px">
        <Stack spacing={4}>
          <Heading>{t("accounts.accounts")}</Heading>
          <Flex justifyContent="space-between" alignItems="center">
            <DownloadCsvBtn accountingYear={accountingYear} />
            <AccountingYearSelect
              options={accountingYears}
              value={accountingYear}
              cb={setAccountingYear}
            />
            <HStack spacing={5}>
              <NewAccountModal onSubmit={fetchData} />
            </HStack>
          </Flex>
          <FetchingSpinner isFetching={isFetching} text={t("accounts.fetching")} />
          <AccountList data={clients} accountingYear={accountingYear} />
        </Stack>
      </BasicLayout>
    </ClientsContext.Provider>
  );
};
export default Accounts;
