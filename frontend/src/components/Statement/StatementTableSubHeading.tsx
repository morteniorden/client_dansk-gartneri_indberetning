import { Divider, Heading, Stack, Td, Tr } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  colSpan?: number;
}

const StatementTableSubHeading: FC<Props> = ({ children, colSpan }) => {
  return (
    <Tr>
      <Td colSpan={colSpan ?? 3}>
        <Stack>
          <Heading size="sm">{children}</Heading>
          <Divider />
        </Stack>
      </Td>
    </Tr>
  );
};
export default StatementTableSubHeading;
