import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getApprovedProjectsByEmployee,
  createStockInward,
  createStockOutward,
  getStockInwardsByProject,
  getStockOutwardsByProject,
  getVendorsAndSubcontractors,
  getProjectTeam,
} from "../../../services/inventoryAPI";

//  1. FETCH APPROVED PROJECTS
export const fetchProjectsByEmployee = createAsyncThunk(
  "inventory/fetchProjectsByEmployee",
  async (_, thunkAPI) => {
    try {
      const response = await getApprovedProjectsByEmployee();
      return response.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error fetching projects"
      );
    }
  }
);
//  2. FETCH VENDORS
export const fetchVendors = createAsyncThunk(
  "inventory/fetchVendors",
  async (_, thunkAPI) => {
    try {
      const response = await getVendorsAndSubcontractors();
      return response.data?.vendors || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error fetching vendors"
      );
    }
  }
);

//  3. FETCH STOCK INWARD LIST
export const fetchStockInwards = createAsyncThunk(
  "inventory/fetchStockInwards",
  async (projectId, thunkAPI) => {
    try {
      const response = await getStockInwardsByProject(projectId);
      return response.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error fetching stock inwards"
      );
    }
  }
);

//  4. FETCH STOCK OUTWARD LIST
export const fetchStockOutwards = createAsyncThunk(
  "inventory/fetchStockOutwards",
  async (projectId, thunkAPI) => {
    try {
      const response = await getStockOutwardsByProject(projectId);
      return response.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error fetching stock outwards"
      );
    }
  }
);

//  5. CREATE STOCK INWARD
export const addStockInward = createAsyncThunk(
  "inventory/addStockInward",
  async (payload, thunkAPI) => {
    try {
      const response = await createStockInward(payload);
      return response.data || payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error creating stock inward"
      );
    }
  }
);

//  6. CREATE STOCK OUTWARD
export const addStockOutward = createAsyncThunk(
  "inventory/addStockOutward",
  async (payload, thunkAPI) => {
    try {
      const response = await createStockOutward(payload);
      return response.data || payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error creating stock outward"
      );
    }
  }
);

//  7. FETCH PROJECT TEAM (MD, CEO, Engineer, etc)
export const fetchProjectTeam = createAsyncThunk(
  "inventory/fetchProjectTeam",
  async (projectId, thunkAPI) => {
    try {
      const response = await getProjectTeam(projectId);

      console.log("TEAM API RAW RESPONSE →", response.data);

      return response.data || []; // DIRECT ARRAY
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error fetching team"
      );
    }
  }
);

//  SLICE
const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    projects: [],
    vendors: [],
    projectTeam: [],
    stockInwards: [],
    stockOutwards: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    /* ------------ PROJECTS ------------ */
    builder
      .addCase(fetchProjectsByEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectsByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjectsByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ------------ VENDORS ------------ */
    builder.addCase(fetchVendors.fulfilled, (state, action) => {
      state.vendors = action.payload;
    });

    /* ------------ STOCK INWARD LIST ------------ */
    builder.addCase(fetchStockInwards.fulfilled, (state, action) => {
      state.stockInwards = action.payload;
    });

    /* ------------ STOCK OUTWARD LIST ------------ */
    builder.addCase(fetchStockOutwards.fulfilled, (state, action) => {
      state.stockOutwards = action.payload;
    });

    /* ------------ ADD STOCK INWARD ------------ */
    builder.addCase(addStockInward.fulfilled, (state, action) => {
      state.stockInwards.push(action.payload);
    });

    /* ------------ ADD STOCK OUTWARD ------------ */
    builder.addCase(addStockOutward.fulfilled, (state, action) => {
      state.stockOutwards.push(action.payload);
    });

    /* ------------ PROJECT TEAM ------------ */
    builder.addCase(fetchProjectTeam.fulfilled, (state, action) => {
      state.projectTeam = action.payload;
    });
  },
});

export default inventorySlice.reducer;
