import { useDispatch, useSelector } from "react-redux";
import { createCeoProjectAction, createProjectBudgetAction, createProjectFinanceApprovedAction, createProjectMilestoneAction, createProjectTeamAction, getAllProjectByFilterAction, getPmProject, getProjectDetailsAction, getProjectTypeSectorAction } from "../../store/actions/Ceo/ceoprojectAction";
import {
  selectAllProjects,
  selectCurrentProject,
  selectProjectDetails,
  selectProjectError,
  selectProjectLoading,
  selectProjectSuccess,
  selectProjectTypeSector,
} from "../../store/selector/ceo/ceoProjectSelector";
import { resetProjectState, setCurrentProject } from "../../store/slice/Ceo/ceoprojectSlicer";
import { useEffect, useState } from "react";
import axios from "axios";

export const useProject = () => {
  const dispatch = useDispatch();

  const projects = useSelector(selectAllProjects);
  const currentProject = useSelector(selectCurrentProject);
  const loading = useSelector(selectProjectLoading);
  const error = useSelector(selectProjectError);
  const success = useSelector(selectProjectSuccess);
  const projectTypeSectorData = useSelector(selectProjectTypeSector);
  const projectDetails = useSelector(selectProjectDetails);

  // Structured project type and sector data
  const [projectTypeSector, setProjectTypeSector] = useState({
    projectTypes: [],
    projectSectors: [],
  });

  // Update local state when Redux state changes
  useEffect(() => {
    if (projectTypeSectorData) {
      setProjectTypeSector({
        projectTypes: projectTypeSectorData.projectTypes || [],
        projectSectors: projectTypeSectorData.projectSectors || []
      });
    }
  }, [projectTypeSectorData]);


  const fetchProjectTypeSector = async () => {
    try {
      await dispatch(getProjectTypeSectorAction()).unwrap();
    } catch (error) {
      console.error("Failed to fetch project type/sector:", error);
    }
  };

  const resetProject = () => {
    dispatch(resetProjectState());
  };

  const updateCurrentProject = (project) => {
    dispatch(setCurrentProject(project));
  };

  const createProject = async (projectData) => {
    try {
      const result = await dispatch(createCeoProjectAction(projectData)).unwrap();
      return result; // ✅ Just return directly
    } catch (error) {
      console.error("Failed to create project:", error);
      return { success: false, error };
    }
  };
  
  
  const createProjectBudget = async (ProjectBudgetData) => {
    try {
      const result = await dispatch(createProjectBudgetAction(ProjectBudgetData)).unwrap();
      return result;
    } catch (error) {
      console.error("Failed to create project budget:", error);
      return { success: false, error };
    }
  };

  const createProjectteams = async (data) => {
    try {
      const res = await axios.post(`/api/project/upsertProjectTeam`, data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("createProjectteams error:", err);
      return { success: false, message: err?.response?.data?.message || "Team API error" };
    }
  };
  
  const createProjectFinanceApprove = async (data) => {
    try {
      const res = await axios.post(`/api/project/upsertPermissionFinanceApproval`, data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("createProjectFinanceApprove error:", err);
      return { success: false, message: err?.response?.data?.message || "Finance API error" };
    }
  };
  


// In your useProject.js hook
const createProjectMilestone = async (projectId, milestoneDto) => {
  try {
    const result = await dispatch(
      createProjectMilestoneAction({ projectId, milestoneDto })
    ).unwrap();

    
    return {
      success: true,
      data: result,
      message: result?.data?.message || 'Milestones created successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to create milestones'
    };
  }
};

const fetchProjectDetails = async (projectId) => {
  try {
    const result = await dispatch(getProjectDetailsAction(projectId)).unwrap();
    console.log("Project Details:", result);
    return result;
  } catch (error) {
    console.error("Failed to fetch project Details:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
// Fetch all projects with optional status filter
const fetchAllProjectByFilter = async (status = null) => {
  try {
    const result = await dispatch(getAllProjectByFilterAction(status)).unwrap();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return { success: false, error: error.message };
  }
};
const fetchPmAllProject = async (status = null) => {
  try {
    const result = await dispatch(getPmProject(status)).unwrap();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch PM project:", error);
    return { success: false, error: error.message };
  }
};
  
  return {
    // State
    projects,
    currentProject,
    loading,
    error,
    success,
    projectTypeSector,
    projectDetails,

    // Actions
    createProject,
    fetchProjectTypeSector,
    resetProject,
    updateCurrentProject,
    createProjectBudget,
    createProjectteams,
    createProjectFinanceApprove,
    createProjectMilestone,
    fetchProjectDetails,
    fetchAllProjectByFilter,
    fetchPmAllProject,
  };
};