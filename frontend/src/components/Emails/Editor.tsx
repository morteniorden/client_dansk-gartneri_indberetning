import { Button } from "@chakra-ui/button";
import CSSReset from "@chakra-ui/css-reset";
import { Box, Flex } from "@chakra-ui/layout";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useRef, useState } from "react";
import { genMailClient } from "services/backend/apiClients";
import { GeneratePreviewMailCommand } from "services/backend/nswagts";

const Editor: FC = () => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);
  const [editorData, setEditorData] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = useCallback(
    async (e: React.MouseEvent) => {
      try {
        const mailClient = await genMailClient();
        const res = await mailClient.generatePreview(
          new GeneratePreviewMailCommand({
            bodyContent: editorData
          })
        );
        setResult(res);
      } catch (e) {
        console.error(e);
      }
    },
    [editorData]
  );

  return (
    <Box
      sx={{
        h2: { fontSize: "1.5em", marginTop: "0.83em", marginBottom: "0.83em", fontWeight: "bold" },
        "ul, ol": { paddingLeft: "40px" }
      }}>
      <div>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          config={{
            toolbar: [
              "heading",
              "|",
              "alignment",
              "|",
              "bold",
              "italic",
              "|",
              "link",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "undo",
              "redo"
            ],
            heading: {
              options: [
                { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
                { model: "heading2", view: "h2", title: "Heading", class: "ck-heading_heading2" }
              ]
            }
          }}
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(data);
            //console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
      <Button onClick={handleSubmit}>test</Button>
      <CSSReset />
      <div dangerouslySetInnerHTML={{ __html: result }}></div>
    </Box>
  );
};
export default Editor;
/*
 
*/
