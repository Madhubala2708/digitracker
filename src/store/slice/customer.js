import { createSlice } from "@reduxjs/toolkit";
import { getCustomersAction, getCustomerOverviewAction, getCustomerOrdersInvoicesAction, getCustomerServicesLinksAction, } from "../actions/customerAction";

const initialState = {
  list: {
    data: [],
    loading: false,
    error: null,
  },
  overview: {
    data: [],
    loading: false,
    error: null,
  },
  ordersInvoices: {
    data: [],
    loading: false,
    error: null,
  },
  servicesLinks: {
    data: [],
    loading: false,
    error: null,
  },
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    /** CUSTOMER LISTING */
    builder.addCase(getCustomersAction.pending, (state, action) => {
      state.list.loading = true;
    });
    builder.addCase(getCustomersAction.fulfilled, (state, action) => {
      const data = action.payload;
      if(action.meta.arg.offsetno == 0){
        state.list.data = data;
      }else{
        state.list.data = [...state.list.data, ...data];
      }
      state.list.loading = false;
    });
    builder.addCase(getCustomersAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.list.loading = false;
    });

    /** CUSTOMER OVERVIEW INFO*/
    builder.addCase(getCustomerOverviewAction.pending, (state, action) => {
      state.overview.loading = true;
    });
    builder.addCase(getCustomerOverviewAction.fulfilled, (state, action) => {
      state.overview.data = [action.payload];
      state.overview.loading = false;
    });
    builder.addCase(getCustomerOverviewAction.rejected, (state, action) => {
      state.error = action.error;
      state.overview.loading = false;
    });

    
    /** CUSTOMER ORDERS & INVOICES*/
    builder.addCase(getCustomerOrdersInvoicesAction.pending, (state, action) => {
      state.ordersInvoices.loading = true;
    });
    builder.addCase(getCustomerOrdersInvoicesAction.fulfilled, (state, action) => {
      state.ordersInvoices.data = action.payload;
      state.ordersInvoices.loading = false;
    });
    builder.addCase(getCustomerOrdersInvoicesAction.rejected, (state, action) => {
      state.error = action.error;
      state.ordersInvoices.loading = false;
    });

    /** CUSTOMER SERVICES LINKS */
    builder.addCase(getCustomerServicesLinksAction.pending, (state, action) => {
      state.servicesLinks.loading = true;
    });
    builder.addCase(getCustomerServicesLinksAction.fulfilled, (state, action) => {
      state.servicesLinks.data = action.payload;
      state.servicesLinks.loading = false;
    });
    builder.addCase(getCustomerServicesLinksAction.rejected, (state, action) => {
      state.error = action.error;
      state.servicesLinks.loading = false;
    });

  },
});

export default customerSlice;