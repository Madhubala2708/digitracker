// src/redux/features/vendor/vendorSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { getVendorsAndSubcontractors } from "../../actions/vendor/getvendoraction";
const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    loading: false,
    vendors: [],
    subcontractors: [],
    error: null,
  },
  reducers: {
    resetVendorState: (state) => {
      state.loading = false;
      state.vendors = [];
      state.subcontractors = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVendorsAndSubcontractors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorsAndSubcontractors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload.vendors || [];
        state.subcontractors = action.payload.subcontractors || [];
      })
      .addCase(getVendorsAndSubcontractors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetVendorState } = vendorSlice.actions;
export default vendorSlice.reducer;
