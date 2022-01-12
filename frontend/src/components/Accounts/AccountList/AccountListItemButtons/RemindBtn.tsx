import { IconButton, Spinner, Tooltip, useToast } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { MdMessage } from "react-icons/md";
import { genStatementClient } from "services/backend/apiClients";
import { IClientDto, SendRemindUserCommand } from "services/backend/nswagts";

interface Props {
  client: IClientDto;
}
const RemindBtn: FC<Props> = ({ client }) => {
  const { t } = useLocales();
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useToast();

  const sendReminder = useCallback(async () => {
    try {
      setIsProcessing(true);
      const statementClient = await genStatementClient();
      await statementClient.sendRemindUserEmail(
        new SendRemindUserCommand({
          email: client.email
        })
      );
      toast({
        title: t("reminder.sentSuccessTitle"),
        description: t("reminder.sentSuccessText"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
      setIsProcessing(false);
    } catch (err) {
      console.error(err);
      toast({
        title: t("reminder.sentErrorTitle"),
        description: t("reminder.sentErrorText"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  }, [client]);

  return (
    <Tooltip label={t("reminder.tooltip")}>
      <IconButton
        aria-label={"Remind user to fill out statement"}
        icon={isProcessing ? <Spinner size="sm" /> : <MdMessage />}
        onClick={sendReminder}
        disabled={client.deactivationTime != null}
      />
    </Tooltip>
  );
};

export default RemindBtn;
