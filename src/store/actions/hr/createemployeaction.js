// C:\Users\HP\Desktop\PRECISE INFRATRACKER\src\store\actions\Ceo\createemployeaction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await api.POST("api/Employee/createOrupdate-employee", employeeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createOrUpdateEmployee = createAsyncThunk(
  "employee/createOrUpdate",
  async (data) => {
    const response = await api.POST("/api/Employee/createOrupdate-employee", data);
    return response.data;
  }
);


export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (empId, { rejectWithValue }) => {
    try {
      const response = await api.DELETE(`api/Employee/Delete-Employee?empId=${empId}`);
      return { empId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const getEmployees = createAsyncThunk(
  "employee/getEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GET("/api/Employee/Get-Employee");
      return response.data;
    } catch (error) {
      console.error("API Error:", error); // 👈 log the full error
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// actions/hr/createemployeaction.js



export const getNewEmpId = createAsyncThunk(
  "employee/getNewEmpId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GET("/api/Employee/Get-NewEmpId");
      return response.data; // returns "EMP#322"
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch new employee ID");
    }
  }
);
