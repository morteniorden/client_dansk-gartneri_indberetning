import { Input, InputGroup, InputLeftAddon, InputRightAddon } from "@chakra-ui/react";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useColors } from "hooks/useColors";
import { useFormatNumber } from "hooks/useFormatNumber";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useMemo } from "react";
import { useController } from "react-hook-form";
import { IStatementNoUsersDto } from "services/backend/nswagts";
import { StringDecoder } from "string_decoder";

import { FormControlContext } from "./FormControlContext";

interface Props {
  name: keyof IStatementNoUsersDto;
}

const InputDKK: FC<Props> = ({ name }) => {
  const { formatCurrency } = useLocales();
  const { formatNumberThousandSep: formatNumber, parseFormat } = useFormatNumber();

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

  const { leftOrRight } = useMemo(() => formatCurrency(value), [value, formatCurrency]);

  return (
    <InputGroup>
      {leftOrRight === "left" && <InputLeftAddon>Kr.</InputLeftAddon>}
      <Input
        defaultValue={value}
        name={name}
        pattern={"[0-9,.]*"}
        ref={ref}
        disabled={readonly}
        roundedLeft={leftOrRight === "left" ? "none" : "base"}
        roundedRight={leftOrRight === "right" ? "none" : "base"}
        bgColor={bgColor}
        value={formatNumber(value, leftOrRight)}
        onBlur={onBlur}
        onChange={e => {
          onChange(parseFormat(e.target.value, leftOrRight));
          updatedFormAttribute(name, parseFormat(e.target.value, leftOrRight));
        }}
      />
      {leftOrRight === "right" && <InputRightAddon>Kr.</InputRightAddon>}
    </InputGroup>
  );
};
export default InputDKK;
