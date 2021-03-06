import { Box, Button, Skeleton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { FC } from "react";
import { IStatementDto, StatementStatus } from "services/backend/nswagts";

interface Props {
  statements: IStatementDto[];
  isFetching: boolean;
  accountingYear: number;
}

const AccountantStatements: FC<Props> = ({ statements, isFetching, accountingYear }) => {
  const { t } = useLocales();

  return (
    <Box p={10} shadow="md" rounded="md">
      <Skeleton isLoaded={!isFetching}>
        <Table>
          <Thead>
            <Tr>
              <Th>Kunde</Th>
              <Th>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {statements &&
              statements
                .filter(s => s.accountingYear == accountingYear)
                .sort((a, b) => b.accountingYear - a.accountingYear)
                .map(statement => (
                  <Tr key={statement.id}>
                    <Td>{statement.client.name}</Td>
                    <Td>
                      {statement.status == StatementStatus.SignedOff
                        ? t("myStatements.accountantApproved")
                        : t("myStatements.awaitsYourApproval")}
                    </Td>
                    <Td>
                      {statement.status != StatementStatus.SignedOff && (
                        <Link href={`/statement/${encodeURIComponent(statement.id)}`}>
                          <Button colorScheme="green">{t("myStatements.viewStatement")}</Button>
                        </Link>
                      )}
                      {statement.status == StatementStatus.SignedOff && (
                        <Link href={`/statement/${encodeURIComponent(statement.id)}`}>
                          <Button>{t("myStatements.viewStatement")}</Button>
                        </Link>
                      )}
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </Skeleton>
    </Box>
  );
};
export default AccountantStatements;
