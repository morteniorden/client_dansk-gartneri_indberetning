import { Locale } from "./Locale";

export const table: Locale = {
  locale: "Dansk",

  example: {
    title: "Hej Verden",
    byLine: "Når dataen er indhentet vises den her",
    dataLine: "{{type}} Barn {{id}} ",

    actions: {
      addNew: "Tilføj et nyt barn"
    }
  },

  common: {
    search: "Søg",
    add: "Tilføj"
  },

  accounts: {
    accounts: "Kunder",
    id: "Id#",
    name: "Navn",
    email: "Email",
    tel: "Tlf.",
    address: "Addresse",
    address1: "Adresse 1",
    address2: "Adresse 2",
    cvrNumber: "CVR",
    addAccount: "Tilføj kunde",
    street: "Vej",
    streetNum: "Nr.",
    postCode: "Postnr.",
    city: "By",
    country: "Land",
    addressLine1: "Linje 1",
    addressLine2: "Linje 2",
    addressLine3: "Linje 3",
    addressLine4: "Linje 4",
    CVR_getFromRegistry: "Hent info fra CVR-registret",
    CVR_apiErrorTitle: "CVR ikke fundet",
    CVR_apiErrorDescription: "Kunne ikke finde CVR-nummer i registret"
  },

  password: {
    dontMatch: "De to passwords er ikke ens.",
    tooShort: "Skal være på minds 8 karakterer.",
    missingUppercase: "Skal have mindst ét stort bogstav.",
    missingLowercase: "Skal have mindst ét lille bogstav.",
    missingNumber: "Skal have mindst ét tal."
  }
};
