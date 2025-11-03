import { createSelector } from "reselect";

/** ADD Tools */
export const productsSelector = createSelector(
    [
      state => state.products.tools.data,
      state => state.products.tools.loading,
      state => state.products.tools.error,
      state => state.products.tools.message,
      state => state.products.tools.status,
      state => state.products.tools.addTools,
      state => state.products.tools.updateTools,
      state => state.products.tools.editorViewTool,
    ],
    (data, loading, error, addTools, updateTools, editorViewTool) => ({
      data,
      loading,
      error,
      addTools,
      updateTools,
      editorViewTool,
    })
);
