import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import AccountingYearSelect from "components/Common/AccountingYearSelect";
import BasicLayout from "components/Layouts/BasicLayout";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useState } from "react";
import { genStatementClient } from "services/backend/apiClients";
import { IStatementInfoDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import StatementInfoForm from "./StatementInfoForm";

const EditStatementInfo: FC = () => {
  const [data, setData] = useState<IStatementInfoDto[]>([]);
  const [statementInfo, setStatementInfo] = useState<IStatementInfoDto>(null);
  const { t } = useLocales();

  const fetchData = useCallback(async () => {
    try {
      const statementClient = await genStatementClient();
      const data = await statementClient.getAllStatementInfo();

      if (data && data.length > 0) {
        setData(data);
        setStatementInfo(data.sort((a, b) => a.accountingYear - b.accountingYear)[0]);
      } else logger.info("statementClient.get no data");
    } catch (err) {
      logger.warn("statementClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <BasicLayout maxW="1000px">
      <Stack spacing={5}>
        <Heading>{t("statementInfo.editStatementInfo")}</Heading>
        <Flex justifyContent="space-between">
          <AccountingYearSelect
            value={statementInfo?.accountingYear}
            options={data.map(dat => dat.accountingYear).sort((a, b) => a - b)}
            cb={value => setStatementInfo(data.find(dat => dat.accountingYear == value))}
          />
          <Button colorScheme="green" type="submit" form="editStatementInfo">
            Gem ændringer
          </Button>
        </Flex>
        <StatementInfoForm form={statementInfo} setForm={setStatementInfo} />
      </Stack>
    </BasicLayout>
  );
};
export default EditStatementInfo;

/*
  const accountingYears = useMemo(() => {
    const startYear = 2021;
    const thisYear = new Date().getFullYear();
    const years = [];
    for (let i = thisYear; i >= startYear; i--) {
      years.push(i);
    }
    return years;
  }, []);

  const [accountingYear, setAccountingYear] = useState<number>(accountingYears[0]);
  */
