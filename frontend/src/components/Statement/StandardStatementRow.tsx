import React, { FC } from "react";
import { IStatementNoUsersDto } from "services/backend/nswagts";

import InputDKK from "./InputDKK";
import StatementTableRow from "./StatementTableRow";
import TaxTotal from "./TaxTotal";

interface Props {
  name: keyof IStatementNoUsersDto;
  text: string;
  tax: number;
}

const StandardStatementRow: FC<Props> = ({ name, text, tax }) => {
  return (
    <StatementTableRow text={text} tax={tax} TaxTotal={<TaxTotal name={name} tax={tax} />}>
      <InputDKK name={name} />
    </StatementTableRow>
  );
};

export default StandardStatementRow;
