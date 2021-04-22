import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { FC } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IClientDto } from "services/backend/nswagts";

import ChangeAccountantModal from "./ChangeAccountant/ChangeAccountantModal";

interface Props {
  client: IClientDto;
}

const AccountOptionsMenu: FC<Props> = ({ client }) => {
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<BiChevronDown />} isRound={true}></MenuButton>
      <MenuList>
        <ChangeAccountantModal client={client} />
      </MenuList>
    </Menu>
  );
};
export default AccountOptionsMenu;
