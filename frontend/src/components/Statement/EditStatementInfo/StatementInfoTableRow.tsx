import { Td, Tr } from "@chakra-ui/react";
import { FC } from "react";
import { IStatementInfoDto } from "services/backend/nswagts";

import InputHelpText from "./InputHelpText";
import InputPerMille from "./InputPerMille";

interface Props {
  name: string;
  displayName: string;
}

const StatementInfoTableRow: FC<Props> = ({ name, displayName }) => {
  return (
    <Tr sx={{ td: { verticalAlign: "top" } }}>
      <Td>{displayName}</Td>
      <Td>
        <InputHelpText name={(name + "_help") as keyof IStatementInfoDto} />
      </Td>
      <Td>
        <InputPerMille name={(name + "_permille") as keyof IStatementInfoDto} />
      </Td>
    </Tr>
  );
};
export default StatementInfoTableRow;
