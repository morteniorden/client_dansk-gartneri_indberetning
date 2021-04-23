import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IStatementDto } from "services/backend/nswagts";

import AddNewAccountantForm from "./AddNewAccountantForm";

interface Props {
  statement: IStatementDto;
  onSubmit?: () => Promise<void>;
}

const RemoveAccountantModal: FC<Props> = ({ statement, onSubmit }) => {
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="gray" disabled={statement.accountant != null}>
        {t("statements.sendToAccountant")}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("statements.sendToAccountant")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5} justifyContent="center">
              <Text>{t("statements.sendToAccountantText1")}</Text>
              <Text>{t("statements.sendToAccountantText2")}</Text>
              <AddNewAccountantForm statement={statement} />
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default RemoveAccountantModal;
