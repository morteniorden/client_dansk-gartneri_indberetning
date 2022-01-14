import { Button, Link, Spinner, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { ClientsContext } from "contexts/ClientsContext";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useLocales } from "hooks/useLocales";
import { useSignoffWindow } from "hooks/useSignoffWindow";
import router, { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { genStatementClient } from "services/backend/apiClients";
import {
  CreateStatementNoInviteCommand,
  IClientDto,
  IStatementDto,
  StatementClient,
  StatementInfoDto,
  StatementNoUsersDto,
  StatementStatus,
  UpdateStatementCommand
} from "services/backend/nswagts";
import { logger } from "utils/logger";

import EditClientStatementModal from "../EditClientStatementModal";

interface Props {
  client: IClientDto;
  accountingYear: number;
}

// TODO localize
const EditClientStatementBtn: FC<Props> = ({ client, accountingYear }) => {
  const { t } = useLocales();
  const toast = useToast();
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [_, setIsDirty] = useState(false);

  const [total, setTotal] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { openSignoffWindow } = useSignoffWindow();

  const { fetchData, isFetching } = useContext(ClientsContext);

  const [isProcessing, setIsProcessing] = useState(false);
  const statement = useMemo(() => {
    return client.statements.find(s => s.accountingYear == accountingYear);
  }, [client.statements, accountingYear]);

  const [updatableStatement, setStatement] = useState(
    statement ? statement : new StatementNoUsersDto()
  );

  const [statementInfo, setStatementInfo] = useState<StatementInfoDto>(null);

  const [id, setId] = useState(statement ? statement.id : null);

  const fetchStatement = useCallback(async () => {
    try {
      const statementClient = await genStatementClient();
      const newStatement = await statementClient.getStatement(id);
      setStatement(newStatement.statement);
      setStatementInfo(newStatement.statementInfo);
      await fetchData();
    } catch (err) {
      console.error(err);
      // TODO error toast
    }
  }, [setStatement, setStatementInfo, id]);

  useEffect(() => {
    fetchStatement();
  }, [id]);

  const createThenEdit = useCallback(async () => {
    setIsProcessing(true);
    try {
      const statementClient = await genStatementClient();
      setId(
        await statementClient.createStatementNoInvite(
          new CreateStatementNoInviteCommand({
            clientId: client.id,
            revisionYear: accountingYear
          })
        )
      );

      setIsProcessing(false);
      onOpen();
    } catch (err) {
      console.error(err);
      // TODO error toast
    }
  }, [client, accountingYear, setIsProcessing, router, onOpen, setStatement, setStatementInfo]);

  const edit = useCallback(async () => {
    await fetchStatement();
    onOpen();
  }, [onOpen, setStatement, setStatementInfo]);

  const calcTotal = useCallback(() => {
    if (statement == null) return 0;
    setTotal(
      updatableStatement.s1_boughtPlants +
        updatableStatement.s1_mushrooms +
        updatableStatement.s1_tomatoCucumberHerb +
        updatableStatement.s3_boughtPlants +
        updatableStatement.s3_carrots +
        updatableStatement.s3_onions +
        updatableStatement.s3_other +
        updatableStatement.s3_peas +
        updatableStatement.s4_boughtPlants +
        updatableStatement.s4_cutFlowers +
        updatableStatement.s4_onions +
        updatableStatement.s4_plants +
        updatableStatement.s7_boughtPlants +
        updatableStatement.s7_plants +
        updatableStatement.s8_applesPearsEtc +
        updatableStatement.s8_cherries +
        updatableStatement.s8_currant +
        updatableStatement.s8_otherBerryFruit +
        updatableStatement.s8_otherStoneFruit +
        updatableStatement.s8_packaging +
        updatableStatement.s8_plums +
        updatableStatement.s8_strawberries
    );
  }, [updatableStatement]);

  const onSaveChanges = useCallback(async () => {
    setIsDirty(false);
    setIsSaving(true);
    try {
      const statementClient = await genStatementClient();
      const command = new UpdateStatementCommand({ statementDto: updatableStatement });
      await statementClient.updateStatement(updatableStatement.id, command);
      toast({
        title: t("common.saveSuccessTitle"),
        description: t("common.saveSuccessText"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
      await fetchData();
      onClose();
    } catch (err) {
      logger.warn("statementClient.put Error", err);
      toast({
        title: t("common.saveErrorTitle"),
        description: t("common.saveErrorText"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
    setIsSaving(false);
  }, [updatableStatement]);

  const onSubmit = useCallback(
    async (data: IStatementDto) => {
      setIsSigning(true);
      try {
        const commandData = { ...updatableStatement, ...data };
        const statementClient = await genStatementClient();
        const command = new UpdateStatementCommand({ statementDto: commandData });
        await statementClient.updateStatement(id, command);
        const res = await statementClient.signOffStatement(id);

        openSignoffWindow(
          res.url,
          res.caseFileId,
          id,
          async () => {
            toast({
              title: t("statements.signOffSuccessTitle"),
              description: t("statements.signOffSuccessText"),
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom-left"
            });
            fetchData();
            onClose();
          },
          () => {
            toast({
              title: t("statements.signOffErrorTitle"),
              description: t("statements.signOffErrorText"),
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left"
            });
          }
        );
      } catch (err) {
        logger.warn("statementClient.put Error", err);
        toast({
          title: t("statements.signOffErrorTitle"),
          description: t("statements.signOffErrorText"),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }
      setIsSigning(false);
    },
    [id, updatableStatement]
  );

  return (
    <>
      <EditStatementContext.Provider
        value={{
          statement: updatableStatement,
          setStatement: setStatement,
          save: onSaveChanges,
          isSaving: isSaving,
          isSigning: isSigning,
          submit: onSubmit,
          readonly: false,
          fetchData: fetchData,
          isFetching: isFetching,
          total: total,
          calcTotal: calcTotal,
          isDirty: false,
          setIsDirty: setIsDirty,
          statementInfo: statementInfo
        }}>
        <EditClientStatementModal isOpen={isOpen} onClose={onClose} />
      </EditStatementContext.Provider>
      <Tooltip>
        {statement ? (
          <Button isDisabled={statement.status == StatementStatus.SignedOff} onClick={edit}>
            <BiEdit />
          </Button>
        ) : (
          <Button onClick={createThenEdit} isDisabled={isProcessing}>
            {isProcessing ? <Spinner size="sm" /> : <BiEdit />}
          </Button>
        )}
      </Tooltip>
    </>
  );
};

export default EditClientStatementBtn;
