import { Divider, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IClientDto } from "services/backend/nswagts";

interface Props {
  client: IClientDto;
}

const AccountItemExpandedPanel: FC<Props> = ({ client }) => {
  const { t } = useLocales();

  return (
    <HStack spacing={20}>
      <Stack spacing={0} w="max-content">
        <Divider mb={3} />
        <Text>
          {t("accounts.cvrNumber")}: {client.cvrNumber}
        </Text>
        <Text>
          {t("accounts.email")}: {client.email}
        </Text>
        <Text>
          {t("accounts.tel")}: {client.tel}
        </Text>
        <Text>{t("accounts.address")}:</Text>
        <Text>Firmanavn: {client.address.firmName}</Text>
        <Text>Ejernavn: {client.address.ownerName}</Text>
        <Text>Addresse og sted: {client.address.addressAndPlace}</Text>
        <Text>Post nr: {client.address.postalCode}</Text>
        <Text>By: {client.address.city}</Text>
      </Stack>
    </HStack>
  );
};
export default AccountItemExpandedPanel;
/*
<Text>
          {`${t("accounts.address")}: ${client.address.addressLine1} ${
            client.address.addressLine2
          } ${client.address.addressLine3} ${client.address.addressLine4}`}
        </Text>
*/
