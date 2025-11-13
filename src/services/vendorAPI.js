import api from "./api";  
import { API } from "../constant/service";   

export const vendorAPI = {
  getVendorProjects: async () => {
    console.log("Fetching Vendor Projects API...");

    const response = await api.GET(API.GET_APPROVED_PROJECTS_BY_EMPLOYEE);

    console.log("Vendor API Response:", response);

    return response?.data || [];
  },
};
