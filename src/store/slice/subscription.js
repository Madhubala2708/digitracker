import { createSlice } from "@reduxjs/toolkit";

import {
  getAllPackagesAction,
  addPackageAction,
  updatePackageAction,
  deletePackageAction,
} from "../actions/subscriptionAction";

const initialState = {
  data: [],
  loading: false,
  error: null,
  message: "",
  status: null,
  addPackage: {
    data: [],
    loading: false,
    error: null,
  },
  updatePackage: {
    data: [],
    loading: false,
    error: null,
  },
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** ALL PACKAGE LIST */
    builder.addCase(getAllPackagesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllPackagesAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.data = data;
      state.loading = false;
    });
    builder.addCase(getAllPackagesAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.loading = false;
    });

    /** ADD PACKAGE **/
    builder.addCase(addPackageAction.pending, (state, action) => {
      state.addPackage.loading = true;
    });
    builder.addCase(addPackageAction.fulfilled, (state, action) => {
      state.addPackage.data = action.payload;
      state.addPackage.loading = false;
    });
    builder.addCase(addPackageAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.addPackage.loading = false;
    });

    /** UPDATE PACKAGE **/
    builder.addCase(updatePackageAction.pending, (state, action) => {
      state.updatePackage.loading = true;
    });
    builder.addCase(updatePackageAction.fulfilled, (state, action) => {
      state.updatePackage.data = action.payload;
      state.updatePackage.loading = false;
    });
    builder.addCase(updatePackageAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.updatePackage.loading = false;
    });

    /** DELETE PACKAGE */
    builder.addCase(deletePackageAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deletePackageAction.fulfilled, (state, action) => {
      if (action.payload.status === true) {
        const index = state.data.findIndex(
          (item) => item.package_id === action.meta.arg
        );

        // Remove the package from the state based on its index
        if (index !== -1) {
          state.data.splice(index, 1);
        }
      }
      state.loading = false;
      state.message = "";
    });
    builder.addCase(deletePackageAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default subscriptionSlice;
