import { IconButton, Tooltip } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { MdSupervisorAccount } from "react-icons/md";
import { IClientDto } from "services/backend/nswagts";

interface Props {
  client: IClientDto;
  cb: () => void;
}

const EditAccountantBtn: FC<Props> = ({ client: account, cb }) => {
  const { t } = useLocales();
  const { iconGreenColor } = useColors();

  return <div></div>;
};
export default EditAccountantBtn;
/*
<Tooltip label={t("accounts.tooltipEditAccountant")}>
      <IconButton
        aria-label="Edit accountant"
        color={account.accountant != null ? iconGreenColor : "auto"}
        onClick={cb}
        icon={<MdSupervisorAccount />}
      />
    </Tooltip>
*/
