import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { FC } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IAccountDto } from "services/backend/nswagts";

import ChangeAccountantModal from "./ChangeAccountant/ChangeAccountantModal";

interface Props {
  account: IAccountDto;
}

const AccountOptionsMenu: FC<Props> = ({ account }) => {
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<BiChevronDown />} isRound={true}></MenuButton>
      <MenuList>
        <ChangeAccountantModal account={account} />
      </MenuList>
    </Menu>
  );
};
export default AccountOptionsMenu;
