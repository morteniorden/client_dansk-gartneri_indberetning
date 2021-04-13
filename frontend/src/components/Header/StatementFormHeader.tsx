import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import ConfirmSignOffModal from "components/Statement/ConfirmSignOffModal/ConfirmSignoffModal";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

import HeaderButtons from "./HeaderBtns/HeaderBtns";

const StatementFormHeader: FC = () => {
  const { t } = useLocales();
  const { save } = useContext(EditStatementContext);
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
        <Button colorScheme="green" rounded="full" onClick={save}>
          {t("actions.saveChanges")}
        </Button>
        <ConfirmSignOffModal />
      </HStack>
      <Flex flexDirection="row" display={["none", null, "flex"]}>
        <HeaderButtons />
      </Flex>
    </Flex>
  );
};
export default StatementFormHeader;