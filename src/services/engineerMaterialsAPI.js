import api from "./api";
import { API } from "../constant/service";

// API to get approved projects (backend filters by employee)
export const getEngineerProjects = async () => {
  console.log("Engineer Projects API Started...");
  try {
    const response = await api.GET(API.GET_APPROVED_PROJECTS_BY_EMPLOYEE);
    console.log("Engineer Projects API Response:", response?.data);
    return response?.data || [];
  } catch (error) {
    console.error("Engineer Projects API Error:", error);
    throw error;
  }
};

// Fetch materials for a specific project
export const getEngineerMaterialsByProject = async (projectId) => {
  console.log("Fetching materials for projectId:", projectId);
  try {
    let response;
    if (projectId) {
      response = await api.GET(`/api/Material/${projectId}`);
    } else {
      response = await api.GET(API.GET_ENGINEER_MATERIALS_BY_PROJECT);
    }

    // normalize common payload shapes: response.data.data || response.data || []
    const payload = response?.data?.data ?? response?.data ?? [];
    console.log("Full Material API Response (normalized):", payload);
    return payload;
  } catch (error) {
    console.error("API Error Details:", error.response?.data || error.message);
    return [];
  }
};

export const getMaterialStockAlerts = async () => {
  console.log("Material Stock Alerts API Started...");
  try {
    const response = await api.GET(API.GET_MATERIAL_STOCK_ALERTS);
    console.log("Material Stock Alerts API Response:", response?.data);
    // normalize: response.data.data || response.data || []
    const payload = response?.data?.data ?? response?.data ?? [];
    return payload;
  } catch (error) {
    console.error("Material Stock Alerts API Error:", error);
    return [];
  }
};

export const getMaterialStatusByProject = async (projectId) => {
  console.log("getMaterialStatusByProject:", projectId);
  if (!projectId) return [];
  try {
    // ensure we pass the id (use Number(projectId) if API expects numeric)
    const response = await api.GET(`${API.GET_MATERIAL_STATUS_BY_PROJECT}${projectId}`);
    // normalize payload: response.data.data || response.data || []
    const payload = response?.data?.data ?? response?.data ?? [];
    console.log("MaterialStatus response:", payload);
    return payload;
  } catch (error) {
    console.error("MaterialStatus API Error:", error?.response?.data ?? error.message);
    return [];
  }
};

export const engineerMaterialsAPI = {
  getEngineerProjects,
  getEngineerMaterialsByProject,
  getMaterialStockAlerts,
  getMaterialStatusByProject, 
};
