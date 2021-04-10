import { InputGroup, InputRightAddon, NumberInput, NumberInputField } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useContext } from "react";
import { useController } from "react-hook-form";
import { IStatementDto } from "services/backend/nswagts";

import { FormControlContext } from "./FormControlContext";

interface Props {
  name: keyof IStatementDto;
}

const InputDKK: FC<Props> = ({ name }) => {
  const { t } = useLocales();

  const { control, form, updatedFormAttribute } = useContext(FormControlContext);

  const {
    field: { ref, onChange, value }
  } = useController({
    name,
    control,
    rules: { required: false, valueAsNumber: true },
    defaultValue: form[name]
  });

  return (
    <InputGroup>
      <NumberInput min={0} precision={0} w="100%">
        <NumberInputField
          name={name}
          ref={ref}
          roundedEnd="none"
          value={value}
          onChange={e => {
            onChange(e.target.value);
            updatedFormAttribute(name, parseInt(e.target.value));
          }}
        />
      </NumberInput>
      <InputRightAddon>Kr.</InputRightAddon>
    </InputGroup>
  );
};
export default InputDKK;
