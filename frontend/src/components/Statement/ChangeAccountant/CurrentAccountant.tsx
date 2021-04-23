import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useToast
} from "@chakra-ui/react";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useContext, useEffect } from "react";
import { BiX } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { genUserClient } from "services/backend/apiClients";
import { AccountantType, IAccountantDto } from "services/backend/nswagts";

import RemoveAccountantModal from "./RemoveAccountantModal";

interface Props {
  accountant: IAccountantDto;
}

const CurrentAccountant: FC<Props> = ({ accountant }) => {
  const { t } = useLocales();
  const toast = useToast();
  const { fetchData, isFetching } = useContext(EditStatementContext);
  const { boxBorder } = useColors();

  const handleDelete = useCallback(async () => {
    try {
      const userClient = await genUserClient();
      await userClient.deactivateUser(accountant.id);
      toast({
        title: t("accountant.deleteSuccessTitle"),
        description: t("accountant.deleteSuccessText"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
      await fetchData();
    } catch {
      toast({
        title: t("accountant.deleteErrorTitle"),
        description: t("accountant.deleteErrorText"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  }, [accountant]);

  useEffect(() => console.log(accountant), [accountant]);

  return (
    <Skeleton isLoaded={!isFetching}>
      <Flex
        shadow="sm"
        p={5}
        pl={10}
        pr={10}
        border="1px"
        borderColor={boxBorder}
        rounded="md"
        background="orange.100"
        justifyContent="space-between"
        alignItems="center">
        <HStack spacing="5">
          <BsFillPeopleFill size="40px" />
          <Stack spacing={0}>
            <Heading size="sm" colorScheme="green">
              {accountant.accountantType == AccountantType.Accountant
                ? "Anmodning om godkendelse sendt til revisor"
                : "Anmodning om godkendelse sendt til uvildig konsulent"}
            </Heading>
            <Text fontSize="sm">{`Anmodning sendt til: ${accountant.email}`}</Text>
            <Text fontSize="sm">Revisor har endnu ikke godkendt skemaet</Text>
          </Stack>
        </HStack>
        <RemoveAccountantModal accountant={accountant} cb={handleDelete} />
      </Flex>
    </Skeleton>
  );
};
export default CurrentAccountant;
/*
Revisor anmodet om godkendelse

<Skeleton isLoaded={!isFetching}>
      <Stack>
        {accountant ? (
          <>
            <Table>
              <Tbody>
                <Tr>
                  <Th>{t("accounts.name")}:</Th>
                  <Td>{accountant.name}</Td>
                </Tr>
                <Tr>
                  <Th>{t("accounts.email")}:</Th>
                  <Td>{accountant.email}</Td>
                </Tr>
              </Tbody>
            </Table>
            <Box>
              <Button
                size="sm"
                colorScheme="red"
                variant="outline"
                rounded="full"
                leftIcon={<BiX />}
                onClick={handleDelete}>
                {t("actions.delete")}
              </Button>
            </Box>
          </>
        ) : (
          <Text>{t("accountant.noAccountant")}</Text>
        )}
      </Stack>
    </Skeleton>
*/
