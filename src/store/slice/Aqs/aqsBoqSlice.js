import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBoqProjects } from "../../../services";

// Thunk to fetch sites (projects)
export const fetchBoqProjects = createAsyncThunk(
  "boq/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getBoqProjects();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching BOQ projects");
    }
  }
);

const aqsBoqSlice = createSlice({
  name: "aqsBoq",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoqProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoqProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchBoqProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default aqsBoqSlice.reducer;
