import { createContext, Dispatch, SetStateAction } from "react";
import { IStatementDto } from "services/backend/nswagts";

type ContextType = {
  statement: IStatementDto;
  setStatement: Dispatch<SetStateAction<IStatementDto>>;
  save: () => void;
  isSaving: boolean;
  submit: (data: IStatementDto) => Promise<void>;
  disabled: boolean;
  fetchData: () => Promise<void>;
  isFetching: boolean;
};

export const EditStatementContext = createContext<ContextType>({
  statement: null,
  setStatement: () => null,
  save: () => null,
  isSaving: false,
  submit: (data: IStatementDto) => null,
  disabled: false,
  fetchData: () => null,
  isFetching: false
});
