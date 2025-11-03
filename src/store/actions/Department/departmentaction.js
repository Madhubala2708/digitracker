// src/redux/actions/departmentActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchDepartments = createAsyncThunk(
  "department/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GET("/api/Department/get-department");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
