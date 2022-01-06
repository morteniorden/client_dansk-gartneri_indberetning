import { Accordion } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback } from "react";
import { IClientDto } from "services/backend/nswagts";

import { Sorting } from "./../../Common/SortBySelect";
import AccountListItem from "./AccountListItem";

interface Props {
  data: IClientDto[];
  accountingYear: number;
  sortBy: number;
}

const AccountList: FC<Props> = ({ data, accountingYear, sortBy }) => {
  const { t, locale, localeNameMap } = useLocales();

  const sortAccounts = useCallback(
    (a: IClientDto, b: IClientDto): number => {
      switch (sortBy) {
        case Sorting.indexOf("Name"):
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        case Sorting.indexOf("Status"): {
          console.log(a);
          console.log(b);

          let aVal, bVal;

          try {
            aVal = a.statements.find(s => s.accountingYear == accountingYear).status;
          } catch (error) {
            aVal = -1;
          }
          try {
            bVal = b.statements.find(s => s.accountingYear == accountingYear).status;
          } catch (error) {
            bVal = -1;
          }
          return aVal - bVal;
        }
      }
    },
    [sortBy, accountingYear]
  );

  return (
    <Accordion allowToggle>
      {data.sort(sortAccounts).map(client => (
        <AccountListItem key={client.id} client={client} accountingYear={accountingYear} />
      ))}
    </Accordion>
  );
};
export default AccountList;
