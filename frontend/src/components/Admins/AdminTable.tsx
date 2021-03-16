import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IUserDto } from "services/backend/nswagts";

import AdminItemMenu from "./AdminItemMenu";

interface Props {
  data: IUserDto[];
  tableKeyIds: string[];
}

const AdminTable: FC<Props> = ({ data, tableKeyIds }) => {
  const { t, locale, localeNameMap } = useLocales();

  return (
    <Flex>
      <Table>
        <Thead>
          <Tr>
            {tableKeyIds.map(key => (
              <Th key={key}>{t(`accounts.${key}`)}</Th>
            ))}
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(admin => {
            return (
              <Tr key={admin.id}>
                {tableKeyIds.map(key => (
                  <Td key={key}>{admin[key as keyof IUserDto]}</Td>
                ))}
                <Td isNumeric={true}>
                  <AdminItemMenu admin={admin} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
};
export default AdminTable;
