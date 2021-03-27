import { Button, HStack, Spinner, Stack } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useState } from "react";
import { genMailClient } from "services/backend/apiClients";
import { GeneratePreviewMailCommand, IEmailDto } from "services/backend/nswagts";

import ExtendedMailEditor from "./ExtendedMailEditor";
import PreviewContainer from "./PreviewContainer";

interface Props {
  emailDto?: IEmailDto;
}

const EditorPage: FC<Props> = ({ emailDto }) => {
  const { t } = useLocales();
  const [editorState, setEditorState] = useState<IEmailDto>({
    name: emailDto.name,
    title: emailDto.title,
    htmlContent: emailDto.htmlContent,
    ctaButtonText: emailDto.ctaButtonText
  });
  const [htmlResponse, setHtmlResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.MouseEvent) => {
      setIsLoading(true);
      try {
        const mailClient = await genMailClient();
        const res = await mailClient.generatePreview(
          new GeneratePreviewMailCommand({
            bodyContent: editorState.htmlContent
          })
        );
        setHtmlResponse(res);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    },
    [editorState]
  );

  useEffect(() => {
    console.log("hej");
  }, [emailDto]);

  return (
    <Stack>
      <ExtendedMailEditor
        variant="endCTAButton"
        state={emailDto}
        setState={state => setEditorState(state)}
      />
      <HStack>
        <Button colorScheme="green" w="max-content" minW="100px">
          {isSaving ? <Spinner /> : "Gem"}
        </Button>
        <Button w="max-content" minW="100px" onClick={handleSubmit}>
          {isLoading ? <Spinner /> : t("mailEditor.preview")}
        </Button>
      </HStack>
      <PreviewContainer html={htmlResponse} />
    </Stack>
  );
};
export default EditorPage;
