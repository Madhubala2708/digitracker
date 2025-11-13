import { createSlice } from "@reduxjs/toolkit";
import { getEmployeeRoles, getNewBoqId, upsertBoq } from "../../actions/Engineer/upsertboqaction";

const initialState = {
  loading: false,
  error: null,
  boqId: null,
  boqData: null,
  employeeRoles: null, // ✅ New state
};

const boqSlice = createSlice({
  name: "boq",
  initialState,
  reducers: {
    clearBoqState: (state) => {
      state.loading = false;
      state.error = null;
      state.boqId = null;
      state.boqData = null;
      state.employeeRoles = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      // getNewBoqId handlers
      .addCase(getNewBoqId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewBoqId.fulfilled, (state, action) => {
        state.loading = false;
        state.boqId = action.payload;
      })
      .addCase(getNewBoqId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // upsertBoq handlers
      .addCase(upsertBoq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upsertBoq.fulfilled, (state, action) => {
        state.loading = false;
        state.boqData = action.payload;
      })
      .addCase(upsertBoq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getEmployeeRoles handlers
      .addCase(getEmployeeRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeRoles = action.payload;
      })
      .addCase(getEmployeeRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBoqState } = boqSlice.actions;
export default boqSlice.reducer;
