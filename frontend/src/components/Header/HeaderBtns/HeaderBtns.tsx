import { HStack } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { FC, useContext } from "react";

import ColorModeBtn from "./ColorModeBtn";
import LocaleBtn from "./LocaleBtn";
import UserBtn from "./UserBtn";

const HeaderButtons: FC = () => {
  const { activeUser } = useContext(AuthContext);

  return (
    <HStack spacing={3}>
      <LocaleBtn />
      <ColorModeBtn />
      {activeUser && <UserBtn />}
    </HStack>
  );
};
export default HeaderButtons;
