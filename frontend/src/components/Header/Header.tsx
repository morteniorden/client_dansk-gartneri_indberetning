import { Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
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
      bg={headerBg}
      minH={14}>
      <Link href="/" passHref>
        <Heading color="gray.50" size="md">
          Produktionsafgiftsfonden
          <br /> for frugt og gartneriprodukter
        </Heading>
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
