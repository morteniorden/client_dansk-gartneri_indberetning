import { HStack, IconButton, Switch, Td, Text, Textarea, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
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
/*
            {editOn ? (
              <InputHelpText name={(name + "_help") as keyof IStatementInfoDto} />
            ) : (
              <Text>{form[(name + "_help") as keyof IStatementInfoDto] ?? ""}</Text>
            )}

  {editOn ? (
              <InputPerMille name={(name + "_permille") as keyof IStatementInfoDto} />
            ) : (
              <Text>
                {form[(name + "_permille") as keyof IStatementInfoDto] != null &&
                  `${form[(name + "_permille") as keyof IStatementInfoDto].toFixed(2)}‰`}
              </Text>
            )}
*/

//<Textarea value={helpText ?? ""} name={name + "_helptext"} />
