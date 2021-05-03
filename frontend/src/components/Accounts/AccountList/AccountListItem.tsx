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
import InviteBtn from "./AccountListItemButtons/InviteBtn";
import ViewStatementBtn from "./AccountListItemButtons/ViewStatementBtn";
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
    <Flex shadow="sm" p={2} border="1px" borderColor={boxBorder} rounded="md" mb={2}>
      <AccordionItem w="100%" border="none">
        {({ isExpanded }) => (
          <>
            <Flex justifyContent="space-between" pl={3}>
              <HStack spacing={5}>
                <Text>{client.name}</Text>
              </HStack>
              <HStack>
                <StatusBadge client={client} accountingYear={accountingYear} />
                {!statement && <InviteBtn client={client} accountingYear={accountingYear} />}
                {statement && statement.status != StatementStatus.SignedOff && (
                  <ViewStatementBtn disabled={true} />
                )}
                {statement && statement.status == StatementStatus.SignedOff && (
                  <StatementReadonlyModal id={statement.id} />
                )}
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
