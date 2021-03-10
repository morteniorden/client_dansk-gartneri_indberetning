import { IAccountDto } from "services/backend/nswagts";

import SelectType from "./SelectType";

export type AccountFilter = {
  id: number;
  predicate: (account: IAccountDto, textInput?: string, keys?: SelectType[]) => boolean;
};
