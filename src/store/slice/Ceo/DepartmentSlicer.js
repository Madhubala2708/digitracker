import { createSlice } from "@reduxjs/toolkit";
import { getdepartmentsAction, getDepartmentsByIdAction } from "../../actions/Ceo/DepartmentAction";
import { fetchDepartments } from "../../actions/hr/departmentaction";

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    departments: [],                 // stores all departments
    selectedDepartmentEmployees: [], // employees for selected department
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchDepartments (renamed departments list)
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // getdepartmentsAction (alternative department fetch)
      .addCase(getdepartmentsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getdepartmentsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(getdepartmentsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getDepartmentsByIdAction (get employees for department)
      .addCase(getDepartmentsByIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartmentsByIdAction.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDepartmentEmployees = action.payload;
      })
      .addCase(getDepartmentsByIdAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default departmentSlice.reducer;
