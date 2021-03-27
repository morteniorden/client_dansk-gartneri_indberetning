import { Button, Spinner, Stack } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useState } from "react";
import { genMailClient } from "services/backend/apiClients";
import { GeneratePreviewMailCommand } from "services/backend/nswagts";

import ExtendedMailEditor, { EditorState } from "./ExtendedMailEditor";
import PreviewContainer from "./PreviewContainer";

interface Props {}

const EditorPage: FC<Props> = ({}) => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);
  const [editorState, setEditorState] = useState<EditorState>({
    editorContent: "",
    ctaButton: ""
  });
  const [htmlResponse, setHtmlResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.MouseEvent) => {
      setIsLoading(true);
      try {
        const mailClient = await genMailClient();
        const res = await mailClient.generatePreview(
          new GeneratePreviewMailCommand({
            bodyContent: editorState.editorContent
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

  return (
    <Stack>
      <ExtendedMailEditor
        variant="endCTAButton"
        state={editorState}
        setState={state => setEditorState(state)}
      />
      <Button w="max-content" minW="100px" onClick={handleSubmit}>
        {isLoading ? <Spinner /> : t("mailEditor.preview")}
      </Button>
      <PreviewContainer html={htmlResponse} />
    </Stack>
  );
};
export default EditorPage;
