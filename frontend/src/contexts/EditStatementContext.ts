import { createContext, Dispatch, SetStateAction } from "react";
import { IStatementDto } from "services/backend/nswagts";

type ContextType = {
  statement: IStatementDto;
  setStatement: Dispatch<SetStateAction<IStatementDto>>;
  save: () => void;
  isSaving: boolean;
  submit: (data: IStatementDto) => Promise<void>;
  total: number;
  calcTotal: () => number;
  //setTotal: Dispatch<SetStateAction<number>>;
};

export const EditStatementContext = createContext<ContextType>({
  statement: null,
  setStatement: () => null,
  save: () => null,
  isSaving: false,
  submit: (data: IStatementDto) => null,
  total: 0,
  calcTotal: () => 0
});
// setTotal: () => null
//  total: 0,
