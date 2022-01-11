import {
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Td,
  Text,
  Tr
} from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { FC, ReactElement, ReactText } from "react";
import { BsInfoCircle } from "react-icons/bs";

interface Props {
  text: string;
  subText?: string;
  tax?: ReactText;
  helpInfo?: string;
  TaxTotal?: ReactElement;
}

const StatementTableRow: FC<Props> = ({ text, subText, tax, helpInfo, children, TaxTotal }) => {
  const { subTextColor } = useColors();

  return (
    <Tr>
      <Td>
        <HStack>
          {helpInfo && (
            <Popover>
              <PopoverTrigger>
                <IconButton
                  aria-label="info"
                  icon={<BsInfoCircle size="20px" />}
                  isRound={true}
                  w="0"
                  size="sm"
                  variant="ghost"
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>{helpInfo}</PopoverBody>
              </PopoverContent>
            </Popover>
          )}
          <Stack spacing={0}>
            <Text>{text}</Text>
            <Text fontSize="sm" color={subTextColor}>
              {subText}
            </Text>
          </Stack>
        </HStack>
      </Td>
      <Td>{children}</Td>
      <Td>{tax && Number(tax).toFixed(2) + "‰"}</Td>
      <Td>{TaxTotal && TaxTotal}</Td>
    </Tr>
  );
};
export default StatementTableRow;
