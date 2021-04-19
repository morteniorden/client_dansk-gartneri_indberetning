import { Heading, Stack } from "@chakra-ui/react";
import BasicLayout from "components/Layouts/BasicLayout";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

import StatementInfoForm from "./StatementInfoForm";

interface Props {}

const EditStatementInfo: FC<Props> = ({}) => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  return (
    <BasicLayout maxW="1000px">
      <Stack spacing={5}>
        <Heading>{t("statements.editStatementHeading")}</Heading>
        <StatementInfoForm />
      </Stack>
    </BasicLayout>
  );
};
export default EditStatementInfo;
