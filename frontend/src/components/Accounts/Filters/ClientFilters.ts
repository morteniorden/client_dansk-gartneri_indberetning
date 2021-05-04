import { IClientDto } from "services/backend/nswagts";
import { ClientFilter } from "types/ClientFilter";

export const SearchFilter: ClientFilter = {
  id: 0,
  predicate: (client: IClientDto, textInput: string) =>
    [client.name, client.email].some(x => x.toLowerCase().includes(textInput.toLowerCase()))
};

export const ActiveFilter: ClientFilter = {
  id: 1,
  predicate: (client: IClientDto) => client.deactivationTime == null
};
