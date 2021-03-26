import CSSReset from "@chakra-ui/css-reset";
import { Box } from "@chakra-ui/layout";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { AuthContext } from "contexts/AuthContext";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

import CustomCSSReset from "./CustomCSSReset";

const Editor: FC = () => {
  const { t } = useLocales();
  const router = useRouter();
  const { activeUser } = useContext(AuthContext);

  return (
    <Box
      sx={{
        h2: { fontSize: "1.5em", marginTop: "0.83em", marginBottom: "0.83em", fontWeight: "bold" },
        "ul, ol": { paddingLeft: "40px" }
      }}>
      <div>
        <h2>Using CKEditor 5 build in React</h2>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          config={{
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
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
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    </Box>
  );
};
export default Editor;
/*
 
*/
