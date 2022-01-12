import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import React, { Dispatch, FC, SetStateAction, useContext } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setIsDirty: Dispatch<SetStateAction<boolean>>;
}

const UnsavedChangesModal: FC<Props> = ({ isOpen, onClose, setIsDirty }) => {
  const { save } = useContext(EditStatementContext);
  const router = useRouter();
  const { t } = useLocales();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("statements.unsavedChanges.modalTitle")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{t("statements.unsavedChanges.modalText")}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              m={1}
              colorScheme="green"
              onClick={() => {
                save();
                router.push("/mystatements");
              }}>
              {t("statements.unsavedChanges.saveButton")}
            </Button>
            <Button m={1} colorScheme="yellow" onClick={onClose}>
              {t("statements.unsavedChanges.cancelButton")}
            </Button>
            <Button
              m={1}
              colorScheme="red"
              onClick={() => {
                setIsDirty(false);
                router.push("/mystatements");
              }}>
              {t("statements.unsavedChanges.ignoreButton")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UnsavedChangesModal;
