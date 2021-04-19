import { Text, Textarea } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { useController } from "react-hook-form";
import { IStatementInfoDto } from "services/backend/nswagts";

import { FormControlContext } from "./FormControlContext";

interface Props {
  name: keyof IStatementInfoDto;
  editing: boolean;
}

const InputHelpText: FC<Props> = ({ name, editing }) => {
  const { control, form, updatedFormAttribute } = useContext(FormControlContext);

  const {
    field: { ref, onChange, value, onBlur },
    meta: { isDirty, isTouched, invalid }
  } = useController({
    name,
    control,
    rules: { required: false },
    defaultValue: form[name]
  });

  return (
    <>
      {editing ? (
        <Textarea
          name={name}
          ref={ref}
          defaultValue={value}
          onBlur={onBlur}
          onChange={e => {
            onChange(e.target.value);
            updatedFormAttribute(name, e.target.value);
          }}
        />
      ) : (
        <Text>{value}</Text>
      )}
    </>
  );
};
export default InputHelpText;
