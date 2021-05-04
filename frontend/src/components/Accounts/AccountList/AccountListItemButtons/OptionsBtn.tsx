import { IconButton, Menu, MenuButton, MenuList, Tooltip } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { BsGearFill } from "react-icons/bs";
import { IClientDto } from "services/backend/nswagts";

import DeactivateClientModal from "./EditOptions/DeactivateClientModal";

interface Props {
  client: IClientDto;
}

const OptionsBtn: FC<Props> = ({ client }) => {
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
        </MenuList>
      </Menu>
    </>
  );
};
export default OptionsBtn;
