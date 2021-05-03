import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { pwValidationResult, usePasswordValidation } from "hooks/usePasswordValidation";
import { FC, useCallback, useState } from "react";
import { genUserClient } from "services/backend/apiClients";
import { CreateAdminCommand, CreateAdminDto, ICreateAdminDto } from "services/backend/nswagts";

interface Props {
  onSubmit: () => void;
}

const AddAdminForm: FC<Props> = ({ onSubmit }) => {
  const { t } = useLocales();
  const { validatePassword } = usePasswordValidation();
  const toast = useToast();

  const [localForm, setLocalForm] = useState<ICreateAdminDto>(
    new CreateAdminDto({
      name: "",
      email: "",
      password: ""
    })
  );
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [validationResult, setValidationResult] = useState<pwValidationResult>({
    isValid: true,
    repetitionValid: true,
    errors: []
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = validatePassword(localForm.password, repeatPassword);
        setValidationResult(res);
        if (!res.isValid || !res.repetitionValid) return;

        const userClient = await genUserClient();
        await userClient.createAdmin(
          new CreateAdminCommand({
            admin: localForm
          })
        );
        onSubmit();
        toast({
          title: t("admins.addAdminSuccessTitle"),
          description: t("admins.addAdminSuccessText"),
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      } catch {
        toast({
          title: t("admins.addAdminErrorTitle"),
          description: t("admins.addAdminErrorText"),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }
    },
    [localForm, repeatPassword]
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="name" isRequired>
        <FormLabel htmlFor="name">{t("accounts.name")}</FormLabel>
        <Input
          value={localForm.name}
          onChange={e => setLocalForm({ ...localForm, ...{ name: e.target.value } })}></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">{t("accounts.email")}</FormLabel>
        <Input
          type="email"
          value={localForm.email}
          onChange={e => setLocalForm({ ...localForm, ...{ email: e.target.value } })}></Input>
      </FormControl>
      <FormControl id="password" isRequired isInvalid={!validationResult.isValid}>
        <FormLabel htmlFor="password">{t("password.password")}</FormLabel>
        <Input
          type="password"
          value={localForm.password}
          onChange={e => setLocalForm({ ...localForm, ...{ password: e.target.value } })}></Input>
      </FormControl>
      <FormControl id="passwordRepeat" isRequired isInvalid={!validationResult.repetitionValid}>
        <FormLabel htmlFor="passwordRepeat">{t("password.repeatPassword")}</FormLabel>
        <Input
          type="password"
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}></Input>
      </FormControl>
      <FormControl isInvalid={!validationResult.isValid || !validationResult.repetitionValid}>
        {validationResult.errors.map((err, i) => (
          <FormErrorMessage key={i}>{err.errorMsg}</FormErrorMessage>
        ))}
        {!validationResult.repetitionValid && (
          <FormErrorMessage>{t("password.dontMatch")}</FormErrorMessage>
        )}
      </FormControl>
      <Flex justifyContent="flex-end" w="100%" mt={5}>
        <Button colorScheme="green" type="submit">
          {t("common.add")}
        </Button>
      </Flex>
    </form>
  );
};
export default AddAdminForm;
