import { Text } from "@chakra-ui/react";
import { Dispatch, FC } from "react";
import { AllListActions } from "react-list-reducer";
import { IClientDto } from "services/backend/nswagts";

interface Props {
  client: IClientDto;
  dispatchClient: Dispatch<AllListActions<IClientDto>>;
}

const MailManyRow: FC<Props> = ({ client, dispatchClient }) => {
  return <Text>{client.email}</Text>;
};

export default MailManyRow;
