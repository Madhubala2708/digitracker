import { createSelector } from "reselect";

export const kanbanSelector = createSelector(
    [
      state => state.kanban.board.data,
      state => state.kanban.board.loading,
      state => state.kanban.board.error,
      state => state.kanban.board.message,
      state => state.kanban.board.status,
      state => state.kanban.board.createBoard,
      state => state.kanban.board.updateBoard,
      state => state.kanban.board.createLabel,
      state => state.kanban.board.ticketFileUpload,
      state => state.kanban.board.boardStatusMovement,
    ],
    (data, loading, error, message, status, createBoard, updateBoard,createLabel,ticketFileUpload, boardStatusMovement) => ({
      data,
      loading,
      error,
      message,
      status,
      createBoard,
      updateBoard,
      createLabel,
      ticketFileUpload,
      boardStatusMovement
    })
);