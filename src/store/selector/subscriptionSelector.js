import { createSelector } from "reselect";

/** SUBSCRIPTION/PACKAGE */
export const subscriptionSelector = createSelector(
    [
      state => state.subscription.data,
      state => state.subscription.loading,
      state => state.subscription.error,
      state => state.subscription.message,
      state => state.subscription.status,
      state => state.subscription.addPackage,
      state => state.subscription.updatePackage
    ],
    (data, loading, error, addPackage, updatePackage) => ({
      data,
      loading,
      error,
      addPackage,
      updatePackage
    })
);
