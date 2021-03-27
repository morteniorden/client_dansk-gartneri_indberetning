import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import dynamic from "next/dynamic";
import { FC } from "react";
import { IEmailDto } from "services/backend/nswagts";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

export type EditorState = {
  editorContent: string;
  ctaButton?: string;
};

interface Props {
  state: IEmailDto;
  setState: (state: IEmailDto) => void;
  variant?: "endCTAButton";
}

const ExtendedMailEditor: FC<Props> = ({ state, setState, variant }) => {
  const { t } = useLocales();

  return (
    <Stack>
      <Editor
        content={state.htmlContent}
        setContent={content => setState({ ...state, ...{ editorContent: content } })}
      />
      {variant == "endCTAButton" && (
        <FormControl id="ctaButton">
          <FormLabel htmlFor="ctaButton">{t("mailEditor.ctaButtonInputLabel")}</FormLabel>
          <Input
            maxW="300px"
            value={state.ctaButtonText}
            onChange={e => setState({ ...state, ...{ ctaButton: e.target.value } })}></Input>
        </FormControl>
      )}
    </Stack>
  );
};
export default ExtendedMailEditor;
