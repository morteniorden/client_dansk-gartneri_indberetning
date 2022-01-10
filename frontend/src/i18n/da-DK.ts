import { Locale } from "./Locale";

export const table: Locale = {
  locale: "Dansk",
  flagUrl: "images/icons/DK.svg",
  currencyCode: "DKK",

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
    add: "Tilføj",
    fetchingData: "Henter data...",
    saveSuccessTitle: "Ændringer gemt",
    saveSuccessText: "Dine ændringer er blevet gemt.",
    saveErrorTitle: "Fejl",
    saveErrorText: "Der skete den fejl, da vi forsøgte at gemme dine ændringer."
  },

  accounts: {
    accounts: "Kunder",
    id: "Id#",
    name: "Navn",
    email: "Email",
    tel: "Tlf.",
    address: "Adresse",
    address1: "Adresse 1",
    address2: "Adresse 2",
    cvrNumber: "CVR",
    addAccount: "Tilføj kunde",
    street: "Vej",
    streetNum: "Nr.",
    postalCode: "Postnr.",
    city: "By",
    country: "Land",
    addressLine1: "Linje 1",
    addressLine2: "Linje 2",
    addressLine3: "Linje 3",
    addressLine4: "Linje 4",
    CVR_getFromRegistry: "Hent info fra CVR-registret",
    CVR_apiErrorTitle: "CVR ikke fundet",
    CVR_apiErrorDescription: "Kunne ikke finde CVR-nummer i registret",
    accountant: "Revisor",
    fetching: "Henter kunder...",
    statementStatus: "Indberetning status",

    tooltipInvite: "Invitér til at udfylde oplysningsksema",
    tooltipNotYetSignedOff: "Ikke besvaret endnu",
    tooltipEditAccountant: "Rediger revisor",
    tooltipShowInfo: "Vis info",
    tooltipHideInfo: "Skjul info",
    tooltipReadStatement: "Se besvarelse",

    firmName: "Firmanavn",
    ownerName: "Ejernavn",
    addressAndPlace: "Adresse (evt. sted)",

    deactivateClient: "Deaktivér kunde",
    confirmDeactivateUser: "Du er ved at deaktivere denne bruger. Vil du fortsætte?",
    deactivateUserSuccessTitle: "Bruger deaktiveret",
    deactivateUserSuccessText: "Brugeren er nu blevet deaktiveret.",
    deactivateUserErrorTitle: "Fejl",
    deactivateUserErrorText: "Der skete en fejl, da vi forsøgte at deaktivere brugeren.",
    deactivated: "deaktiveret",
    showDeactive: "Vis deaktive"
  },

  login: {
    email: "Email:",
    password: "Password:",
    login: "Log ind",
    forgotPassword: "Glemt password",
    forgotPasswordText:
      "Indtast din mail, og vi sender dig en mail med et link til at oprette et nyt password.",
    invalidMsg: "Fejl i email eller password. Prøv igen.",
    logout: "Log ud",
    sendResetPW: "Send mail",

    sendResetPWSuccesTitle: "Mail afsendt",
    sendResetPWSuccesText: "En mail med link til gendannelse af password er blevet afsendt.",
    sendResetPWErrorTitle: "Fejl",
    sendResetPWErrorText:
      "Der skete en fejl, da vi forsøgte at sende en mail til gendannelse af password."
  },

  admins: {
    admins: "Administratorer",
    addAdmin: "Tilføj admin",
    addAdminSuccessTitle: "Administrator oprettet",
    addAdminSuccessText: "En ny administrator er nu oprettet",
    addAdminErrorTitle: "Fejl",
    addAdminErrorText: "Der skete en fejl, da vi forsøgte at oprette ny administrator.",
    deactivateAdmin: "Deaktivér admininistrator",
    deactivateAdminText: "Du er ved at deaktivere denne administrator. Vil du fortsætte?"
  },

  actions: {
    update: "Opdatér",
    delete: "Slet",
    remove: "Fjern",
    deactivate: "Deaktivér",
    saveChanges: "Gem ændringer",
    saveSuccessTitle: "Ændringer gemt",
    saveSuccessText: "Dine ændringer er blevet gemt",
    saveErrorTitle: "Fejl",
    saveErrorText: "Der skete en fejl, da vi forsøgte at gemme dine ændringer.",
    back: "Tilbage",
    sendRequest: "Send anmodning",
    edit: "Rediger"
  },

  password: {
    password: "Password:",
    repeatPassword: "Gentag password:",
    newPassword: "Nyt password:",
    repeatNewPassword: "Gentag nyt password",
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
  },

  accountant: {
    editAccountant: "Rediger revisor",
    addAccountant: "Inviter revisor",
    noAccountant: "Ingen revisor",
    addSuccessTitle: "Revisor tilføjet",
    addSuccessText: "En mail med invitation til systemet er sendt til revisor.",
    addErrorTitle: "Tilføjelse mislykket",
    addErrorText: "Der skete en fejl. Prøv eventuelt igen.",
    deleteSuccessTitle: "Revisor fjernet",
    deleteSuccessText: "Revisoren er nu fjernet og deaktiveret.",
    deleteErrorTitle: "Deaktivering mislykket",
    deleteErrorText: "Der skete en fejl. Prøv eventuelt igen.",
    alreadyAssignedTitle: "Fejl",
    alreadyAssignedText: "Denne mail bruges af en revisor, der allerede er tilknyttet en konto.",
    accountant: "Revisor",
    consultant: "Uvildig konsulent",
    accountantType: "Vælg revisor/konsulent:"
  },

  mailEditor: {
    editEmails: "Rediger emails",
    name: "Email navn:",
    subject: "Emne:",
    ctaButtonInputLabel: "Knaptekst:",
    preview: "Se forhåndsvisning",
    nameTooltip: "Navn på email. Vises ikke for modtageren.",
    subjectTooltip: "Emnefelt på email, som den vises for modtageren.",
    ctaTooltip: "Tekst på knappen, der vises nederst i mailen.",
    section: "Afsnit",
    headingPlaceholder: "Overskrift her",
    paragraphPlaceholder: "Brødtekst her"
  },

  statements: {
    turnoverExlMoms: "Omsætning excl. moms",
    taxIs: "Afgiften udgør",
    boughtPlants: "Indkøbte planter",
    other: "Andet",
    expences: "Udgifter",
    accountingYear: "Revisionsår",
    editStatementHeading: "Oplysningsskema",
    signOff: "Underskriv og send",
    confirmSignOffButton: "Underskriv",
    confirmSignOffText: "Du er ved at underskrive dit oplysningsskema. Vil du fortsætte?",
    downloadCsv: "Download CSV",
    sendToAccountant: "Send til revisor el. konsulent",
    sendToAccountantText1:
      "Herunder kan du anmode en revisor eller uvildig konsulent om at erklære sit samtykke til dit oplysningsskema for dette revisionsår. Dette giver revisoren eller konsulenten adgang til både at læse og redigere i dit oplysningsskema.",
    sendToAccountantText2:
      "Når revisoren eller konsulenten har erklæret samtykke, vil det fremgå her på siden. Herefter er det op til dig at underskrive og indsende skemaet til Dansk Gartneri. Du vil have mulighed for at trække en anmodning tilbage og sende en ny.",

    statusNotInvited: "Ikke inviteret",
    statusInvited: "Inviteret",
    statusEdited: "Har redigeret",
    statusSignedOff: "Underskrevet",

    invitationSentSuccessTitle: "Invitation sendt",
    invitationSentSuccessText: "Invitation til at udfylde oplysningsskema blev sendt.",
    invitationSentErrorTitle: "Invitation ikke sendt",
    invitationSentErrorText: "Der skete en fejl, da vi forsøgte at sende invitationen.",

    removeAccountant: "Fjern revisor",
    removeConsultant: "Fjern konsulent",
    confirmRemoveAccountant:
      "Du er ved at fjerne revisoren for dette oplysningsskema. Vil du fortsætte?",
    confirmRemoveApprovingAccountant:
      "Du er ved at fjerne revisoren for dette oplysningsskema, selvom denne har erklæret sit samtykke hertil. Hvis du fjerner revisor, frafalder samtykket. Vil du fortsætte?",
    confirmRemoveConsultant:
      "Du er ved at fjerne den uvildige konsulent for dette oplysningsskema. Vil du fortsætte?",
    confirmRemoveApprovingConsultant:
      "Du er ved at fjerne konsulenten for dette oplysningsskema, selvom denne har erklæret sit samtykke hertil. Hvis du fjerner konsulenten, frafalder samtykket. Vil du fortsætte?",
    sentToAccountant: "Anmodning om samtykke sendt til revisor",
    sentToConsultant: "Anmodning om samtykke sendt til uvildig konsulent",
    sentTo: "Anmodning sendt til",
    notYetApprovedAccountant: "Revisor har endnu ikke erklæret samtykke til skemaet",
    notYetApprovedConsultant: "Konsulenten har endnu ikke erklæret samtykke til skemaet",
    approvedByAccountant: "Revisor har erklæret samtykke til skemaet",
    approvedByConsultant: "Konsulenten har eklæret samtykke til skemaet",
    approvedBy: "Samtykke erklæret af",
    approvedAndReady: "Oplysningsskemaet er nu klar til at underskrives og indsendes",
    downloadConsent: "Hent samtykkeeklæring",

    signOffSuccessTitle: "Indberetning underskrevet",
    signOffSuccessText: "Din indberetning er nu underskrevet og indsendt.",
    signOffErrorTitle: "Fejl",
    signOffErrorText: "Der skete en fejl, da vi forsøgte at behandle din underskrivning.",

    ApproveSuccessTitle: "Samtykke underskrevet",
    ApproveSuccessText: "Du har nu underskrevet dit samtykke til skemaet.",
    ApproveErrorTitle: "Fejl",
    ApproveErrorText: "Der skete en fejl, da vi forsøgte at behandle dit samtykke til skemaet.",

    signOffExceeding:
      "Pga. størrelsen på den totale omsætning kræver oplysningsskemaet samtykke fra en revisor.",
    signOffNeedsApproval: "Mangler samtykke af den tilknyttede revisor.",

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
      heading: "Sektion for revisor el. konsulent",
      helpText:
        "For at signere dit samtykke til oplysningskemaet, skal følgende samtykkeerklæring downloades, udfyldes og uploades herunder.",
      downloadPdf: "Hent samtykkeerklæring",
      dragAndDrop:
        "Træk og slip PDF med udfyldt samtykkeerklæring her, eller klik for at vælge fil...",
      dropFile: "Slip din fil her...",
      signAndApprove: "Signér samtykke",
      consentSignedText:
        "Dit samtykke til oplysningsskemaet er nu underskrevet. Klienten kan nu se, at du har givet dit samtykke til oplysningsskemaet og kan nu selv endelig underskrive og indsende skemaet.",
      downloadYourConsent: "Hent din samtykkeerklæring"
    }
  },

  myStatements: {
    myStatements: "Mine indberetninger",
    accountantApproved: "Samtykke givet",
    awaitsYourApproval: "Afventer dit samtykke",
    viewStatement: "Se oplysningsskema",
    signedOffStatus: "Besvaret",
    notSignedOffStatus: "Ikke besvaret",
    fillOutStatement: "Besvar"
  },

  statementInfo: {
    editStatementInfo: "Rediger oplysningsskema",
    helpText: "Hjælpetekst",
    tax: "Afgift"
  }
};
