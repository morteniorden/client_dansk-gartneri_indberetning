import { IClientDto } from "services/backend/nswagts";

export type ClientFilter = {
  id: number;
  predicate: (account: IClientDto, searchString?: string) => boolean;
};
