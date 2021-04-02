import { Box, Flex, Heading, HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import { AccountsContext } from "contexts/AccountsContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genAccountClient } from "services/backend/apiClients";
import { IAccountDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import AccountsTable from "./AccountsTable";
import NewAccountModal from "./NewAccountModal";
import SearchFilterInput from "./SearchFilterInput";

const Accounts: FC = () => {
  const { t } = useLocales();

  const [accounts, dispatchAccounts] = useReducer(ListReducer<IAccountDto>("id"), []);
  const [isFetching, setIsFetching] = useState(false);
  const [searchString, setSearchString] = useState<string>("");

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
      <Stack spacing={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>{t("accounts.accounts")}</Heading>
          <HStack spacing={5}>
            <Box>
              <SearchFilterInput onChange={setSearchString} value={searchString} />
            </Box>
            <NewAccountModal onSubmit={fetchData} />
          </HStack>
        </Flex>
        <HStack h="20px" alignItems="center">
          {isFetching && (
            <>
              <Spinner size="sm" />
              <Text>{t("accounts.fetching")}</Text>
            </>
          )}
        </HStack>
        <AccountsTable data={accounts} searchString={searchString} fetchData={fetchData} />
      </Stack>
    </AccountsContext.Provider>
  );
};
export default Accounts;
