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
    postalCode: "Zip",
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
    statementStatus: "Statement status",

    tooltipInvite: "Invite to fill out statement",
    tooltipNotYetSignedOff: "Not yet signed off",
    tooltipEditAccountant: "Edit accountant",
    tooltipShowInfo: "Show info",
    tooltipHideInfo: "Hide info",
    tooltipReadStatement: "See statement",

    firmName: "Firm name",
    ownerName: "Owner name",
    addressAndPlace: "Address (optionally place)",

    deactivateClient: "Deactivate client",
    confirmDeactivateUser: "You are about to deactivate this user. Do you want to proceed?",
    deactivateUserSuccessTitle: "User deactivated",
    deactivateUserSuccessText: "The user has now been deactivated.",
    deactivateUserErrorTitle: "Deactivation error",
    deactivateUserErrorText: "An error occured when trying to deactivate the user.",
    deactivated: "deactivated",
    showDeactive: "Show deactive"
  },

  login: {
    email: "Email:",
    password: "Password:",
    login: "Log in",
    forgotPassword: "Forgot password",
    forgotPasswordText:
      "Please enter your email, and we will send you a mail with a link to choose a new password.",
    invalidMsg: "Invalid credentials. Please try again.",
    logout: "Logout",
    sendResetPW: "Send mail",

    sendResetPWSuccesTitle: "Mail sent",
    sendResetPWSuccesText: "A mail has been sent with a link to reset your password.",
    sendResetPWErrorTitle: "Error",
    sendResetPWErrorText:
      "An error occured when trying to sent a mail to the provided mail address."
  },

  admins: {
    admins: "Admins",
    addAdmin: "Add admin",
    addAdminSuccessTitle: "Admin created",
    addAdminSuccessText: "The new admin was successfully created.",
    addAdminErrorTitle: "Error",
    addAdminErrorText: "An error occured when trying to add the new admin.",
    deactivateAdmin: "Deactivate admin",
    deactivateAdminText: "You are about to deactivate this admin. Do you want to proceed?"
  },

  actions: {
    update: "Update",
    delete: "Delete",
    remove: "Remove",
    deactivate: "Deactivate",
    saveChanges: "Gem ændringer",
    saveSuccessTitle: "Changes saved",
    saveSuccessText: "Your changes has been saved.",
    saveErrorTitle: "Error",
    saveErrorText: "An error happened when trying to save your changes.",
    back: "Cancel",
    sendRequest: "Send request",
    edit: "Edit"
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
      "This email is used by an accountant, that is already assigned to a client.",
    accountant: "Accountant",
    consultant: "Consultant",
    accountantType: "Choose accountant or consultant:"
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
    downloadCsv: "Download CSV",
    sendToAccountant: "Send to accountant or consultant",
    sendToAccountantText1:
      "Herunder kan du anmode en revisor eller uvildig konsulent om at godkende dit oplysningsskema for dette revisionsår. Dette giver revisoren eller konsulenten adgang til både at læse og redigere i dit oplysningsskema.",
    sendToAccountantText2:
      "Når revisoren eller konsulenten har godkendt dit oplysningsskema, vil det fremgå her på siden. Herefter er det op til dig at underskrive og indsende skemaet til Dansk Gartneri. Du vil have mulighed for at trække en anmodning tilbage og sende en ny.",

    statusNotInvited: "Not invited",
    statusInvited: "Invited",
    statusEdited: "Has edited",
    statusSignedOff: "Signed off",

    removeAccountant: "Remove accountant",
    removeConsultant: "Remove consultant",
    confirmRemoveAccountant:
      "You are about to unassign the accountant for this statement. Do you want to continue?",
    confirmRemoveApprovingAccountant:
      "You are about to unassign the accountant for this statement, even though he/she has declared consent to the statement. If you do, the consent will be withdrawn. Do you want to continue?",
    confirmRemoveConsultant:
      "You are about to unassign the consultant for this statement. Do you want to continue?",
    confirmRemoveApprovingConsultant:
      "You are about to unassign the consultant for this statement, even though he/she has approved this statement. If you do, the consent will be withdrawn. Do you want to continue?",
    sentToAccountant: "Request for consent sent to accountant",
    sentToConsultant: "Request for consent sent to consultant",
    sentTo: "Request sent to",
    notYetApprovedAccountant: "The accountant has not yet declared consent to the statement",
    notYetApprovedConsultant: "The consultant has not yet declared consent to the statement",
    approvedByAccountant: "Accountant has declared consent to the statement",
    approvedByConsultant: "Consultant has declared consent to the statement",
    approvedBy: "Consent by",
    approvedAndReady: "The statement is now ready to be signed off",
    downloadConsent: "Download pdf with consent",

    invitationSentSuccessTitle: "Invite sent",
    invitationSentSuccessText: "Invite to fill out statement has been sent",
    invitationSentErrorTitle: "Invite not sent",
    invitationSentErrorText: "An error occured when trying to send the invite.",

    signOffSuccessTitle: "Indberetning underskrevet",
    signOffSuccessText: "Din indberetning er nu underskrevet og indsendt.",
    signOffErrorTitle: "Fejl",
    signOffErrorText: "Der skete en fejl, da vi forsøgte at behandle din underskrivning.",

    ApproveSuccessTitle: "Declaration of consent signed",
    ApproveSuccessText: "You have now signed your consent to the statement.",
    ApproveErrorTitle: "Sign-off unsuccesfull",
    ApproveErrorText: "An error occured when we tried to process the sign-off.",

    signOffExceeding:
      "The total turnover is of an amount that requires the approval by an accounant.",
    signOffNeedsApproval: "The statement has not yet been approved by the assigned accountant.",

    section1: {
      heading: "Grøntsager i væksthus",
      mushrooms: "Svampe",
      tomatoCucumberHerbs: "Tomat, agurk, krydderurt",
      boughtPlantsDesc: "(excl. moms, ikke for svampe)"
    },
    section3: {
      heading: "Grøntsager på friland",
      turnoverExlPotatoes: "(excl. kartofler) Omsætning excl. moms",
      carrot: "Gulerod",
      pea: "Ært",
      onion: "Løg",
      boughtPlantsDesc: "(excl. moms kun vedr. stikløg eller andet)"
    },
    section4: {
      heading: "Potteplanter m.v.",
      onions: "Løg og knolde",
      plants: "Potteplanter",
      flowers: "Snitblomster",
      boughtPlantsDesc: "(excl. moms kun vedr. snitblomster)"
    },
    section7: {
      heading: "Planteskoleplanter",
      description: "Inklusive videre- og detailsalg",
      plants: "Planteskoleplanter",
      turnoverDescription:
        "(Indkøb og salg af planter ved direkte import fra udlandet skal ikke medregnes hverken i omsætning eller plantekøb.)",
      boughtPlantsDesc: "(excl. moms)"
    },
    section8: {
      heading: "Frugt og bær",
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
    },
    accountantSection: {
      heading: "Section for accountant or consultant",
      helpText:
        "To sign off your consent for this statement, please download and fill out the following statemenent of consent, and uploaded it in the field below.",
      downloadPdf: "Download statement",
      dragAndDrop: "Drag and drop PDF with statement of consent here, or click to choose file...",
      dropFile: "Drop your file here...",
      signAndApprove: "Sign your consent",
      consentSignedText:
        "Your consent to the statement has been signed. The client can now view your consent, and is now able to sign-off and deliver the statement to Dansk Gartneri.",
      downloadYourConsent: "Download your consent"
    },
    sort: {
      sortBy: "Sort by",
      Name: "Name",
      Status: "Status"
    },
    unsavedChanges: {
      modalTitle: "Unsaved chagnes",
      modalText: "You have changes you haven't saved, and are about to leave the page",
      saveButton: "Save",
      cancelButton: "Calcel",
      ignoreButton: "Ignore"
    },
    editStatementForHeading: "Oplysningsskema for {{name}}"
  },

  myStatements: {
    myStatements: "Mine indberetninger",
    accountantApproved: "Consent declared",
    awaitsYourApproval: "Awaits your consent",
    viewStatement: "View statement",
    signedOffStatus: "Finished",
    notSignedOffStatus: "Pending",
    fillOutStatement: "Go to statement"
  },

  statementInfo: {
    editStatementInfo: "Edit statement",
    helpText: "Help text",
    tax: "Tax"
  }
};
