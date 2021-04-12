import { createContext, Dispatch, SetStateAction } from "react";
import { IStatementDto } from "services/backend/nswagts";

type ContextType = {
  statement: IStatementDto;
  setStatement: Dispatch<SetStateAction<IStatementDto>>;
  save: () => void;
  isSaving: boolean;
  submit: (data: IStatementDto) => Promise<void>;
};

export const EditStatementContext = createContext<ContextType>({
  statement: null,
  setStatement: () => null,
  save: () => null,
  isSaving: false,
  submit: (data: IStatementDto) => null
});
