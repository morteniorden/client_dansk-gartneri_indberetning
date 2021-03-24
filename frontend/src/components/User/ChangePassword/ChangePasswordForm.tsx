import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast
} from "@chakra-ui/react";
import { useAuth } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { pwValidationResult, usePasswordValidation } from "hooks/usePasswordValidation";
import { FC, useCallback, useState } from "react";
import { genUserClient } from "services/backend/apiClients";
import { UpdatePasswordCommand } from "services/backend/nswagts";

interface Props {
  onSubmit?: (success: boolean) => void;
}

const ChangePasswordForm: FC<Props> = ({ onSubmit }) => {
  const { activeUser } = useAuth();
  const { t } = useLocales();
  const { validatePassword } = usePasswordValidation();
  const toast = useToast();

  const [password, setPassword] = useState<string>("");
  const [passwordRep, setPasswordRep] = useState<string>("");
  const [validationResult, setValidationResult] = useState<pwValidationResult>({
    isValid: true,
    repetitionValid: true,
    errors: []
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const res = validatePassword(password, passwordRep);
      setValidationResult(res);
      if (!res.isValid || !res.repetitionValid) return;
      const userClient = await genUserClient();
      try {
        await userClient.updatePassword(
          new UpdatePasswordCommand({
            newPassword: password
          })
        );
        toast({
          title: t("password.changeSuccessTitle"),
          description: t("password.changeSuccessText"),
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
        onSubmit(true);
      } catch {
        toast({
          title: t("password.changeFailTitle"),
          description: t("password.changeFailText"),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }
    },
    [password, passwordRep, activeUser]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <FormControl id="password" isRequired isInvalid={!validationResult.isValid}>
          <FormLabel htmlFor="password">{t("password.password")}</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            maxW="500px"></Input>
        </FormControl>
        <FormControl id="passwordRepeat" isRequired isInvalid={!validationResult.repetitionValid}>
          <FormLabel htmlFor="passwordRepeat">{t("password.repeatPassword")}</FormLabel>
          <Input
            type="password"
            value={passwordRep}
            onChange={e => setPasswordRep(e.target.value)}
            maxW="500px"></Input>
        </FormControl>
        <FormControl isInvalid={!validationResult.isValid || !validationResult.repetitionValid}>
          {validationResult.errors.map((err, i) => (
            <FormErrorMessage key={i}>{err.errorMsg}</FormErrorMessage>
          ))}
          {!validationResult.repetitionValid && (
            <FormErrorMessage>{t("password.dontMatch")}</FormErrorMessage>
          )}
        </FormControl>
      </Stack>
      <Flex justifyContent="flex-end" w="100%" mt={5}>
        <Button colorScheme="green" type="submit">
          {t("actions.update")}
        </Button>
      </Flex>
    </form>
  );
};
export default ChangePasswordForm;
