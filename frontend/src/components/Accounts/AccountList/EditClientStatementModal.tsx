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
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useContext } from "react";
import { IClientDto } from "services/backend/nswagts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  client: IClientDto;
  accountingYear: number;
}

const EditClientStatementModal: FC<Props> = ({ isOpen, onClose, client, accountingYear }) => {
  const { save, isSigning } = useContext(EditStatementContext);
  const { buttonFont } = useColors();
  const { t } = useLocales();

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="4xl">
          {t("statements.editStatementForHeading", { name: client.name })}
        </ModalHeader>
        <ModalHeader fontSize="sm">{`${t(
          "statements.accountingYear"
        )}: ${accountingYear}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StatementForm />
        </ModalBody>
        <ModalFooter>
          <Button onClick={save} colorScheme="green" mr={2}>
            {t("actions.saveChanges")}
          </Button>
          <Button
            colorScheme="blue"
            textColor={buttonFont}
            type="submit"
            form="statement_form"
            isLoading={isSigning}>
            {t("statements.signOff")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditClientStatementModal;
