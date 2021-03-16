import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IUserDto } from "services/backend/nswagts";

interface Props {
  admin: IUserDto;
}

const AdminItemMenu: FC<Props> = ({ admin }) => {
  const { t } = useLocales();

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<FiChevronDown />} isRound={true} />
      <MenuList>
        <MenuItem>{t("actions.delete")}</MenuItem>
      </MenuList>
    </Menu>
  );
};
export default AdminItemMenu;
