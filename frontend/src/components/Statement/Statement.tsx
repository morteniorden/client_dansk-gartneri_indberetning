import BasicLayout from "components/Layouts/BasicLayout";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { genStatementClient } from "services/backend/apiClients";
import { IStatementDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import StatementForm from "./StatementForm";

interface Props {
  id: number;
}

const Statement: FC<Props> = ({ id }) => {
  const { t } = useLocales();
  const router = useRouter();
  const [statement, setStatement] = useState<IStatementDto>(null);

  const fetchData = useCallback(async () => {
    try {
      const statementClient = await genStatementClient();
      const data = await statementClient.getStatement(id);

      if (data != null) setStatement(data);
      else {
        logger.info("statementClient.get no data");
        router.push("/mystatements");
      }
    } catch (err) {
      logger.warn("statementClient.get Error", err);
      router.push("mystatements");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {statement && (
        <BasicLayout variant="statementHeader" maxW="1000px">
          <StatementForm statement={statement} />
        </BasicLayout>
      )}
    </>
  );
};
export default Statement;
