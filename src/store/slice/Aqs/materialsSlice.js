import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { materialAPI } from "../../../services";

export const fetchMaterialsProjects = createAsyncThunk(
  "materials/fetch",
  async () => {
    const res = await materialAPI.getMaterialProjects();
    return res?.data || [];
  }
);


const materialsSlice = createSlice({
  name: "materials",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterialsProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaterialsProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchMaterialsProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default materialsSlice.reducer;
