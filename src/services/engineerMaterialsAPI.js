import api from "./api";
import { API } from "../constant/service";

//API to get approved projects (backend filters by employee)
export const getEngineerProjects = async () => {
  console.log("Engineer Projects API Started...");
  try {
    const response = await api.GET(API.GET_APPROVED_PROJECTS_BY_EMPLOYEE);
    console.log("Engineer Projects API Response:", response?.data);

    // Return the array directly (since your backend already returns [])
    return response?.data || [];
  } catch (error) {
    console.error("Engineer Projects API Error:", error);
    throw error;
  }
};

export default { getEngineerProjects };
