import { createContext } from "react";
import { Control } from "react-hook-form";
import { IStatementDto } from "services/backend/nswagts";

type Form = IStatementDto;

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
