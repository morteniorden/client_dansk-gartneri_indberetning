import { FormControl, Input, InputGroup, InputLeftAddon, Stack, Tooltip } from "@chakra-ui/react";
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
      <Tooltip label={t("mailEditor.nameTooltip")} aria-label="A tooltip" placement="auto-end">
        <FormControl id="name">
          <InputGroup>
            <InputLeftAddon w="110px">{t("mailEditor.name")}</InputLeftAddon>
            <Input
              value={state.name}
              onChange={e => setState({ ...state, ...{ name: e.target.value } })}></Input>{" "}
          </InputGroup>
        </FormControl>
      </Tooltip>
      <Tooltip label={t("mailEditor.subjectTooltip")} aria-label="A tooltip" placement="auto-end">
        <FormControl id="subject">
          <InputGroup>
            <InputLeftAddon w="110px">{t("mailEditor.subject")}</InputLeftAddon>
            <Input
              value={state.subject}
              onChange={e => setState({ ...state, ...{ title: e.target.value } })}></Input>
          </InputGroup>
        </FormControl>
      </Tooltip>
      {variant == "endCTAButton" && (
        <Tooltip label={t("mailEditor.ctaTooltip")} aria-label="A tooltip" placement="auto-end">
          <FormControl id="ctaButton">
            <InputGroup>
              <InputLeftAddon w="110px">{t("mailEditor.ctaButtonInputLabel")}</InputLeftAddon>
              <Input
                value={state.ctaButtonText}
                onChange={e =>
                  setState({ ...state, ...{ ctaButtonText: e.target.value } })
                }></Input>
            </InputGroup>
          </FormControl>
        </Tooltip>
      )}
      <Editor
        content={state.htmlContent}
        setContent={content => setState({ ...state, ...{ htmlContent: content } })}
      />
    </Stack>
  );
};
export default ExtendedMailEditor;
