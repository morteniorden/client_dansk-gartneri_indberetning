import { IClientDto } from "services/backend/nswagts";

import SelectType from "./SelectType";

export type ClientFilter = {
  id: number;
  predicate: (account: IClientDto, textInput?: string, keys?: SelectType[]) => boolean;
};
