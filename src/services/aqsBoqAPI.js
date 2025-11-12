import api from "./api";
import { API } from "../constant/service";

//Fetch approved projects (sites) for BOQ dropdown
export const getBoqProjects = async () => {
  try {
    const response = await api.GET(API.GET_APPROVED_PROJECTS_BY_EMPLOYEE);
    console.log("BOQ Projects API Response:", response);
    return response?.data || [];
  } catch (error) {
    console.error("BOQ Projects API Error:", error);
    throw error;
  }
};
