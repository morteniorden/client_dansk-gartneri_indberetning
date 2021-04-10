import { HStack, Spinner, Text } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  isFetching: boolean;
  text: string;
}

const FetchingSpinner: FC<Props> = ({ isFetching, text }) => {
  return (
    <HStack h="20px" alignItems="center">
      {isFetching && (
        <>
          <Spinner size="sm" />
          <Text>{text}</Text>
        </>
      )}
    </HStack>
  );
};
export default FetchingSpinner;
