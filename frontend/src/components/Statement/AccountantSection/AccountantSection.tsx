import { Box, Button, Center, Heading, HStack, Stack, Text, useToast } from "@chakra-ui/react";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { FC, useCallback, useContext, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { genStatementClient } from "services/backend/apiClients";
import { logger } from "utils/logger";

import DropZone from "./DropZone";

const AccountantSection: FC = () => {
  const { t } = useLocales();
  const { boxBorder } = useColors();
  const [file, setFile] = useState<File>(null);
  const { statement, fetchData } = useContext(EditStatementContext);
  const toast = useToast();

  const onSubmit = useCallback(async () => {
    try {
      const statementClient = await genStatementClient();
      await statementClient.consentToStatement(statement.id, { data: file, fileName: file.name });
      toast({
        title: t("statements.ApproveSuccessTitle"),
        description: t("statements.ApproveSuccessText"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
      fetchData();
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
  }, [statement, file]);

  const fetchConsent = useCallback(async () => {
    try {
      const statementClient = await genStatementClient();
      const data = await statementClient.getConsentFile(statement.id);

      if (data != null) {
        const downloadLink = document.createElement("a");
        downloadLink.href = "data:application/pdf;base64," + data.stream;
        downloadLink.download = `samtykkeerklæring ${statement.client.name} ${statement.accountingYear}`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } catch (err) {
      logger.warn("statementClient.get Error", err);
    }
  }, [statement]);

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
                {/* TODO: insert actual URL */}
                <Link href="https://danskgartneri.dk/-/media/danskgartneri/publikationer/tal-om-gartneriet/tal-om-gartneriet-2020.pdf">
                  <Button variant="link" w="min" colorScheme="green">
                    {t("statements.accountantSection.downloadPdf")}
                  </Button>
                </Link>
              </HStack>
            </Center>
            <DropZone file={file} setFile={setFile} />
            <Center>
              <Button colorScheme="green" onClick={onSubmit} disabled={file == null}>
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
                <Button variant="link" w="min" colorScheme="green" onClick={fetchConsent}>
                  {t("statements.accountantSection.downloadYourConsent")}
                </Button>
              </HStack>
            </Center>
          </>
        )}
      </Stack>
    </Box>
  );
};
export default AccountantSection;
