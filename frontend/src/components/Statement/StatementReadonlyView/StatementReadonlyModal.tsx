import {
  Heading,
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
import ViewStatementBtn from "components/Accounts/AccountList/AccountListItemButtons/ViewStatementBtn";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IAccountDto, IStatementDto } from "services/backend/nswagts";

import StatementForm from "../StatementForm";

interface Props {
  account: IAccountDto;
  statement: IStatementDto;
}

const StatementReadonlyModal: FC<Props> = ({ account, statement }) => {
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ViewStatementBtn cb={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW="1000px">
          <ModalHeader>
            <Stack>
              <Heading size="md">{`${t("statements.editStatementHeading")}, ${t(
                "statements.accountingYear"
              ).toLowerCase()}: ${statement.revisionYear}`}</Heading>
              <Heading size="sm">{account.name}</Heading>
            </Stack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody sx={{ "input:disabled": { opacity: 1, cursor: "text" } }}>
            <EditStatementContext.Provider
              value={{
                statement: statement,
                setStatement: null,
                save: null,
                isSaving: false,
                submit: null,
                disabled: true
              }}>
              <StatementForm />
            </EditStatementContext.Provider>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default StatementReadonlyModal;
