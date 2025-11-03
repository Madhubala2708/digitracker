import { createSlice } from "@reduxjs/toolkit";
import { fetchRoles, fetchRolesByDepartment } from "../../actions/hr/designationaction";

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch roles (all)
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.roles || action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch roles";
      })

      // Fetch roles by department
      .addCase(fetchRolesByDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolesByDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.roles || action.payload;
      })
      .addCase(fetchRolesByDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch roles by department";
      });
  },
});

export default roleSlice.reducer;