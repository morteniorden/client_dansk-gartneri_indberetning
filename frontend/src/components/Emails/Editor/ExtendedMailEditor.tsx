import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import dynamic from "next/dynamic";
import { FC } from "react";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

export type EditorState = {
  editorContent: string;
  ctaButton?: string;
};

interface Props {
  state: EditorState;
  setState: (state: EditorState) => void;
  variant?: "endCTAButton";
}

const ExtendedMailEditor: FC<Props> = ({ state, setState, variant }) => {
  const { t } = useLocales();

  return (
    <Stack>
      <Editor
        content={state.editorContent}
        setContent={content => setState({ ...state, ...{ editorContent: content } })}
      />
      {variant == "endCTAButton" && (
        <FormControl id="ctaButton">
          <FormLabel htmlFor="ctaButton">{t("editor.ctaButton")}</FormLabel>
          <Input
            value={state.ctaButton}
            onChange={e => setState({ ...state, ...{ ctaButton: e.target.value } })}></Input>
        </FormControl>
      )}
    </Stack>
  );
};
export default ExtendedMailEditor;
