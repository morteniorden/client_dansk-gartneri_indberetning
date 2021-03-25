import { Container, Heading, Stack } from "@chakra-ui/react";
import BasicLayout from "components/Layouts/BasicLayout";
import { setAuthToken } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

import ChangePasswordForm from "./ChangePasswordForm";

const ChangePassword: FC = () => {
  const { t } = useLocales();
  const router = useRouter();

  useEffect(() => {
    const token = router.query.token as string;
    if (token) {
      setAuthToken(token);
    }
  }, [router, router.query]);

  return (
    <BasicLayout maxW="600px">
      <Stack spacing={4}>
        <Heading>{t("password.changePassword")}</Heading>
        <Container maxW="400px" pt="50px">
          <ChangePasswordForm />
        </Container>
      </Stack>
    </BasicLayout>
  );
};
export default ChangePassword;
