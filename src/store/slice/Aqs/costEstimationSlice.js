import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { costEstimationAPI } from "../../../services/costEstimationAPI";

// Thunk → Fetch sites/projects
export const fetchCostEstimationProjects = createAsyncThunk(
  "costEstimation/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await costEstimationAPI.getProjects();
      return response?.data || [];
    } catch (error) {
      return rejectWithValue(error?.message || "API Error");
    }
  }
);

const costEstimationSlice = createSlice({
  name: "costEstimation",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCostEstimationProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCostEstimationProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchCostEstimationProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default costEstimationSlice.reducer;
