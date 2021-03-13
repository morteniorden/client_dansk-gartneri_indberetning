import { Button, Flex, FormControl, FormLabel, Input, ModalHeader, Spacer } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { genAccountClient } from "services/backend/apiClients";
import {
  CreateAccountCommand,
  CreateAccountDto,
  ICreateAccountDto,
  UpdatePasswordDto
} from "services/backend/nswagts";
import { CVRDataDto } from "services/cvr/api";

interface Props {
  onSubmit: (e: React.FormEvent) => void;
}

const ChangePasswordForm: FC<Props> = ({ onSubmit }) => {
  const { t } = useLocales();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      formUpdateReform(e.target.value, e.target.id as keyof typeof localForm);
    },
    [formUpdateReform]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const accountClient = await genAccountClient();
      await accountClient.createAccount(
        new CreateAccountCommand({
          account: localForm
        })
      );
      onSubmit(e);
    },
    [localForm]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Flex justifyContent="flex-end" w="100%" mt={5}>
        <Button colorScheme="green" type="submit">
          {t("common.add")}
        </Button>
      </Flex>
    </form>
  );
};
export default NewAccountForm;
