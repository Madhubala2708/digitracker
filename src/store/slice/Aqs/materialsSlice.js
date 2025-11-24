import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getMaterialProjects, 
  getMaterialStatusByProject 
} from "../../../services/aqsmaterialsAPI";

// Fetch list of projects for dropdown
export const fetchMaterialsProjects = createAsyncThunk(
  "materials/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMaterialProjects();
      return Array.isArray(res) ? res : res?.data ?? res ?? [];
    } catch (err) {
      return rejectWithValue(err?.message ?? "Failed to fetch projects");
    }
  }
);

// Fetch material status for selected project
export const fetchMaterialStatusByProject = createAsyncThunk(
  "materials/fetchStatusByProject",
  async (projectId, { rejectWithValue }) => {
    try {
      if (!projectId) return [];
      const id = Number(projectId);
      const res = await getMaterialStatusByProject(id);
      return Array.isArray(res) ? res : res?.data ?? res ?? [];
    } catch (err) {
      return rejectWithValue(err?.message ?? "Failed to fetch material status");
    }
  }
);

const materialsSlice = createSlice({
  name: "materials",
  initialState: {
    projects: [],
    loading: false,
    error: null,

    selectedProjectId: null,

    statusRows: [],
    statusLoading: false,
    statusError: null,
  },

  reducers: {
    setSelectedProjectId(state, action) {
      state.selectedProjectId = action.payload;
    },

    clearStatusRows(state) {
      state.statusRows = [];
      state.statusError = null;
      state.statusLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchMaterialsProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaterialsProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchMaterialsProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message;
      })

      // Fetch Material Status
      .addCase(fetchMaterialStatusByProject.pending, (state) => {
        state.statusLoading = true;
        state.statusError = null;
      })
.addCase(fetchMaterialStatusByProject.fulfilled, (state, action) => {
    state.statusLoading = false;

    const raw = Array.isArray(action.payload) ? action.payload : [];

    // Extract only needed fields
    state.statusRows = raw.map((item, idx) => ({
        sNo: item.sNo ?? idx + 1,
        materialList: item.materialList ?? item.itemName ?? item.name ?? "N/A",
        inStockQuantity: item.inStockQuantity ?? "0 Units",
        requiredQuantity: item.requiredQuantity ?? "0 Units",
    }));
})

      .addCase(fetchMaterialStatusByProject.rejected, (state, action) => {
        state.statusLoading = false;
        state.statusError = action.payload ?? action.error?.message;
      });
  },
});

export const { setSelectedProjectId, clearStatusRows } = materialsSlice.actions;
export default materialsSlice.reducer;
