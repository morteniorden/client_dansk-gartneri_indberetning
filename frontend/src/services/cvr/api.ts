export interface CVRDataDto {
  name: string;
  email: string;
  tel: string;
  firmName: string;
  AddressAndPlace: string;
  postalCode: string;
  city: string;
}

export const getDataFromCVR = async (cvr: string): Promise<CVRDataDto> => {
  const url = "https://cvrapi.dk/api?country=dk&vat=";

  const result = await fetch(url + cvr);
  if (!result.ok) throw new Error("Not 2xx response");
  const data = await result.json();

  return {
    name: data.name ?? "",
    email: data.email ?? "",
    tel: data.phone ?? "",
    firmName: data.name ?? "",
    AddressAndPlace: data.address ?? "",
    postalCode: data.zipcode ?? "",
    city: data.city ?? ""
  };
};
