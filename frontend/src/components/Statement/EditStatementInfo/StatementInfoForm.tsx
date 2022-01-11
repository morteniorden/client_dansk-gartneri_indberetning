import { Heading, Stack, useToast } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect } from "react";
import { DeepMap, FieldError, useForm } from "react-hook-form";
import { genStatementClient } from "services/backend/apiClients";
import { IStatementInfoDto, UpdateStatementInfoCommand } from "services/backend/nswagts";
import { logger } from "utils/logger";

import StatementSection from "../StatementSection";
import { FormControlContext } from "./FormControlContext";
import StatementInfoTable from "./StatementInfoTable";
import StatementInfoTableRow from "./StatementInfoTableRow";

interface Props {
  form: IStatementInfoDto;
  setSaving: (b: boolean) => void;
  onSave: () => void;
}

const StatementInfoForm: FC<Props> = ({ form, setSaving, onSave }) => {
  const { t } = useLocales();
  const { handleSubmit, control, reset } = useForm<IStatementInfoDto>();
  const toast = useToast();

  useEffect(() => {
    reset(form);
  }, [form.accountingYear]);

  const saveChanges = useCallback(
    async (data: IStatementInfoDto) => {
      setSaving(true);
      try {
        const statementClient = await genStatementClient();
        const newInfo = { ...form, ...data };
        const command = new UpdateStatementInfoCommand({
          newInfo: newInfo
        });
        console.log(command);
        await statementClient.updateStatementInfo(newInfo.accountingYear, command);
        onSave();
        toast({
          title: t("common.saveSuccessTitle"),
          description: t("common.saveSuccessText"),
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      } catch (err) {
        logger.warn("statementClient.get Error", err);
        toast({
          title: t("common.saveErrorTitle"),
          description: t("common.saveErrorText"),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }
      setSaving(false);
    },
    [form]
  );

  const onValid = useCallback((data: IStatementInfoDto) => {
    saveChanges(data);
  }, []);

  const onInvalid = useCallback((errors: DeepMap<IStatementInfoDto, FieldError>) => {
    console.log(form, errors);
  }, []);

  return (
    <FormControlContext.Provider
      value={{
        control,
        form: form
      }}>
      <form onSubmit={handleSubmit(onValid, onInvalid)} id="editStatementInfo">
        <Stack>
          <StatementSection heading={t("statements.section1.heading")}>
            <StatementInfoTable>
              <StatementInfoTableRow
                name="s1_mushrooms"
                displayName={t("statements.section1.mushrooms")}
              />
              <StatementInfoTableRow
                name="s1_tomatoCucumberHerb"
                displayName={t("statements.section1.tomatoCucumberHerbs")}
              />
              <StatementInfoTableRow
                name="s1_boughtPlants"
                displayName={t("statements.boughtPlants")}
              />
            </StatementInfoTable>
          </StatementSection>
          <StatementSection heading={t("statements.section3.heading")}>
            <StatementInfoTable>
              <StatementInfoTableRow
                name="s3_carrots"
                displayName={t("statements.section3.carrot")}
              />
              <StatementInfoTableRow
                name="s3_peas"
                displayName={t("statements.section1.tomatoCucumberHerbs")}
              />
              <StatementInfoTableRow
                name="s3_onions"
                displayName={t("statements.section3.onion")}
              />
              <StatementInfoTableRow name="s3_other" displayName={t("statements.other")} />
              <StatementInfoTableRow
                name="s3_boughtPlants"
                displayName={t("statements.boughtPlants")}
              />
            </StatementInfoTable>
          </StatementSection>
          <StatementSection heading={t("statements.section4.heading")}>
            <StatementInfoTable>
              <StatementInfoTableRow
                name="s4_onions"
                displayName={t("statements.section4.onions")}
              />
              <StatementInfoTableRow
                name="s4_plants"
                displayName={t("statements.section4.plants")}
              />
              <StatementInfoTableRow
                name="s4_cutFlowers"
                displayName={t("statements.section4.flowers")}
              />
              <StatementInfoTableRow
                name="s4_boughtPlants"
                displayName={t("statements.boughtPlants")}
              />
            </StatementInfoTable>
          </StatementSection>
          <StatementSection heading={t("statements.section7.heading")}>
            <StatementInfoTable>
              <StatementInfoTableRow
                name="s7_plants"
                displayName={t("statements.section7.plants")}
              />
              <StatementInfoTableRow
                name="s7_boughtPlants"
                displayName={t("statements.boughtPlants")}
              />
            </StatementInfoTable>
          </StatementSection>
          <StatementSection heading={t("statements.section8.heading")}>
            <Heading size="sm" pt={5}>
              {t("statements.section8.subHeading1")}
            </Heading>
            <StatementInfoTable>
              <StatementInfoTableRow
                name="s8_applesPearsEtc"
                displayName={t("statements.section8.applesPearsOther")}
              />
              <StatementInfoTableRow
                name="s8_packaging"
                displayName={t("statements.section8.packagingCost")}
              />
            </StatementInfoTable>
            <Heading size="sm" pt={5}>
              {t("statements.section8.subHeading2")}
            </Heading>
            <StatementInfoTable>
              <StatementInfoTableRow
                name="s8_cherries"
                displayName={t("statements.section8.cherry")}
              />
              <StatementInfoTableRow name="s8_plums" displayName={t("statements.section8.plum")} />
              <StatementInfoTableRow
                name="s8_otherStoneFruit"
                displayName={t("statements.other")}
              />
            </StatementInfoTable>
            <Heading size="sm" pt={5}>
              {t("statements.section8.subHeading3")}
            </Heading>
            <StatementInfoTable>
              <StatementInfoTableRow
                name="s8_currant"
                displayName={t("statements.section8.currant")}
              />
              <StatementInfoTableRow
                name="s8_strawberries"
                displayName={t("statements.section8.strawberry")}
              />
              <StatementInfoTableRow
                name="s8_otherBerryFruit"
                displayName={t("statements.other")}
              />
            </StatementInfoTable>
          </StatementSection>
        </Stack>
      </form>
    </FormControlContext.Provider>
  );
};
export default StatementInfoForm;
