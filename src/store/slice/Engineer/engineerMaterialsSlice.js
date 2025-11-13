import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { engineerMaterialsAPI } from "../../../services";

// ✅ Thunk: Fetch projects for engineer
export const fetchEngineerProjects = createAsyncThunk(
  "engineerMaterials/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const data = await engineerMaterialsAPI.getEngineerProjects();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch projects");
    }
  }
);

const engineerMaterialsSlice = createSlice({
  name: "engineerMaterials",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEngineerProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEngineerProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload || [];
      })
      .addCase(fetchEngineerProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default engineerMaterialsSlice.reducer;
