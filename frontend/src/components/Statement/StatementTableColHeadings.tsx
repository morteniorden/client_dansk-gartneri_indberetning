import { Th, Tr } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  h1?: string;
  h2?: string;
  h3?: string;
}

const StatementTableColHeadings: FC<Props> = ({ h1, h2, h3 }) => {
  return (
    <Tr>
      <Th>{h1}</Th>
      <Th>{h2}</Th>
      <Th>{h3}</Th>
    </Tr>
  );
};
export default StatementTableColHeadings;
