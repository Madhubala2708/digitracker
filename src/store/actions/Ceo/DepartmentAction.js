

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDepartments, getDepartmentsById } from "../../../services";

export const getdepartmentsAction = createAsyncThunk(
  "departments/getdepartments",
  async () => {
    const response = await getDepartments();
    return response.data;
  }
);

export const getDepartmentsByIdAction = createAsyncThunk(
    "departments/getdepartmentbyid",
    async (id) => {
      console.log("Fetching employees for department ID:", id); // Debug log
      const response = await getDepartmentsById(id);
      return response.data;
    }
  );
  