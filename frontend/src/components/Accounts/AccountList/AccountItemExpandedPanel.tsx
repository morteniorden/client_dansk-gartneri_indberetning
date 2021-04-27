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
        <Text>
          {`${t("accounts.address")}: ${client.address.addressLine1} ${
            client.address.addressLine2
          } ${client.address.addressLine3} ${client.address.addressLine4}`}
        </Text>
      </Stack>
    </HStack>
  );
};
export default AccountItemExpandedPanel;
/*
 {client.accountant && (
        <Stack spacing={0} w="max-content">
          <Heading size="xs">{t("accounts.accountant")}</Heading>
          <Text>
            {t("accounts.name")}: {client.accountant.name}
          </Text>
          <Text>
            {t("accounts.email")}: {client.accountant.email}
          </Text>
        </Stack>
      )}
*/
