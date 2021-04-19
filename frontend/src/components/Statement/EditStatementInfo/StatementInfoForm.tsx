import { Input, Stack, Table, Tbody, Td, Textarea, Th, Thead, Tr } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

import StatementSection from "../StatementSection";
import StatementSectionTable from "../StatementSectionTable";
import InputPerMille from "./InputPerMille";

interface Props {}

const StatementInfoForm: FC<Props> = ({}) => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  return (
    <form>
      <Stack>
        <StatementSection heading={t("statements.section1.heading")}>
          <Table>
            <Thead>
              <Th></Th>
              <Th>Hjælpetekst</Th>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Svampe</Td>
                <Td>
                  <InputPerMille />
                  <Textarea />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </StatementSection>
        <StatementSection heading={t("statements.section3.heading")}></StatementSection>
        <StatementSection heading={t("statements.section4.heading")}></StatementSection>
        <StatementSection heading={t("statements.section7.heading")}></StatementSection>
        <StatementSection heading={t("statements.section8.heading")}></StatementSection>
      </Stack>
    </form>
  );
};
export default StatementInfoForm;
