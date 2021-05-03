import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { IClientDto } from "services/backend/nswagts";

interface Props {
  clients: IClientDto[];
  cb?: (clients: IClientDto[]) => void;
}

const SearchBar: FC<Props> = ({ clients, cb }) => {
  const { t } = useLocales();
  const [searchString, setSearchString] = useState<string>("");

  const filteredClients = useMemo(
    () =>
      clients.filter(client =>
        [client.name, client.email].some(s =>
          s.toLowerCase().includes(searchString.toLocaleLowerCase())
        )
      ),
    [clients, searchString]
  );

  useEffect(() => {
    cb(filteredClients);
  }, [filteredClients]);

  const timeoutms = 200;
  const timer = useRef<NodeJS.Timeout>(null);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(
        () => setSearchString(e.target.value.length >= 3 ? e.target.value : ""),
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
      <Input onChange={onChange} placeholder={t("common.search")}></Input>
      <InputRightElement>
        <IconButton
          aria-label="Clear search"
          icon={<BiX opacity={0.5} />}
          onClick={e => setSearchString("")}
          variant="ghost"></IconButton>
      </InputRightElement>
    </InputGroup>
  );
};
export default SearchBar;
