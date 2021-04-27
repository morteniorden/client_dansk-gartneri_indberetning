import { Box, Heading } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";

interface Props {
  heading: string;
}

const StatementSection: FC<Props> = ({ heading, children }) => {
  const { t } = useLocales();
  const { boxBorder } = useColors();

  return (
    <Box shadow="sm" p={10} border="1px" borderColor={boxBorder} rounded="md">
      <Heading size="md">{heading}</Heading>
      {children}
    </Box>
  );
};
export default StatementSection;
