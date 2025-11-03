import { createAsyncThunk } from "@reduxjs/toolkit";
import { crateFinanceApproved, createceoproject, createProjectBudget, createProjectMilestone, createProjectTeam, createUploadFiles, getAllProjectByFilter, getPmProjectDetails, getProjectDetails, getProjectTypeSector } from "../../../services";
const BASE_URL = process.env.REACT_APP_MASTER_API_BASE_URL;

// Get PM Project Details
export const getPmProject = createAsyncThunk(
  "pmProject/getPmProjectDetails",
  async (params) => {
    const response = await getPmProjectDetails(params);
    return response.data;
  }
);
// Get Project Type & Sector
export const getProjectTypeSectorAction = createAsyncThunk(
  "project/getTypeSector",
  async () => {
    const response = await getProjectTypeSector();
    return response.data;
  }
);

//Step 5 multi upload 

export const createUploadFilesAction = createAsyncThunk(
  "project/risk",
  async (payload) => {
    const response = await createUploadFiles(payload); // Pass data here
    return response.data;
  }
);
//delete project 

export const deleteProjectAction = createAsyncThunk(
  'project/delete',
  async (projectId) => {
    const token = localStorage.getItem('accessToken');

    const response = await fetch(`${BASE_URL}/api/Project/Delete-project/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }

    const data = await response.json(); // Assuming server returns a JSON response
    return data;
  }
);



// Create Project
export const createCeoProjectAction = createAsyncThunk(
  "project/create",
  async (params) => {
    const response = await createceoproject(params);
    return response.data;
  }
);


// ceoprojectAction.js
export const createProjectBudgetAction = createAsyncThunk(
  "project/budget",
  async (params) => {
    const response = await createProjectBudget(params);
    return response.data;
  }
);

export const createProjectTeamAction = createAsyncThunk(
  "project/team",
  async (params) => {
    const response = await createProjectTeam(params);
    return { success: true, data: response.data }; 
  }
);


export const createProjectFinanceApprovedAction = createAsyncThunk(
  "project/finance",
  async (params, { rejectWithValue }) => {
    try {
      console.log("Calling API with params:", params);
      const response = await crateFinanceApproved(params);
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


export const createProjectMilestoneAction = createAsyncThunk(
  "project/milestone",
  async ({ projectId, milestoneDto }, { rejectWithValue }) => {
    try {
      if (!projectId || projectId <= 0) {
        return rejectWithValue({
          message: "Invalid project ID",
          data: { projectId }
        });
      }
      
      console.log("Sending milestone data:", milestoneDto);
      const response = await createProjectMilestone(projectId, milestoneDto);
      
      console.log("Received response:", response);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || { 
        message: error.message,
        data: { projectId }
      });
    }
  }
);
/** USED TO GET PROJECT DETAILS - CEO FLOW */
export const getProjectDetailsAction = createAsyncThunk(
  "getProjectDetails",
  async (params) => {
    const response = await getProjectDetails(params);
    return response.data;
  }
);

export const getAllProjectByFilterAction = createAsyncThunk (
  "proect/getProjectByStatus",
  async () => {
    const response = await getAllProjectByFilter();
    return response.data;
  }
)