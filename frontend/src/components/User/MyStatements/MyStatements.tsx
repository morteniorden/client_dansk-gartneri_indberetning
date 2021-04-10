import {
  Box,
  Button,
  Heading,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import FetchingSpinner from "components/Common/FetchingSpinner";
import BasicLayout from "components/Layouts/BasicLayout";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { genAccountClient } from "services/backend/apiClients";
import { IAccountDto, StatementStatus } from "services/backend/nswagts";
import { logger } from "utils/logger";

const MyStatements: FC = () => {
  const { t } = useLocales();
  const [account, setAccount] = useState<IAccountDto>();
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsFetching(true);
      const accountClient = await genAccountClient();
      const data = await accountClient.getAccount();

      if (data != null) setAccount(data);
      else logger.info("accountclient.get no data");
    } catch (err) {
      logger.warn("accountclient.get Error", err);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const genStatus = useCallback((status: StatementStatus) => {
    switch (status) {
      case 0:
        return "Ikke besvaret";
      case 1:
        return "Besvaret";
    }
  }, []);

  return (
    <BasicLayout maxW="80vw">
      <Stack spacing={10}>
        <Heading>{t("statements.myStatements")}</Heading>
        <FetchingSpinner isFetching={isFetching} text={t("common.fetchingData")} />
        <Box p={10} shadow="md" rounded="md">
          <Skeleton isLoaded={!isFetching}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Revisionsår</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {account &&
                  account.statements
                    .sort((a, b) => b.revisionYear - a.revisionYear)
                    .map(statement => (
                      <Tr key={statement.id}>
                        <Td>{statement.revisionYear}</Td>
                        <Td>{genStatus(statement.status)}</Td>
                        <Td>
                          {statement.status == 0 && (
                            <Link href={`/statement/${encodeURIComponent(statement.id)}`}>
                              <Button colorScheme="green" rounded="full">
                                Besvar
                              </Button>
                            </Link>
                          )}
                          {statement.status == 1 && <Button rounded="full">Se besvarelse</Button>}
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </Skeleton>
        </Box>
      </Stack>
    </BasicLayout>
  );
};
export default MyStatements;
