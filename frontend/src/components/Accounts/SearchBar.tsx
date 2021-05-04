import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useRef, useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";

interface Props {
  cb?: (value: string) => void;
}

const SearchBar: FC<Props> = ({ cb }) => {
  const { t } = useLocales();
  const [value, setValue] = useState<string>("");

  const timeoutms = 200;
  const timer = useRef<NodeJS.Timeout>(null);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      clearTimeout(timer.current);
      timer.current = setTimeout(
        () => cb(e.target.value.length >= 3 ? e.target.value : ""),
        timeoutms
      );
    },
    [timer, timeoutms]
  );

  return (
    <InputGroup w="15em">
      <InputLeftElement>
        <BiSearch opacity={0.5} />
      </InputLeftElement>
      <Input value={value} onChange={onChange} placeholder={t("common.search")}></Input>
      <InputRightElement>
        <IconButton
          aria-label="Clear search"
          icon={<BiX opacity={0.5} />}
          onClick={e => {
            setValue("");
            cb("");
          }}
          variant="ghost"></IconButton>
      </InputRightElement>
    </InputGroup>
  );
};
export default SearchBar;
