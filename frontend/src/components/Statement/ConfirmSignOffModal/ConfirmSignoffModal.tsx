import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";

const ConfirmSignOffModal: FC = () => {
  const { buttonFont } = useColors();
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button rounded="full" colorScheme="blue" textColor={buttonFont} onClick={onOpen}>
        {t("statements.signOff")}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("accounts.addAccount")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{t("statements.confirmSignOffText")}</Text>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button rounded="full" onClick={onClose}>
                {t("actions.back")}
              </Button>
              <Button colorScheme="green" rounded="full" type="submit" form="statement_form">
                {t("statements.confirmSignOffButton")}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConfirmSignOffModal;
