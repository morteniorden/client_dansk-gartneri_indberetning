import { IClientDto } from "services/backend/nswagts";
import { ClientFilter } from "types/ClientFilter";
import SelectType from "types/SelectType";

export const SearchFilter: ClientFilter = {
  id: 0,
  predicate: (client: IClientDto, textInput: string, keys: SelectType[]) =>
    Object.entries(client)
      .filter(([key, value]) => keys.some(tKey => tKey.id == key))
      .some(([key, value]) => (value + "").toUpperCase().startsWith(textInput.toUpperCase()))
};

export const ActiveFilter: ClientFilter = {
  id: 1,
  predicate: (client: IClientDto) => client.deactivationTime == null
};
