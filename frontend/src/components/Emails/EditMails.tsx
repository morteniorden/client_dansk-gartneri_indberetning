import BasicLayout from "components/Layouts/BasicLayout";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

import EditUserInvitationEmail from "./EditUserInvitationEmail";

const EditEmails: FC = () => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  return (
    <BasicLayout>
      <EditUserInvitationEmail />
    </BasicLayout>
  );
};
export default EditEmails;
