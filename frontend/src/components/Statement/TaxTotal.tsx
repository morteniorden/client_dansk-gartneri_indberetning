import { Text } from "@chakra-ui/react";
import { FC, useContext, useMemo } from "react";
import { IStatementNoUsersDto } from "services/backend/nswagts";

import { FormControlContext } from "./FormControlContext";

interface Props {
  name: keyof IStatementNoUsersDto;
  tax: number;
}

const TaxTotal: FC<Props> = ({ name, tax }) => {
  const { form } = useContext(FormControlContext);

  const total = useMemo(() => {
    if (!form) return "";
    return ((form[name] as number) * tax) / 1000;
  }, [form, name, tax]);

  return <Text>{total}</Text>;
};

export default TaxTotal;
