import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNotification, getnotification } from "../../../services";

export const createnotificationAction = createAsyncThunk(
  "createTicket",
  async (notificationPayload) => {
    const response = await createNotification(notificationPayload);
    return response.data;
  }
);

export const getnotificationAction = createAsyncThunk(
  "getNotification",
  async (userId) =>{
    const response = await getnotification(userId);
    return response.data;
  }
)