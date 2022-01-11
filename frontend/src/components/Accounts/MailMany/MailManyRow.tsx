import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  Tooltip
} from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { Dispatch, FC, useCallback } from "react";
import { BiChevronDown, BiChevronUp, BiX } from "react-icons/bi";
import { AllListActions, ListReducerActionType } from "react-list-reducer";
import { IClientDto } from "services/backend/nswagts";

import AccountItemExpandedPanel from "../AccountList/AccountItemExpandedPanel";

interface Props {
  client: IClientDto;
  dispatchClient: Dispatch<AllListActions<IClientDto>>;
}

const MailManyRow: FC<Props> = ({ client, dispatchClient }) => {
  const { t } = useLocales();
  const { boxBorder } = useColors();

  const removeFromList = useCallback(() => {
    dispatchClient({
      type: ListReducerActionType.Remove,
      data: client.id
    });
  }, [client]);

  return (
    <Flex shadow="sm" p={2} border="1px" borderColor={boxBorder} rounded="md" mb={2} opacity={1}>
      <AccordionItem w="100%" border="none">
        {({ isExpanded }) => (
          <>
            <Flex justifyContent="space-between" pl={3}>
              <HStack spacing={5}>
                <Text>{client.name}</Text>
              </HStack>
              <HStack>
                <Tooltip label="Fjern bruger fra mail-liste">
                  <IconButton
                    icon={<BiX />}
                    aria-label={"Fjern bruger fra liste"}
                    onClick={removeFromList}></IconButton>
                </Tooltip>
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

export default MailManyRow;
