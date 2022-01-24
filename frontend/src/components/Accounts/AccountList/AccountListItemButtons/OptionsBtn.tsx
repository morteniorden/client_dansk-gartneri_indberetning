import { IconButton, Menu, MenuButton, MenuList, Tooltip } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { BsGearFill } from "react-icons/bs";
import { IClientDto, IStatementNoUsersDto } from "services/backend/nswagts";

import DeactivateClientModal from "./EditOptions/DeactivateClientModal";
import DownloadStatementFileBtn from "./EditOptions/DownloadStatementFileBtn";
import UploadStatementFileModal from "./EditOptions/UploadStatementFileModal";

interface Props {
  client: IClientDto;
  statement: IStatementNoUsersDto;
}

const OptionsBtn: FC<Props> = ({ client, statement }) => {
  const { t } = useLocales();

  return (
    <>
      <Menu>
        <Tooltip label={t("accounts.tooltipOptions")}>
          <MenuButton
            as={IconButton}
            aria-label="Invite to fill out statement"
            icon={<BsGearFill />}
            disabled={client.deactivationTime != null}></MenuButton>
        </Tooltip>
        <MenuList>
          <DeactivateClientModal client={client} />
          <UploadStatementFileModal statement={statement} />
          {statement?.statementFileName && <DownloadStatementFileBtn statement={statement} />}
        </MenuList>
      </Menu>
    </>
  );
};
export default OptionsBtn;
