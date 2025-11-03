import { createSlice } from "@reduxjs/toolkit";

import {
    createBoardAction,
} from "../actions/kanbanAction";


const initialState = {
      data: [],
      loading: false,
      error: null,
      message: '',
}

const newBoardSlice = createSlice({
    name: "newBoard",
    initialState,
    reducers: {      
    },
    extraReducers: builder => {
        /** CREATE BOARD */
        builder.addCase(createBoardAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createBoardAction.fulfilled, (state, action) => {
            if(action.payload.status == false) {
                state.message = action.payload.message;
                return;
            }
            state.loading = false;
            state.data = action.payload.boardModels[0];
            state.message = action.payload.message;
        });
        builder.addCase(createBoardAction.rejected, (state, action) => {
            state.fetchError = action.error;
            state.loading = false;
        });
    },
});

export default newBoardSlice;