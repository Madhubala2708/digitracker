// src/store/actions/Ceo/projectAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchProjects = createAsyncThunk(
    "project/fetchProjects",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.GET("/api/Project/getAllProjects");
        console.log("Projects API Response:", response.data); // ✅ check here
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  