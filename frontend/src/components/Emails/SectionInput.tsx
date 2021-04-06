import { Box, Heading, Input, Textarea } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import React, { FC } from "react";

interface Props {
  sectionHeading: string;
  p: string;
  h: string;
  setP: (p: string) => void;
  setH: (h: string) => void;
}

const SectionInput: FC<Props> = ({ sectionHeading, p, h, setP, setH }) => {
  const { t } = useLocales();

  return (
    <Box shadow="md" p="20px">
      <Heading size="md" color="gray.300" float="right">
        {sectionHeading}
      </Heading>
      <Input
        variant="flushed"
        value={h ?? ""}
        placeholder={t("mailEditor.headingPlaceholder")}
        fontWeight="bold"
        fontSize="1.3em"
        onChange={e => setH(e.target.value)}
      />
      <Textarea
        variant="unstyled"
        value={p ?? ""}
        placeholder={t("mailEditor.paragraphPlaceholder")}
        onChange={e => setP(e.target.value)}
      />
    </Box>
  );
};
export default SectionInput;
