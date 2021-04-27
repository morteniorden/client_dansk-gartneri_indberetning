import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { genAuthenticationClient } from "services/backend/apiClients";
import { logger } from "utils/logger";

interface Props {
  showLogin: () => void;
}

const ForgotPasswordForm: FC<Props> = ({ showLogin }) => {
  const { t } = useLocales();
  const toast = useToast();

  const [email, setEmail] = useState<string>("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const authClient = await genAuthenticationClient();
        await authClient.sendMailToResetPassword(email);
        toast({
          title: t("login.sendResetPWSuccesTitle"),
          description: t("login.sendResetPWSuccesText"),
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
        showLogin();
      } catch (err) {
        logger.warn("authClient.post Error", err);
        toast({
          title: t("login.sendResetPWErrorTitle"),
          description: t("login.sendResetPWErrorText"),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }
    },
    [email]
  );

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit}>
        <Stack w="100%" spacing={3}>
          <Heading size="sm">{t("login.forgotPassword")}</Heading>
          <Text>{t("login.forgotPasswordText")}</Text>
          <FormControl isRequired={true} colorScheme="green">
            <FormLabel htmlFor="email">{t("login.email")}</FormLabel>
            <InputGroup>
              <InputRightElement>
                <BsPerson />
              </InputRightElement>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}></Input>
            </InputGroup>
          </FormControl>
          <SimpleGrid columns={2} gap={2}>
            <Button onClick={showLogin}>{t("actions.back")}</Button>
            <Button type="submit" colorScheme="blue">
              {t("login.sendResetPW")}
            </Button>
          </SimpleGrid>
        </Stack>
      </form>
    </Box>
  );
};
export default ForgotPasswordForm;
