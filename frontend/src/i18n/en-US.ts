import { Locale } from "./Locale";

export const table: Locale = {
  locale: "English (US)",
  flagUrl: "images/icons/US.svg",

  example: {
    title: "Hello World",
    byLine: "When data is loading it is displayed below",
    dataLine: "Child {{id}} of type {{type}}",

    actions: {
      addNew: "Add new Child"
    }
  },

  common: {
    search: "Search",
    add: "Add"
  },

  accounts: {
    accounts: "Accounts",
    id: "Id#",
    name: "Name",
    email: "Email",
    tel: "Tel",
    address: "Address",
    address1: "Address 1",
    address2: "Address 2",
    cvrNumber: "CVR",
    addAccount: "Add account",
    street: "Street",
    streetNum: "Number",
    postCode: "Zip",
    city: "City",
    country: "Country",
    addressLine1: "Line 1",
    addressLine2: "Line 2",
    addressLine3: "Line 3",
    addressLine4: "Line 4",
    CVR_getFromRegistry: "Get info from CVR-registry",
    CVR_apiErrorTitle: "CVR not found",
    CVR_apiErrorDescription: "Could not find CVR number in the registry"
  },

  login: {
    email: "Email:",
    password: "Password:",
    login: "Log in",
    forgotPassword: "Forgot password?",
    invalidMsg: "Invalid credentials. Please try again."
  }
};
