import {
  Button,
  HStack,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { ClientsContext } from "contexts/ClientsContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext } from "react";
import { genUserClient } from "services/backend/apiClients";
import { IClientDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

interface Props {
  client: IClientDto;
}

const DeactivateClientModal: FC<Props> = ({ client }) => {
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { fetchData } = useContext(ClientsContext);

  const onDeactivate = useCallback(async () => {
    try {
      const userClient = await genUserClient();
      await userClient.deactivateUser(client.id);
      toast({
        title: t("accounts.deactivateUserSuccessTitle"),
        description: t("accounts.deactivateUserSuccessText"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
      onClose();
      fetchData();
    } catch (err) {
      logger.warn("statementClient.put Error", err);
      toast({
        title: t("accounts.deactivateUserErrorTitle"),
        description: t("accounts.deactivateUserErrorText"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  }, [client]);

  return (
    <>
      <MenuItem onClick={onOpen}>{t("accounts.deactivateClient")}</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("accounts.deactivateClient")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{t("accounts.confirmDeactivateUser")}</Text>
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
export default DeactivateClientModal;
