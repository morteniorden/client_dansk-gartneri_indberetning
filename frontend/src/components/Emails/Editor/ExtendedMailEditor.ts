import { FC, useState, useCallback, useEffect, useContext } from 'react';
import { Flex, Grid, Heading, Text, Button, Input, IconButton, Stack, HStack } from '@chakra-ui/react';
import { setAuthToken } from 'hooks/useAuth'
import { useLocales } from 'hooks/useLocales'
import { useRouter } from 'next/router'
import { AuthContext } from 'contexts/AuthContext'

interface Props {
  
};

const ExtendedMailEditor: FC<Props> = ({}) => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  return (
  )
};
export default ExtendedMailEditor;