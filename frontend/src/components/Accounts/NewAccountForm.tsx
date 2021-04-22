import { Button, Flex, FormControl, FormLabel, Input, ModalHeader, Spacer } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { genUserClient } from "services/backend/apiClients";
import { ClientDto, CreateClientCommand, IClientDto } from "services/backend/nswagts";
import { CVRDataDto } from "services/cvr/api";

import CvrButton from "./CvrButton";

interface Props {
  onSubmit: (e: React.FormEvent) => void;
}

const NewAccountForm: FC<Props> = ({ onSubmit }) => {
  const { t } = useLocales();

  const [localForm, setLocalClientForm] = useState<IClientDto>(
    new ClientDto({
      name: "",
      email: "",
      tel: "",
      cvrNumber: "",
      address: {
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        addressLine4: ""
      }
    })
  );

  const formUpdateReform = useCallback((value: unknown, key: keyof typeof localForm) => {
    setLocalClientForm(form => {
      (form[key] as unknown) = value;
      return { ...form };
    });
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      formUpdateReform(e.target.value, e.target.id as keyof typeof localForm);
    },
    [formUpdateReform]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const userClient = await genUserClient();
      await userClient.createClient(
        new CreateClientCommand({
          clientDto: localForm
        })
      );
      onSubmit(e);
    },
    [localForm]
  );

  const handleGetFromCvr = useCallback(
    (result: CVRDataDto) => setLocalClientForm({ ...localForm, ...result }),
    [localForm]
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="name" isRequired>
        <FormLabel htmlFor="name">{t("accounts.name")}</FormLabel>
        <Input value={localForm.name} onChange={handleInputChange}></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">{t("accounts.email")}</FormLabel>
        <Input type="email" value={localForm.email} onChange={handleInputChange}></Input>
      </FormControl>
      <FormControl id="tel" isRequired>
        <FormLabel htmlFor="email">{t("accounts.tel")}</FormLabel>
        <Input type="tel" value={localForm.tel} onChange={handleInputChange}></Input>
      </FormControl>
      <FormControl id="cvrNumber" isRequired>
        <FormLabel htmlFor="cvrNumber">{t("accounts.cvrNumber")}</FormLabel>
        <Input value={localForm.cvrNumber} onChange={handleInputChange}></Input>
        <CvrButton cvrNumber={localForm.cvrNumber} onClick={handleGetFromCvr} />
      </FormControl>
      <Spacer h={5} />
      <ModalHeader p={0} mb={5}>
        {t("accounts.address")}
      </ModalHeader>
      <FormControl id="addressLine1">
        <FormLabel htmlFor="addressLine1">{t("accounts.addressLine1")}</FormLabel>
        <Input value={localForm.address.addressLine1} onChange={handleInputChange}></Input>
      </FormControl>
      <FormControl id="addressLine2">
        <FormLabel htmlFor="addressLine2">{t("accounts.addressLine2")}</FormLabel>
        <Input value={localForm.address.addressLine2} onChange={handleInputChange}></Input>
      </FormControl>
      <FormControl id="addressLine3">
        <FormLabel htmlFor="addressLine3">{t("accounts.addressLine3")}</FormLabel>
        <Input value={localForm.address.addressLine3} onChange={handleInputChange}></Input>
      </FormControl>
      <FormControl id="addressLine4">
        <FormLabel htmlFor="addressLine4">{t("accounts.addressLine4")}</FormLabel>
        <Input value={localForm.address.addressLine4} onChange={handleInputChange}></Input>
      </FormControl>
      <Flex justifyContent="flex-end" w="100%" mt={5}>
        <Button colorScheme="green" type="submit">
          {t("common.add")}
        </Button>
      </Flex>
    </form>
  );
};
export default NewAccountForm;
