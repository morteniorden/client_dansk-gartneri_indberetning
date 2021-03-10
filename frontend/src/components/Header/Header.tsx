import { Flex, Image } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { FC } from "react";

import HeaderButtons from "./HeaderBtns/HeaderBtns";

const Header: FC = () => {
  const { headerBg } = useColors();
  return (
    <Flex
      justifyContent="space-between"
      shadow="sm"
      alignItems="center"
      pl={[1, 5, 10]}
      pr={[3, 5, 10]}
      bg={headerBg}>
      <Image src="images/icons/logo.svg" position="relative" pb="15px" h="60px"></Image>
      <Flex flexDirection="row" display={["none", null, "flex"]}>
        <HeaderButtons />
      </Flex>
    </Flex>
  );
};
export default Header;
