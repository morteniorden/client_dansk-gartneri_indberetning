import {
  Button,
  Divider,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useDisclosure
} from "@chakra-ui/react";
import { ClientsContext } from "contexts/ClientsContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useContext } from "react";
import { MdSupervisorAccount } from "react-icons/md";
import { IClientDto, IStatementDto } from "services/backend/nswagts";

import EditAccountantBtn from "../../Accounts/AccountList/AccountListItemButtons/EditAccountantBtn";
import AddNewAccountantForm from "./AddNewAccountantForm";
import CurrentAccountant from "./CurrentAccountant";

interface Props {
  statement: IStatementDto;
  onSubmit?: () => Promise<void>;
}

const ChangeAccountantModal: FC<Props> = ({ statement, onSubmit }) => {
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button rounded="full" onClick={onOpen}>
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
export default ChangeAccountantModal;
/*
              <Heading size="sm">{t("accounts.accountant")}:</Heading>
              <CurrentAccountant accountant={statement.accountant} />
              <Divider />
              <Heading size="md">{t("accountant.addAccountant")}</Heading>
*/
