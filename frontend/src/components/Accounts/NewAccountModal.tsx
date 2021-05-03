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

import NewAccountForm from "./NewAccountForm";

interface Props {
  className?: string;
  onSubmit: () => Promise<void>;
}

const NewAccountModal: FC<Props> = (props: Props) => {
  const { buttonFont } = useColors();
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = useCallback(() => {
    onClose();
    props.onSubmit();
  }, []);

  return (
    <>
      <Button rounded="md" colorScheme="blue" textColor={buttonFont} onClick={onOpen}>
        {t("accounts.addAccount")}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("accounts.addAccount")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewAccountForm onSubmit={handleSubmit} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default NewAccountModal;
