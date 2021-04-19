import { HStack, IconButton, Switch, Td, Text, Textarea, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useState } from "react";
import { MdEdit } from "react-icons/md";

import InputPerMille from "./InputPerMille";

interface Props {
  name: string;
  helpText: string;
  tax?: number;
}

const StatementInfoTableRow: FC<Props> = ({ name, helpText, tax }) => {
  const { t } = useLocales();
  const [editOn, setEditOn] = useState(false);

  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{editOn ? <Textarea value={helpText ?? ""} /> : <Text>{helpText}</Text>}</Td>
      <Td>
        {editOn ? (
          <InputPerMille disabled={!editOn} />
        ) : (
          <Text>{tax != null && `${tax.toFixed(2)}‰`}</Text>
        )}
      </Td>
      <Td>
        <Switch isChecked={editOn} onChange={e => setEditOn(e.target.checked)} />
      </Td>
    </Tr>
  );
};
export default StatementInfoTableRow;
