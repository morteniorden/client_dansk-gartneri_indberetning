import { Flex, InputGroup, NumberInput, NumberInputField, Text } from "@chakra-ui/react";
import { FC, useContext, useState } from "react";
import { useController } from "react-hook-form";
import { IStatementInfoDto } from "services/backend/nswagts";

import { FormControlContext } from "./FormControlContext";

interface Props {
  name: keyof IStatementInfoDto;
  editing: boolean;
}

const InputPerMille: FC<Props> = ({ name, editing }) => {
  /*
  const format = (val: string) => val + "‰";
  const parse = (val: string) => val.replace(/^‰/, "");
  const [value, setValue] = useState("1.53");
  */

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
      {editing ? (
        <InputGroup>
          <NumberInput
            min={0} //Not sure about the range
            max={1000} //Not sure about the range
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
            />
          </NumberInput>
        </InputGroup>
      ) : (
        <Text>{`${parseFloat(value).toFixed(2)}‰`}</Text>
      )}
    </Flex>
  );
};
export default InputPerMille;
