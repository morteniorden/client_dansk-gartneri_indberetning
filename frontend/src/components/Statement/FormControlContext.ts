import { createContext } from "react";
import { Control } from "react-hook-form";
import { IStatementNoUsersDto } from "services/backend/nswagts";

type Form = IStatementNoUsersDto;

interface FormControlContextContent {
  control: Control<Form>;
  form: Form;
  updatedFormAttribute: (key: keyof Form, value: Form[keyof Form]) => void;
  disabled: boolean;
}

export const FormControlContext = createContext<FormControlContextContent>({
  control: null,
  form: {} as unknown,
  updatedFormAttribute: () => null,
  disabled: false
});
