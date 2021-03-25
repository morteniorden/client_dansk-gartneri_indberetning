import {
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import BasicLayout from "components/Layouts/BasicLayout";
import { AuthContext } from "contexts/AuthContext";
import { setAuthToken } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useState } from "react";

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
