import { Stack } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { DeepMap, FieldError, useForm } from "react-hook-form";
import { IStatementInfoDto } from "services/backend/nswagts";

import StatementSection from "../StatementSection";
import { FormControlContext } from "./FormControlContext";
import StatementInfoTable from "./StatementInfoTable";
import StatementInfoTableRow from "./StatementInfoTableRow";

interface Props {
  form: IStatementInfoDto;
  setForm: Dispatch<SetStateAction<IStatementInfoDto>>;
}

const StatementInfoForm: FC<Props> = ({ form, setForm }) => {
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
    //submit(data);
    console.log(data);
  }, []);

  const onInvalid = useCallback((errors: DeepMap<IStatementInfoDto, FieldError>) => {
    //console.log(statement, errors);
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
            </StatementInfoTable>
          </StatementSection>
        </Stack>
      </form>
    </FormControlContext.Provider>
  );
};
export default StatementInfoForm;
/*
/*
  const updatedFormAttribute = useCallback(
    (key: keyof IStatementInfoDto, value: IStatementInfoDto[keyof IStatementInfoDto]) => {
      setStatement(x => {
        (x[key] as unknown) = value;
        return x;
      });
    },
    []
  );
  */

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
