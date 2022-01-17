import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { useSignoffWindow } from "hooks/useSignoffWindow";
import { FC, useCallback, useContext, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { genStatementClient } from "services/backend/apiClients";
import { AccountantType } from "services/backend/nswagts";
import { logger } from "utils/logger";

import DropZone from "./DropZone";

const AccountantSection: FC = () => {
  const { t } = useLocales();
  const { boxBorder } = useColors();
  const [file, setFile] = useState<File>(null);
  const { statement, fetchData } = useContext(EditStatementContext);
  const toast = useToast();
  const { openSignoffWindow } = useSignoffWindow();
  const [isSigning, setIsSigning] = useState(false);

  const onSubmit = useCallback(async () => {
    setIsSigning(true);
    try {
      const statementClient = await genStatementClient();
      const res = await statementClient.consentToStatement(statement.id, {
        data: file,
        fileName: file.name
      });
      openSignoffWindow(
        res.url,
        res.caseFileId,
        statement.id,
        async () => {
          toast({
            title: t("statements.ApproveSuccessTitle"),
            description: t("statements.ApproveSuccessText"),
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-left"
          });
          await statementClient.consentCallback(statement.id);
          fetchData();
        },
        () => {
          toast({
            title: t("statements.ApproveErrorTitle"),
            description: t("statements.ApproveErrorText"),
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left"
          });
        }
      );
    } catch (err) {
      logger.warn("statementClient.put Error", err);
      toast({
        title: t("statements.ApproveErrorTitle"),
        description: t("statements.ApproveErrorText"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
    setIsSigning(false);
  }, [statement, file]);

  return (
    <Box shadow="sm" p={10} border="1px" borderColor={boxBorder} rounded="md">
      <Stack spacing={5}>
        <Heading size="md">{t("statements.accountantSection.heading")}</Heading>
        {!statement.isApproved ? (
          <>
            <Text>{t("statements.accountantSection.helpText")}</Text>
            <Center>
              <HStack>
                <FiDownload />
                <Button
                  variant="link"
                  w="min"
                  colorScheme="green"
                  onClick={e =>
                    window.open(
                      statement.accountantType == AccountantType.Accountant
                        ? "/Revisorerklæring komplet.pdf"
                        : "/Økonomikonsulenterklæring komplet.pdf",
                      "_blank"
                    )
                  }>
                  {t("statements.accountantSection.downloadPdf")}
                </Button>
              </HStack>
            </Center>
            <DropZone file={file} setFile={setFile} />
            <Center>
              <Button
                colorScheme="green"
                onClick={onSubmit}
                disabled={file == null}
                isLoading={isSigning}>
                {t("statements.accountantSection.signAndApprove")}
              </Button>
            </Center>
          </>
        ) : (
          <>
            <Text>{t("statements.accountantSection.consentSignedText")}</Text>
            <Center>
              <HStack>
                <FiDownload />
                <Link
                  w="min"
                  colorScheme="green"
                  href={process.env.NEXT_PUBLIC_ERKLERING_LINK}
                  isExternal>
                  {t("statements.accountantSection.downloadYourConsent")}
                </Link>
              </HStack>
            </Center>
          </>
        )}
      </Stack>
    </Box>
  );
};
export default AccountantSection;
