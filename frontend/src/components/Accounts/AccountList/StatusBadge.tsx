import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useMemo } from "react";
import { IAccountDto, StatementStatus } from "services/backend/nswagts";

interface Props {
  account: IAccountDto;
  accountingYear: number;
}

const StatusBadge: FC<Props> = ({ account, accountingYear }) => {
  const { t } = useLocales();
  const {
    statusNotSent,
    statusIsSent,
    statusIsEdited,
    statusIsSigned,
    statusTextColor
  } = useColors();
  const { colorMode } = useColorMode();
  const locales = useLocales();

  const genStatus: { msg: string; color: string } = useMemo(() => {
    const statement = account.statements.find(s => s.revisionYear == accountingYear);
    if (statement) {
      switch (statement.status) {
        case StatementStatus.InvitedNotEdited:
          return { msg: t("statements.statusInvited"), color: statusIsSent };
        case StatementStatus.InvitedAndEdited:
          return { msg: t("statements.statusEdited"), color: statusIsEdited };
        case StatementStatus.SignedOff:
          return { msg: t("statements.statusSignedOff"), color: statusIsSigned };
      }
    } else {
      return { msg: t("statements.statusNotInvited"), color: statusNotSent };
    }
  }, [account.statements, accountingYear, colorMode, locales]);

  return (
    <Flex
      rounded="md"
      background={genStatus.color}
      h="40px"
      w="120px"
      p="10px"
      justifyContent="center"
      alignItems="center">
      <Text fontSize="xs" fontWeight="bold" textColor={statusTextColor}>
        {genStatus.msg.toUpperCase()}
      </Text>
    </Flex>
  );
};
export default StatusBadge;
