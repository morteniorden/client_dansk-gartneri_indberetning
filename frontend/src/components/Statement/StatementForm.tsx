import { Stack } from "@chakra-ui/react";
import AccountantSection from "components/Statement/AccountantSection/AccountantSection";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useAuth } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { DeepMap, FieldError, useForm } from "react-hook-form";
import { IStatementNoUsersDto, RoleEnum } from "services/backend/nswagts";
import TaxTotal from "./TaxTotal";

import { FormControlContext } from "./FormControlContext";
import InputDKK from "./InputDKK";
import StatementSection from "./StatementSection";
import StatementSectionTable from "./StatementSectionTable";
import StatementTableColHeadings from "./StatementTableColHeadings";
import StatementTableRow from "./StatementTableRow";
import StatementTableSubHeading from "./StatementTableSubHeading";
import StandardStatementRow from "./StandardStatementRow";

const StatementForm: FC = () => {
  const { t } = useLocales();
  const { handleSubmit, control } = useForm<IStatementNoUsersDto>();
  const { activeUser } = useAuth();
  const { statement, setStatement, submit, readonly, calcTotal } = useContext(EditStatementContext);

  const updatedFormAttribute = useCallback(
    (key: keyof IStatementNoUsersDto, value: IStatementNoUsersDto[keyof IStatementNoUsersDto]) => {
      setStatement(x => {
        (x[key] as unknown) = value;
        return x;
      });
      calcTotal();
    },
    [setStatement, calcTotal]
  );

  const onValid = useCallback(
    (data: IStatementNoUsersDto) => {
      console.log(statement, data);
      submit(data);
    },
    [statement]
  );

  const onInvalid = useCallback(
    (errors: DeepMap<IStatementNoUsersDto, FieldError>) => {
      console.log(statement, errors);
    },
    [statement]
  );

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} id="statement_form">
      <Stack sx={readonly && { "input:disabled": { opacity: 1, cursor: "text" } }}>
        <FormControlContext.Provider
          value={{
            control,
            form: statement,
            updatedFormAttribute,
            disabled: readonly
          }}>
          <StatementSection heading={t("statements.section1.heading")}>
            <StatementSectionTable>
              <StandardStatementRow
                text={t("statements.section1.mushrooms")}
                tax={0.25}
                key={"s1_mushrooms"}
              />

              <StatementTableRow text={t("statements.section1.tomatoCucumberHerbs")} tax="2.00">
                <InputDKK name="s1_tomatoCucumberHerb" />
              </StatementTableRow>
              <StatementTableColHeadings h2={t("statements.expences")} />
              <StatementTableRow
                text={t("statements.boughtPlants")}
                subText={t("statements.section1.boughtPlantsDesc")}
                helpInfo="Eksempel på hjælp til dette inputfelt.">
                <InputDKK name="s1_boughtPlants" />
              </StatementTableRow>
            </StatementSectionTable>
          </StatementSection>
          <StatementSection heading={t("statements.section3.heading")}>
            <StatementSectionTable>
              <StatementTableRow text={t("statements.section3.carrot")} tax="3.00">
                <InputDKK name="s3_carrots" />
              </StatementTableRow>
              <StatementTableRow text={t("statements.section3.pea")} tax="3.00">
                <InputDKK name="s3_peas" />
              </StatementTableRow>
              <StatementTableRow text={t("statements.section3.onion")} tax="3.00">
                <InputDKK name="s3_onions" />
              </StatementTableRow>
              <StatementTableRow text={t("statements.other")} tax="3.00">
                <InputDKK name="s3_other" />
              </StatementTableRow>
              <StatementTableColHeadings h2={t("statements.expences")} />
              <StatementTableRow
                text={t("statements.boughtPlants")}
                subText={t("statements.section3.boughtPlantsDesc")}>
                <InputDKK name="s3_boughtPlants" />
              </StatementTableRow>
            </StatementSectionTable>
          </StatementSection>
          <StatementSection heading={t("statements.section4.heading")}>
            <StatementSectionTable>
              <StatementTableRow text={t("statements.section4.onions")} tax="1.60">
                <InputDKK name="s4_onions" />
              </StatementTableRow>
              <StatementTableRow text={t("statements.section4.plants")} tax="1.60">
                <InputDKK name="s4_plants" />
              </StatementTableRow>
              <StatementTableRow text={t("statements.section4.flowers")} tax="1.60">
                <InputDKK name="s4_cutFlowers" />
              </StatementTableRow>
              <StatementTableColHeadings h2={t("statements.expences")} />
              <StatementTableRow
                text={t("statements.boughtPlants")}
                subText={t("statements.section3.boughtPlantsDesc")}>
                <InputDKK name="s4_boughtPlants" />
              </StatementTableRow>
            </StatementSectionTable>
          </StatementSection>
          <StatementSection heading={t("statements.section7.heading")}>
            <StatementSectionTable>
              <StatementTableRow text={t("statements.section7.plants")} tax="4.50">
                <InputDKK name="s7_plants" />
              </StatementTableRow>
              <StatementTableColHeadings h2={t("statements.expences")} />
              <StatementTableRow text={t("statements.boughtPlants")}>
                <InputDKK name="s7_boughtPlants" />
              </StatementTableRow>
            </StatementSectionTable>
          </StatementSection>
          <StatementSection heading={t("statements.section8.heading")}>
            <StatementSectionTable h1="" h2="" h3="">
              <StatementTableSubHeading>
                {t("statements.section8.subHeading1")}
              </StatementTableSubHeading>
              <StatementTableColHeadings
                h2={t("statements.turnoverExlMoms")}
                h3={t("statements.taxIs")}
              />
              <StatementTableRow text={t("statements.section8.applesPearsOther")} tax="5.00">
                <InputDKK name="s8_applesPearsEtc" />
              </StatementTableRow>
              <StatementTableColHeadings h2={t("statements.expences")} />
              <StatementTableRow
                text={t("statements.section8.packagingCost")}
                subText={t("statements.section8.packagingCostDesc")}>
                <InputDKK name="s8_packaging" />
              </StatementTableRow>
              <StatementTableSubHeading>
                {t("statements.section8.subHeading2")}
              </StatementTableSubHeading>
              <StatementTableColHeadings
                h2={t("statements.turnoverExlMoms")}
                h3={t("statements.taxIs")}
              />
              <StatementTableRow text={t("statements.section8.cherry")} tax="4.65">
                <InputDKK name="s8_cherries" />
              </StatementTableRow>
              <StatementTableRow text={t("statements.section8.plum")} tax="4.65">
                <InputDKK name="s8_plums" />
              </StatementTableRow>
              <StatementTableRow text={t("statements.other")} tax="4.65">
                <InputDKK name="s8_otherStoneFruit" />
              </StatementTableRow>
              <StatementTableSubHeading>
                {t("statements.section8.subHeading3")}
              </StatementTableSubHeading>
              <StatementTableColHeadings
                h2={t("statements.turnoverExlMoms")}
                h3={t("statements.taxIs")}
              />
              <StatementTableRow text={t("statements.section8.currant")} tax="4.60">
                <InputDKK name="s8_currant" />
              </StatementTableRow>
              <StatementTableRow text={t("statements.section8.strawberry")} tax="4.60">
                <InputDKK name="s8_strawberries" />
              </StatementTableRow>
              <StatementTableRow text={t("statements.other")} tax="4.60">
                <InputDKK name="s8_otherBerryFruit" />
              </StatementTableRow>
            </StatementSectionTable>
          </StatementSection>
          {statement.accountant != null && activeUser?.role == RoleEnum.Accountant && (
            <AccountantSection />
          )}
        </FormControlContext.Provider>
      </Stack>
    </form>
  );
};
export default StatementForm;
