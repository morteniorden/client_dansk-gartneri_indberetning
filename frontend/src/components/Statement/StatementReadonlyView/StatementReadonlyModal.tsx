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
import { IStatementDto, IStatementInfoDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import CurrentAccountant from "../ChangeAccountant/CurrentAccountant";
import StatementForm from "../StatementForm";

interface Props {
  id: number;
}

const StatementReadonlyModal: FC<Props> = ({ id }) => {
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [statement, setStatement] = useState<IStatementDto>();
  const [statementInfo, setStatementInfo] = useState<IStatementInfoDto>();

  const fetchData = useCallback(async () => {
    try {
      const statementClient = await genStatementClient();
      const data = await statementClient.getStatement(id);

      if (data != null) {
        setStatement(data.statement);
        setStatementInfo(data.statementInfo);
      }

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
                  <Heading size="sm">{statement.client.name}</Heading>
                </Stack>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody sx={{ "input:disabled": { opacity: 1, cursor: "text" } }}>
                <EditStatementContext.Provider
                  value={{
                    statement,
                    statementInfo,
                    setStatement: null,
                    save: null,
                    isSaving: false,
                    isSigning: false,
                    submit: null,
                    readonly: true,
                    fetchData: null,
                    isFetching: false,
                    total: null,
                    calcTotal: null,
                    isDirty: false,
                    setIsDirty: null
                  }}>
                  <Stack>
                    <CurrentAccountant statement={statement} />
                    <StatementForm />
                  </Stack>
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
