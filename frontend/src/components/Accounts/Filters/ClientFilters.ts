import { IClientDto } from "services/backend/nswagts";
import { AccountFilter } from "types/AccountFilter";

export const SearchFilter: AccountFilter = {
  id: 0,
  predicate: (client: IClientDto, searchString: string) =>
    [client.name, client.email].some(s =>
      s.toLowerCase().includes(searchString.toLocaleLowerCase())
    )
};
