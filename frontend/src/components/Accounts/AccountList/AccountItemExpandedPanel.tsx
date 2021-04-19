import { Divider, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IAccountDto } from "services/backend/nswagts";

interface Props {
  account: IAccountDto;
}

const AccountItemExpandedPanel: FC<Props> = ({ account }) => {
  const { t } = useLocales();

  return (
    <HStack spacing={20}>
      <Stack spacing={0} w="max-content">
        <Divider mb={3} />
        <Text>
          {t("accounts.cvrNumber")}: {account.cvrNumber}
        </Text>
        <Text>
          {t("accounts.email")}: {account.email}
        </Text>
        <Text>
          {t("accounts.tel")}: {account.tel}
        </Text>
        <Text>
          {`${t("accounts.address")}: ${account.address.addressLine1} ${
            account.address.addressLine2
          } ${account.address.addressLine3} ${account.address.addressLine4}`}
        </Text>
      </Stack>
      {account.accountant && (
        <Stack spacing={0} w="max-content">
          <Heading size="xs">{t("accounts.accountant")}</Heading>
          <Text>
            {t("accounts.name")}: {account.accountant.name}
          </Text>
          <Text>
            {t("accounts.email")}: {account.accountant.email}
          </Text>
        </Stack>
      )}
    </HStack>
  );
};
export default AccountItemExpandedPanel;
