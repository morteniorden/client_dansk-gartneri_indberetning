import { Switch, Td, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useContext, useState } from "react";
import { IStatementInfoDto } from "services/backend/nswagts";

import { FormControlContext } from "./FormControlContext";
import InputHelpText from "./InputHelpText";
import InputPerMille from "./InputPerMille";

interface Props {
  name: string;
  displayName: string;
}

const StatementInfoTableRow: FC<Props> = ({ name, displayName }) => {
  const { t } = useLocales();
  const { form } = useContext(FormControlContext);

  return (
    <>
      {form && (
        <Tr sx={{ td: { "vertical-align": "top" } }}>
          <Td>{displayName}</Td>
          <Td>
            <InputHelpText name={(name + "_help") as keyof IStatementInfoDto} />
          </Td>
          <Td>
            <InputPerMille name={(name + "_permille") as keyof IStatementInfoDto} />
          </Td>
        </Tr>
      )}
    </>
  );
};
export default StatementInfoTableRow;
