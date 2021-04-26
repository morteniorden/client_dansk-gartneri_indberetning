import { Heading, Stack } from "@chakra-ui/react";
import AccountingYearSelect from "components/Common/AccountingYearSelect";
import FetchingSpinner from "components/Common/FetchingSpinner";
import BasicLayout from "components/Layouts/BasicLayout";
import { useAuth } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { genStatementClient } from "services/backend/apiClients";
import { IStatementDto, RoleEnum } from "services/backend/nswagts";
import { logger } from "utils/logger";

import AccountantStatements from "./AccountantStatements";
import ClientStatements from "./ClientStatements";

const MyStatements: FC = () => {
  const { t } = useLocales();
  const [statements, setStatements] = useState<IStatementDto[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [accountingYear, setAccountingYear] = useState<number>();
  const { activeUser } = useAuth();

  const accountingYears = useMemo(
    () =>
      statements
        .reduce((acc: number[], statement: IStatementDto) => {
          if (!acc.some(s => s == statement.accountingYear)) acc.push(statement.accountingYear);
          return acc;
        }, [])
        .sort((a, b) => b - a),
    [statements]
  );

  const fetchData = useCallback(async () => {
    try {
      setIsFetching(true);
      const statementClient = await genStatementClient();
      const data = await statementClient.getMyStatements();

      if (data != null) {
        setStatements(data);
      } else logger.info("accountclient.get no data");
    } catch (err) {
      logger.warn("accountclient.get Error", err);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (accountingYears.length > 0) setAccountingYear(accountingYears[0]);
  }, [accountingYears]);

  return (
    <BasicLayout maxW="80vw">
      <Stack spacing={10}>
        <Heading>{t("statements.myStatements")}</Heading>
        {activeUser?.role == RoleEnum.Accountant && (
          <AccountingYearSelect
            options={accountingYears}
            value={accountingYear}
            cb={setAccountingYear}
          />
        )}
        <FetchingSpinner isFetching={isFetching} text={t("common.fetchingData")} />
        {activeUser?.role == RoleEnum.Client && (
          <ClientStatements statements={statements} isFetching={isFetching} />
        )}
        {activeUser?.role == RoleEnum.Accountant && (
          <AccountantStatements
            statements={statements}
            isFetching={isFetching}
            accountingYear={accountingYear}
          />
        )}
      </Stack>
    </BasicLayout>
  );
};
export default MyStatements;
