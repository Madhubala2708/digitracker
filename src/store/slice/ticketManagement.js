import { createSlice } from "@reduxjs/toolkit";

import {
  suggestedMembersAction,
  customerSearchAction,
  customerSearchwithTypeAction
} from "../actions/ticketManagementAction";

const ticketManagementSlice = createSlice({
  name: 'ticket',
  initialState: {
    suggestedMembers: { data: null, loading: false, error: null },
    customerSearch: { data: null, loading: false, error: null },
    customerSearchwithType: { data: null, loading: false, error: null },
  },
  reducers: {},
  extraReducers: (builder) => {

    /** SUGGESTED MEMBERS */
    builder.addCase(suggestedMembersAction.pending, (state, action) => {
      state.suggestedMembers.loading = true;
    });
    builder.addCase(suggestedMembersAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.suggestedMembers.data = data;
      state.suggestedMembers.loading = false;
    });
    builder.addCase(suggestedMembersAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.suggestedMembers.loading = false;
    });

    /** CUSTOMER SEARCH */
    builder.addCase(customerSearchAction.pending, (state, action) => {
      state.customerSearch.loading = true;
    });
    builder.addCase(customerSearchAction.fulfilled, (state, action) => {
      let data = [];
      
      data = action.payload;
      state.customerSearch.data = data;
      state.customerSearch.loading = false;
    });
    builder.addCase(customerSearchAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.customerSearch.loading = false;
    });

    /** CUSTOMER SEARCH WITH TYPE*/
    builder.addCase(customerSearchwithTypeAction.pending, (state, action) => {
      state.customerSearchwithType.loading = true;
    });
    builder.addCase(customerSearchwithTypeAction.fulfilled, (state, action) => {
      let data = [];
      data = action.payload;
      state.customerSearchwithType.data = data;
      state.customerSearchwithType.loading = false;
    });
    builder.addCase(customerSearchwithTypeAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.customerSearchwithType.loading = false;
    });
  }
});

export default ticketManagementSlice;
