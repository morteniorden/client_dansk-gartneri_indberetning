import { InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";

interface Props {
  value: number;
  options: number[];
  cb: (year: number) => void;
}

const AccountingYearSelect: FC<Props> = ({ value, options, cb }) => {
  const { t } = useLocales();
  return (
    <InputGroup>
      <InputLeftAddon roundedStart="full">{t("statements.accountingYear")}:</InputLeftAddon>
      <Select
        w="max-content"
        value={value}
        onChange={e => cb(parseInt(e.target.value))}
        roundedStart="none"
        roundedEnd="full">
        {options.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
    </InputGroup>
  );
};
export default AccountingYearSelect;
