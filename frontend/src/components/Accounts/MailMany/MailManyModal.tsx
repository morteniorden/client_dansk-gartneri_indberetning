import {
  Accordion,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { Dispatch, FC, useState } from "react";
import { AllListActions } from "react-list-reducer";
import { IClientDto } from "services/backend/nswagts";

import { ActiveFilter, SearchFilter } from "../Filters/ClientFilters";
import SearchBar from "../SearchBar";
import MailManyRow from "./MailManyRow";

export interface MailManyProps {
  mailToClients: IClientDto[];
  dispatchMailToClients: Dispatch<AllListActions<IClientDto>>;
  isOpen: boolean;
  onClose: () => void;
  mailReason: "invite" | "reminder";
}

const MailManyModal: FC<MailManyProps> = ({
  mailToClients,
  dispatchMailToClients,
  isOpen,
  onClose,
  mailReason
}) => {
  const [searchString, setSearchString] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent minW="container.md">
        <ModalHeader>{mailReason}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchBar cb={value => setSearchString(value)} />
          <Accordion allowToggle>
            {mailToClients
              .filter(client =>
                [SearchFilter, ActiveFilter].every(f => f.predicate(client, searchString))
              )
              .map(client => (
                <MailManyRow
                  key={client.id}
                  client={client}
                  dispatchClient={dispatchMailToClients}
                />
              ))}
          </Accordion>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3}>
            Send
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MailManyModal;
