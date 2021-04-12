import { Input, InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/react";
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

  const { control, form, updatedFormAttribute } = useContext(FormControlContext);
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

  const { leftOrRight } = useMemo(() => formatCurrency(value), [value, formatCurrency]);

  return (
    <InputGroup>
      {leftOrRight === "left" && <InputLeftAddon>Kr.</InputLeftAddon>}
      <Input
        name={name}
        type="number"
        ref={ref}
        roundedLeft={leftOrRight === "left" ? "none" : "base"}
        roundedRight={leftOrRight === "right" ? "none" : "base"}
        value={value}
        bgColor={bgColor}
        onBlur={onBlur}
        onChange={e => {
          onChange(e.target.valueAsNumber);
          updatedFormAttribute(name, e.target.valueAsNumber);
        }}
      />
      {leftOrRight === "right" && <InputRightAddon>Kr.</InputRightAddon>}
    </InputGroup>
  );
};
export default InputDKK;
