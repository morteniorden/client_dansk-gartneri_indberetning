import { Stack } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IStatementInfoDto } from "services/backend/nswagts";

import StatementSection from "../StatementSection";
import StatementInfoTable from "./StatementInfoTable";
import StatementInfoTableRow from "./StatementInfoTableRow";

interface Props {
  statementInfo: IStatementInfoDto;
}

const StatementInfoForm: FC<Props> = ({ statementInfo }) => {
  const { t } = useLocales();

  return (
    <>
      {statementInfo && (
        <form>
          <Stack>
            <StatementSection heading={t("statements.section1.heading")}>
              <StatementInfoTable>
                <StatementInfoTableRow
                  name="Svampe"
                  helpText={statementInfo.s1_boughtPlants_help}
                  tax={statementInfo.s1_boughtPlants_permille}
                />
              </StatementInfoTable>
            </StatementSection>
          </Stack>
        </form>
      )}
    </>
  );
};
export default StatementInfoForm;
/*
      <StatementSection heading={t("statements.section3.heading")}></StatementSection>
            <StatementSection heading={t("statements.section4.heading")}></StatementSection>
            <StatementSection heading={t("statements.section7.heading")}></StatementSection>
            <StatementSection heading={t("statements.section8.heading")}></StatementSection>



<StatementFieldInfoInputs />

<Table>
            <Thead>
              <Th></Th>
              <Th>Hjælpetekst</Th>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Svampe</Td>
                <Td>
                  
                </Td>
              </Tr>
            </Tbody>
          </Table>
*/
