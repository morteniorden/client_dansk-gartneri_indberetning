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
import { FC, useCallback, useEffect, useState } from "react";
import { genStatementClient } from "services/backend/apiClients";
import { IClientDto, IStatementDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import CurrentAccountant from "../ChangeAccountant/CurrentAccountant";
import StatementForm from "../StatementForm";

interface Props {
  client: IClientDto;
  id: number;
}

const StatementReadonlyModal: FC<Props> = ({ client, id }) => {
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [statement, setStatement] = useState<IStatementDto>();

  const fetchData = useCallback(async () => {
    try {
      const statementClient = await genStatementClient();
      const data = await statementClient.getStatement(id);

      if (data?.statement != null) setStatement(data.statement);

      if (data == null) {
        logger.info("statementClient.get no data");
      }
    } catch (err) {
      logger.warn("statementClient.get Error", err);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <ViewStatementBtn cb={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW="1000px">
          {statement && (
            <>
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
                    total: null,
                    calcTotal: null
                  }}>
                  <CurrentAccountant statement={statement} />
                  <StatementForm />
                </EditStatementContext.Provider>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default StatementReadonlyModal;
