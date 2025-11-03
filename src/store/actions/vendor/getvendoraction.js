// src/redux/actions/vendor/vendorActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const getVendorsAndSubcontractors = createAsyncThunk(
    "vendor/getVendorsAndSubcontractors",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.GET("/api/Login/getVendorsAndSubcontractors");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
      }
    }
  );
  
