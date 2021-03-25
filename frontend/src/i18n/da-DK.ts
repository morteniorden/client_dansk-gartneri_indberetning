import { Locale } from "./Locale";

export const table: Locale = {
  locale: "Dansk",
  flagUrl: "images/icons/DK.svg",

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

  login: {
    email: "Email:",
    password: "Password:",
    login: "Log ind",
    forgotPassword: "Glemt password?",
    invalidMsg: "Fejl i email eller password. Prøv igen."
  },

  admins: {
    admins: "Administratorer"
  },

  actions: {
    update: "Opdatér",
    delete: "Slet"
  },

  password: {
    password: "Password:",
    repeatPassword: "Gentag password:",
    dontMatch: "De to passwords er ikke ens.",
    tooShort: "Skal være på minds 8 karakterer.",
    missingUppercase: "Skal have mindst ét stort bogstav.",
    missingLowercase: "Skal have mindst ét lille bogstav.",
    missingNumber: "Skal have mindst ét tal.",
    changePassword: "Opdater password",
    changeSuccessTitle: "Password opdateret",
    changeSuccessText: "Dit password er nu blevet opdateret.",
    changeFailTitle: "Fejl",
    changeFailText: "Noget gik galt, prøv igen senere."
  }
};
