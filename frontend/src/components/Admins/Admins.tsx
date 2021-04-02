import { Flex, Heading, Stack } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useEffect, useReducer } from "react";
import ListReducer from "react-list-reducer";
import { IUserDto } from "services/backend/nswagts";

import AdminTable from "./AdminTable";

const Admins: FC = () => {
  const { t } = useLocales();

  const [admins, dispatchAdmins] = useReducer(ListReducer<IUserDto>("id"), []);

  const fetchData = useCallback(async () => {
    //Add logic to fetch data.
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Stack spacing={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading>{t("admins.admins")}</Heading>
      </Flex>
      <AdminTable data={admins} tableKeyIds={["id", "name", "email"]} />
    </Stack>
  );
};
export default Admins;
