

import { createSlice } from "@reduxjs/toolkit";
import { getPurchaseOrderDetails, getPurchaseOrdersByVendorId } from "../../actions/vendorflow/po-vendroaction";


const purchaseOrderSlice = createSlice({
    name: "purchaseOrder",
    initialState: {
      purchaseOrders: [],
      selectedPurchaseOrder: null,
      loading: false,
      error: null,
    },
    reducers: {
      clearSelectedPurchaseOrder: (state) => {
        state.selectedPurchaseOrder = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getPurchaseOrdersByVendorId.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getPurchaseOrdersByVendorId.fulfilled, (state, action) => {
          state.loading = false;
          state.purchaseOrders = action.payload;
        })
        .addCase(getPurchaseOrdersByVendorId.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // handle PO details
        .addCase(getPurchaseOrderDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getPurchaseOrderDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.selectedPurchaseOrder = action.payload;
        })
        .addCase(getPurchaseOrderDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  export default purchaseOrderSlice.reducer;