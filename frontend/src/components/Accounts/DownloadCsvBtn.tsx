import { IconButton, Tooltip } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback } from "react";
import { FiDownload } from "react-icons/fi";
import { genStatementClient } from "services/backend/apiClients";

interface Props {
  accountingYear: number;
}

const DownloadCsvBtn: FC<Props> = ({ accountingYear }) => {
  const { t } = useLocales();

  const downloadCSV = useCallback(async () => {
    try {
      const statementclient = await genStatementClient();
      const res = await statementclient.getStatementsCSV(accountingYear);
      const uri = "data:text/csv;charset=utf-8," + res.content;

      const downloadLink = document.createElement("a");
      downloadLink.href = uri;
      downloadLink.download = res.fileName;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error(err);
    }
  }, [accountingYear]);

  return (
    <Tooltip label={t("statements.downloadCsv")}>
      <IconButton aria-label="Download csv" icon={<FiDownload />} onClick={e => downloadCSV()} />
    </Tooltip>
  );
};
export default DownloadCsvBtn;
