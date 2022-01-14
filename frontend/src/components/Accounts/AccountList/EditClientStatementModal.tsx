import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import StatementForm from "components/Statement/StatementForm";
import { EditStatementContext } from "contexts/EditStatementContext";
import { FC, useContext } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const EditClientStatementModal: FC<Props> = ({ isOpen, onClose }) => {
  const { save, isSigning } = useContext(EditStatementContext);

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StatementForm />
        </ModalBody>
        <ModalFooter>
          <Button onClick={save}>Save button</Button>
          <Button colorScheme="green" type="submit" form="statement_form" isLoading={isSigning}>
            Sign off button
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditClientStatementModal;
