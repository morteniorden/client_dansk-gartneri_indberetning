import { Button, Flex, HStack, Image, Spacer } from "@chakra-ui/react";
import ChangeAccountantModal from "components/Statement/ChangeAccountant/ChangeAccountantModal";
import ConfirmSignOffModal from "components/Statement/ConfirmSignOffModal/ConfirmSignoffModal";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useAuth } from "hooks/useAuth";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { RoleEnum } from "services/backend/nswagts";

import HeaderButtons from "./HeaderBtns/HeaderBtns";
import Navbar from "./Navbar";

const StatementFormHeader: FC = () => {
  const { t } = useLocales();
  const { save, statement } = useContext(EditStatementContext);
  const { activeUser } = useAuth();
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
      <HStack position="absolute" left="50%" transform="translateX(-50%)">
        <Button colorScheme="green" onClick={save}>
          {t("actions.saveChanges")}
        </Button>
        {/* activeUser.role == RoleEnum.Client && <ChangeAccountantModal statement={statement} /> */}
        <ChangeAccountantModal statement={statement} />
        <ConfirmSignOffModal />
      </HStack>
      <HStack display={["none", null, "flex"]}>
        <Navbar />
        <Spacer w="40px" />
        <HeaderButtons />
      </HStack>
    </Flex>
  );
};
export default StatementFormHeader;
