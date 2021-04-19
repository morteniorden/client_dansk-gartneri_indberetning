import { Accordion } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IAccountDto } from "services/backend/nswagts";

import AccountListItem from "./AccountListItem";

interface Props {
  data: IAccountDto[];
  accountingYear: number;
}

const AccountList: FC<Props> = ({ data, accountingYear }) => {
  const { t, locale, localeNameMap } = useLocales();

  return (
    <Accordion allowToggle>
      {data.map(account => (
        <AccountListItem key={account.id} account={account} accountingYear={accountingYear} />
      ))}
    </Accordion>
  );
};
export default AccountList;
