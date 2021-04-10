import { Flex, Grid, Image, SimpleGrid, Spinner } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { AuthStage } from "hooks/useAuth";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

import LoginForm from "./LoginForm";

const Login: FC = props => {
  const { authStage } = useContext(AuthContext);
  const router = useRouter();
  const logoPath = router.basePath + "/images/icons/logo.svg";

  return (
    <Grid gridTemplateColumns="1fr 400px 1fr" h="100vh" alignItems="center">
      <SimpleGrid gridColumnStart={2} shadow="lg" minH="400px" gridTemplateRows="auto 1fr">
        <Flex bg="gray.700" justifyContent="center" w="100%">
          <Image src={logoPath} position="relative" right="15px" pb="15px" h="70px"></Image>
        </Flex>
        <Flex justifyContent="center" alignItems="center" p={10}>
          {authStage == AuthStage.UNAUTHENTICATED ? <LoginForm /> : <Spinner h={20} w={20} />}
        </Flex>
      </SimpleGrid>
    </Grid>
  );
};
export default Login;
