import { defineStore } from "pinia";
import { catalogAPI } from "~/api/axios";

export const useCatalogStore = defineStore("catalog", {
  state: () => ({
    cards: [],
  }),
  actions: {
    async getCards() {
      const cards = (await catalogAPI.getCatalog()).data;
      this.cards = cards;
    },
  },
});
