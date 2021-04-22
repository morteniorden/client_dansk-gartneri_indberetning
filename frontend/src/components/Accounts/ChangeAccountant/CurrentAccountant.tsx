import {
  Box,
  Button,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useToast
} from "@chakra-ui/react";
import { ClientsContext } from "contexts/ClientsContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useContext } from "react";
import { BiX } from "react-icons/bi";
import { genUserClient } from "services/backend/apiClients";
import { IAccountantDto } from "services/backend/nswagts";

interface Props {
  accountant: IAccountantDto;
}

const CurrentAccountant: FC<Props> = ({ accountant }) => {
  const { t } = useLocales();
  const toast = useToast();
  const { fetchData, isFetching } = useContext(ClientsContext);

  const handleDelete = useCallback(
    async (e: React.MouseEvent) => {
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
    },
    [accountant]
  );

  return (
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
  );
};
export default CurrentAccountant;
