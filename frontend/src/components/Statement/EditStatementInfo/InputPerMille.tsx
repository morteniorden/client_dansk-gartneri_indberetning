import {
  Box,
  Flex,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";
import { FC, useState } from "react";

interface Props {}

const InputPerMille: FC<Props> = ({}) => {
  const format = (val: string) => val + "‰";
  const parse = (val: string) => val.replace(/^‰/, "");

  const [value, setValue] = useState("1.53");

  return (
    <Flex w="100%">
      <InputGroup>
        <InputLeftAddon>Afgift:</InputLeftAddon>
        <NumberInput
          onChange={(valueString: string) => setValue(parse(valueString))}
          value={format(value)}
          min={0} //Not sure about the range
          max={1000} //Not sure about the range
          precision={2}>
          <NumberInputField roundedLeft="none" />
        </NumberInput>
      </InputGroup>
    </Flex>
  );
};
export default InputPerMille;
