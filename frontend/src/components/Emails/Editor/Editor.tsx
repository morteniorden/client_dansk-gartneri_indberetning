import "./CKEditorBuild/ckeditor5/build/translations/en";

import { Box } from "@chakra-ui/layout";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useLocales } from "hooks/useLocales";
import { FC, useEffect, useState } from "react";

declare module "./CKEditorBuild/ckeditor5/build/ckeditor";
import ClassicEditor from "./CKEditorBuild/ckeditor5/build/ckeditor";
import CustomCSSReset from "./CustomCSSReset";

interface Props {
  content: string;
  setContent: (content: string) => void;
}

interface ICKEditor {
  getData: () => string;
  setData: (data: string) => void;
}

interface ICKEditorEvent {
  name: string;
  //Maybe add some properties of the event..
}

const Editor: FC<Props> = ({ content, setContent }) => {
  const { t, locale } = useLocales();
  const [editor, setEditor] = useState<ICKEditor>(null);

  useEffect(() => {
    editor?.setData(content);
  }, [content]);

  //The box with sx property is needed if dark mode should be supported.
  //Otherwise the text in the editor will turn white and not be visible.
  return (
    <Box textColor="black">
      <CustomCSSReset>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          config={{
            language: locale.substr(0, 2),
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "|",
              "link",
              "|",
              "alignment",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "undo",
              "redo"
            ],
            heading: {
              options: [
                {
                  model: "paragraph",
                  title: t("mailEditor.paragraph"),
                  class: "ck-heading_paragraph"
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: t("mailEditor.heading"),
                  class: "ck-heading_heading2"
                }
              ]
            },
            link: {
              defaultProtocol: "http://"
            }
          }}
          onReady={(editor: ICKEditor) => {
            //Do something
            setEditor(editor);
          }}
          onChange={(event: ICKEditorEvent, editor: ICKEditor) => {
            //Do something
          }}
          onBlur={(event: ICKEditorEvent, editor: ICKEditor) => {
            //Do something
            const data = editor.getData();
            setContent(data);
          }}
          onFocus={(event: ICKEditorEvent, editor: ICKEditor) => {
            //Do something
          }}
        />
      </CustomCSSReset>
    </Box>
  );
};
export default Editor;
