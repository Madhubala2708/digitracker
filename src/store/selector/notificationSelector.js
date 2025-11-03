import { createSelector } from "reselect";

/** NOTIFICATION */
export const notificationSelector = createSelector(
    [
      state => state.notification.recent.data,
      state => state.notification.recent.loading,
      state => state.notification.recent.error,
    ],
    (data, loading, error) => ({
      data,
      loading,
      error,
    })
);