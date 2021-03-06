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
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { pwValidationResult, usePasswordValidation } from "hooks/usePasswordValidation";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useState } from "react";
import { genUserClient } from "services/backend/apiClients";
import { ResetPasswordCommand, UpdatePasswordCommand } from "services/backend/nswagts";

interface Props {
  onSubmit: (success: boolean) => void;
}

const ChangePasswordForm: FC<Props> = ({ onSubmit }) => {
  const router = useRouter();
  const { activeUser, loginWithToken } = useContext(AuthContext);
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

      try {
        const userClient = await genUserClient();
        const token = router.query.token as string;
        if (token && !activeUser) {
          const userTokenDto = await userClient.resetPassword(
            new ResetPasswordCommand({
              ssoToken: token,
              newPassword: password
            })
          );
          loginWithToken(userTokenDto.token);
        } else if (activeUser) {
          await userClient.updatePassword(
            new UpdatePasswordCommand({
              newPassword: password
            })
          );
        }

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
    [password, passwordRep, activeUser, router]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <FormControl id="password" isRequired isInvalid={!validationResult.isValid}>
          <FormLabel htmlFor="password">{t("password.newPassword")}</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            maxW="500px"></Input>
        </FormControl>
        <FormControl id="passwordRepeat" isRequired isInvalid={!validationResult.repetitionValid}>
          <FormLabel htmlFor="passwordRepeat">{t("password.repeatNewPassword")}</FormLabel>
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
