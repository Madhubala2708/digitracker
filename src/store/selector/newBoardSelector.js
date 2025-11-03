import { createSelector } from "reselect";

export const newBoardSelector = createSelector(
    [
      state => state.newBoard.data,
      state => state.newBoard.loading,
      state => state.newBoard.error,
      state => state.newBoard.message,
    ],
    (data, loading, error, message) => ({
      data,
      loading,
      error,
      message,
    })
);