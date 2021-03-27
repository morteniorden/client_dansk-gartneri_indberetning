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
  },

  admins: {
    admins: "Admins"
  },

  actions: {
    update: "Update",
    delete: "Delete"
  },

  password: {
    password: "Password:",
    repeatPassword: "Repeat password:",
    newPassword: "New password:",
    repeatNewPassword: "Repeat new password:",
    dontMatch: "De to passwords er ikke ens.",
    tooShort: "Skal være på minds 8 karakterer.",
    missingUppercase: "Skal have mindst ét stort bogstav.",
    missingLowercase: "Skal have mindst ét lille bogstav.",
    missingNumber: "Skal have mindst ét tal.",
    changePassword: "Update password",
    changeSuccessTitle: "Password updatet",
    changeSuccessText: "Your password has been updated.",
    changeFailTitle: "Error",
    changeFailText: "Something went wrong, please try again."
  },

  mailEditor: {
    paragraph: "Paragraph",
    heading: "Heading",
    ctaButtonInputLabel: "Button text:",
    preview: "Preview"
  }
};
