import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPurchaseOrder,

  getBoqByCode,
  getNewPoId,
  upsertPurchaseOrder,
 
} from "../../actions/Purchase/purcharseorderidaction";

const initialState = {
  poId: null,
  loading: false,
  error: null,
  submissionStatus: null, // 'pending', 'success', 'error'
  boqDetails: null,
  boqLoading: false,
  boqError: null,
  allPurchaseOrders: [], // ✅ New state field
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    resetPoId(state) {
      state.poId = null;
      state.error = null;
      state.submissionStatus = null;
    },
    resetBoqDetails(state) {
      state.boqDetails = null;
      state.boqError = null;
    },
    setBoqDetails(state, action) {
      state.boqDetails = action.payload;
      state.boqLoading = false;
      state.boqError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Get New PO ID
      .addCase(getNewPoId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewPoId.fulfilled, (state, action) => {
        state.loading = false;
        state.poId = action.payload;
      })
      .addCase(getNewPoId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Get BOQ by Code
      .addCase(getBoqByCode.pending, (state) => {
        state.boqLoading = true;
        state.boqError = null;
      })
      .addCase(getBoqByCode.fulfilled, (state, action) => {
        state.boqLoading = false;
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          const boqData = action.payload[0];
          state.boqDetails = {
            boqId: boqData.boqId,
            boqName: boqData.boqName,
            boqCode: boqData.boqCode,
            vendorId: boqData.vendorId,
            vendorName: boqData.vendorName,
            items: boqData.purchaseOrderItems || [],
          };
        } else if (action.payload && action.payload.boqId) {
          state.boqDetails = action.payload;
        }
      })
      .addCase(getBoqByCode.rejected, (state, action) => {
        state.boqLoading = false;
        state.boqError = action.payload;
      })

      // ✅ Upsert Purchase Order
      .addCase(upsertPurchaseOrder.pending, (state) => {
        state.submissionStatus = "pending";
        state.error = null;
      })
      .addCase(upsertPurchaseOrder.fulfilled, (state) => {
        state.submissionStatus = "success";
      })
      .addCase(upsertPurchaseOrder.rejected, (state, action) => {
        state.submissionStatus = "error";
        state.error = action.payload;
      })

      // ✅ Get All Purchase Orders
      .addCase(getAllPurchaseOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPurchaseOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.allPurchaseOrders = action.payload;
      })
      .addCase(getAllPurchaseOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPoId, resetBoqDetails, setBoqDetails } = purchaseSlice.actions;

export default purchaseSlice.reducer;
