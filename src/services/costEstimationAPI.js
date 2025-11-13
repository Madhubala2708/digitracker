import api from "./api";
import { API } from "../constant/service";

export const costEstimationAPI = {
  getProjects: () => api.GET(API.GET_APPROVED_PROJECTS_BY_EMPLOYEE),
};
