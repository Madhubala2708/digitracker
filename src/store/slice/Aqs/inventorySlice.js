import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getApprovedProjectsByEmployee,
  createStockInward,
  createStockOutward,
  getStockInwardsByProject,
  getStockOutwardsByProject,
  getVendorsAndSubcontractors,
  getProjectTeam,
  getItemNames,
} from "../../../services/inventoryAPI";

// ------------------ PROJECTS ------------------
export const fetchProjectsByEmployee = createAsyncThunk(
  "inventory/fetchProjectsByEmployee",
  async (_, thunkAPI) => {
    try {
      const response = await getApprovedProjectsByEmployee();
      return response.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error fetching projects");
    }
  }
);

// ------------------ VENDORS ------------------
export const fetchVendors = createAsyncThunk(
  "inventory/fetchVendors",
  async (_, thunkAPI) => {
    try {
      const response = await getVendorsAndSubcontractors();
      return response.data?.vendors || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error fetching vendors");
    }
  }
);

// ------------------ STOCK INWARD ------------------
export const fetchStockInwards = createAsyncThunk(
  "inventory/fetchStockInwards",
  async (projectId, thunkAPI) => {
    try {
      const response = await getStockInwardsByProject(projectId);
      return response.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error fetching stock inwards");
    }
  }
);

// ------------------ STOCK OUTWARD ------------------
export const fetchStockOutwards = createAsyncThunk(
  "inventory/fetchStockOutwards",
  async (projectId, thunkAPI) => {
    try {
      const response = await getStockOutwardsByProject(projectId);
      return response.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error fetching stock outwards");
    }
  }
);

// ------------------ CREATE INWARD ------------------
export const addStockInward = createAsyncThunk(
  "inventory/addStockInward",
  async (payload, thunkAPI) => {
    try {
      const response = await createStockInward(payload);
      return response.data || payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error creating stock inward");
    }
  }
);

// ------------------ CREATE OUTWARD ------------------
export const addStockOutward = createAsyncThunk(
  "inventory/addStockOutward",
  async (payload, thunkAPI) => {
    try {
      const response = await createStockOutward(payload);
      return response.data || payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error creating stock outward");
    }
  }
);

// ------------------ TEAM ------------------
export const fetchProjectTeam = createAsyncThunk(
  "inventory/fetchProjectTeam",
  async (projectId, thunkAPI) => {
    try {
      const response = await getProjectTeam(projectId);
      return response.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error fetching team");
    }
  }
);

// ------------------ MATERIAL NAMES (FIXED) ------------------
export const fetchMaterialNames = createAsyncThunk(
  "inventory/fetchMaterialNames",
  async (projectId, thunkAPI) => {
    try {
      const response = await getItemNames(projectId);
      return response.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error fetching material names"
      );
    }
  }
);



// ------------------ SLICE ------------------
const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    projects: [],
    vendors: [],
    projectTeam: [],
    stockInwards: [],
    stockOutwards: [],
    materialNames: [],   
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsByEmployee.fulfilled, (state, action) => {
        state.projects = action.payload;
      })

      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.vendors = action.payload;
      })

      .addCase(fetchStockInwards.fulfilled, (state, action) => {
        state.stockInwards = action.payload;
      })

      .addCase(fetchStockOutwards.fulfilled, (state, action) => {
        state.stockOutwards = action.payload;
      })

      .addCase(addStockInward.fulfilled, (state, action) => {
        state.stockInwards.push(action.payload);
      })

      .addCase(addStockOutward.fulfilled, (state, action) => {
        state.stockOutwards.push(action.payload);
      })

      .addCase(fetchProjectTeam.fulfilled, (state, action) => {
        state.projectTeam = action.payload;
      })

      .addCase(fetchMaterialNames.fulfilled, (state, action) => {
        state.materialNames = action.payload;
      });
  },
});

export default inventorySlice.reducer;
