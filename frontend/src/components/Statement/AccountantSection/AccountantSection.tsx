import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { FiDownload } from "react-icons/fi";

const AccountantSection: FC = () => {
  const { t } = useLocales();
  const { boxBorder } = useColors();

  return (
    <Box shadow="sm" p={10} border="1px" borderColor={boxBorder} rounded="md">
      <Stack>
        <Heading size="md" mb={3}>
          Sektion for revisor
        </Heading>
        <Text>
          Før oplysningsskemaet kan signeres som godkendt, skal følgende erklæring downloades,
          udfyldes og uploades herunder.
        </Text>
        <HStack>
          <FiDownload />
          <Button variant="link" w="min">
            Hent erklæring
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};
export default AccountantSection;
