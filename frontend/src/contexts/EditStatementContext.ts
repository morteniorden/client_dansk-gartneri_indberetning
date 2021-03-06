import { createContext, Dispatch, SetStateAction } from "react";
import { IStatementDto, IStatementInfoDto } from "services/backend/nswagts";

type ContextType = {
  statement: IStatementDto;
  setStatement: Dispatch<SetStateAction<IStatementDto>>;
  save: () => void;
  isSaving: boolean;
  isSigning: boolean;
  submit: (data: IStatementDto) => Promise<void>;
  readonly: boolean;
  fetchData: () => Promise<void>;
  isFetching: boolean;
  total: number;
  calcTotal: () => number;
  isDirty: boolean;
  setIsDirty: Dispatch<SetStateAction<boolean>>;
  statementInfo: IStatementInfoDto;
};

export const EditStatementContext = createContext<ContextType>({
  statement: null,
  setStatement: () => null,
  save: () => null,
  isSaving: false,
  isSigning: false,
  submit: (data: IStatementDto) => null,
  readonly: false,
  fetchData: () => null,
  isFetching: false,
  total: 0,
  calcTotal: () => 0,
  isDirty: false,
  setIsDirty: () => null,
  statementInfo: null
});
