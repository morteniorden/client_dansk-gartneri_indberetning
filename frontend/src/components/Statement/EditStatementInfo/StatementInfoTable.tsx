import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";

const StatementInfoTable: FC = ({ children }) => {
  const { t } = useLocales();

  return (
    <Table>
      <Thead>
        <Tr>
          <Th></Th>
          <Th w="60%">{t("statementInfo.helpText")}</Th>
          <Th minW="13em">{t("statementInfo.tax")}</Th>
          <Th>{t("actions.edit")}</Th>
        </Tr>
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  );
};
export default StatementInfoTable;
