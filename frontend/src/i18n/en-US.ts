import { Locale } from "./Locale";

export const table: Locale = {
  locale: "English (US)",
  flagUrl: "images/icons/US.svg",
  currencyCode: "USD",

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
    add: "Add",
    fetchingData: "Loading data...",
    saveSuccessTitle: "Changes saved",
    saveSuccessText: "Your changes has been saved.",
    saveErrorTitle: "Error",
    saveErrorText: "An error occured when trying to save your changes."
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
    fetching: "Fetching clients...",
    statementStatus: "Statement status"
  },

  login: {
    email: "Email:",
    password: "Password:",
    login: "Log in",
    forgotPassword: "Forgot password?",
    invalidMsg: "Invalid credentials. Please try again.",
    logout: "Logout"
  },

  admins: {
    admins: "Admins"
  },

  actions: {
    update: "Update",
    delete: "Delete",
    saveChanges: "Gem ændringer",
    saveSuccessTitle: "Changes saved",
    saveSuccessText: "Your changes has been saved.",
    saveErrorTitle: "Error",
    saveErrorText: "An error happened when trying to save your changes.",
    back: "Cancel"
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
  },

  mailEditor: {
    editEmails: "Edit emails",
    name: "Email name:",
    subject: "Subject:",
    ctaButtonInputLabel: "Button:",
    preview: "Preview",
    nameTooltip: "Name of the mail. Is not visible to the recipient.",
    subjectTooltip: "Subject of the mail, as it is visible to the recipient.",
    ctaTooltip: "Text on the button at the bottom of th email.",
    section: "Section",
    headingPlaceholder: "Heading here",
    paragraphPlaceholder: "Paragraph here"
  },

  //TODO: Translate these
  statements: {
    myStatements: "Mine indberetninger",
    turnoverExlMoms: "Omsætning excl. moms",
    taxIs: "Afgiften udgør",
    boughtPlants: "Indkøbte planter",
    other: "Andet",
    expences: "Udgifter",
    accountingYear: "Revisionsår",
    editStatementHeading: "Oplysningsskema",
    signOff: "Sign off",
    confirmSignOffButton: "Underskriv",
    confirmSignOffText: "Du er ved at underskrive dit oplysningsskema. Vil du fortsætte?",

    signOffSuccessTitle: "Indberetning underskrevet",
    signOffSuccessText: "Din indberetning er nu underskrevet og indsendt.",
    signOffErrorTitle: "Fejl",
    signOffErrorText: "Der skete en fejl, da vi forsøgte at behandle din underskrivning.",

    signOffExceeding:
      "The total turnover is of an amount that requires the approval by an accounant.",
    signOffNeedsApproval: "The statement has not yet been approved by the assigned accountant.",

    section1: {
      heading: "1. Grøntsager i væksthus",
      mushrooms: "Svampe",
      tomatoCucumberHerbs: "Tomat, agurk, krydderurt",
      boughtPlantsDesc: "(excl. moms, ikke for svampe)"
    },
    section3: {
      heading: "3. Grøntsager på friland",
      turnoverExlPotatoes: "(excl. kartofler) Omsætning excl. moms",
      carrot: "Gulerod",
      pea: "Ært",
      onion: "Løg",
      boughtPlantsDesc: "(excl. moms kun vedr. stikløg eller andet)"
    },
    section4: {
      heading: "4. Potteplanter m.v.",
      onions: "Løg og knolde",
      plants: "Potteplanter",
      flowers: "Snitblomster",
      boughtPlantsDesc: "(excl. moms kun vedr. snitblomster)"
    },
    section7: {
      heading: "7. Planteskoleplanter",
      description: "Inklusive videre- og detailsalg",
      plants: "Planteskoleplanter",
      turnoverDescription:
        "(Indkøb og salg af planter ved direkte import fra udlandet skal ikke medregnes hverken i omsætning eller plantekøb.)",
      boughtPlantsDesc: "(excl. moms)"
    },
    section8: {
      heading: "8. Frugt og bær",
      subHeading1: "Kernefrugt",
      subHeading2: "Stenfrugt",
      subHeading3: "Busk- og bærfrugt",
      packagingCost: "Udgifter til emballage og indkøbt salgsfragt",
      packagingCostDesc: "(for producenter med eget lager, excl. moms)",
      applesPearsOther: "Æbler, pærer m.v.",
      cherry: "Kirsebær",
      plum: "Blommer",
      currant: "Ribs",
      strawberry: "Jordbær"
    }
  }
};
