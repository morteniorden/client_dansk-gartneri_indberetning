import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

interface Props {}

const StatementInfoTable: FC<Props> = ({ children }) => {
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
