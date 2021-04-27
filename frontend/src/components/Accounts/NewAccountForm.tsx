import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  ModalHeader,
  Spacer
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useState } from "react";
import { genUserClient } from "services/backend/apiClients";
import {
  AddressDto,
  ClientDto,
  CreateClientCommand,
  IAddressDto,
  IClientDto,
  RoleEnum
} from "services/backend/nswagts";
import { CVRDataDto } from "services/cvr/api";

import CvrButton from "./CvrButton";

interface Props {
  onSubmit: (e: React.FormEvent) => void;
}

const NewAccountForm: FC<Props> = ({ onSubmit }) => {
  const { t } = useLocales();

  const [localForm, setLocalClientForm] = useState<IClientDto>(
    new ClientDto({
      id: 0,
      name: "",
      email: "",
      tel: "",
      cvrNumber: "",
      role: RoleEnum.Client
    })
  );
  const [address, setAddress] = useState<IAddressDto>(
    new AddressDto({ firmName: "", ownerName: "", addressAndPlace: "", postalCode: "", city: "" })
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
      const command = new CreateClientCommand({
        clientDto: { ...localForm, ...{ address: address } }
      });
      console.log(command);
      await userClient.createClient(command);
      onSubmit(e);
    },
    [localForm, address]
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
      <FormControl id="firmName">
        <FormLabel htmlFor="firmName">{t("accounts.firmName")}</FormLabel>
        <Input
          value={address.firmName}
          onChange={e => setAddress({ ...address, ...{ firmName: e.target.value } })}></Input>
      </FormControl>
      <FormControl id="ownerName">
        <FormLabel htmlFor="ownerName">{t("accounts.ownerName")}</FormLabel>
        <Input
          value={address.ownerName}
          onChange={e => setAddress({ ...address, ...{ ownerName: e.target.value } })}></Input>
      </FormControl>
      <FormControl id="addressAndPlace">
        <FormLabel htmlFor="addressAndPlace">{t("accounts.addressAndPlace")}</FormLabel>
        <Input
          value={address.addressAndPlace}
          onChange={e =>
            setAddress({ ...address, ...{ addressAndPlace: e.target.value } })
          }></Input>
      </FormControl>
      <HStack>
        <FormControl id="postalCode">
          <FormLabel htmlFor="postalCode">{t("accounts.postalCode")}</FormLabel>
          <Input
            value={address.postalCode}
            onChange={e => setAddress({ ...address, ...{ postalCode: e.target.value } })}></Input>
        </FormControl>
        <FormControl id="city">
          <FormLabel htmlFor="city">{t("accounts.city")}</FormLabel>
          <Input
            value={address.city}
            onChange={e => setAddress({ ...address, ...{ city: e.target.value } })}></Input>
        </FormControl>
      </HStack>
      <Flex justifyContent="flex-end" w="100%" mt={5}>
        <Button colorScheme="green" type="submit">
          {t("common.add")}
        </Button>
      </Flex>
    </form>
  );
};
export default NewAccountForm;
