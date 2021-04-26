import { Box, Button, Center, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { EditStatementContext } from "contexts/EditStatementContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { FC, useCallback, useContext, useState } from "react";
import { FiDownload } from "react-icons/fi";

import DropZone from "./DropZone";

const AccountantSection: FC = () => {
  const { t } = useLocales();
  const { boxBorder } = useColors();
  const [file, setFile] = useState<File>(null);
  const { readonly } = useContext(EditStatementContext);

  const onSubmit = useCallback(() => {
    console.log(file);
  }, [file]);

  return (
    <Box shadow="sm" p={10} border="1px" borderColor={boxBorder} rounded="md">
      <Stack spacing={5}>
        <Heading size="md">{t("statements.accountantSection.heading")}</Heading>
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
      </Stack>
    </Box>
  );
};
export default AccountantSection;
