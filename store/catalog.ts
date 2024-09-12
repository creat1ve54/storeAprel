import { defineStore } from "pinia";
import { filmsAPI } from "~/api/axios";

export const useFilmsStore = defineStore("films", {
  state: () => ({
    films: [],
  }),
  actions: {
    async getCards() {
      const films = (await filmsAPI.getFilms()).data.data;
      this.films = films;
    },
  },
});
