import {
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Skeleton,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useContext } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { genStatementClient } from "services/backend/apiClients";
import { AccountantType, IStatementDto, StatementStatus } from "services/backend/nswagts";
import { logger } from "utils/logger";

import RemoveAccountantModal from "./RemoveAccountantModal";

interface Props {
  statement: IStatementDto;
}

const CurrentAccountant: FC<Props> = ({ statement }) => {
  const { t } = useLocales();
  const toast = useToast();
  const { fetchData, isFetching, readonly } = useContext(EditStatementContext);
  const { boxBorder, lightOrange, statusIsSigned } = useColors();

  const handleDelete = useCallback(async () => {
    try {
      const statementclient = await genStatementClient();
      await statementclient.unassignAccountant(statement.id);
      toast({
        title: t("accountant.deleteSuccessTitle"),
        description: t("accountant.deleteSuccessText"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
      await fetchData();
    } catch {
      toast({
        title: t("accountant.deleteErrorTitle"),
        description: t("accountant.deleteErrorText"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  }, [statement]);

  return (
    <Skeleton isLoaded={!isFetching}>
      <Flex
        shadow="sm"
        p={5}
        pl={10}
        pr={10}
        border="1px"
        borderColor={boxBorder}
        rounded="md"
        background={statement.isApproved ? statusIsSigned : lightOrange}
        justifyContent="space-between"
        alignItems="center">
        <HStack spacing="5">
          <BsFillPeopleFill size="40px" />
          <Stack spacing={0}>
            <Heading size="sm" colorScheme="green">
              {statement.isApproved
                ? statement.accountantType == AccountantType.Accountant
                  ? t("statements.approvedByAccountant")
                  : t("statements.approvedByConsultant")
                : statement.accountantType == AccountantType.Accountant
                ? t("statements.sentToAccountant")
                : t("statements.sentToConsultant")}
            </Heading>
            <Text fontSize="sm">
              {statement.isApproved
                ? `${t("statements.approvedBy")}: ${
                    statement.accountant?.email ?? "ACCOUNT_NULL_ERROR"
                  }`
                : `${t("statements.sentTo")}: ${
                    statement.accountant?.email ?? "ACCOUNT_NULL_ERROR"
                  }`}
            </Text>
            {!readonly && (
              <Text fontSize="sm">
                {statement.isApproved
                  ? t("statements.approvedAndReady")
                  : statement.accountantType == AccountantType.Accountant
                  ? t("statements.notYetApprovedAccountant")
                  : t("statements.notYetApprovedConsultant")}
              </Text>
            )}
            {statement.isApproved && (
              <Link w="min" href={process.env.NEXT_PUBLIC_ERKLERING_LINK} isExternal>
                {t("statements.downloadConsent")}
              </Link>
            )}
          </Stack>
        </HStack>
        {statement.status != StatementStatus.SignedOff && (
          <RemoveAccountantModal statement={statement} cb={handleDelete} />
        )}
      </Flex>
    </Skeleton>
  );
};
export default CurrentAccountant;
