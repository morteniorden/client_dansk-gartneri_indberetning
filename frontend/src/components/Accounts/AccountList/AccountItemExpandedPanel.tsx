import { HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IClientDto } from "services/backend/nswagts";

interface Props {
  client: IClientDto;
}

const AccountItemExpandedPanel: FC<Props> = ({ client }) => {
  const { t } = useLocales();

  return (
    <HStack spacing={20} w="max-content" alignItems="top">
      <Stack spacing={0}>
        <Text>
          {t("accounts.cvrNumber")}: {client.cvrNumber}
        </Text>
        <Text>
          {t("accounts.email")}: {client.email}
        </Text>
        <Text>
          {t("accounts.tel")}: {client.tel}
        </Text>
      </Stack>
      <Stack spacing={0}>
        <Text fontWeight="bold">{t("accounts.address")}</Text>
        <SimpleGrid columns={2}>
          <Text>{t("accounts.firmName")}:</Text>
          <Text>{client.address.firmName}</Text>
          <Text>{t("accounts.ownerName")}:</Text>
          <Text>{client.address.ownerName}</Text>
          <Text>{t("accounts.addressAndPlace")}:</Text>
          <Text>{client.address.addressAndPlace}</Text>
          <Text>{t("accounts.postalCode")}:</Text>
          <Text>{client.address.postalCode}</Text>
          <Text>{t("accounts.city")}:</Text>
          <Text>{client.address.city}</Text>
        </SimpleGrid>
      </Stack>
    </HStack>
  );
};
export default AccountItemExpandedPanel;
