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
import { AccountantType, IAccountantDto } from "services/backend/nswagts";

interface Props {
  accountant: IAccountantDto;
  cb: () => void;
}

const RemoveAccountantModal: FC<Props> = ({ accountant, cb }) => {
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" variant="outline">
        {accountant.accountantType == AccountantType.Accountant
          ? t("statements.removeAccountant")
          : t("statements.removeConsultant")}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {accountant.accountantType == AccountantType.Accountant
              ? t("statements.removeAccountant")
              : t("statements.removeConsultant")}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {accountant.accountantType == AccountantType.Accountant
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
