import { IconButton, Tooltip } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { MdAssignment } from "react-icons/md";

interface Props {
  disabled?: boolean;
  cb?: () => void;
}

const ViewStatementBtn: FC<Props> = ({ disabled, cb }) => {
  const { t } = useLocales();

  return (
    <Tooltip
      label={disabled ? t("accounts.tooltipNotYetSignedOff") : t("accounts.tooltipReadStatement")}>
      {/*wrapping div is needed to make the tooltip appear if button is disabled*/}
      <div>
        <IconButton
          onClick={cb}
          aria-label="Read statement"
          icon={<MdAssignment />}
          disabled={disabled}
        />
      </div>
    </Tooltip>
  );
};
export default ViewStatementBtn;
