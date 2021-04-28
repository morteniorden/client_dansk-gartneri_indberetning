import { Flex, HStack, Image, Spacer } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useColors } from "hooks/useColors";
import Link from "next/link";
import { FC } from "react";

import HeaderButtons from "./HeaderBtns/HeaderBtns";
import Navbar from "./Navbar";

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
      <Link href="/" passHref>
        <Image
          src="images/icons/logo.svg"
          position="relative"
          pb="15px"
          h="60px"
          _hover={{ cursor: "pointer" }}></Image>
      </Link>

      <HStack display={["none", null, "flex"]}>
        <Navbar />
        <Spacer w="40px" />
        <HeaderButtons />
      </HStack>
    </Flex>
  );
};
export default Header;
