import { Box, Button, Flex, Heading, HStack, Select, Spinner, Stack, Text } from "@chakra-ui/react";
import AccountingYearSelect from "components/Common/AccountingYearSelect";
import FetchingSpinner from "components/Common/FetchingSpinner";
import BasicLayout from "components/Layouts/BasicLayout";
import { AccountsContext } from "contexts/AccountsContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genAccountClient, genStatementClient } from "services/backend/apiClients";
import { CreateStatementCommand, IAccountDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import AccountList from "./AccountList/AccountList";
import AccountsTable from "./AccountsTable";
import DownloadCsvBtn from "./Filters/DownloadCsvBtn";
import NewAccountModal from "./NewAccountModal";
import SearchFilterInput from "./SearchFilterInput";

const Accounts: FC = () => {
  const { t } = useLocales();

  const [accounts, dispatchAccounts] = useReducer(ListReducer<IAccountDto>("id"), []);
  const [isFetching, setIsFetching] = useState(false);
  const [searchString, setSearchString] = useState<string>("");

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
      const accountClient = await genAccountClient();
      const data = await accountClient.getAllAccounts();

      console.log(data);

      if (data && data.length > 0)
        dispatchAccounts({
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
    <AccountsContext.Provider
      value={{
        accounts: accounts,
        dispatchAccounts: dispatchAccounts,
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
          <AccountList data={accounts} accountingYear={accountingYear} />
        </Stack>
      </BasicLayout>
    </AccountsContext.Provider>
  );
};
export default Accounts;
