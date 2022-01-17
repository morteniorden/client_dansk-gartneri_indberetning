import { MenuItem } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { genStatementClient } from "services/backend/apiClients";
import { IStatementNoUsersDto } from "services/backend/nswagts";
import { downloadFile } from "utils/downloadFile";

interface Props {
  statement: IStatementNoUsersDto;
}

function base64ToArrayBuffer(base64: string) {
  const binaryString = window.atob(base64);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

const DownloadStatementFileBtn: FC<Props> = ({ statement }) => {
  const download = useCallback(async () => {
    const statementClient = await genStatementClient();
    const data = await statementClient.getStatementFile(statement.id);

    downloadFile(new Blob([base64ToArrayBuffer(data.data)]), data.fileName);
  }, []);

  return (
    <>{statement.statementFileName && <MenuItem onClick={download}>Download file</MenuItem>}</>
  );
};

export default DownloadStatementFileBtn;
