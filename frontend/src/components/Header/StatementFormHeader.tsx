import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useRouter } from "next/router";
import { FC } from "react";

import HeaderButtons from "./HeaderBtns/HeaderBtns";

const StatementFormHeader: FC = () => {
  const { headerBg } = useColors();
  const router = useRouter();
  const logoPath = router.basePath + "/images/icons/logo.svg";
  return (
    <Flex
      justifyContent="space-between"
      shadow="sm"
      alignItems="center"
      pl={[1, 5, 10]}
      pr={[3, 5, 10]}
      bg={headerBg}
      position="fixed"
      w="100vw"
      zIndex={100}>
      <Image src={logoPath} position="relative" pb="15px" h="60px"></Image>
      <HStack>
        <Button colorScheme="green" rounded="full">
          Gem ændringer
        </Button>
        <Button colorScheme="blue" rounded="full" type="submit" form="statement_form">
          Underskriv og send
        </Button>
      </HStack>
      <Flex flexDirection="row" display={["none", null, "flex"]}>
        <HeaderButtons />
      </Flex>
    </Flex>
  );
};
export default StatementFormHeader;
