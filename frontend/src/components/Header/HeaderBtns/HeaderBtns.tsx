import { HStack } from "@chakra-ui/react";
import { FC } from "react";

import ColorModeBtn from "./ColorModeBtn";
import LocaleBtn from "./LocaleBtn";
import UserBtn from "./UserBtn";

const HeaderButtons: FC = () => {
  return (
    <HStack spacing={3}>
      <LocaleBtn />
      <ColorModeBtn />
      <UserBtn />
    </HStack>
  );
};
export default HeaderButtons;
