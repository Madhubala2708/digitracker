import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';



export const getCEOReportsByType = createAsyncThunk(
  "ceoReport/getCEOReportsByType",
  async (typeId, { rejectWithValue }) => {
    try {
      const response = await api.GET(`/api/Report/getreportbyreporttype?typeId=${typeId}`);
      return response.data;
    } catch (error) {
      console.error("CEO Report API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const getReportsByEmpId = createAsyncThunk(
  "ceoReport/getReportsByEmpId",
  async ({ empId, typeId }, { rejectWithValue }) => {
    try {
      let url = `/api/Report/getreportbyempid?empId=${empId}`;
      if (typeId) {
        url += `&typeId=${typeId}`;
      }
      const response = await api.GET(url);
      return response.data;
    } catch (error) {
      console.error("Get Reports By EmpId Error:", error);
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);



export const getCEOReportTypes = createAsyncThunk(
  "ceoReport/getCEOReportTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GET("/api/Report/getreporttypes");
      return response.data;
    } catch (error) {
      console.error("Get CEO Report Types API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// New action to get all reports
export const getAllCEOReports = createAsyncThunk(
  "ceoReport/getAllCEOReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GET("/api/Report/getreport");
      return response.data;
    } catch (error) {
      console.error("Get All CEO Reports API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);