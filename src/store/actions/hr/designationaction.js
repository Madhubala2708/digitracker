import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchRoles = createAsyncThunk(
  "role/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GET("/api/Role/getRoles");
      return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
}
}
);

  export const fetchRolesByDepartment = createAsyncThunk(
    "role/fetchRolesByDepartment",
    async (deptId, { rejectWithValue }) => {
      try {
        const response = await api.GET(`/api/Department/get-roles-by-deptId/${deptId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  