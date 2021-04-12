import { FormControl, Input, InputGroup, InputLeftAddon, Stack, Tooltip } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IEmailDto } from "services/backend/nswagts";

import SectionInput from "./SectionInput";

interface Props {
  email: IEmailDto;
  setEmail: (state: IEmailDto) => void;
  variant?: "endCTAButton";
}

const EditEmailForm: FC<Props> = ({ email, setEmail, variant }) => {
  const { t } = useLocales();

  return (
    <Stack>
      <Tooltip label={t("mailEditor.subjectTooltip")} aria-label="A tooltip" placement="auto-end">
        <FormControl id="subject">
          <InputGroup>
            <InputLeftAddon w="110px">{t("mailEditor.subject")}</InputLeftAddon>
            <Input
              value={email.subject}
              onChange={e => setEmail({ ...email, ...{ subject: e.target.value } })}></Input>
          </InputGroup>
        </FormControl>
      </Tooltip>
      {variant == "endCTAButton" && (
        <Tooltip label={t("mailEditor.ctaTooltip")} aria-label="A tooltip" placement="auto-end">
          <FormControl id="ctaButton">
            <InputGroup>
              <InputLeftAddon w="110px">{t("mailEditor.ctaButtonInputLabel")}</InputLeftAddon>
              <Input
                value={email.ctaButtonText}
                onChange={e =>
                  setEmail({ ...email, ...{ ctaButtonText: e.target.value } })
                }></Input>
            </InputGroup>
          </FormControl>
        </Tooltip>
      )}
      <SectionInput
        sectionHeading={`${t("mailEditor.section")} 1`}
        h={email.heading1}
        p={email.paragraph1}
        setH={h => setEmail({ ...email, ...{ heading1: h } })}
        setP={p => setEmail({ ...email, ...{ paragraph1: p } })}
      />
      <SectionInput
        sectionHeading={`${t("mailEditor.section")} 2`}
        h={email.heading2}
        p={email.paragraph2}
        setH={h => setEmail({ ...email, ...{ heading2: h } })}
        setP={p => setEmail({ ...email, ...{ paragraph2: p } })}
      />
      <SectionInput
        sectionHeading={`${t("mailEditor.section")} 3`}
        h={email.heading3}
        p={email.paragraph3}
        setH={h => setEmail({ ...email, ...{ heading3: h } })}
        setP={p => setEmail({ ...email, ...{ paragraph3: p } })}
      />
    </Stack>
  );
};
export default EditEmailForm;
