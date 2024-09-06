import axios from "axios";

export const url = "http://localhost:3000";

export const instance = axios.create({
  baseURL: url,
});

export const catalogAPI = {
  getCatalog() {
    return instance.get("/catalog");
  },
};
