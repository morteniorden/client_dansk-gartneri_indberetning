import {
  Accordion,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { Dispatch, FC, useCallback, useEffect, useState } from "react";
import { AllListActions } from "react-list-reducer";
import { genStatementClient } from "services/backend/apiClients";
import {
  CreateStatementsCommand,
  IClientDto,
  SendRemindAllUsersCommand
} from "services/backend/nswagts";

import { SearchFilter } from "../Filters/ClientFilters";
import SearchBar from "../SearchBar";
import MailManyRow from "./MailManyRow";

export interface MailManyProps {
  mailToClients: IClientDto[];
  dispatchMailToClients: Dispatch<AllListActions<IClientDto>>;
  isOpen: boolean;
  onClose: () => void;
  mailReason: "invite" | "reminder";
  revisionYear: number;
  fetchData: () => Promise<void>;
}

export const enum MailManyStatus {
  noUsers = 0,
  choosingUsers = 1,
  sendingMails = 2,
  mailsSent = 3
}

const MailManyModal: FC<MailManyProps> = ({
  mailToClients,
  dispatchMailToClients,
  isOpen,
  onClose,
  mailReason,
  revisionYear,
  fetchData
}) => {
  const { t } = useLocales();
  const [searchString, setSearchString] = useState("");
  const [status, setStatus] = useState<MailManyStatus>(MailManyStatus.choosingUsers);
  const toast = useToast();

  useEffect(() => {
    if (mailToClients.length == 0) setStatus(MailManyStatus.noUsers);
    if (mailToClients.length > 0) setStatus(MailManyStatus.choosingUsers);
  }, [mailToClients, setStatus]);

  const sendMail = useCallback(async () => {
    setStatus(MailManyStatus.sendingMails);
    try {
      const statementClient = await genStatementClient();
      const clientIds = mailToClients.map(client => client.id);
      if (mailReason == "invite") {
        await statementClient.createStatements(
          new CreateStatementsCommand({
            clientIds,
            revisionYear
          })
        );
        toast({
          title: t("mailMany.inviteSentSuccessTitle"),
          description: t("mailMany.inviteSentSuccessText"),
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      } else if (mailReason == "reminder") {
        await statementClient.sendRemindAllUsersEmail(
          new SendRemindAllUsersCommand({
            clientIds
          })
        );
        toast({
          title: t("mailMany.reminderSentSuccessTitle"),
          description: t("mailMany.reminderSentSuccessText"),
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }
    } catch (err) {
      if (mailReason == "invite") {
        toast({
          title: t("mailMany.inviteSentErrorTitle"),
          description: t("mailMany.inviteSentErrorText"),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      } else if (mailReason == "reminder") {
        toast({
          title: t("mailMany.reminderSentErrorTitle"),
          description: t("mailMany.reminderSentErrorText"),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }
      console.error(err);
    }
    setStatus(MailManyStatus.mailsSent);
  }, [mailToClients, setStatus, revisionYear, mailReason, fetchData]);

  const createButtons = useCallback(() => {
    switch (status) {
      case MailManyStatus.choosingUsers:
      case MailManyStatus.sendingMails:
        return (
          <>
            <Button
              colorScheme="green"
              mr={3}
              onClick={sendMail}
              isDisabled={status >= MailManyStatus.sendingMails}>
              {status == MailManyStatus.choosingUsers ? <Text>Send</Text> : <Spinner />}
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              {t("actions.back")}
            </Button>
          </>
        );
      case MailManyStatus.noUsers:
      case MailManyStatus.mailsSent:
        return (
          <Button
            colorScheme="green"
            onClick={() => {
              if (status == MailManyStatus.mailsSent) fetchData();
              onClose();
            }}>
            {t("actions.back")}
          </Button>
        );
    }
  }, [status, sendMail, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent minW="container.md">
        <ModalHeader>{t(`mailMany.${mailReason}`)}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchBar cb={value => setSearchString(value)} />
          <Accordion allowToggle>
            {mailToClients
              .filter(client => SearchFilter.predicate(client, searchString))
              .map(client => (
                <MailManyRow
                  key={client.id}
                  client={client}
                  dispatchClient={dispatchMailToClients}
                  status={status}
                />
              ))}
          </Accordion>
        </ModalBody>

        <ModalFooter>{createButtons()}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MailManyModal;
