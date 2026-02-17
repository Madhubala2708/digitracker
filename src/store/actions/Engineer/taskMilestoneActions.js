import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_MASTER_API_BASE_URL;

export const createTaskMilestone = createAsyncThunk(
  "taskMilestone/createTaskMilestone",
  async (tasks, { rejectWithValue, getState }) => {
    try {
      // ✅ token from redux
      const token =
        getState().auth.activeUser.data.accessToken;

      console.log("API →", API);
      console.log("JWT →", token);

      if (!token) {
        return rejectWithValue("Login required.");
      }

      const response = await axios.post(
        `${API}/api/MilestoneMaster/createTaskMilestone`,
        tasks,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("❌ API ERROR:", error.response || error);

      return rejectWithValue(
  error.response?.data?.message ||
  error.message ||
  "Request failed"
);
    }
  }
);


export const createSubTaskMilestone = createAsyncThunk(
  "taskMilestone/createSubTaskMilestone",
  async (subtasks, { rejectWithValue, getState }) => {
    try {
      const token =
        getState().auth.activeUser.data.accessToken;

      if (!token) {
        return rejectWithValue("Login required.");
      }

      const response = await axios.post(
        `${API}/api/MilestoneMaster/createSubTaskMilestone`,
        subtasks,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
  console.error("❌ SubTask API ERROR:", error);

  return rejectWithValue(
    error?.response?.data?.message ||
    error?.message ||
    "SubTask save failed"
  );
}

  }
);

export const getSubTasks = createAsyncThunk(
  "task/getSubTasks",
  async (taskId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.activeUser.data.accessToken;

      const res = await axios.get(
        `${API}/api/MilestoneMaster/subtasks/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;

    } catch (err) {

      return rejectWithValue(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load subtasks"
      );
    }
  }
);



export const getMilestoneSummary = createAsyncThunk(
  "taskMilestone/getMilestoneSummary",
  async (projectId, { rejectWithValue, getState }) => {
    try {
      const token =
        getState().auth.activeUser.data.accessToken;

      if (!token) {
        return rejectWithValue("Login required.");
      }

      const response = await axios.get(
        `${API}/api/MilestoneMaster/project/${projectId}/milestone-summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("❌ GET ERROR:", error.response || error);

      return rejectWithValue(
        error.response?.data || "Failed to fetch milestone summary"
      );
    }
  }
);


export const getProjectTasks = createAsyncThunk(
  "taskMilestone/getProjectTasks",
  async (projectId, { rejectWithValue, getState }) => {
    try {
   const token =
  getState()?.auth?.activeUser?.data?.accessToken;

if (!token) {
  return rejectWithValue("No token");
}


      const res = await axios.get(
        `${API}/api/MilestoneMaster/project/${projectId}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
  console.error("❌ getProjectTasks error:", err);

  return rejectWithValue(
    err?.response?.data?.message ||
    err?.message ||
    "Failed to load tasks"
  );
}

  }
);
