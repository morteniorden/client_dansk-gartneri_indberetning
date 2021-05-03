import { Textarea } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { FC, useContext, useMemo } from "react";
import { useController } from "react-hook-form";
import { IStatementInfoDto } from "services/backend/nswagts";

import { FormControlContext } from "./FormControlContext";

interface Props {
  name: keyof IStatementInfoDto;
}

const InputHelpText: FC<Props> = ({ name }) => {
  const { control, form } = useContext(FormControlContext);
  const colors = useColors();

  const {
    field: { ref, onChange, value, onBlur },
    fieldState: { invalid, isDirty, isTouched }
  } = useController({
    name,
    control,
    rules: { required: false },
    defaultValue: form[name]
  });

  const bgColor = useMemo(() => {
    if (invalid) return colors.errorColor;
    if (isDirty) return colors.warningColor;
    if (isTouched) return colors.infoColor;
  }, [isDirty, isTouched, invalid, colors]);

  return (
    <Textarea
      name={name}
      ref={ref}
      defaultValue={value}
      onBlur={onBlur}
      onChange={e => {
        onChange(e.target.value);
      }}
      bgColor={bgColor}
    />
  );
};
export default InputHelpText;
