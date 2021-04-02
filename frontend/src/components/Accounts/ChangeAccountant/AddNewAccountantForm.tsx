import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  useToast
} from "@chakra-ui/react";
import { AccountsContext } from "contexts/AccountsContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { genUserClient } from "services/backend/apiClients";
import {
  CreateAccountantCommand,
  IAccountDto,
  RoleEnum,
  UserAccountIdDto
} from "services/backend/nswagts";

interface Props {
  account: IAccountDto;
  onSubmit?: (success: boolean) => void;
}

const AddNewAccountantForm: FC<Props> = ({ account, onSubmit }) => {
  const { t } = useLocales();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { accounts } = useContext(AccountsContext);
  const toast = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      const accountantDto = new UserAccountIdDto({
        id: 1,
        accountId: account.id,
        name: name,
        email: email,
        role: RoleEnum.Accountant
      });
      accountantDto.accountId = account.id;

      try {
        const userClient = await genUserClient();
        const command = new CreateAccountantCommand({
          accountantDto: accountantDto
        });
        await userClient.createAndAddAccountant(command);
        toast({
          title: t("accountant.addSuccessTitle"),
          description: t("accountant.addSuccessText"),
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
        onSubmit(true);
      } catch {
        if (accounts.some(a => a.accountant?.email == email)) {
          toast({
            title: t("accountant.alreadyAssignedTitle"),
            description: t("accountant.alreadyAssignedText"),
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left"
          });
        } else {
          toast({
            title: t("accountant.addErrorTitle"),
            description: t("accountant.addErrorText"),
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left"
          });
        }
      }
      setLoading(false);
    },
    [name, email, accounts]
  );

  useEffect(() => {
    setFormDisabled(account.accountant != null || loading);
  }, [loading, account.accountant]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <FormControl id="name" isRequired isDisabled={formDisabled}>
          <FormLabel htmlFor="name">{t("accounts.name")}</FormLabel>
          <Input value={name} onChange={e => setName(e.target.value)}></Input>
        </FormControl>
        <FormControl id="email" isRequired isDisabled={formDisabled}>
          <FormLabel htmlFor="email">{t("accounts.email")}</FormLabel>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)}></Input>
        </FormControl>
        <Flex justifyContent="flex-end" w="100%" mt={5}>
          <Button colorScheme="green" type="submit" disabled={formDisabled}>
            {loading ? <Spinner /> : t("common.add")}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};
export default AddNewAccountantForm;
