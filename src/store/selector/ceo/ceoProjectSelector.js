export const selectAllProjects = (state) => state.project?.projects || [];
export const selectCurrentProject = (state) => state.project?.currentProject || null;
export const selectProjectLoading = (state) => state.project?.loading ?? false;
export const selectProjectError = (state) => state.project?.error ?? null;
export const selectProjectSuccess = (state) => state.project?.success ?? false;
export const selectProjectTypeSector = (state) => state.project?.projectTypesAndSectors || [];
export const selectProjectDetails = (state) => state.project?.getProjectDetails || {};
export const selectAllProjectByFilter = (state) => state.project?.allProjectByFilter || [];