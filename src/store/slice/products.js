import { createSlice } from "@reduxjs/toolkit";

import {
  addToolsAction,
  updateToolsAction,
  editorViewToolAction,
  toolsListAction,
  deleteToolAction,
  deleteMileStoneTaskAction,
  createMileStoneTaskAction,
  updateMileStoneTaskAction,
} from "../actions/productsAction";

const initialState = {
  tools: {
    data: [],
    loading: false,
    error: null,
    message: "",
    status: null,
    addTools: {
      data: [],
      loading: false,
      error: null,
    },
    updateTools: {
      data: [],
      loading: false,
      error: null,
    },
    editorViewTool: {
      data: [],
      loading: false,
      error: null,
    },
    toolsFilter: {
      data: {},
      filterParam: {},
      showFilter: false,
    },
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterData: (state, action) => {
      state.tools.toolsFilter.data = action.payload.data;
      state.tools.toolsFilter.filterParam = action.payload.filterParam;
      state.tools.toolsFilter.showFilter = true;
    },
    resetFilter: (state) => {
      state.tools.toolsFilter.data = {};
      state.tools.toolsFilter.filterParam = {};
      state.tools.toolsFilter.showFilter = false;
    },
  },
  extraReducers: (builder) => {
    /** PRODUCT & TOOLS */
    builder.addCase(toolsListAction.pending, (state, action) => {
      state.tools.loading = true;
    });
    builder.addCase(toolsListAction.fulfilled, (state, action) => {
      const data = action.payload;
      if (action.meta.arg.offsetno == 0) {
        state.tools.data = data;
      } else {
        state.tools.data = [...state.tools.data, ...data];
      }

      state.tools.loading = false;
    });
    builder.addCase(toolsListAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.tools.loading = false;
    });

    /** ADD Tools **/
    builder.addCase(addToolsAction.pending, (state, action) => {
      state.tools.addTools.loading = true;
    });
    builder.addCase(addToolsAction.fulfilled, (state, action) => {
      state.tools.addTools.data = action.payload;
      state.tools.addTools.loading = false;
    });
    builder.addCase(addToolsAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.tools.addTools.loading = false;
    });

    /** UPDATE TOOLS**/
    builder.addCase(updateToolsAction.pending, (state, action) => {
      state.tools.updateTools.loading = true;
    });
    builder.addCase(updateToolsAction.fulfilled, (state, action) => {
      state.tools.updateTools.data = action.payload;
      state.tools.updateTools.loading = false;
    });
    builder.addCase(updateToolsAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.tools.updateTools.loading = false;
    });

    /** EDITOR VIEW **/
    builder.addCase(editorViewToolAction.pending, (state, action) => {
      state.tools.editorViewTool.loading = true;
    });
    builder.addCase(editorViewToolAction.fulfilled, (state, action) => {
      state.tools.editorViewTool.data = action.payload;
      state.tools.editorViewTool.loading = false;
    });
    builder.addCase(editorViewToolAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.tools.editorViewTool.loading = false;
    });

    /** DELETE TOOL */
    builder.addCase(deleteToolAction.pending, (state, action) => {
      state.tools.loading = true;
    });
    builder.addCase(deleteToolAction.fulfilled, (state, action) => {
      if (action.payload.status === true) {
        const index = state.tools.data.findIndex(
          (item) => item.toolid === action.meta.arg
        );

        // Remove the board from the state based on its index
        if (index !== -1) {
          state.tools.data.splice(index, 1);
        }
      }
      state.tools.loading = false;
      state.tools.message = "";
    });
    builder.addCase(deleteToolAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.tools.error = action.error;
      state.tools.loading = false;
    });
  },
});

export const { filterData, resetFilter } = productsSlice.actions;
export default productsSlice;
