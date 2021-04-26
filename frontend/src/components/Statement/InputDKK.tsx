import {
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useContext, useMemo } from "react";
import { useController } from "react-hook-form";
import { IStatementDto } from "services/backend/nswagts";

import { FormControlContext } from "./FormControlContext";

interface Props {
  name: keyof IStatementDto;
}

const InputDKK: FC<Props> = ({ name }) => {
  const { formatCurrency } = useLocales();

  const { control, form, updatedFormAttribute, disabled } = useContext(FormControlContext);
  const colors = useColors();

  const {
    field: { ref, onChange, value, onBlur },
    fieldState: { invalid, isDirty, isTouched }
  } = useController({
    name,
    control,
    rules: {
      required: false
    },
    defaultValue: form[name]
  });

  const bgColor = useMemo(() => {
    if (invalid) return colors.errorColor;
    if (isDirty) return colors.warningColor;
    if (isTouched) return colors.infoColor;
  }, [isDirty, isTouched, invalid, colors]);

  const { leftOrRight } = useMemo(() => formatCurrency(value), [value, formatCurrency]);

  return (
    <InputGroup>
      {leftOrRight === "left" && <InputLeftAddon>Kr.</InputLeftAddon>}
      <NumberInput defaultValue={value} min={0} max={1000000000} precision={0}>
        <NumberInputField
          name={name}
          ref={ref}
          disabled={disabled}
          roundedLeft={leftOrRight === "left" ? "none" : "base"}
          roundedRight={leftOrRight === "right" ? "none" : "base"}
          bgColor={bgColor}
          value={value}
          onBlur={onBlur}
          onChange={e => {
            onChange(parseInt(e.target.value));
            updatedFormAttribute(name, parseInt(e.target.value));
          }}
        />
      </NumberInput>
      {leftOrRight === "right" && <InputRightAddon>Kr.</InputRightAddon>}
    </InputGroup>
  );
};
export default InputDKK;
