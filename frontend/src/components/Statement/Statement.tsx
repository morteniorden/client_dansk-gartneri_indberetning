import { Heading, Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import BasicLayout from "components/Layouts/BasicLayout";
import CurrentAccountant from "components/Statement/ChangeAccountant/CurrentAccountant";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useAuth } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { useSignoffWindow } from "hooks/useSignoffWindow";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { genStatementClient } from "services/backend/apiClients";
import {
  IStatementDto,
  RoleEnum,
  StatementStatus,
  UpdateStatementCommand
} from "services/backend/nswagts";
import { logger } from "utils/logger";

import StatementForm from "./StatementForm";

interface Props {
  id: number;
}

const Statement: FC<Props> = ({ id }) => {
  const { t } = useLocales();
  const router = useRouter();
  const toast = useToast();
  const [statement, setStatement] = useState<IStatementDto>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { activeUser } = useAuth();
  const [total, setTotal] = useState(0);
  const { openSignoffWindow } = useSignoffWindow();
  const [isSigning, setIsSigning] = useState(false);

  const readonly = useMemo(() => statement?.status == StatementStatus.SignedOff, [statement]);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    try {
      const statementClient = await genStatementClient();
      const data = await statementClient.getStatement(id);

      if (data != null) setStatement(data);
      else {
        logger.info("statementClient.get no data");
        router.push("/mystatements");
      }
    } catch (err) {
      logger.warn("statementClient.get Error", err);
      router.push("mystatements");
    }
    setIsFetching(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  const onSaveChanges = useCallback(async () => {
    setIsSaving(true);
    try {
      const statementClient = await genStatementClient();
      const command = new UpdateStatementCommand({ statementDto: statement });
      await statementClient.updateStatement(statement.id, command);
      toast({
        title: t("common.saveSuccessTitle"),
        description: t("common.saveSuccessText"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
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
  }, [statement]);

  const calcTotal = useCallback(() => {
    if (statement == null) return 0;
    setTotal(
      statement.s1_boughtPlants +
        statement.s1_mushrooms +
        statement.s1_tomatoCucumberHerb +
        statement.s3_boughtPlants +
        statement.s3_carrots +
        statement.s3_onions +
        statement.s3_other +
        statement.s3_peas +
        statement.s4_boughtPlants +
        statement.s4_cutFlowers +
        statement.s4_onions +
        statement.s4_plants +
        statement.s7_boughtPlants +
        statement.s7_plants +
        statement.s8_applesPearsEtc +
        statement.s8_cherries +
        statement.s8_currant +
        statement.s8_otherBerryFruit +
        statement.s8_otherStoneFruit +
        statement.s8_packaging +
        statement.s8_plums +
        statement.s8_strawberries
    );
  }, [statement]);

  const onSubmit = useCallback(
    async (data: IStatementDto) => {
      setIsSigning(true);
      try {
        const commandData = { ...statement, ...data };
        const statementClient = await genStatementClient();
        const command = new UpdateStatementCommand({ statementDto: commandData });
        await statementClient.updateStatement(statement.id, command);
        const res = await statementClient.signOffStatement(id);

        openSignoffWindow(
          res.url,
          res.caseFileId,
          statement.id,
          () => {
            toast({
              title: t("statements.signOffSuccessTitle"),
              description: t("statements.signOffSuccessText"),
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom-left"
            });
            router.push("/mystatements");
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
    [id, statement]
  );

  return (
    <>
      {statement && activeUser && (
        <EditStatementContext.Provider
          value={{
            statement: statement,
            setStatement: setStatement,
            save: onSaveChanges,
            isSaving: isSaving,
            isSigning: isSigning,
            submit: onSubmit,
            readonly: readonly,
            fetchData: fetchData,
            isFetching: isFetching,
            total: total,
            calcTotal: calcTotal
          }}>
          <BasicLayout variant="statementHeader" maxW="1500px">
            <Stack spacing={5}>
              <Heading>{t("statements.editStatementHeading")}</Heading>
              <Heading size="sm">{`${t("statements.accountingYear")}: ${
                statement.accountingYear
              }`}</Heading>
              {statement.accountant && activeUser.role == RoleEnum.Client && (
                <CurrentAccountant statement={statement} />
              )}
              <StatementForm />
            </Stack>
          </BasicLayout>
        </EditStatementContext.Provider>
      )}
    </>
  );
};
export default Statement;
