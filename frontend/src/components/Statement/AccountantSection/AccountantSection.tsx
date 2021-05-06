import { Box, Button, Center, Heading, HStack, Stack, Text, useToast } from "@chakra-ui/react";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
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

  const waitForSigningCompletion = useCallback(
    async (window: Window, caseFileid: number) => {
      try {
        const statementClient = await genStatementClient();
        let iterations = 0;
        const id = setInterval(async function () {
          iterations++;
          if (iterations > 20) {
            clearInterval(id);
            window.close();
            toast({
              title: t("statements.ApproveErrorTitle"),
              description: t("statements.ApproveErrorText"),
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left"
            });
          }
          const completed = await statementClient.checkIsSigned(statement.id, caseFileid);
          console.log("Result: " + completed);
          if (completed) {
            clearInterval(id);
            window.close();
            toast({
              title: t("statements.ApproveSuccessTitle"),
              description: t("statements.ApproveSuccessText"),
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom-left"
            });
            fetchData();
          }
        }, 10000);
      } catch (error) {
        console.debug(error);
      }
    },
    [statement, fetchData]
  );

  const onSubmit = useCallback(async () => {
    try {
      const statementClient = await genStatementClient();
      const res = await statementClient.consentToStatement(statement.id, {
        data: file,
        fileName: file.name
      });
      if (res) {
        const h = window.top.innerHeight * 0.6;
        const w = window.top.innerWidth * 0.6;
        const y = window.top.innerHeight / 2 + window.top.screenY - h / 2;
        const x = window.top.innerWidth / 2 + window.top.screenX - w / 2;
        const win = window.open(
          res.link,
          "Signing",
          `width=${w}, height=${h}, left=${x}, top=${y}, toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes`
        );
        const id = setInterval(async function () {
          //Try/catch because this will throw a cors error every half second.
          try {
            if (
              win.closed ||
              win.location.href.indexOf("/signingSuccess") < 0 ||
              win.location.href.indexOf("/signingFailure") < 0
            ) {
              clearInterval(id);
              //ready to close the window.
              //fetchData();
              waitForSigningCompletion(win, res.caseFileId);
            }
          } catch (error) {
            console.debug(error);
          }
        }, 500);
      }
    } catch (err) {
      logger.warn("statementClient.put Error", err);
      // toast({
      //   title: t("statements.ApproveErrorTitle"),
      //   description: t("statements.ApproveErrorText"),
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom-left"
      // });
      console.log("fejl");
    }
  }, [statement, file, waitForSigningCompletion]);

  const fetchConsent = useCallback(async () => {
    try {
      const statementClient = await genStatementClient();
      const data = await statementClient.getConsentFile(statement.id);

      if (data != null) {
        const downloadLink = document.createElement("a");

        //This assumes that the file is always a pdf. But what if we want to support different files?
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
