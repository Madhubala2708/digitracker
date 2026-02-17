import { createSlice } from "@reduxjs/toolkit";
import {
  createTaskMilestone,
  createSubTaskMilestone,
  getMilestoneSummary,
  getProjectTasks,
} from "../../actions/Engineer/taskMilestoneActions";

const initialState = {
  loading: false,
  success: false,
  error: null,

  taskCreateResponse: null,
  subTaskCreateResponse: null,
  projectTasks: [],
  summaryData: null,
};

const taskMilestoneSlice = createSlice({
  name: "taskMilestone",
  initialState,

  reducers: {
    clearTaskMilestone: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;

      state.taskCreateResponse = null;
      state.subTaskCreateResponse = null;
      state.projectTasks = [];
      state.summaryData = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= TASK CREATE =================
      .addCase(createTaskMilestone.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTaskMilestone.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.taskCreateResponse = action.payload;
      })
      .addCase(createTaskMilestone.rejected, (state, action) => {
        state.loading = false;
 state.error = String(action.payload);      })

      // ================= SUBTASK CREATE =================
      .addCase(createSubTaskMilestone.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSubTaskMilestone.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subTaskCreateResponse = action.payload;
      })
      .addCase(createSubTaskMilestone.rejected, (state, action) => {
        state.loading = false;
       state.error = String(action.payload);

      })

      // ================= GET TASKS =================
      .addCase(getProjectTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjectTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.projectTasks = action.payload;
      })
      .addCase(getProjectTasks.rejected, (state, action) => {
        state.loading = false;
       state.error = String(action.payload);

      })

      // ================= SUMMARY =================
      .addCase(getMilestoneSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMilestoneSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summaryData = action.payload;
      })
      .addCase(getMilestoneSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload); 
      });
  },
});

export const { clearTaskMilestone } = taskMilestoneSlice.actions;
export default taskMilestoneSlice.reducer;
