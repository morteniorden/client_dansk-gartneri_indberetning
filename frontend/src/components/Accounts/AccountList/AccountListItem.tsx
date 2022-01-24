import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  HStack,
  IconButton,
  Text,
  Tooltip
} from "@chakra-ui/react";
import StatementReadonlyModal from "components/Statement/StatementReadonlyView/StatementReadonlyModal";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useMemo } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IClientDto, StatementStatus } from "services/backend/nswagts";

import AccountItemExpandedPanel from "./AccountItemExpandedPanel";
import EditClientStatementBtn from "./AccountListItemButtons/EditClientStatementBtn";
import InviteBtn from "./AccountListItemButtons/InviteBtn";
import OptionsBtn from "./AccountListItemButtons/OptionsBtn";
import RemindBtn from "./AccountListItemButtons/RemindBtn";
import StatusBadge from "./StatusBadge";

interface Props {
  client: IClientDto;
  accountingYear: number;
}

const AccountListItem: FC<Props> = ({ client, accountingYear }) => {
  const { t } = useLocales();
  const { boxBorder } = useColors();

  const statement = useMemo(() => {
    return client.statements.find(s => s.accountingYear == accountingYear);
  }, [client.statements, accountingYear]);

  return (
    <Flex
      shadow="sm"
      p={2}
      border="1px"
      borderColor={boxBorder}
      rounded="md"
      mb={2}
      opacity={client.deactivationTime == null ? "1" : "0.5"}>
      <AccordionItem w="100%" border="none">
        {({ isExpanded }) => (
          <>
            <Flex justifyContent="space-between" pl={3}>
              <HStack spacing={5}>
                <Text>
                  {client.deactivationTime == null
                    ? client.name
                    : `${client.name} — (${t("accounts.deactivated")})`}
                </Text>
              </HStack>
              <HStack>
                <StatusBadge client={client} accountingYear={accountingYear} />
                <EditClientStatementBtn client={client} accountingYear={accountingYear} />
                {!statement && <InviteBtn client={client} accountingYear={accountingYear} />}
                {statement && statement.status != StatementStatus.SignedOff && (
                  <RemindBtn client={client} />
                )}
                {statement && statement.status == StatementStatus.SignedOff && (
                  <StatementReadonlyModal id={statement.id} />
                )}
                <OptionsBtn client={client} statement={statement} />
                <Tooltip label={isExpanded ? "Skjul info" : "Vis info"}>
                  <AccordionButton
                    as={IconButton}
                    icon={isExpanded ? <BiChevronUp /> : <BiChevronDown />}
                    w={0}
                    p={0}></AccordionButton>
                </Tooltip>
              </HStack>
            </Flex>
            <AccordionPanel p={3}>
              <AccountItemExpandedPanel client={client} />
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Flex>
  );
};
export default AccountListItem;
