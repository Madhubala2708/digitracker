import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { vendorAPI } from "../../../services";

export const fetchVendorProjects = createAsyncThunk(
  "aqsVendor/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await vendorAPI.getVendorProjects();
      return response;
    } catch (error) {
      return rejectWithValue(error?.message || "API Error");
    }
  }
);

const aqsVendorSlice = createSlice({
  name: "aqsVendor",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendorProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchVendorProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default aqsVendorSlice.reducer;
