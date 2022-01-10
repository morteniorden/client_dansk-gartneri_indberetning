import { HStack, Text } from "@chakra-ui/react";
import { useFormatNumber } from "hooks/useFormatNumber";
import { FC, useContext, useMemo } from "react";
import NumberFormat from "react-number-format";
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

  return (
    <HStack>
      <NumberFormat thousandSeparator="." decimalSeparator="," value={total} displayType="text" />
      <Text>Kr.</Text>
    </HStack>
  );
};

export default TaxTotal;
