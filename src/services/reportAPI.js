import api from "./api";
import { API } from "../constant/service";

export const reportAPI = {
  getSites: async () => {
    const res = await api.GET(API.GET_APPROVED_PROJECTS_BY_EMPLOYEE);
    return res?.data || [];
  }
};
