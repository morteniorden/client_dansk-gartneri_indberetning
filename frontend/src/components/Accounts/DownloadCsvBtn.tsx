import { IconButton, Tooltip } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback } from "react";
import { FiDownload } from "react-icons/fi";
import { genStatementClient } from "services/backend/apiClients";

interface Props {
  accountingYear: number;
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

const DownloadCsvBtn: FC<Props> = ({ accountingYear }) => {
  const { t } = useLocales();

  const downloadCSV = useCallback(async () => {
    try {
      const statementclient = await genStatementClient();
      const res = await statementclient.getStatementsCSV(accountingYear);

      const blob = new Blob([base64ToArrayBuffer(res.content)], { type: "text/csv" });

      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
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
