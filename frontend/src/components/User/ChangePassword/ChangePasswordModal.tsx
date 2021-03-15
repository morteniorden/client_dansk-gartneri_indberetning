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

import ChangePasswordForm from "./ChangePasswordForm";

interface Props {
  variant?: "ghost" | "outline" | "solid" | "link" | "unstyled";
  onSubmit?: () => Promise<void>;
}

const ChangePasswordModal: FC<Props> = ({ variant, onSubmit }) => {
  const { buttonFont } = useColors();
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = useCallback(() => {
    onClose();
    onSubmit();
  }, []);

  return (
    <>
      <Button
        rounded="full"
        colorScheme="blue"
        textColor={buttonFont}
        onClick={onOpen}
        variant={variant ?? "solid"}>
        {t("password.change")}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("password.change")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChangePasswordForm onSubmit={handleSubmit} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ChangePasswordModal;
