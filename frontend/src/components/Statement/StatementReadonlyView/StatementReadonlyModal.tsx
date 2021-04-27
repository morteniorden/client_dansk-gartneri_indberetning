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
import { IClientDto, IStatementDto } from "services/backend/nswagts";

import StatementForm from "../StatementForm";

interface Props {
  client: IClientDto;
  statement: IStatementDto;
}

const StatementReadonlyModal: FC<Props> = ({ client, statement }) => {
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
              ).toLowerCase()}: ${statement.accountingYear}`}</Heading>
              <Heading size="sm">{client.name}</Heading>
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
                readonly: true,
                fetchData: null,
                isFetching: false,
                disabled: true,
                statementInfo: null
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
