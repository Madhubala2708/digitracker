// src/redux/slices/ceoReportSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { getAllCEOReports, getCEOReportsByType, getCEOReportTypes, getReportsByEmpId } from '../../actions/report/ceoreportaction';

const ceoReportSlice = createSlice({
  name: "ceoReport",
  initialState: {
    loading: false,
    reports: [],
    error: null,

    // New state for report types
    reportTypes: [],
    reportTypesLoading: false,
    reportTypesError: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
     // Get all reports
      .addCase(getAllCEOReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCEOReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload?.data || [];
      })
      .addCase(getAllCEOReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reports by type
      .addCase(getCEOReportsByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCEOReportsByType.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload?.data || [];
      })
      .addCase(getCEOReportsByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Report types
      .addCase(getCEOReportTypes.pending, (state) => {
        state.reportTypesLoading = true;
        state.reportTypesError = null;
      })
      .addCase(getCEOReportTypes.fulfilled, (state, action) => {
        state.reportTypesLoading = false;
        state.reportTypes = action.payload?.data || [];
      })
      .addCase(getCEOReportTypes.rejected, (state, action) => {
        state.reportTypesLoading = false;
        state.reportTypesError = action.payload;
      })
      
           .addCase(getReportsByEmpId.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getReportsByEmpId.fulfilled, (state, action) => {
      state.loading = false;
      state.reports = action.payload?.data || [];
    })
    .addCase(getReportsByEmpId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
      ;
  },
});

export default ceoReportSlice.reducer;
