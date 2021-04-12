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
    CVR_apiErrorDescription: "Kunne ikke finde CVR-nummer i registret",
    accountant: "Revisor",
    fetching: "Henter kunder...",
    statementStatus: "Indberetning status"
  },

  login: {
    email: "Email:",
    password: "Password:",
    login: "Log ind",
    forgotPassword: "Glemt password?",
    invalidMsg: "Fejl i email eller password. Prøv igen.",
    logout: "Log ud"
  },

  admins: {
    admins: "Administratorer"
  },

  actions: {
    update: "Opdatér",
    delete: "Slet",
    saveChanges: "Gem ændringer",
    saveSuccessTitle: "Ændringer gemt",
    saveSuccessText: "Dine ændringer er blevet gemt",
    saveErrorTitle: "Fejl",
    saveErrorText: "Der skete en fejl, da vi forsøgte at gemme dine ændringer.",
    back: "Tilbage"
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
    addAccountant: "Tilføj ny revisor",
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
    alreadyAssignedText: "Denne mail bruges af en revisor, der allerede er tilknyttet en konto."
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
    myStatements: "Mine indberetninger",
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

    signOffSuccessTitle: "Indberetning underskrevet",
    signOffSuccessText: "Din indberetning er nu underskrevet og indsendt.",
    signOffErrorTitle: "Fejl",
    signOffErrorText: "Der skete en fejl, da vi forsøgte at behandle din underskrivning.",

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
