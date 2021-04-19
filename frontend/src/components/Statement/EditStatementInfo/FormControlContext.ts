import { createContext } from "react";
import { Control } from "react-hook-form";
import { IStatementInfoDto } from "services/backend/nswagts";

type Form = IStatementInfoDto;

interface FormControlContextContent {
  control: Control<Form>;
  form: Form;
  updatedFormAttribute: (key: keyof Form, value: Form[keyof Form]) => void;
}

export const FormControlContext = createContext<FormControlContextContent>({
  control: null,
  form: {} as unknown,
  updatedFormAttribute: () => null
});
