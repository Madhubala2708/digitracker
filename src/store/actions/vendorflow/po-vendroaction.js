
import { createAsyncThunk,  } from "@reduxjs/toolkit";
import api from "../../../services/api";


export const getPurchaseOrdersByVendorId = createAsyncThunk(
  "purchaseOrder/getByVendorId",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await api.GET(`/api/Vendor/Get-po-by-vendor-id?vendorId=${vendorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load purchase orders");
    }
  }
);


export const getPurchaseOrderDetails = createAsyncThunk(
    "purchaseOrder/getDetails",
    async (purchaseOrderId, { rejectWithValue }) => {
      try {
        const response = await api.GET(`/api/Vendor/Getpurchase-order-details/${purchaseOrderId}`);
        return Array.isArray(response.data) ? response.data[0] : response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch purchase order details");
      }
    }
  );
  