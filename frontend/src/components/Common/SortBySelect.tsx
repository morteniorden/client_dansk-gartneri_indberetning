import { InputGroup, InputLeftAddon, Select, Text } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";

interface Props {
  value: number;
  cb: (sortId: number) => void;
}

export const Sorting: string[] = ["Name", "Status"];

const SortBySelect: FC<Props> = ({ value, cb }) => {
  const { t } = useLocales();
  return (
    <InputGroup>
      <InputLeftAddon roundedStart="md">{t("statements.sort.sortBy")}:</InputLeftAddon>
      <Select
        w="wrap-content"
        value={Sorting[value]}
        onChange={e => cb(Sorting.indexOf(e.target.value))}
        roundedStart="none"
        roundedEnd="md">
        {Sorting.map(sort => (
          <option key={sort} value={sort}>
            {t(`statements.sort.${sort}`)}
          </option>
        ))}
      </Select>
    </InputGroup>
  );
};

export default SortBySelect;
