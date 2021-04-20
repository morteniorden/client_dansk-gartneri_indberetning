import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";

const StatementInfoTable: FC = ({ children }) => {
  const { t } = useLocales();

  return (
    <Table>
      <Thead>
        <Tr>
          <Th w="18em"></Th>
          <Th>{t("statementInfo.helpText")}</Th>
          <Th w="13em">{t("statementInfo.tax")}</Th>
        </Tr>
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  );
};
export default StatementInfoTable;
