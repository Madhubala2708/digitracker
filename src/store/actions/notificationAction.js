import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRecentNotification } from "../../services";

/** GET RECENT NOTIFICATION */
export const getRecentNotificationAction = createAsyncThunk("getRecentNotification", async (params) => {
  const response = await getRecentNotification(params);
  return response.data;
});