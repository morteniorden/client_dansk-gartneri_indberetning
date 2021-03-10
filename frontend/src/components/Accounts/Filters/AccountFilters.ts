import { IAccountDto } from "services/backend/nswagts";
import { AccountFilter } from "types/AccountFilter";
import SelectType from "types/SelectType";

export const SearchFilter: AccountFilter = {
  id: 0,
  predicate: (acc: IAccountDto, textInput: string, keys: SelectType[]) =>
    Object.entries(acc)
      .filter(([key, value]) => keys.some(tKey => tKey.id == key))
      .some(([key, value]) => (value + "").toUpperCase().startsWith(textInput.toUpperCase()))
};
