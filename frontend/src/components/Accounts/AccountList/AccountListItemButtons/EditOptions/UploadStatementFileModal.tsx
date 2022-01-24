import {
  Button,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { ClientsContext } from "contexts/ClientsContext";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useMemo, useState } from "react";
import { genStatementClient } from "services/backend/apiClients";
import { IStatementNoUsersDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

interface Props {
  statement: IStatementNoUsersDto;
}

const UploadStatementFileModal: FC<Props> = ({ statement }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { fetchData } = useContext(ClientsContext);

  const { t } = useLocales();

  const toast = useToast();

  const uploadFile = useCallback(async () => {
    setIsProcessing(true);
    try {
      const statementClient = await genStatementClient();
      await statementClient.uploadStatementFile(statement.id, { data: file, fileName: file.name });
      toast({
        title: t("statementFile.uploadSuccessTitle"),
        description: t("statementFile.uploadSuccessText"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
      setIsProcessing(false);
      fetchData();
      onClose();
    } catch (err) {
      logger.warn("statementClient.put Error", err);
      toast({
        title: t("statementFile.uploadErrorTitle"),
        description: t("statementFile.uploadErrorText"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
    setIsProcessing(false);
  }, [file, statement]);

  return (
    <>
      <MenuItem onClick={onOpen}>
        {statement.statementFileName ? t("statementFile.override") : t("statementFile.attach")}
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("statementFile.chooseUpload")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="File"
              onChange={e => {
                setFile(e.target.files[0]);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={uploadFile} isDisabled={isProcessing}>
              {isProcessing ? <Spinner /> : t("statementFile.upload")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadStatementFileModal;
