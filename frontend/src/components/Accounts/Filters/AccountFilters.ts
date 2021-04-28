import { IClientDto } from "services/backend/nswagts";
import { AccountFilter } from "types/AccountFilter";
import SelectType from "types/SelectType";

export const SearchFilter: AccountFilter = {
  id: 0,
  predicate: (client: IClientDto, textInput: string, keys: SelectType[]) =>
    Object.entries(client)
      .filter(([key, value]) => keys.some(tKey => tKey.id == key))
      .some(([key, value]) => (value + "").toUpperCase().startsWith(textInput.toUpperCase()))
};
