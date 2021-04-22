import { createContext, Dispatch } from "react";
import { AllListActions } from "react-list-reducer";
import { IClientDto } from "services/backend/nswagts";

type ContextType = {
  clients: IClientDto[];
  dispatchAccounts: Dispatch<AllListActions<IClientDto>>;
  fetchData: () => Promise<void>;
  isFetching: boolean;
};

export const ClientsContext = createContext<ContextType>(null);
