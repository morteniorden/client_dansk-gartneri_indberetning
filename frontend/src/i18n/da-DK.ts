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
    search: "Søg"
  },

  accounts: {
    accounts: "Kunder",
    id: "Id#",
    name: "Navn",
    email: "Email",
    tel: "Tlf",
    address1: "Adresse 1",
    address2: "Adresse 2",
    cvrNumber: "CVR",
    addAccount: "Tilføj kunde"
  }
};
