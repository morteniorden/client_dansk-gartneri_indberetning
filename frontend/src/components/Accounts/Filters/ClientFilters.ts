import { IClientDto } from "services/backend/nswagts";
import { ClientFilter } from "types/ClientFilter";

export const SearchFilter: ClientFilter = {
  id: 0,
  predicate: (client: IClientDto, searchString: string) =>
    [client.name, client.email].some(s =>
      s.toLowerCase().includes(searchString.toLocaleLowerCase())
    )
};
