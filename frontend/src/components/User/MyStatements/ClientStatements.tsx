import { Box, Button, Skeleton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { IStatementDto, StatementStatus } from "services/backend/nswagts";

interface Props {
  statements: IStatementDto[];
  isFetching: boolean;
}

const ClientStatements: FC<Props> = ({ statements, isFetching }) => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  return (
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
                    <Td>
                      {statement.status == StatementStatus.SignedOff
                        ? t("myStatements.signedOffStatus")
                        : t("myStatements.notSignedOffStatus")}
                    </Td>
                    <Td>
                      {statement.status != StatementStatus.SignedOff && (
                        <Link href={`/statement/${encodeURIComponent(statement.id)}`}>
                          <Button colorScheme="green">{t("myStatements.fillOutStatement")}</Button>
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
export default ClientStatements;
