import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reportAPI } from "../../../services";

export const fetchReportSites = createAsyncThunk(
  "reports/fetchSites",
  async (_, { rejectWithValue }) => {
    try {
      const data = await reportAPI.getSites();
      return data;
    } catch (err) {
      return rejectWithValue(err?.message || "API Error");
    }
  }
);

const reportSlice = createSlice({
  name: "reportSites",
  initialState: {
    sites: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportSites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReportSites.fulfilled, (state, action) => {
        state.loading = false;
        state.sites = action.payload;
      })
      .addCase(fetchReportSites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reportSlice.reducer;
