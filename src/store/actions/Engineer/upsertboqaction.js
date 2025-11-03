// features/boq/boqActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const upsertBoq = createAsyncThunk(
  "boq/upsertBoq",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.POST("/api/Project/upsertBoq", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);




export const getNewBoqId = createAsyncThunk(
  "boq/getNewBoqId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GET("/api/Project/getNewBoqId");
      return response.data; // should return something like "BOQ#1"
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// actions/Engineer/getEmployeeRoles.js



export const getEmployeeRoles = createAsyncThunk(
  "boq/getEmployeeRoles",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await api.GET(
        `/api/Project/get-ProjectTeamDetailsByProjectId/${projectId}`
      );
      return response.data.value;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch employee roles");
    }
  }
);

