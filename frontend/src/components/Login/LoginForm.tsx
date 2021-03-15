import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack
} from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useState } from "react";
import { BsLock, BsPerson } from "react-icons/bs";
import { LoginRequestDto } from "services/backend/nswagts";

const LoginForm: FC = () => {
  const { t } = useLocales();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(true);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const res = await login(
        new LoginRequestDto({
          email: email,
          password: password
        })
      );
      setLoginSuccess(res);
    },
    [email, password, login]
  );

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit}>
        <Stack w="100%">
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
          <FormControl isRequired={true}>
            <FormLabel htmlFor="password">{t("login.password")}</FormLabel>
            <InputGroup>
              <InputRightElement>
                <BsLock />
              </InputRightElement>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}></Input>
            </InputGroup>
          </FormControl>
          <Button type="submit" colorScheme="blue" w="100%">
            {t("login.login")}
          </Button>
          {!loginSuccess && <Center color="red">{t("login.invalidMsg")}</Center>}
          <Center textColor="blue.400" mt={2}>
            {t("login.forgotPassword")}
          </Center>
        </Stack>
      </form>
    </Box>
  );
};
export default LoginForm;
