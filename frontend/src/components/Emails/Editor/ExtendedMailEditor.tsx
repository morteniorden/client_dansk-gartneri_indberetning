import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Tooltip
} from "@chakra-ui/react";
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
      <Tooltip
        label="Navn på email. Vises ikke for modtageren."
        aria-label="A tooltip"
        placement="auto-end">
        <FormControl id="name">
          <InputGroup>
            <InputLeftAddon w="70px">Navn</InputLeftAddon>
            <Input
              maxW="max-content"
              minW="300px"
              value={state.name}
              onChange={e => setState({ ...state, ...{ name: e.target.value } })}></Input>{" "}
          </InputGroup>
        </FormControl>
      </Tooltip>
      <Tooltip
        label="Titel på email, som den vises for modtageren."
        aria-label="A tooltip"
        placement="auto-end">
        <FormControl id="title">
          <InputGroup>
            <InputLeftAddon w="70px">Titel</InputLeftAddon>
            <Input
              maxW="max-content"
              minW="300px"
              value={state.title}
              onChange={e => setState({ ...state, ...{ title: e.target.value } })}></Input>
          </InputGroup>
        </FormControl>
      </Tooltip>
      {variant == "endCTAButton" && (
        <Tooltip
          label="Tekst på knappen, der vises nederst i mailen."
          aria-label="A tooltip"
          placement="auto-end">
          <FormControl id="ctaButton">
            <InputGroup>
              <InputLeftAddon w="70px">{t("mailEditor.ctaButtonInputLabel")}</InputLeftAddon>
              <Input
                maxW="300px"
                value={state.ctaButtonText}
                onChange={e => setState({ ...state, ...{ ctaButton: e.target.value } })}></Input>
            </InputGroup>
          </FormControl>
        </Tooltip>
      )}
      <Editor
        content={state.htmlContent}
        setContent={content => setState({ ...state, ...{ editorContent: content } })}
      />
    </Stack>
  );
};
export default ExtendedMailEditor;
