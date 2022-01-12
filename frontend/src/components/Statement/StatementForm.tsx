import { Stack, useDisclosure } from "@chakra-ui/react";
import AccountantSection from "components/Statement/AccountantSection/AccountantSection";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useAuth } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { route } from "next/dist/server/router";
import { useRouter } from "next/router";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { DeepMap, FieldError, useForm } from "react-hook-form";
import { IStatementNoUsersDto, RoleEnum } from "services/backend/nswagts";

import { FormControlContext } from "./FormControlContext";
import InputDKK from "./InputDKK";
import StandardStatementRow from "./StandardStatementRow";
import StatementSection from "./StatementSection";
import StatementSectionTable from "./StatementSectionTable";
import StatementTableColHeadings from "./StatementTableColHeadings";
import StatementTableRow from "./StatementTableRow";
import StatementTableSubHeading from "./StatementTableSubHeading";
import TaxTotal from "./TaxTotal";
import UnsavedChangesModal from "./UnsavedChangesModal";

const StatementForm: FC = () => {
  const { t } = useLocales();
  const { handleSubmit, control } = useForm<IStatementNoUsersDto>();
  const { activeUser } = useAuth();
  const { isOpen: modalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const {
    statement,
    setStatement,
    submit,
    readonly,
    calcTotal,
    isDirty,
    setIsDirty,
    statementInfo
  } = useContext(EditStatementContext);
  const router = useRouter();

  const updatedFormAttribute = useCallback(
    (key: keyof IStatementNoUsersDto, value: IStatementNoUsersDto[keyof IStatementNoUsersDto]) => {
      setIsDirty(true);
      setStatement(x => {
        (x[key] as unknown) = value;
        return x;
      });
      calcTotal();
    },
    [setStatement, calcTotal]
  );

  //Handles the back button, aka. going to the previous page
  useEffect(() => {
    router.beforePopState(_ => {
      if (isDirty) openModal();
      return !isDirty;
    });
  }, [isDirty, openModal]);

  const beforeUnloadEventHandler = useCallback(
    (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        if (e) e.returnValue = "";
        return "";
      }
    },
    [isDirty]
  );

  //Handles refresh page (F5/realod button top left) and close page (x on the tab)
  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnloadEventHandler);
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadEventHandler);
    };
  }, [isDirty, openModal, beforeUnloadEventHandler]);

  const routeChangeModalHandler = useCallback(() => {
    if (isDirty) {
      openModal();
      router.events.emit("routeChangeError");
      // An error object is not thrown as to not cause the error popup as this is not an actual error, but needed to prevent the route change
      throw "Preventing changing page due to unsaved changes, this error can be safely ignored";
    }
  }, [isDirty, openModal, router]);

  //Handles when trying to navigate to a different page/pressing a link
  useEffect(() => {
    router.events.on("routeChangeStart", routeChangeModalHandler);
    return () => {
      router.events.off("routeChangeStart", routeChangeModalHandler);
    };
  }, [routeChangeModalHandler]);

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
      <UnsavedChangesModal isOpen={modalOpen} onClose={closeModal} setIsDirty={setIsDirty} />
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
                name={"s1_mushrooms"}
              />

              <StandardStatementRow
                text={t("statements.section1.tomatoCucumberHerbs")}
                tax={2}
                name={"s1_tomatoCucumberHerb"}
              />
              <StatementTableColHeadings h2={t("statements.expences")} />
              <StatementTableRow
                text={t("statements.boughtPlants")}
                subText={t("statements.section1.boughtPlantsDesc")}
                helpInfo={statementInfo?.s1_boughtPlants_help}>
                <InputDKK name="s1_boughtPlants" />
              </StatementTableRow>
            </StatementSectionTable>
          </StatementSection>
          <StatementSection heading={t("statements.section3.heading")}>
            <StatementSectionTable>
              <StandardStatementRow
                text={t("statements.section3.carrot")}
                tax={3}
                name={"s3_carrots"}
              />
              <StandardStatementRow text={t("statements.section3.pea")} tax={3} name={"s3_peas"} />
              <StandardStatementRow
                text={t("statements.section3.onion")}
                tax={3}
                name={"s3_onions"}
              />
              <StandardStatementRow text={t("statements.other")} tax={3} name={"s3_other"} />
              <StatementTableColHeadings h2={t("statements.expences")} />
              <StatementTableRow
                text={t("statements.boughtPlants")}
                subText={t("statements.section3.boughtPlantsDesc")}
                helpInfo={statementInfo?.s3_boughtPlants_help}>
                <InputDKK name="s3_boughtPlants" />
              </StatementTableRow>
            </StatementSectionTable>
          </StatementSection>
          <StatementSection heading={t("statements.section4.heading")}>
            <StatementSectionTable>
              <StandardStatementRow
                text={t("statements.section4.onions")}
                tax={1.6}
                name={"s4_onions"}
              />
              <StandardStatementRow
                text={t("statements.section4.plants")}
                tax={1.6}
                name={"s4_plants"}
              />
              <StandardStatementRow
                text={t("statements.section4.flowers")}
                tax={1.6}
                name={"s4_cutFlowers"}
              />
              <StatementTableColHeadings h2={t("statements.expences")} />
              <StatementTableRow
                text={t("statements.boughtPlants")}
                subText={t("statements.section3.boughtPlantsDesc")}
                helpInfo={statementInfo?.s4_boughtPlants_help}>
                <InputDKK name="s4_boughtPlants" />
              </StatementTableRow>
            </StatementSectionTable>
          </StatementSection>
          <StatementSection heading={t("statements.section7.heading")}>
            <StatementSectionTable>
              <StandardStatementRow
                text={t("statements.section7.plants")}
                tax={4.5}
                name={"s7_plants"}
              />
              <StatementTableColHeadings h2={t("statements.expences")} />
              <StatementTableRow
                text={t("statements.boughtPlants")}
                helpInfo={statementInfo?.s7_boughtPlants_help}>
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
              <StandardStatementRow
                text={t("statements.section8.applesPearsOther")}
                tax={5}
                name={"s8_applesPearsEtc"}
              />
              <StatementTableColHeadings h2={t("statements.expences")} />
              <StatementTableRow
                text={t("statements.section8.packagingCost")}
                subText={t("statements.section8.packagingCostDesc")}
                helpInfo={statementInfo?.s8_packaging_help}>
                <InputDKK name="s8_packaging" />
              </StatementTableRow>
              <StatementTableSubHeading>
                {t("statements.section8.subHeading2")}
              </StatementTableSubHeading>
              <StatementTableColHeadings
                h2={t("statements.turnoverExlMoms")}
                h3={t("statements.taxIs")}
              />
              <StandardStatementRow
                text={t("statements.section8.cherry")}
                tax={4.65}
                name={"s8_cherries"}
              />
              <StandardStatementRow
                text={t("statements.section8.plum")}
                tax={4.65}
                name={"s8_plums"}
              />
              <StandardStatementRow
                text={t("statements.other")}
                tax={4.65}
                name={"s8_otherStoneFruit"}
              />
              <StatementTableSubHeading>
                {t("statements.section8.subHeading3")}
              </StatementTableSubHeading>
              <StatementTableColHeadings
                h2={t("statements.turnoverExlMoms")}
                h3={t("statements.taxIs")}
              />
              <StandardStatementRow
                text={t("statements.section8.cherry")}
                tax={4.6}
                name={"s8_currant"}
              />
              <StandardStatementRow
                text={t("statements.section8.cherry")}
                tax={4.6}
                name={"s8_strawberries"}
              />
              <StandardStatementRow
                text={t("statements.other")}
                tax={4.6}
                name={"s8_otherBerryFruit"}
              />
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
