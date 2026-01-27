import { createSlice } from "@reduxjs/toolkit";
import {
  createCeoProjectAction,
  createProjectBudgetAction,
  createProjectFinanceApprovedAction,
  createProjectMilestoneAction,
  createProjectTeamAction,
  getAllProjectByFilterAction,
  getProjectDetailsAction,
  getProjectTypeSectorAction,
} from "../../actions/Ceo/ceoprojectAction";
import { fetchProjects } from "../../actions/Ceo/projectaction";

const initialState = {
  projects: [],
  projectBudgets: [],
  projectMilestone: [],
  currentProject: null,
  projectTypesAndSectors: [],
  loading: false,
  error: null,
  success: false,

  // ✅ Add this block
  getProjectDetails: {
    loading: false,
    data: null,
  },
};

const ceoProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetProjectState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    logoutClearProjectState: (state) => {
      state.projects = [];
      state.projectBudgets = [];
      state.currentProject = null;
      state.projectTypesAndSectors = [];
      state.loading = false;
      state.error = null;
      state.success = false;
      localStorage.removeItem("projectId"); // ✅ remove projectId only on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Project
      .addCase(createCeoProjectAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCeoProjectAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const projectData = action.payload?.data || action.payload;
        state.projects.push(projectData);
        state.currentProject = projectData;

        const projectId = projectData?.projectId || projectData?.projectid;
        if (projectId !== undefined) {
          localStorage.setItem("projectId", projectId.toString());
          console.log("📌 Project ID saved to localStorage:", projectId);
        } else {
          console.error("❌ Project ID not found in payload");
        }
      })
      .addCase(createCeoProjectAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })

      // Get Project Type & Sector
      .addCase(getProjectTypeSectorAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectTypeSectorAction.fulfilled, (state, action) => {
        state.loading = false;
        state.projectTypesAndSectors = action.payload;
      })
      .addCase(getProjectTypeSectorAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create Project Budget
      .addCase(createProjectBudgetAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProjectBudgetAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.projectBudgets.push(action.payload);
        // ❌ DO NOT modify projectId or currentProject here
      })
      .addCase(createProjectBudgetAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })

      // Create Project Team
      .addCase(createProjectTeamAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProjectTeamAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.log("✅ Project Team created:", action.payload);
        // ❌ Again do not touch projectId or localStorage
      })
      .addCase(createProjectTeamAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })

      // Create Project Finance Approved
      .addCase(createProjectFinanceApprovedAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        createProjectFinanceApprovedAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          console.log("✅ Project Finance Approved:", action.payload);
          // ❌ Again do not touch projectId or localStorage
        }
      )
      .addCase(createProjectFinanceApprovedAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })
      .addCase(createProjectMilestoneAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProjectMilestoneAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.milestones = action.payload.data || action.payload;
      })
      .addCase(createProjectMilestoneAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
        state.success = false;
      });
    /** PROJECT DETAILS */
    builder.addCase(getProjectDetailsAction.pending, (state, action) => {
      state.getProjectDetails.loading = true;
    });
    builder.addCase(getProjectDetailsAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.getProjectDetails.data = data;
      console.log("Project Details:", data);
      state.getProjectDetails.loading = false;
    });
    builder
      .addCase(getProjectDetailsAction.rejected, (state, action) => {
        state.fetchError = action.error;
        state.getProjectDetails.loading = false;
      })

      .addCase(getAllProjectByFilterAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjectByFilterAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProjectByFilterAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetProjectState, setCurrentProject, logoutClearProjectState } =
  ceoProjectSlice.actions;
export default ceoProjectSlice.reducer;
