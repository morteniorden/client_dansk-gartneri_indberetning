export interface Locale {
  locale: string; // !Must not be deleted. Used for providing the locale in the native language
  flagUrl: string;
  currencyCode: string;

  example: {
    title: string;
    byLine: string;
    dataLine: string;

    actions: {
      addNew: string;
    };
  };

  common: {
    search: string;
    add: string;
    fetchingData: string;
    saveSuccessTitle: string;
    saveSuccessText: string;
    saveErrorTitle: string;
    saveErrorText: string;
  };

  accounts: {
    accounts: string;
    id: string;
    name: string;
    email: string;
    tel: string;
    address: string;
    address1: string;
    address2: string;
    cvrNumber: string;
    addAccount: string;
    street: string;
    streetNum: string;
    postCode: string;
    city: string;
    country: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    CVR_getFromRegistry: string;
    CVR_apiErrorTitle: string;
    CVR_apiErrorDescription: string;
    accountant: string;
    fetching: string;
    statementStatus: string;

    tooltipInvite: string;
    tooltipNotYetSignedOff: string;
    tooltipEditAccountant: string;
    tooltipShowInfo: string;
    tooltipHideInfo: string;
    tooltipReadStatement: string;
  };

  login: {
    email: string;
    password: string;
    login: string;
    forgotPassword: string;
    forgotPasswordText: string;
    invalidMsg: string;
    logout: string;
    sendResetPW: string;

    sendResetPWSuccesTitle: string;
    sendResetPWSuccesText: string;
    sendResetPWErrorTitle: string;
    sendResetPWErrorText: string;
  };

  admins: {
    admins: string;
  };

  actions: {
    update: string;
    delete: string;
    remove: string;
    saveSuccessTitle: string;
    saveSuccessText: string;
    saveErrorTitle: string;
    saveErrorText: string;
    saveChanges: string;
    back: string;
    sendRequest: string;
  };

  password: {
    password: string;
    repeatPassword: string;
    newPassword: string;
    repeatNewPassword: string;
    dontMatch: string;
    tooShort: string;
    missingUppercase: string;
    missingLowercase: string;
    missingNumber: string;
    changePassword: string;
    changeSuccessTitle: string;
    changeSuccessText: string;
    changeFailTitle: string;
    changeFailText: string;
  };

  accountant: {
    editAccountant: string;
    addAccountant: string;
    noAccountant: string;
    addSuccessTitle: string;
    addSuccessText: string;
    addErrorTitle: string;
    addErrorText: string;
    deleteSuccessTitle: string;
    deleteSuccessText: string;
    deleteErrorTitle: string;
    deleteErrorText: string;
    alreadyAssignedTitle: string;
    alreadyAssignedText: string;
    accountant: string;
    consultant: string;
    accountantType: string;
  };

  mailEditor: {
    editEmails: string;
    name: string;
    subject: string;
    ctaButtonInputLabel: string;
    preview: string;
    nameTooltip: string;
    subjectTooltip: string;
    ctaTooltip: string;
    section: string;
    headingPlaceholder: string;
    paragraphPlaceholder: string;
  };

  statements: {
    turnoverExlMoms: string;
    taxIs: string;
    boughtPlants: string;
    other: string;
    expences: string;
    accountingYear: string;
    editStatementHeading: string;
    signOff: string;
    confirmSignOffButton: string;
    confirmSignOffText: string;
    downloadCsv: string;
    sendToAccountant: string;
    sendToAccountantText1: string;
    sendToAccountantText2: string;

    statusNotInvited: string;
    statusInvited: string;
    statusEdited: string;
    statusSignedOff: string;

    invitationSentSuccessTitle: string;
    invitationSentSuccessText: string;
    invitationSentErrorTitle: string;
    invitationSentErrorText: string;

    removeAccountant: string;
    removeConsultant: string;
    confirmRemoveAccountant: string;
    confirmRemoveConsultant: string;
    sentToAccountant: string;
    sentToConsultant: string;
    sentTo: string;
    notYetApprovedAccountant: string;
    notYetApprovedConsultant: string;

    signOffSuccessTitle: string;
    signOffSuccessText: string;
    signOffErrorTitle: string;
    signOffErrorText: string;

    section1: {
      heading: string;
      mushrooms: string;
      tomatoCucumberHerbs: string;
      boughtPlantsDesc: string;
    };
    section3: {
      heading: string;
      turnoverExlPotatoes: string;
      carrot: string;
      pea: string;
      onion: string;
      boughtPlantsDesc: string;
    };
    section4: {
      heading: string;
      onions: string;
      plants: string;
      flowers: string;
      boughtPlantsDesc: string;
    };
    section7: {
      heading: string;
      description: string;
      plants: string;
      turnoverDescription: string;
      boughtPlantsDesc: string;
    };
    section8: {
      heading: string;
      subHeading1: string;
      subHeading2: string;
      subHeading3: string;
      packagingCost: string;
      packagingCostDesc: string;
      applesPearsOther: string;
      cherry: string;
      plum: string;
      currant: string;
      strawberry: string;
    };
    accountantSection: {
      heading: string;
      helpText: string;
      downloadPdf: string;
      dragAndDrop: string;
      dropFile: string;
      signAndApprove: string;
    };
  };

  myStatements: {
    myStatements: string;
    accountantApproved: string;
    awaitsYourApproval: string;
    viewStatement: string;
    signedOffstatus: string;
    notSignedOffstatus: string;
    fillOutStatement: string;
  };
}
