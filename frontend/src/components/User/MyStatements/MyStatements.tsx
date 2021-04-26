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
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { FC, useCallback, useEffect, useState } from "react";
import { genStatementClient } from "services/backend/apiClients";
import { IStatementDto, StatementStatus } from "services/backend/nswagts";
import { logger } from "utils/logger";

const MyStatements: FC = () => {
  const { t } = useLocales();
  const [statements, setStatements] = useState<IStatementDto[]>();
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsFetching(true);
      const statementClient = await genStatementClient();
      const data = await statementClient.getMyStatements();

      if (data != null) setStatements(data);
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
                {statements &&
                  statements
                    .sort((a, b) => b.accountingYear - a.accountingYear)
                    .map(statement => (
                      <Tr key={statement.id}>
                        <Td>{statement.accountingYear}</Td>
                        <Td>{statement.status == 2 ? "Besvaret" : "Ikke besvaret"}</Td>
                        <Td>
                          {statement.status != 2 && (
                            <Link href={`/statement/${encodeURIComponent(statement.id)}`}>
                              <Button colorScheme="green" rounded="full">
                                Besvar
                              </Button>
                            </Link>
                          )}
                          {statement.status == 2 && <Button rounded="full">Se besvarelse</Button>}
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
