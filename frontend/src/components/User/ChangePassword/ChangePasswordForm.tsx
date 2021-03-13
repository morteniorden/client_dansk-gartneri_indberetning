import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useAuth } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { genUserClient } from "services/backend/apiClients";
import { UpdatePasswordCommand, UpdatePasswordDto } from "services/backend/nswagts";

interface Props {
  onSubmit: (e: React.FormEvent) => void;
}

const ChangePasswordForm: FC<Props> = ({ onSubmit }) => {
  const { activeUser } = useAuth();
  const { t } = useLocales();

  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const match = repeatPassword == password;
      setPasswordsMatch(match);
      if (!match) return;

      const userClient = await genUserClient();
      await userClient.updatePassword(
        1, //TODO: Change to id of active user.
        new UpdatePasswordCommand({
          passwordDto: new UpdatePasswordDto({
            password: password
          })
        })
      );

      onSubmit(e);
    },
    [password, repeatPassword]
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="password" isRequired>
        <FormLabel htmlFor="password">{t("users.password")}</FormLabel>
        <Input type="password" value={password} onChange={e => setPassword(e.target.value)}></Input>
      </FormControl>
      <FormControl id="passwordRepeat" isRequired isInvalid={!passwordsMatch}>
        <FormLabel htmlFor="password">{t("users.repeatPassword")}</FormLabel>
        <Input
          type="password"
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}></Input>
        <FormErrorMessage>{t("users.passwordsDontMatch")}</FormErrorMessage>
      </FormControl>
      <Flex justifyContent="flex-end" w="100%" mt={5}>
        <Button colorScheme="green" type="submit">
          {t("common.add")}
        </Button>
      </Flex>
    </form>
  );
};
export default ChangePasswordForm;
