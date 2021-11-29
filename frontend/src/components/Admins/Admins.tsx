import { Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import FetchingSpinner from "components/Common/FetchingSpinner";
import BasicLayout from "components/Layouts/BasicLayout";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genUserClient } from "services/backend/apiClients";
import { IUserDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import AddAdminModal from "./AddAdminModal";
import AdminTable from "./AdminTable";

const Admins: FC = () => {
  const { t } = useLocales();

  const [isFetching, setIsFetching] = useState(false);
  const [admins, dispatchAdmins] = useReducer(ListReducer<IUserDto>("id"), []);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    try {
      const userClient = await genUserClient();
      const data = await userClient.getAllAdmins();

      console.log(data);

      if (data && data.length > 0)
        dispatchAdmins({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <BasicLayout maxW="1500px">
      <Stack spacing={4}>
        <Heading>{t("admins.admins")}</Heading>
        <Flex justifyContent="flex-end">
          <HStack spacing={5}>
            <AddAdminModal onSubmit={fetchData} />
          </HStack>
        </Flex>
        <FetchingSpinner isFetching={isFetching} text={t("accounts.fetching")} />
        <AdminTable data={admins} tableKeyIds={["name", "email"]} onDeleteAdmin={fetchData} />
      </Stack>
    </BasicLayout>
  );
};
export default Admins;
