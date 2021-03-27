import { Heading, Stack } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";

import EditorPage from "./Editor/EditorPage";

const EditUserInvitationEmail: FC = () => {
  const { t } = useLocales();

  return (
    <Stack>
      <Heading>Edit email</Heading>
      <EditorPage />
    </Stack>
  );
};
export default EditUserInvitationEmail;
