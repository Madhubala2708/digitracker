import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPackages, addPackage, updatePackage, deletePackage } from "../../services";

/** GET ALL PACKAGE DETAILS */
export const getAllPackagesAction = createAsyncThunk("getAllPackages", async params => {
  const response = await getAllPackages(params);
  return response.data;
});

/** USED TO ADD PACKAGE */
export const addPackageAction = createAsyncThunk("addPackage", async params => {
  const response = await addPackage(params);
  return response.data;
});

/** USED TO UPDATE PACKAGE */
export const updatePackageAction = createAsyncThunk("updatePackage", async params => {
  const response = await updatePackage(params);
  return response.data;
});

/** USED TO DELETE PACKAGE */
export const deletePackageAction = createAsyncThunk("deletePackage", async params => {
  const response = await deletePackage(params);
  return response.data;
});