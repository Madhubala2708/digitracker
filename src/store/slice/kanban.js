import { createSlice } from "@reduxjs/toolkit";

import {
  getAllBoardAction,
  getBoardByIdAction,
  createBoardAction,
  updateBoardAction,
  deleteBoardAction,
  getFilteredBoardDataAction,
  createBoardStatusAction,
  updateBoardStatusAction,
  deleteBoardStatusAction,
  addTicketAction,
  updateTicketAction,
  updateTicketSalesDataAction,
  updateTicketCommonDataAction,
  getTicketDetailsAction,
  ticketFileUploadAction,
  getBoardStatusMovementAction,
  getTicketByBoardLabelAction,
  getPeriodicUpdatesBoardAction,
  getAgencyBoardAction,
  updateAgencyTicketDetailAction
} from "../actions/kanbanAction";

import { normalizeData, trimObjectProperties } from "../../utils/common";

const initialState = {
  board: {
    data: [],
    loading: false,
    error: null,
    message: "",
    status: null,
    getBoard: {
      id: "",
      data: [],
      loading: false,
      error: null,
    },
    createBoard: {
      data: [],
      loading: false,
      error: null,
      message: "",
    },
    updateBoard: {
      data: [],
      loading: false,
      error: null,
      message: "",
    },
    createLabel: {
      data: [],
      loading: false,
      error: null,
      message: "",
    },
    defaultBoardId: {
      data: [],
    },
    addTicket: {
      data: [],
      loading: false,
      error: null,
      message: "",
    },
    updateTicket: {
      data: [],
      loading: false,
      error: null,
      message: "",
    },
    ticketSalesData: {
      data: [],
      loading: false,
      error: null,
      message: "",
    },
    ticketCommonData: {
      data: [],
      loading: false,
      error: null,
      message: "",
    },
    ticketDetails: {
      data: [],
      loading: false,
      error: null,
      message: "",
    },
    fileUpload: {
      data: {},
      loading: false,
      error: null,
      message: "",
    },
    boardStatusMovement: {
      data: {},
      loading: false,
      error: null,
      message: "",
    },
    filterDataList: {
      list: [],
      filterlabel: [],
      keyWordSearch: [],
      showFilter: false,
      sortBy: ""
    },
    activeCommentsTab: {
      activityType: {type: 1, year: ''},
      showFilter: false,
    },
  },
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    resetMessages: (state) => {
      state.board.message = "";
      state.board.status = null;
      state.board.createBoard.message = "";
      state.board.updateBoard.message = "";
      state.board.createLabel.message = "";
    },
    lastSeenBoard: (state, action) => {
      state.board.defaultBoardId.data = action.payload.data;
    },
    resetLastSeenBoard: (state) => {
      state.board.defaultBoardId.data = [];
    },

    showFilterList: (state, action) => {
      state.board.filterDataList.list = action.payload.list;
      state.board.filterDataList.filterlabel = action.payload.filterlabel;
      state.board.filterDataList.keyWordSearch = action.payload.keyWordSearch;;
      state.board.filterDataList.sortBy = action.payload.sortBy;
      state.board.filterDataList.showFilter = action.payload.showFilter
        ? true
        : false;
    },
    clearFilterList: (state) => {
      state.board.filterDataList.list = [];
      state.board.filterDataList.filterlabel = [];
      state.board.filterDataList.keyWordSearch = [];
      // state.board.filterDataList.sortBy = "";
      state.board.filterDataList.showFilter = false;
    },
    showActiveCommentsTab: (state, action) => {
      state.board.activeCommentsTab.activityType = action.payload.activityType;
      state.board.activeCommentsTab.showActivity = action.payload.showFilter
        ? true
        : false;
    },
    clearActiveCommentsTab: (state) => {
      state.board.activeCommentsTab.activityType = {type: 1, year: ''};
      state.board.activeCommentsTab.showActivity = false;
    },
  },
  extraReducers: (builder) => {
    /** GET ALL BOARD LISTING */
    // builder.addCase(getAllBoardAction.pending, (state, action) => {
    //   state.board.loading = true;
    // });
    // builder.addCase(getAllBoardAction.fulfilled, (state, action) => {
    //   const data = action.payload;
    // state.board.data = data.reduce((s, val) => {
    //     return {
    //     ...s,
    //     [val.boardid]: trimObjectProperties(val),
    //     };
    // }, {});
    //   data.unshift({ name: "Switch Board", boardId: "Switch Board" });
    //   data.push({ name: "Archive board", boardId: "Archive board" });
    //   state.board.data = data;
    //   state.board.loading = false;
    //   state.board.message = "";
    // });
    // builder.addCase(getAllBoardAction.rejected, (state, action) => {
    //   if (action.payload) {
    //     state.board.error = action.payload;
    //   } else {
    //     state.board.error = "Internal Server Error. Kindly contact your admin.";
    //   }
    //   state.fetchError = action.error;
    //   state.board.loading = false;
    // });

    /** GET BOARD BY ID */
    builder.addCase(getBoardByIdAction.pending, (state, action) => {
      state.board.loading = true;
    });
    builder.addCase(getBoardByIdAction.fulfilled, (state, action) => {
      const data = action.payload;
      // state.board.id = data.boardId;
      state.board.data = data;
      state.board.loading = false;
      state.board.message = "";
    });
    builder.addCase(getBoardByIdAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.error = action.error;
      state.board.loading = false;
    });

    /** GET FILTERED BOARD BY ID */
    builder.addCase(getFilteredBoardDataAction.pending, (state, action) => {
      state.board.loading = true;
    });
    builder.addCase(getFilteredBoardDataAction.fulfilled, (state, action) => {
      const data = action.payload;
      const stateBoardData = JSON.parse(JSON.stringify(state.board.data));
      const newData = stateBoardData.map((board) => {
        // Copy the board object
        const newBoard = { ...board };
        // Iterate over each ticket model and set the ticketModels array to an empty array
        newBoard.boardStatusModels.forEach((ticket) => {
          ticket.ticketModels = [];
        });
        return newBoard;
      });

      function updateTicketModels(newdata, data) {
        // Iterate through newdata
        const updatedNewData = newdata.map((newItem) => {
          // Find corresponding item in data
          const dataItem = data.find(
            (item) => item.boardId === newItem.boardId
          );
          if (dataItem) {
            // Iterate through boardStatusModels
            const updatedBoardStatusModels = newItem.boardStatusModels.map(
              (boardStatus) => {
                // Find corresponding boardStatus in dataItem
                const dataBoardStatus = dataItem.boardStatusModels.find(
                  (status) => status.labelId === boardStatus.labelId
                );
                if (dataBoardStatus) {
                  // Update ticketModels with data from dataBoardStatus
                  return {
                    ...boardStatus,
                    ticketModels: dataBoardStatus.ticketModels,
                  };
                } else {
                  return boardStatus;
                }
              }
            );
            // Update boardStatusModels in newItem
            return { ...newItem, boardStatusModels: updatedBoardStatusModels };
          } else {
            return newItem;
          }
        });
        return updatedNewData;
      }

      const updatedNewData = updateTicketModels(newData, data);
      if (data.length > 0) {
        state.board.data = updatedNewData;
      } else {
        state.board.data = newData;
      }
      state.board.loading = false;
      state.board.message = "";
    });
    builder.addCase(getFilteredBoardDataAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.error = action.error;
      state.board.loading = false;
    });

    /** CREATE BOARD */
    builder.addCase(createBoardAction.pending, (state, action) => {
      state.board.createBoard.loading = true;
    });
    builder.addCase(createBoardAction.fulfilled, (state, action) => {
      if (action.payload.status == false) {
        state.board.createBoard.message = action.payload.message;
        return;
      }
      state.board.createBoard.loading = false;
      state.board.createBoard.data = action.payload.boardModels[0];
      state.board.createBoard.message = action.payload.message;
    });
    builder.addCase(createBoardAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.createBoard.error = action.error;
      state.board.createBoard.message = action.error.message;
      state.board.createBoard.loading = false;
    });

    /** UPDATE BOARD */
    builder.addCase(updateBoardAction.pending, (state, action) => {
      state.board.loading = true;
    });
    builder.addCase(updateBoardAction.fulfilled, (state, action) => {
      state.board.loading = false;
      if (action.payload.status) {
        const index = state.board.data.findIndex(
          (item) => item.boardId == action.meta.arg.boardId
        );
        if (index !== -1) {
          state.board.data[index]["name"] = action.meta.arg.name; // Update existing data
          state.board.updateBoard.data = {
            name: action.meta.arg.name,
            boardId: state.board.data[index]["boardId"],
          };
        }
      } else {
        state.board.updateBoard.data = {};
      }
      state.board.updateBoard.message = action.payload.message;
    });
    builder.addCase(updateBoardAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.updateBoard.error = action.error;
      state.board.updateBoard.message = action.error.message;
      state.board.loading = false;
    });

    /** DELETE BOARD */
    builder.addCase(deleteBoardAction.pending, (state, action) => {
      state.board.loading = true;
    });
    builder.addCase(deleteBoardAction.fulfilled, (state, action) => {
      if (action.payload.status === true) {
        const index = state.board.data.findIndex(
          (item) => item.boardId === action.meta.arg
        );

        // Remove the board from the state based on its index
        if (index !== -1) {
          state.board.data.splice(index, 1);
        }
      }
      state.board.loading = false;
      state.board.message = "";
    });
    builder.addCase(deleteBoardAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.error = action.error;
      state.board.loading = false;
    });

    /** CREATE BOARD STATUS */
    builder.addCase(createBoardStatusAction.pending, (state, action) => {
      state.board.loading = true;
    });
    builder.addCase(createBoardStatusAction.fulfilled, (state, action) => {
      if (action.payload.status === true) {
        const index = state.board.data.findIndex(
          (item) => item.boardId === action.meta.arg.boardId
        );
        if (index !== -1) {
          state.board.data[index]["boardStatusModels"].push({
            labelId: action.payload.labelId,
            isExpand: null,
            ticketModels: [],
            ...action.meta.arg,
          });
        }
        state.board.createLabel.data = action.payload;
      }
      state.board.loading = false;
      state.board.status = action.payload.status;
      state.board.message = action.payload.message;
      state.board.createLabel.loading = false;
      state.board.createLabel.message = action.payload.message;
    });
    builder.addCase(createBoardStatusAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.createLabel.error = action.error;
      state.board.loading = false;
    });

    /** UPDATE BOARD STATUS */
    builder.addCase(updateBoardStatusAction.pending, (state, action) => {
      state.board.loading = true;
    });
    builder.addCase(updateBoardStatusAction.fulfilled, (state, action) => {
      state.board.loading = false;
      if (action.payload.status) {
        const updatedBoardData = state.board.data.map((board) => {
          // Check if the board contains a label with the specified labelId
          const updatedStatusModels = board?.boardStatusModels.map((status) => {
            if (status.labelId === action.meta.arg.labelId) {
              // If the label matches the action.meta.arg, update the label with the new data
              return {
                ...status,
                ...action.meta.arg,
              };
            }
            return status; // Return the label unchanged if it doesn't match
          });

          // Update the board with the updated boardStatusModels
          return {
            ...board,
            boardStatusModels: updatedStatusModels,
          };
        });
        state.board.data = updatedBoardData;
      }
      state.board.message = action.payload.message;
      state.board.status = action.payload.status;
      // state.board.updateLabel = action.payload;
      // state.board.updateLabel.message = action.payload.message;
    });
    builder.addCase(updateBoardStatusAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.error = action.error;
      state.board.loading = false;
    });

    /** DELETE BOARD STATUS */
    builder.addCase(deleteBoardStatusAction.pending, (state, action) => {
      state.board.loading = true;
    });
    builder.addCase(deleteBoardStatusAction.fulfilled, (state, action) => {
      // Use map to iterate through each board in the boardData array
      const updatedBoardData = state.board.data.map((board) => {
        // Use the filter method to remove the label with the specified labelId
        const updatedBoardStatusModels = board?.boardStatusModels.filter(
          (status) => status.labelId !== action.meta.arg
        );

        // Return the current board with the updated boardStatusModels
        return {
          ...board,
          boardStatusModels: updatedBoardStatusModels,
        };
      });
      state.board.data = updatedBoardData;
      state.board.loading = false;
      state.board.message = action.payload.message;
      state.board.status = action.payload.status;
      // state.board.deletedLabel.message = action.payload.message;
    });
    builder.addCase(deleteBoardStatusAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.error = action.error;
      state.board.loading = false;
    });

    /** ADD TICKET */
    builder.addCase(addTicketAction.pending, (state, action) => {
      state.board.addTicket.loading = true;
    });
    builder.addCase(addTicketAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.board.addTicket.data = data;
      state.board.addTicket.loading = false;
    });
    builder.addCase(addTicketAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.addTicket.loading = false;
    });

    /** UPDATE TICKET */
    builder.addCase(updateTicketAction.pending, (state, action) => {
      state.board.updateTicket.loading = true;
    });
    builder.addCase(updateTicketAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.board.updateTicket.data = data;
      state.board.updateTicket.loading = false;
    });
    builder.addCase(updateTicketAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.updateTicket.loading = false;
    });

    /** ADD/UPDATE TICKET SALES DATA */
    builder.addCase(updateTicketSalesDataAction.pending, (state, action) => {
      state.board.ticketSalesData.loading = true;
    });
    builder.addCase(updateTicketSalesDataAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.board.ticketSalesData.data = data;
      state.board.ticketSalesData.loading = false;
    });
    builder.addCase(updateTicketSalesDataAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.ticketSalesData.loading = false;
    });

    /** ADD/UPDATE TICKET COMMON DATA */
    builder.addCase(updateTicketCommonDataAction.pending, (state, action) => {
      state.board.ticketCommonData.loading = true;
    });
    builder.addCase(updateTicketCommonDataAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.board.ticketCommonData.data = data;
      state.board.ticketCommonData.loading = false;
    });
    builder.addCase(updateTicketCommonDataAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.ticketCommonData.loading = false;
    });

    /** USED TO GET TICKET DETAILS */
    builder.addCase(getTicketDetailsAction.pending, (state, action) => {
      state.board.ticketDetails.loading = true;
    });
    builder.addCase(getTicketDetailsAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.board.ticketDetails.data = data;
      state.board.ticketDetails.loading = false;
    });
    builder.addCase(getTicketDetailsAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.ticketDetails.loading = false;
    });

    /** TICKET FILE UPLOAD **/
    builder.addCase(ticketFileUploadAction.pending, (state, action) => {
      state.board.fileUpload.loading = true;
    });
    builder.addCase(ticketFileUploadAction.fulfilled, (state, action) => {
      state.board.fileUpload.data = action;
      state.board.fileUpload.loading = false;
    });
    builder.addCase(ticketFileUploadAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.fileUpload.loading = false;
    });

    /** GET BOARD TICKET MOVEMENT STATUS */
    builder.addCase(getBoardStatusMovementAction.pending, (state, action) => {
      state.board.boardStatusMovement.loading = true;
    });
    builder.addCase(getBoardStatusMovementAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.board.boardStatusMovement.data = data;
      state.board.boardStatusMovement.loading = false;
      state.board.boardStatusMovement.message = "";
    });
    builder.addCase(getBoardStatusMovementAction.rejected, (state, action) => {
      state.board.boardStatusMovement.error = action.error;
      state.fetchError = action.error;
      state.board.boardStatusMovement.loading = false;
    });

    /** GET TICKET BY BOARD LABELS - ON SCROLL */
    builder.addCase(getTicketByBoardLabelAction.pending, (state, action) => {
      state.board.loading = true;
    });
    builder.addCase(getTicketByBoardLabelAction.fulfilled, (state, action) => {
      const data = action.payload;
      const { boardid, labelid } = action.meta.arg; // Get boardId and labelId from action meta

      // Update the state immutably
      state.board.data = state.board.data.map((board) => {
        if (board.boardId === boardid) {
          return {
            ...board,
            boardStatusModels: board.boardStatusModels.map((label) => {
              if (label.labelId === labelid) {
                return {
                  ...label,
                  ticketModels: [...label.ticketModels, ...data],
                };
              }
              return label;
            }),
          };
        }
        return board;
      });
      state.board.loading = false;
      state.board.message = "";
    });
    builder.addCase(getTicketByBoardLabelAction.rejected, (state, action) => {
      state.board.error = action.error;
      state.fetchError = action.error;
      state.board.loading = false;
    });

     /** GET PERIODIC UPDATES BOARD BY ID */
     builder.addCase(getPeriodicUpdatesBoardAction.pending, (state, action) => {
      state.board.loading = true;
    });
    builder.addCase(getPeriodicUpdatesBoardAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.board.data = data;
      state.board.loading = false;
      state.board.message = "";
    });
    builder.addCase(getPeriodicUpdatesBoardAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.error = action.error;
      state.board.loading = false;
    });

     /** GET Agency BOARD BY ID */
     builder.addCase(getAgencyBoardAction.pending, (state, action) => {
      state.board.loading = true;
    });
    builder.addCase(getAgencyBoardAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.board.data = data;
      state.board.loading = false;
      state.board.message = "";
    });
    builder.addCase(getAgencyBoardAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.error = action.error;
      state.board.loading = false;
    });

    /** GET Agency BOARD BY ID */
    builder.addCase(updateAgencyTicketDetailAction.pending, (state, action) => {
      state.board.updateTicket.loading = true;
    });
    builder.addCase(updateAgencyTicketDetailAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.board.updateTicket.data = data;
      state.board.updateTicket.loading = false;
    });
    builder.addCase(updateAgencyTicketDetailAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.board.updateTicket.loading = false;
    });
  },
  
});

export const {
  resetMessages,
  lastSeenBoard,
  resetLastSeenBoard,
} = kanbanSlice.actions;
export const { clearFilterList, showFilterList, showActiveCommentsTab, clearActiveCommentsTab } = kanbanSlice.actions;
export default kanbanSlice;
