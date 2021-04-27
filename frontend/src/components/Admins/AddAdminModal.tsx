import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback } from "react";

import AddAdminForm from "./AddAdminForm";

interface Props {
  onSubmit: () => void;
}

const AddAdminModal: FC<Props> = ({ onSubmit }) => {
  const { buttonFont } = useColors();
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = useCallback(() => {
    onClose();
    onSubmit();
  }, []);

  return (
    <>
      <Button rounded="md" colorScheme="blue" textColor={buttonFont} onClick={onOpen}>
        {t("admins.addAdmin")}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("admins.addAdmin")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddAdminForm onSubmit={handleSubmit} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddAdminModal;
