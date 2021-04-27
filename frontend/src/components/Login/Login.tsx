import { Button, Flex, Grid, Image, SimpleGrid, Spinner, Stack } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { AuthStage } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";

import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";

const Login: FC = props => {
  const { authStage } = useContext(AuthContext);
  const router = useRouter();
  const logoPath = router.basePath + "/images/icons/logo.svg";
  const [showResetPWForm, setShowResetPWForm] = useState(false);
  const { t } = useLocales();

  return (
    <Grid gridTemplateColumns="1fr 400px 1fr" h="100vh" alignItems="center">
      <SimpleGrid gridColumnStart={2} shadow="lg" minH="400px" gridTemplateRows="auto 1fr">
        <Flex bg="gray.700" justifyContent="center" w="100%">
          <Image src={logoPath} position="relative" right="15px" pb="15px" h="70px"></Image>
        </Flex>
        <Flex justifyContent="center" alignItems="center" p={10}>
          {authStage == AuthStage.UNAUTHENTICATED ? (
            !showResetPWForm ? (
              <Stack w="100%">
                <LoginForm />
                <Button variant="link" colorScheme="blue" onClick={() => setShowResetPWForm(true)}>
                  {t("login.forgotPassword")}
                </Button>
              </Stack>
            ) : (
              <ForgotPasswordForm showLogin={() => setShowResetPWForm(false)} />
            )
          ) : (
            <Spinner h={20} w={20} />
          )}
        </Flex>
      </SimpleGrid>
    </Grid>
  );
};
export default Login;
