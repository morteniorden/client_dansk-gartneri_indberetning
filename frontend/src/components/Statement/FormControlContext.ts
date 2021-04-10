import { createContext } from "react";
import { Control } from "react-hook-form";
import { IStatementDto } from "services/backend/nswagts";

interface FormControlContextContent {
  control: Control<IStatementDto>;
  form: IStatementDto;
  updatedFormAttribute: (
    key: keyof IStatementDto,
    value: IStatementDto[keyof IStatementDto]
  ) => void;
}

export const FormControlContext = createContext<FormControlContextContent>({
  control: null,
  form: {} as unknown,
  updatedFormAttribute: () => null
});
