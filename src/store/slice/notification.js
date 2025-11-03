import { createSlice } from "@reduxjs/toolkit";
import { getRecentNotificationAction } from "../actions/notificationAction";

const initialState = {
  recent: {
    data: [],
    loading: false,
    error: null,
  }
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    /** RECENT NOTIFICATION LIST */
    builder.addCase(getRecentNotificationAction.pending, (state, action) => {
      state.recent.loading = true;
    });
    builder.addCase(getRecentNotificationAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.recent.data = data;
      state.recent.loading = false;
    });
    builder.addCase(getRecentNotificationAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.recent.loading = false;
    });

  },
});

export default notificationSlice;