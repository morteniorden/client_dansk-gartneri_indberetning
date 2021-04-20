import {
  Flex,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";
import { FC, useContext } from "react";
import { useController } from "react-hook-form";
import { IStatementInfoDto } from "services/backend/nswagts";

import { FormControlContext } from "./FormControlContext";

interface Props {
  name: keyof IStatementInfoDto;
}

const InputPerMille: FC<Props> = ({ name }) => {
  const { control, form, updatedFormAttribute } = useContext(FormControlContext);

  const {
    field: { ref, onChange, value, onBlur },
    meta: { isDirty, isTouched, invalid }
  } = useController({
    name,
    control,
    rules: { required: false, valueAsNumber: true },
    defaultValue: form[name]
  });

  return (
    <Flex>
      <InputGroup>
        <NumberInput
          min={0} //Not sure about the range
          max={99} //Not sure about the range
          precision={2}
          defaultValue={value}>
          <NumberInputField
            name={name}
            ref={ref}
            value={value}
            onBlur={onBlur}
            onChange={e => {
              onChange(e.target.value);
              updatedFormAttribute(name, parseFloat(e.target.value));
            }}
            textAlign="end"
            maxLength={5}
          />
        </NumberInput>
        <InputRightElement>‰</InputRightElement>
      </InputGroup>
    </Flex>
  );
};
export default InputPerMille;
