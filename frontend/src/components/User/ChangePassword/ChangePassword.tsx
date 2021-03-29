import { Container, Heading, Stack } from "@chakra-ui/react";
import BasicLayout from "components/Layouts/BasicLayout";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC } from "react";

import ChangePasswordForm from "./ChangePasswordForm";

const ChangePassword: FC = () => {
  const { t } = useLocales();
  const router = useRouter();

  return (
    <BasicLayout maxW="600px">
      <Stack spacing={4}>
        <Heading>{t("password.changePassword")}</Heading>
        <Container maxW="400px" pt="50px">
          <ChangePasswordForm onSubmit={() => router.push("/")} />
        </Container>
      </Stack>
    </BasicLayout>
  );
};
export default ChangePassword;
