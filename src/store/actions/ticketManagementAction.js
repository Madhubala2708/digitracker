import { createAsyncThunk } from "@reduxjs/toolkit";

import { suggestedMembers, customerSearch,  customerSearchwithType, } from "../../services";

/** USED TO GET SUGGESTED MEMBER INFO */
export const suggestedMembersAction = createAsyncThunk("suggestedMembers", async params => {
  const response = await suggestedMembers(params);
  return response.data;
});

/** USED TO GET CUSTOMER SEARCH BASED INFO */
export const customerSearchAction = createAsyncThunk("customerSearch", async params => {
  const response = await customerSearch(params);
  return response.data;
});

/** USED TO GET CUSTOMER SEARCH WITH TYPE */
export const customerSearchwithTypeAction = createAsyncThunk(
  "customerSearchwithType",
  async (params) => {
    const response = await customerSearchwithType(params);
    return response.data;
  }
);