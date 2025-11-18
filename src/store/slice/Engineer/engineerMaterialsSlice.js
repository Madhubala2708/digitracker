import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { engineerMaterialsAPI } from "../../../services";


// Thunk: Fetch projects for engineer
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

// fetch materials for logged-in engineer
export const fetchEngineerMaterials = createAsyncThunk(
  "engineerMaterials/fetchEngineerMaterials",
  async (_, { rejectWithValue }) => {
    try {
      const data = await engineerMaterialsAPI.getEngineerMaterialsByProject();
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Failed to fetch materials");
    }
  }
);

// keep fetchEngineerMaterialsByProject for backward compatibility
export const fetchEngineerMaterialsByProject = createAsyncThunk(
  "engineerMaterials/fetchMaterialsByProject",
  async (projectId, { rejectWithValue }) => {
    try {
      if (!projectId) {
        return [];
      }
      const data = await engineerMaterialsAPI.getEngineerMaterialsByProject(projectId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch materials");
    }
  }
);

const engineerMaterialsSlice = createSlice({
  name: "engineerMaterials",
  initialState: {
    projects: [],
    materials: [],
    loading: false,
    materialsLoading: false,
    error: null,
    materialsError: null,
  },
  extraReducers: (builder) => {
    builder
      // Projects fetching
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
      })
      
      // NEW: engineer materials (no projectId)
      .addCase(fetchEngineerMaterials.pending, (state) => {
        state.materialsLoading = true;
        state.materialsError = null;
      })
      .addCase(fetchEngineerMaterials.fulfilled, (state, action) => {
        state.materialsLoading = false;
        state.materials = action.payload || [];
      })
      .addCase(fetchEngineerMaterials.rejected, (state, action) => {
        state.materialsLoading = false;
        state.materialsError = action.payload;
      })

      // existing project-specific materials handlers (if kept)
      .addCase(fetchEngineerMaterialsByProject.pending, (state) => {
        state.materialsLoading = true;
        state.materialsError = null;
      })
      .addCase(fetchEngineerMaterialsByProject.fulfilled, (state, action) => {
        state.materialsLoading = false;
        state.materials = action.payload || [];
      })
      .addCase(fetchEngineerMaterialsByProject.rejected, (state, action) => {
        state.materialsLoading = false;
        state.materialsError = action.payload;
      });
  },
});

export default engineerMaterialsSlice.reducer;
