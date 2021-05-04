import { IconButton, Spinner, Tooltip, useToast } from "@chakra-ui/react";
import { ClientsContext } from "contexts/ClientsContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useState } from "react";
import { MdMessage } from "react-icons/md";
import { genStatementClient } from "services/backend/apiClients";
import { CreateStatementCommand, IClientDto } from "services/backend/nswagts";

interface Props {
  client: IClientDto;
  accountingYear: number;
}

const InviteBtn: FC<Props> = ({ client, accountingYear }) => {
  const { t } = useLocales();
  const { fetchData } = useContext(ClientsContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useToast();

  const onInvite = useCallback(async () => {
    try {
      setIsProcessing(true);
      const statementclient = await genStatementClient();
      await statementclient.createStatement(
        new CreateStatementCommand({
          clientId: client.id,
          revisionYear: accountingYear
        })
      );
      toast({
        title: t("statements.invitationSentSuccessTitle"),
        description: t("statements.invitationSentSuccessText"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
      setIsProcessing(false);
      fetchData();
    } catch (err) {
      console.error(err);
      toast({
        title: t("statements.invitationSentErrorTitle"),
        description: t("statements.invitationSentErrorTitle"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  }, [client, accountingYear]);

  return (
    <Tooltip label={t("accounts.tooltipInvite")}>
      <IconButton
        aria-label="Invite to fill out statement"
        icon={isProcessing ? <Spinner size="sm" /> : <MdMessage />}
        onClick={e => onInvite()}
        disabled={client.deactivationTime != null}
      />
    </Tooltip>
  );
};
export default InviteBtn;
