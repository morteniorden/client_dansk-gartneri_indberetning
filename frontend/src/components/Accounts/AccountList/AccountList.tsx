import { Accordion } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IClientDto } from "services/backend/nswagts";

import AccountListItem from "./AccountListItem";

interface Props {
  data: IClientDto[];
  accountingYear: number;
}

const AccountList: FC<Props> = ({ data, accountingYear }) => {
  const { t, locale, localeNameMap } = useLocales();

  return (
    <Accordion allowToggle>
      {data.map(client => (
        <AccountListItem key={client.id} client={client} accountingYear={accountingYear} />
      ))}
    </Accordion>
  );
};
export default AccountList;
