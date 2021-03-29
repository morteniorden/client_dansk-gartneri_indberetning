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
    CVR_apiErrorDescription: "Could not find CVR number in the registry",
    accountant: "Accountant",
    fetching: "Fetching clients..."
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

  accountant: {
    editAccountant: "Edit accountant",
    addAccountant: "Add new accountant",
    noAccountant: "No accountant",
    addSuccessTitle: "Accountant added",
    addSuccessText: "An email has been sent to the accountant with an invite to the system.",
    addErrorTitle: "An error occured",
    addErrorText: "Addition unsuccesfull. Please try again later.",
    deleteSuccessTitle: "Accountant unassigned",
    deleteSuccessText: "The accountant has been unassigned and deactivated.",
    deleteErrorTitle: "Unassignment failed",
    deleteErrorText: "Something went wrong. Please try again later.",
    alreadyAssignedTitle: "Error",
    alreadyAssignedText:
      "This email is used by an accountant, that is already assigned to a client."
  }
};
