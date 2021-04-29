import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  useToast
} from "@chakra-ui/react";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { genUserClient } from "services/backend/apiClients";
import { AccountantType, CreateAccountantCommand, IStatementDto } from "services/backend/nswagts";

interface Props {
  statement: IStatementDto;
  onSubmit?: (success: boolean) => void;
}

const AddNewAccountantForm: FC<Props> = ({ statement, onSubmit }) => {
  const { t } = useLocales();
  const [name, setName] = useState("");
  const [accountantType, setAccountantType] = useState<AccountantType>(AccountantType.Accountant);
  const [email, setEmail] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fetchData } = useContext(EditStatementContext);
  const toast = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      // const accountantDto = new AccountantDto({
      //   id: 1,
      //   name: name,
      //   email: email,
      //   role: RoleEnum.Accountant
      // });
      // //I don't know why, but I have to set accountantType here. If I do it when creating the dto, it is undefined afterwards.
      // accountantDto.accountantType = accountantType;
      try {
        const userClient = await genUserClient();
        const command = new CreateAccountantCommand({
          dto: {
            statementId: statement.id,
            email: email,
            accountantType: accountantType
          }
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
        fetchData();
        onSubmit(true);
      } catch {
        toast({
          title: t("accountant.addErrorTitle"),
          description: t("accountant.addErrorText"),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }
      setLoading(false);
    },
    [name, email, statement, accountantType]
  );

  useEffect(() => {
    setFormDisabled(statement.accountant != null || loading);
  }, [loading, statement.accountant]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5} maxW="sm">
        <FormControl as="fieldset" isRequired isDisabled={formDisabled}>
          <FormLabel as="legend">{t("accountant.accountantType")}</FormLabel>
          <RadioGroup
            onChange={value =>
              setAccountantType(
                value == "0" ? AccountantType.Accountant : AccountantType.Consultant
              )
            }>
            <Stack>
              <Radio value="0">{t("accountant.accountant")}</Radio>
              <Radio value="1">{t("accountant.consultant")}</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl id="email" isRequired isDisabled={formDisabled}>
          <FormLabel htmlFor="email">{t("accounts.email")}</FormLabel>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)}></Input>
        </FormControl>
        <Flex w="100%" mt={5}>
          <Button colorScheme="green" type="submit" disabled={formDisabled}>
            {loading ? <Spinner /> : t("actions.sendRequest")}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};
export default AddNewAccountantForm;
/*
        <FormControl id="name" isRequired isDisabled={formDisabled}>
          <FormLabel htmlFor="name">{t("accounts.name")}</FormLabel>
          <Input value={name} onChange={e => setName(e.target.value)}></Input>
        </FormControl>
*/
