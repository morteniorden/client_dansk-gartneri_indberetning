import { Box, Heading } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, ReactNode } from "react";

interface Props {
  heading: string;
  children: ReactNode;
}

const StatementSection: FC<Props> = ({ heading, children }) => {
  const { t } = useLocales();
  const { boxBorder } = useColors();

  return (
    <Box shadow="sm" p={10} border="1px" borderColor={boxBorder} rounded="md">
      <Heading size="md" mb={3}>
        {heading}
      </Heading>
      {children}
    </Box>
  );
};
export default StatementSection;
