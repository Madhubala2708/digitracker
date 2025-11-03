import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCustomers,
  getCustomerOverview,
  getCustomerOrdersInvoices,
  getCustomerServicesLinks,
  getCustomerLatestOrderId,
  updateCustomerOrderId,
} from "../../services";

/** GET ALL CUSTOMERS */
export const getCustomersAction = createAsyncThunk(
  "getCustomers",
  async (params) => {
    const response = await getCustomers(params);
    return response.data;
  }
);

/** USED TO GET CUSTOMER OVERVIEW */
export const getCustomerOverviewAction = createAsyncThunk(
  "getCustomerOverview",
  async (params) => {
    const response = await getCustomerOverview(params);
    return response.data;
  }
);

/** USED TO GET CUSTOMER ORDERS INVOICES */
export const getCustomerOrdersInvoicesAction = createAsyncThunk(
  "getCustomerOrdersInvoices",
  async (params) => {
    const response = await getCustomerOrdersInvoices(params);
    return response.data;
  }
);

/** USED TO GET CUSTOMER SERVICES LINKS */
export const getCustomerServicesLinksAction = createAsyncThunk(
  "getCustomerServicesLinks",
  async (params) => {
    const response = await getCustomerServicesLinks(params);
    return response.data;
  }
);

/** USED TO GET CUSTOMER SERVICES LINKS */
export const getCustomerLatestOrderIdAction = createAsyncThunk(
  "getCustomerLatestOrderId",
  async (params) => {
    const response = await getCustomerLatestOrderId(params);
    return response.data;
  }
);

/** USED TO GET CUSTOMER SERVICES LINKS */
export const updateCustomerOrderIdAction = createAsyncThunk(
  "updateCustomerOrderId",
  async (params) => {
    const response = await updateCustomerOrderId(params);
    return response.data;
  }
);

