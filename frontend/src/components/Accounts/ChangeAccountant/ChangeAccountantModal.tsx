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
import { ClientsContext } from "contexts/ClientsContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useContext } from "react";
import { MdSupervisorAccount } from "react-icons/md";
import { IClientDto } from "services/backend/nswagts";

import EditAccountantBtn from "../AccountList/AccountListItemButtons/EditAccountantBtn";
import AddNewAccountantForm from "./AddNewAccountantForm";
import CurrentAccountant from "./CurrentAccountant";

interface Props {
  client: IClientDto;
  onSubmit?: () => Promise<void>;
}

const ChangeAccountantModal: FC<Props> = ({ client, onSubmit }) => {
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchData } = useContext(ClientsContext);

  return (
    <>
      <EditAccountantBtn client={client} cb={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("accountant.editAccountant")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              <Heading size="sm">{t("accounts.accountant")}:</Heading>
              <CurrentAccountant accountant={client.accountant} />
              <Divider />
              <Heading size="md">{t("accountant.addAccountant")}</Heading>
              <AddNewAccountantForm client={client} onSubmit={fetchData} />
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ChangeAccountantModal;
