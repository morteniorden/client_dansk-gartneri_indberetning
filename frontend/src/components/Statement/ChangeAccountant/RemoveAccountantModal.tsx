import {
  Button,
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
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { AccountantType, IStatementDto } from "services/backend/nswagts";

interface Props {
  statement: IStatementDto;
  cb: () => void;
}

const RemoveAccountantModal: FC<Props> = ({ statement, cb }) => {
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" variant="outline">
        {statement.accountantType == AccountantType.Accountant
          ? t("statements.removeAccountant")
          : t("statements.removeConsultant")}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {statement.accountantType == AccountantType.Accountant
              ? t("statements.removeAccountant")
              : t("statements.removeConsultant")}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {statement.isApproved
                ? statement.accountantType == AccountantType.Accountant
                  ? t("statements.confirmRemoveApprovingAccountant")
                  : t("statements.confirmRemoveApprovingConsultant")
                : statement.accountantType == AccountantType.Accountant
                ? t("statements.confirmRemoveAccountant")
                : t("statements.confirmRemoveConsultant")}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={e => cb()} colorScheme="red" variant="outline">
              {t("actions.remove")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default RemoveAccountantModal;
