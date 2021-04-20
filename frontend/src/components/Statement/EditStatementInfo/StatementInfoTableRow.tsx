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
  const [editOn, setEditOn] = useState(false);
  const { form } = useContext(FormControlContext);

  return (
    <>
      {form && (
        <Tr>
          <Td>{displayName}</Td>
          <Td>
            <InputHelpText name={(name + "_help") as keyof IStatementInfoDto} editing={editOn} />
          </Td>
          <Td>
            <InputPerMille
              name={(name + "_permille") as keyof IStatementInfoDto}
              editing={editOn}
            />
          </Td>
          <Td>
            <Switch isChecked={editOn} onChange={e => setEditOn(e.target.checked)} />
          </Td>
        </Tr>
      )}
    </>
  );
};
export default StatementInfoTableRow;
