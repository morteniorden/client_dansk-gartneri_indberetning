import {
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback } from "react";
import { BiX } from "react-icons/bi";
import { genUserClient } from "services/backend/apiClients";
import { IUserDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

interface Props {
  onSubmit: () => void;
  admin: IUserDto;
}

const DeactivateAdminModal: FC<Props> = ({ onSubmit, admin }) => {
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onDeactivate = useCallback(async () => {
    try {
      const userClient = await genUserClient();
      await userClient.deactivateUser(admin.id);
      toast({
        title: t("accounts.deactivateUserSuccessTitle"),
        description: t("accounts.deactivateUserSuccessText"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
      onClose();
      onSubmit();
    } catch (err) {
      logger.warn("userClient.put Error", err);
      toast({
        title: t("accounts.deactivateUserErrorTitle"),
        description: t("accounts.deactivateUserErrorText"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  }, [admin]);

  return (
    <>
      <Tooltip label={t("admins.deactivateAdmin")}>
        <IconButton icon={<BiX />} aria-label="Delete admin" onClick={onOpen} />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("admins.deactivateAdmin")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{t("admins.deactivateAdminText")}</Text>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button onClick={onClose}>{t("actions.back")}</Button>
              <Button colorScheme="green" onClick={onDeactivate}>
                {t("actions.deactivate")}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DeactivateAdminModal;
