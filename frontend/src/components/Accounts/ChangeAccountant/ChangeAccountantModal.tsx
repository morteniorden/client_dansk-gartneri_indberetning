import {
  Divider,
  Heading,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import { AccountsContext } from "contexts/AccountsContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext } from "react";
import { IAccountDto } from "services/backend/nswagts";

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
      <MenuItem onClick={onOpen}>{t("accountant.editAccountant")}</MenuItem>

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
