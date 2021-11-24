import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  h1?: string;
  h2?: string;
  h3?: string;
}

const StatementSectionTable: FC<Props> = ({ children, h1, h2, h3 }) => {
  const { t } = useLocales();
  return (
    <Table variant="unstyled">
      <Thead>
        <Tr>
          <Th>{h1}</Th>
          <Th w="30%">{h2 ?? t("statements.turnoverExlMoms")}</Th>
          <Th w="10%">{h3 ?? t("statements.taxIs")}</Th>
          <Th w="10%">{h3 ?? t("statements.taxIs")}</Th>
        </Tr>
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  );
};
export default StatementSectionTable;
