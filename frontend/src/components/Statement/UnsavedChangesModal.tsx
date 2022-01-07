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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Unsaved changes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You have unsaved changes.</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              m={1}
              colorScheme="green"
              onClick={() => {
                save();
                router.push("/mystatements");
              }}>
              Save
            </Button>
            <Button m={1} colorScheme="yellow" onClick={onClose}>
              Close
            </Button>
            <Button
              m={1}
              colorScheme="red"
              onClick={() => {
                setIsDirty(false);
                router.push("/mystatements");
              }}>
              Ignore
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UnsavedChangesModal;
