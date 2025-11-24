import api from "./api";
import { API } from "../constant/service";

export const getMaterialProjects = () =>
  api.GET(API.GET_APPROVED_PROJECTS_BY_EMPLOYEE);

// added: fetch material status by project id
export const getMaterialStatusByProject = async (projectId) => {
  console.log("service.getMaterialStatusByProject ->", projectId);
  if (!projectId) return [];

  try {
    const url = API.GET_MATERIAL_STATUS_BY_PROJECT.replace(
      "{projectId}",
      projectId
    );

    console.log("Final API URL:", url);

    const response = await api.GET(url);

    const payload = response?.data?.data ?? response?.data ?? [];
    console.log("service.getMaterialStatusByProject response:", payload);

    return payload;
  } catch (err) {
    console.error(
      "service.getMaterialStatusByProject error:",
      err?.response ?? err
    );
    throw err;
  }
};

export default {
  getMaterialProjects,
  getMaterialStatusByProject,
};
