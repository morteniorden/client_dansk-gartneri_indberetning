import { Button, ButtonGroup, Flex, HStack, Image } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useColors } from "hooks/useColors";
import Link from "next/link";
import { FC, useContext } from "react";
import { RoleEnum } from "services/backend/nswagts";

import HeaderButtons from "./HeaderBtns/HeaderBtns";

const Header: FC = () => {
  const { headerBg } = useColors();

  const { activeUser } = useContext(AuthContext);

  return (
    <Flex
      justifyContent="space-between"
      shadow="sm"
      alignItems="center"
      pl={[1, 5, 10]}
      pr={[3, 5, 10]}
      bg={headerBg}>
      <Image src="images/icons/logo.svg" position="relative" pb="15px" h="60px"></Image>

      {/* TODO: Recreate as actual component */}
      {activeUser?.role == RoleEnum.Admin && (
        <ButtonGroup>
          <Link href="/admins" passHref>
            <Button>Admins</Button>
          </Link>
          <Link href="/accounts" passHref>
            <Button>Accounts</Button>
          </Link>
        </ButtonGroup>
      )}

      <HStack display={["none", null, "flex"]}>
        <HeaderButtons />
      </HStack>
    </Flex>
  );
};
export default Header;
