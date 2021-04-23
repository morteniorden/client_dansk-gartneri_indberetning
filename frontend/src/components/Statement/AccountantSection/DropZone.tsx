import {
  Box,
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
import { AuthContext } from "contexts/AuthContext";
import { setAuthToken } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useState } from "react";

const DropZone: FC = () => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  return <Box></Box>;
};
export default DropZone;
