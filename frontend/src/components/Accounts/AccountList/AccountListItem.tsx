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
import { IAccountDto, StatementStatus } from "services/backend/nswagts";

import ChangeAccountantModal from "../ChangeAccountant/ChangeAccountantModal";
import AccountItemExpandedPanel from "./AccountItemExpandedPanel";
import InviteBtn from "./AccountListItemButtons/InviteBtn";
import ViewStatementBtn from "./AccountListItemButtons/ViewStatementBtn";
import StatusBadge from "./StatusBadge";

interface Props {
  account: IAccountDto;
  accountingYear: number;
}

const AccountListItem: FC<Props> = ({ account, accountingYear }) => {
  const { t } = useLocales();
  const { boxBorder } = useColors();

  const statement = useMemo(() => {
    return account.statements.find(s => s.revisionYear == accountingYear);
  }, [account.statements, accountingYear]);

  return (
    <Flex shadow="sm" p={2} border="1px" borderColor={boxBorder} rounded="md" mb={2}>
      <AccordionItem w="100%" border="none">
        {({ isExpanded }) => (
          <>
            <Flex justifyContent="space-between" pl={3}>
              <HStack spacing={5}>
                <Text>{account.name}</Text>
              </HStack>
              <HStack>
                <StatusBadge account={account} accountingYear={accountingYear} />
                {!statement && <InviteBtn account={account} accountingYear={accountingYear} />}
                {statement && statement.status != StatementStatus.SignedOff && (
                  <ViewStatementBtn disabled={true} />
                )}
                {statement && statement.status == StatementStatus.SignedOff && (
                  <StatementReadonlyModal statement={statement} account={account} />
                )}
                <ChangeAccountantModal account={account} />
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
              <AccountItemExpandedPanel account={account} />
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Flex>
  );
};
export default AccountListItem;
