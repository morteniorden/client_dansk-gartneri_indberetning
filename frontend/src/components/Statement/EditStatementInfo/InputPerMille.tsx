import {
  Flex,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { FC, useContext, useMemo } from "react";
import { useController } from "react-hook-form";
import { IStatementInfoDto } from "services/backend/nswagts";

import { FormControlContext } from "./FormControlContext";

interface Props {
  name: keyof IStatementInfoDto;
}

const InputPerMille: FC<Props> = ({ name }) => {
  const { control, form } = useContext(FormControlContext);
  const colors = useColors();

  const {
    field: { ref, onChange, value, onBlur },
    meta: { isDirty, isTouched, invalid }
  } = useController({
    name,
    control,
    rules: { required: false, valueAsNumber: true },
    defaultValue: form[name]
  });

  const bgColor = useMemo(() => {
    if (invalid) return colors.errorColor;
    if (isDirty) return colors.warningColor;
    if (isTouched) return colors.infoColor;
  }, [isDirty, isTouched, invalid, colors]);

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
            }}
            bgColor={bgColor}
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
