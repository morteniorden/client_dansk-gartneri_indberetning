import { Box, Button, Skeleton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { FC } from "react";
import { IStatementDto } from "services/backend/nswagts";

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
                    <Td>{statement.status == 2 ? "Godkendt" : "Afventer din godkendelse"}</Td>
                    <Td>
                      {statement.status != 2 && (
                        <Link href={`/statement/${encodeURIComponent(statement.id)}`}>
                          <Button colorScheme="green" rounded="full">
                            Se oplysningsksema
                          </Button>
                        </Link>
                      )}
                      {statement.status == 2 && <Button rounded="full">Se oplysningsksema</Button>}
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
