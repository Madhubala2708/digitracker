import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const getNewPoId = createAsyncThunk(
  "boq/getNewPoId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GET("/api/Vendor/Get-NewPOId");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getBoqByCode = createAsyncThunk(
  "purchase/getBoqByCode",
  async (boqCode, { rejectWithValue }) => {
    try {
      // Format the URL correctly - the API expects ?code=BOQ%2347 format
      const response = await api.GET(`/api/Project/getBoqDetailsBy-BOQCode?code=${encodeURIComponent(boqCode)}`);
      
      // Return null if response doesn't have data to prevent errors
      if (!response.data) {
        return rejectWithValue("No BOQ data found");
      }
      
      // Log the response structure to help debugging
      console.log("BOQ API response:", response.data);
      
      return response.data;
    } catch (error) {
      console.error("BOQ fetch error:", error);
      if (error.response && error.response.status === 404) {
        return rejectWithValue("BOQ code not found. Please check the code and try again.");
      }
      return rejectWithValue(error.response?.data || error.message || "Failed to fetch BOQ details");
    }
  }
);

export const upsertPurchaseOrder = createAsyncThunk(
  "purchase/upsertPurchaseOrder",
  async (payload, { rejectWithValue }) => {
    try {
      if (!payload) {
        // If no payload is provided, just return empty success
        return { success: true, data: null };
      }
      
      const response = await api.POST("/api/Vendor/upsert-purchase-order", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("PO creation error:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getAllPurchaseOrder = createAsyncThunk(
  "purchase/getAllPurchaseOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GET("/api/Vendor/Get-AllPurchaseOrderDetails");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);