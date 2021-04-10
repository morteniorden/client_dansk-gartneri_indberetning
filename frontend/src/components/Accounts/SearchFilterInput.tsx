import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback } from "react";
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchFilterInput: FC<Props> = ({ value, onChange }) => {
  const { t } = useLocales();
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    []
  );

  const handleClear = useCallback(() => onChange(""), []);

  return (
    <InputGroup>
      <InputLeftElement>
        <BiSearch opacity="0.4" />
      </InputLeftElement>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={t("common.search")}
        rounded="full"></Input>
      <InputRightElement>
        <IconButton
          aria-label="Clear"
          icon={<MdClear opacity="0.4" />}
          onClick={handleClear}
          variant="ghost"
          isRound={true}
        />
      </InputRightElement>
    </InputGroup>
  );
};
export default SearchFilterInput;
