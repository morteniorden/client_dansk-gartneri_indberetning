import { createContext, Dispatch } from "react";
import { AllListActions } from "react-list-reducer";
import { IClientDto } from "services/backend/nswagts";

type ContextType = {
  accounts: IClientDto[];
  dispatchAccounts: Dispatch<AllListActions<IClientDto>>;
  fetchData: () => Promise<void>;
  isFetching: boolean;
};

export const AccountsContext = createContext<ContextType>(null);
