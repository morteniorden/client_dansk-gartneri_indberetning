import { Button, Link, Spinner, Tooltip, useToast } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import router, { useRouter } from "next/router";
import { FC, useCallback, useMemo, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { genStatementClient } from "services/backend/apiClients";
import {
  CreateStatementNoInviteCommand,
  IClientDto,
  StatementStatus
} from "services/backend/nswagts";

interface Props {
  client: IClientDto;
  accountingYear: number;
}

// TODO localize
const EditClientStatementBtn: FC<Props> = ({ client, accountingYear }) => {
  const { t } = useLocales();
  const toast = useToast();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const statement = useMemo(() => {
    return client.statements.find(s => s.accountingYear == accountingYear);
  }, [client.statements, accountingYear]);

  const createThenEdit = useCallback(async () => {
    setIsProcessing(true);
    console.log("createThenEdit");
    try {
      const statementClient = await genStatementClient();
      const statementId = await statementClient.createStatementNoInvite(
        new CreateStatementNoInviteCommand({
          clientId: client.id,
          revisionYear: accountingYear
        })
      );

      router.push(`/statement/${encodeURIComponent(statementId)}`);
    } catch (err) {
      console.error(err);
      // TODO error toast
    }
  }, [client, accountingYear, setIsProcessing, router]);

  return (
    <Tooltip>
      {statement ? (
        <Link href={`/statement/${encodeURIComponent(statement.id)}`}>
          <Button isDisabled={statement.status == StatementStatus.SignedOff}>
            <BiEdit />
          </Button>
        </Link>
      ) : (
        <Button onClick={createThenEdit} isDisabled={isProcessing}>
          {isProcessing ? <Spinner size="sm" /> : <BiEdit />}
        </Button>
      )}
    </Tooltip>
  );
};

export default EditClientStatementBtn;
