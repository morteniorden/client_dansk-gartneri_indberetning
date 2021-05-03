import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IUserDto } from "services/backend/nswagts";

import DeactivateAdminModal from "./DeactivateAdminModal";

interface Props {
  data: IUserDto[];
  tableKeyIds: string[];
  onDeleteAdmin: () => void;
}

const AdminTable: FC<Props> = ({ data, tableKeyIds, onDeleteAdmin }) => {
  const { t } = useLocales();

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
          {data
            .filter(admin => admin.deactivationTime == null)
            .sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              return 0;
            })
            .map(admin => {
              return (
                <Tr key={admin.id}>
                  {tableKeyIds.map(key => (
                    <Td key={key}>{admin[key as keyof IUserDto]}</Td>
                  ))}
                  <Td isNumeric={true}>
                    {/* This is to prevent deactivating the super admin. Should perhaps also be prevented in backend. */}
                    {admin.id != 1 && (
                      <DeactivateAdminModal admin={admin} onSubmit={onDeleteAdmin} />
                    )}
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
