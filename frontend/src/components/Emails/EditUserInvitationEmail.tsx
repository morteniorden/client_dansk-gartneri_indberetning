import { Heading, Stack } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

const EditUserInvitationEmail: FC = () => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  const Editor = dynamic(() => import("./Editor/Editor"), { ssr: false });

  return (
    <Stack>
      <Heading>Edit email</Heading>
      <Editor />
    </Stack>
  );
};
export default EditUserInvitationEmail;
