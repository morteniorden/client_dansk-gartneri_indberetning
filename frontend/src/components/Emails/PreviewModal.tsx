import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useState } from "react";
import { genMailClient } from "services/backend/apiClients";
import { GeneratePreviewMailCommand, IEmailDto } from "services/backend/nswagts";

interface Props {
  currentMail: IEmailDto;
}

const PreviewModal: FC<Props> = ({ currentMail }) => {
  const { t } = useLocales();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [htmlResponse, setHtmlResponse] = useState("");

  const fetchPreview = useCallback(async () => {
    try {
      const mailClient = await genMailClient();
      const res = await mailClient.generatePreview(
        new GeneratePreviewMailCommand({
          emailDto: currentMail
        })
      );
      setHtmlResponse(res);
    } catch (e) {
      console.error(e);
    }
  }, [currentMail]);

  useEffect(() => {
    fetchPreview();
  }, [isOpen]);

  return (
    <>
      <Button onClick={onOpen}>{t("mailEditor.preview")}</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              sx={{
                h2: {
                  fontSize: "1.5em",
                  marginTop: "0.83em",
                  marginBottom: "0.83em",
                  fontWeight: "bold"
                }
              }}
              dangerouslySetInnerHTML={{ __html: htmlResponse }}></Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default PreviewModal;
