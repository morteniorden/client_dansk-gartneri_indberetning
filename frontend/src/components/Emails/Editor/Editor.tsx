import "@ckeditor/ckeditor5-build-classic/build/translations/da";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";

import CustomCSSReset from "./CustomCSSReset";

interface Props {
  content: string;
  setContent: (content: string) => void;
}

interface ICKEditor {
  getData: () => string;
}

interface ICKEditorEvent {
  name: string;
  //Maybe add some properties of the event..
}

const Editor: FC<Props> = ({ content, setContent }) => {
  const { t, locale } = useLocales();

  return (
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
          }
        }}
        onReady={(editor: ICKEditor) => {
          //Do something
        }}
        onChange={(event: ICKEditorEvent, editor: ICKEditor) => {
          const data = editor.getData();
          setContent(data);
        }}
        onBlur={(event: ICKEditorEvent, editor: ICKEditor) => {
          //Do something
        }}
        onFocus={(event: ICKEditorEvent, editor: ICKEditor) => {
          //Do something
        }}
      />
    </CustomCSSReset>
  );
};
export default Editor;
