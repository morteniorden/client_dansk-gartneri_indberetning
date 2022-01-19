import { MenuItem } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback } from "react";
import { genStatementClient } from "services/backend/apiClients";
import { IStatementNoUsersDto } from "services/backend/nswagts";
import { downloadFile } from "utils/downloadFile";

interface Props {
  statement: IStatementNoUsersDto;
}

const DownloadStatementFileBtn: FC<Props> = ({ statement }) => {
  const { t } = useLocales();

  const download = useCallback(async () => {
    const statementClient = await genStatementClient();
    const data = await statementClient.getStatementFile(statement.id);

    downloadFile(data.data, data.fileName);
  }, [statement]);

  return <MenuItem onClick={download}>{t("statementFile.download")}</MenuItem>;
};

export default DownloadStatementFileBtn;
