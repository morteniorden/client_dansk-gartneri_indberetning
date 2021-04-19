import { Heading, Stack } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { DeepMap, FieldError, useForm } from "react-hook-form";
import { IStatementInfoDto } from "services/backend/nswagts";

import StatementSection from "../StatementSection";
import StatementTableSubHeading from "../StatementTableSubHeading";
import { FormControlContext } from "./FormControlContext";
import StatementInfoTable from "./StatementInfoTable";
import StatementInfoTableRow from "./StatementInfoTableRow";

interface Props {
  form: IStatementInfoDto;
  setForm: Dispatch<SetStateAction<IStatementInfoDto>>;
  onSave: (data: IStatementInfoDto) => void;
}

const StatementInfoForm: FC<Props> = ({ form, setForm, onSave }) => {
  const { t } = useLocales();
  const { handleSubmit, control } = useForm<IStatementInfoDto>();

  const updatedFormAttribute = useCallback(
    (key: keyof IStatementInfoDto, value: IStatementInfoDto[keyof IStatementInfoDto]) => {
      setForm(x => {
        (x[key] as unknown) = value;
        return x;
      });
    },
    [setForm]
  );

  const onValid = useCallback((data: IStatementInfoDto) => {
    onSave(data);
  }, []);

  const onInvalid = useCallback((errors: DeepMap<IStatementInfoDto, FieldError>) => {
    console.log(form, errors);
  }, []);

  return (
    <FormControlContext.Provider
      value={{
        control,
        form: form,
        updatedFormAttribute
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
