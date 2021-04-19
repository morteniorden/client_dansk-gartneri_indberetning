import {
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
  Tooltip,
  useDisclosure
} from "@chakra-ui/react";
import { AccountsContext } from "contexts/AccountsContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useContext } from "react";
import { MdSupervisorAccount } from "react-icons/md";
import { IAccountDto } from "services/backend/nswagts";

import EditAccountantBtn from "../AccountList/AccountListItemButtons/EditAccountantBtn";
import AddNewAccountantForm from "./AddNewAccountantForm";
import CurrentAccountant from "./CurrentAccountant";

interface Props {
  account: IAccountDto;
  onSubmit?: () => Promise<void>;
}

const ChangeAccountantModal: FC<Props> = ({ account, onSubmit }) => {
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchData } = useContext(AccountsContext);

  return (
    <>
      <EditAccountantBtn account={account} cb={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("accountant.editAccountant")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              <Heading size="sm">{t("accounts.accountant")}:</Heading>
              <CurrentAccountant accountant={account.accountant} />
              <Divider />
              <Heading size="md">{t("accountant.addAccountant")}</Heading>
              <AddNewAccountantForm account={account} onSubmit={fetchData} />
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ChangeAccountantModal;
