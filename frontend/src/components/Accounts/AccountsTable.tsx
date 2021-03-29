import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { SearchFilter } from "components/Accounts/Filters/AccountFilters";
import QueryMultiSelectBtn from "components/Common/QueryMultiSelectBtn";
import QuerySortBtn, { Direction } from "components/Common/QuerySortBtn";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IAccountDto, RoleEnum } from "services/backend/nswagts";
import { AccountFilter } from "types/AccountFilter";
import SelectType from "types/SelectType";

import AccountOptionsMenu from "./AccountOptionsMenu";

interface Props {
  data: IAccountDto[];
  searchString: string;
  fetchData?: () => Promise<void>;
}

type AccountsTableKey = {
  name: string;
  id: string;
  sortable: boolean;
};

const AccountsTable: FC<Props> = ({ data, searchString }) => {
  const { t, locale, localeNameMap } = useLocales();

  const [sortKey, setSortKey] = useState<keyof IAccountDto>("id");
  const [sortDirection, setSortDirection] = useState("ASC");
  const [filters, setFilters] = useState<AccountFilter[]>([SearchFilter]);

  const allTableKeys: AccountsTableKey[] = [
    { name: t("accounts.id"), id: "id", sortable: true },
    { name: t("accounts.name"), id: "name", sortable: true },
    { name: t("accounts.email"), id: "email", sortable: true },
    { name: t("accounts.tel"), id: "tel", sortable: true },
    { name: t("accounts.cvrNumber"), id: "cvrNumber", sortable: true },
    { name: t("accounts.address"), id: "address", sortable: false },
    { name: t("accounts.accountant"), id: "accountant", sortable: false }
  ];
  const [tableKeys, setTableKeys] = useState<AccountsTableKey[]>(allTableKeys);

  const handleSortChange = useCallback((key: string, direction: Direction) => {
    if (direction != null) {
      setSortKey(key as keyof IAccountDto);
      setSortDirection(direction);
    } else {
      setSortKey("id");
      setSortDirection("ASC");
    }
  }, []);

  const genValueFromKey = useCallback((account: IAccountDto, key: string) => {
    if (key == "address") {
      const a = account.address;
      return `${a.addressLine1 ?? ""} ${a.addressLine2 ?? ""} ${a.addressLine3 ?? ""} ${
        a.addressLine4 ?? ""
      }`;
    }
    if (key == "accountant") {
      if (account.accountant) {
        return <BiCheck />;
      } else {
        return t("accountant.noAccountant");
      }
    }
    return account[key as keyof IAccountDto];
  }, []);

  const sortComparer = useCallback(
    (a: IAccountDto, b: IAccountDto) => {
      const aValue = genValueFromKey(a, sortKey);
      const bValue = genValueFromKey(b, sortKey);
      const [c, d] = sortDirection == "ASC" ? [aValue, bValue] : [bValue, aValue];
      if (typeof c == "number" && typeof d == "number") {
        return c - d;
      }
      if (typeof c == "string" && typeof d == "string") {
        const cUpper = (c as string).toUpperCase();
        const dUpper = (d as string).toUpperCase();
        if (cUpper < dUpper) {
          return -1;
        } else if (cUpper > dUpper) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    [sortKey, sortDirection]
  );

  const filterCb = useCallback((qkey: string, chosenOptions: SelectType["id"][]) => {
    setTableKeys(allTableKeys.filter(e => chosenOptions.includes(e.id)));
  }, []);

  return (
    <>
      <Flex>
        <Flex h="48px" alignItems="center">
          <QueryMultiSelectBtn
            queryKey="test"
            options={allTableKeys.map(e => {
              return { id: e.id, name: e.name };
            })}
            filterCb={filterCb}
          />
        </Flex>
        <Table>
          <Thead>
            <Tr>
              {tableKeys.map(key => (
                <Th key={key.id}>
                  <Flex alignItems="center">
                    {key.sortable && (
                      <QuerySortBtn queryKey={key.id.toString()} sortCb={handleSortChange} mr={3} />
                    )}
                    {t(`accounts.${key.id}`)}
                  </Flex>
                </Th>
              ))}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data
              .filter(acc => filters.every(f => f.predicate(acc, searchString, tableKeys)))
              .sort(sortComparer)
              .map(account => {
                return (
                  <Tr key={account.id}>
                    {tableKeys.map(key => (
                      <Td key={key.id}>{genValueFromKey(account, key.id.toString())}</Td>
                    ))}
                    <Td>
                      <AccountOptionsMenu account={account} />
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
};
export default AccountsTable;
