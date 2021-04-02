import { createContext, Dispatch } from "react";
import { AllListActions } from "react-list-reducer";
import { IAccountDto } from "services/backend/nswagts";

type ContextType = {
  accounts: IAccountDto[];
  dispatchAccounts: Dispatch<AllListActions<IAccountDto>>;
  fetchData: () => Promise<void>;
  isFetching: boolean;
};

export const AccountsContext = createContext<ContextType>(null);
