import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { FC, useContext } from "react";

const UserBtn: FC = () => {
  const { t } = useLocales();

  const { logout, activeUser } = useContext(AuthContext);

  return (
    <Menu>
      <Avatar as={MenuButton} size="sm" name={activeUser.name}></Avatar>
      <MenuList>
        <MenuItem onClick={logout}>{t("login.logout")}</MenuItem>
      </MenuList>
    </Menu>
  );
};
export default UserBtn;
