import { HStack } from "@chakra-ui/react";
import { FC } from "react";

import ColorModeBtn from "./ColorModeBtn";

const HeaderButtons: FC = () => {
  return (
    <HStack spacing={3}>
      <ColorModeBtn />
    </HStack>
  );
};
export default HeaderButtons;
