import { t } from "@chakra-ui/styled-system/dist/types/utils";
import React, { FC } from "react";
import { IStatementNoUsersDto } from "services/backend/nswagts";

import InputDKK from "./InputDKK";
import StatementTableRow from "./StatementTableRow";
import TaxTotal from "./TaxTotal";

interface Props {
  key: keyof IStatementNoUsersDto;
  text: string;
  tax: number;
}

const StandardStatementRow: FC<Props> = ({ key, text, tax }) => {
  return (
    <StatementTableRow text={text} tax={tax} TaxTotal={<TaxTotal name={key} tax={tax} />}>
      <InputDKK name={key} />
    </StatementTableRow>
  );
};

export default StandardStatementRow;
