// src/redux/features/employee/employeeSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  createEmployee,
  createOrUpdateEmployee,
  deleteEmployee,
  getEmployees,
  getNewEmpId, // ✅ Newly added import
} from "../../actions/hr/createemployeaction";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    loading: false,
    employee: null,
    employeeList: [],
    newEmpId: null, // ✅ Newly added state
    error: null,
    success: false,
  },
  reducers: {
    resetEmployeeState: (state) => {
      state.loading = false;
      state.employee = null;
      state.employeeList = [];
      state.newEmpId = null; // ✅ Reset newEmpId too
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Employee
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
        state.success = true;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Get All Employees
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeList = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create or Update Employee
      .addCase(createOrUpdateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrUpdateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.employeeList.findIndex(emp => emp.empId === action.payload.empId);
        if (index !== -1) {
          state.employeeList[index] = action.payload;
        }
      })
      .addCase(createOrUpdateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Delete Employee
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeList = state.employeeList.filter(emp => emp.empId !== action.payload.empId);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Get New Employee ID
      .addCase(getNewEmpId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewEmpId.fulfilled, (state, action) => {
        state.loading = false;
        state.newEmpId = action.payload;
      })
      .addCase(getNewEmpId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetEmployeeState } = employeeSlice.actions;
export default employeeSlice.reducer;
