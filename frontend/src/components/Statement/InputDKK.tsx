import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";
import LocaleCurrency from "components/Common/LocaleCurrency";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useContext, useMemo } from "react";
import { useController } from "react-hook-form";
import { NumberFormatProps, NumberFormatValues } from "react-number-format";
import { IStatementNoUsersDto } from "services/backend/nswagts";

import { FormControlContext } from "./FormControlContext";

type Props = {
  name: keyof IStatementNoUsersDto;
} & Pick<NumberFormatProps<unknown>, "allowNegative" | "allowLeadingZeros" | "decimalScale">;

const InputDKK: FC<Props> = ({ name, children, ...rest }) => {
  const { formatCurrency } = useLocales();

  const { control, form, updatedFormAttribute } = useContext(FormControlContext);
  const { readonly } = useContext(EditStatementContext);
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

  const { leftOrRight } = useMemo(() => formatCurrency(value as number), [value, formatCurrency]);

  return (
    <InputGroup>
      {leftOrRight === "left" && <InputLeftAddon>Kr.</InputLeftAddon>}
      <LocaleCurrency
        customInput={Input}
        onBlur={onBlur}
        value={Number(value)}
        defaultValue={0}
        ref={ref}
        disabled={readonly}
        roundedLeft={leftOrRight === "left" ? "none" : "base"}
        roundedRight={leftOrRight === "right" ? "none" : "base"}
        bgColor={bgColor}
        onValueChange={(v: NumberFormatValues) => {
          onChange(v.value);
          updatedFormAttribute(name, parseInt(v.value));
        }}
        {...rest}
      />
      {/* <NumberInput defaultValue={value} min={0} max={1000000000}> */}
      {/* <NumberInputField
          name={name}
          ref={ref}
          disabled={readonly}
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
      </NumberInput> */}
      {leftOrRight === "right" && <InputRightAddon>Kr.</InputRightAddon>}
    </InputGroup>
  );
};
export default InputDKK;
