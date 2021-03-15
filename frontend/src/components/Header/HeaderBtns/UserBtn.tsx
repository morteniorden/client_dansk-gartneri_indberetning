import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

const UserBtn: FC = () => {
  const { route } = useRouter();
  const { t } = useLocales();

  const { logout, activeUser } = useContext(AuthContext);

  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" w={0} size="sm" rounded="full">
        <Avatar size="sm" name={activeUser.name}></Avatar>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};
export default UserBtn;
