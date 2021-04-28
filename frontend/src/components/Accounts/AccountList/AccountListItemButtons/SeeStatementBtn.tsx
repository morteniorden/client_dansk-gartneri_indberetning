import { IconButton, Tooltip } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { MdAssignment } from "react-icons/md";
import { IClientDto } from "services/backend/nswagts";

interface Props {
  client?: IClientDto;
  accountingYear?: number;
  disabled?: boolean;
}

const SeeStatementBtn: FC<Props> = ({ client, accountingYear, disabled }) => {
  const { t } = useLocales();

  //TODO: Implement functionality

  return (
    <Tooltip
      label={disabled ? t("accounts.tooltipNotYetSignedOff") : t("accounts.tooltipReadStatement")}>
      {/*wrapping div is needed to make the tooltip appear if button is disabled*/}
      <div>
        <IconButton aria-label="Read statement" icon={<MdAssignment />} disabled={disabled} />
      </div>
    </Tooltip>
  );
};
export default SeeStatementBtn;
