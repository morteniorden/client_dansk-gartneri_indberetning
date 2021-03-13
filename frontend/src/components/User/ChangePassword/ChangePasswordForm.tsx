import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useAuth } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { usePasswordValidation } from "hooks/usePasswordValidation";
import { FC, useCallback } from "react";
import { genUserClient } from "services/backend/apiClients";
import { UpdatePasswordCommand, UpdatePasswordDto } from "services/backend/nswagts";

interface Props {
  onSubmit: (e: React.FormEvent) => void;
}

const ChangePasswordForm: FC<Props> = ({ onSubmit }) => {
  const { activeUser } = useAuth();
  const { t } = useLocales();
  const { pwState, setPwState, checkState } = usePasswordValidation();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!checkState()) return;
      const userClient = await genUserClient();
      await userClient.updatePassword(
        1, //TODO: Change to id of active user.
        new UpdatePasswordCommand({
          passwordDto: new UpdatePasswordDto({
            password: pwState.pw1
          })
        })
      );
      onSubmit(e);
    },
    [pwState]
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="password" isRequired isInvalid={!pwState.pw1Valid}>
        <FormLabel htmlFor="password">{t("users.password")}</FormLabel>
        <Input
          type="password"
          value={pwState.pw1}
          onChange={e => setPwState({ ...pwState, ...{ pw1: e.target.value } })}></Input>
        {pwState.errors.map((err, i) => (
          <FormErrorMessage key={i}>{err.errorMsg}</FormErrorMessage>
        ))}
      </FormControl>
      <FormControl id="passwordRepeat" isRequired isInvalid={!pwState.pw2Valid}>
        <FormLabel htmlFor="password">{t("users.repeatPassword")}</FormLabel>
        <Input
          type="password"
          value={pwState.pw2}
          onChange={e => setPwState({ ...pwState, ...{ pw2: e.target.value } })}></Input>
        <FormErrorMessage>{t("password.dontMatch")}</FormErrorMessage>
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
