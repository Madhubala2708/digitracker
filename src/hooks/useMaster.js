import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDepartmentAction,
  getDepartmentAction,
  addDepartmentAction,
  updateDepartmentAction,
  deleteDepartmentAction,
  getDesignationAction,
  getRolesAction,
  getShiftAction,
  getRoleSettingAction,
  updateRoleSettingAction,
  noBoardAccessRequestAction,
  newUserAccessRequestAction,
  getLabelsAction,
  addLabelAction,
  updateLabelAction,
  getTicketsbyboardParticipantsAction,
  addBoardAction,
  getBoardAction,
  editBoardAction,
  getMilestoneMasterAction,
  deleteMilestoneMasterAction,
  createMilestoneMasterAction,
  getProjectStatusMasterAction,
  getTaskStatusMasterAction,
} from "../store/actions/masterAction";
import {
  departmentSelector,
  userDepartmentSelector,
  designationSelector,
  rolesSelector,
  shiftSelector,
  roleSettingSelector,
  labelSelector,
  getTicketsbyboardParticipantsSelector,
  boardSelector,
  milestoneMasterSelector,
  projectStatusSelector,
  taskStatusSelector,
} from "../store/selector/masterSelector";

/** DEPARTMENT */
export const useDepartment = () => {
  const departmentList = useSelector(departmentSelector);
  const userDepartmentList = useSelector(userDepartmentSelector);
  const dispatch = useDispatch();
  const getUserDepartmentData = useCallback(
    (params) => dispatch(getUserDepartmentAction(params)),
    [dispatch]
  );
  const getDepartmentData = useCallback(
    (params) => dispatch(getDepartmentAction(params)),
    [dispatch]
  );
  const addDepartmentData = useCallback(
    (data) => dispatch(addDepartmentAction(data)),
    [dispatch]
  );

  const updateDepartmentData = useCallback(
    (data) => dispatch(updateDepartmentAction(data)),
    [dispatch]
  );
  const deleteDepartmentData = useCallback(
    (data) => dispatch(deleteDepartmentAction(data)),
    [dispatch]
  );

  useEffect(() => {
    dispatch(getUserDepartmentAction());
  }, []);
  return [
    { departmentList, userDepartmentList },
    {
      getUserDepartmentData,
      getDepartmentData,
      addDepartmentData,
      updateDepartmentData,
      deleteDepartmentData,
    },
  ];
};

/** BOARD */
export const useBoard = () => {
  const boardList = useSelector(boardSelector);
  const dispatch = useDispatch();
  const getBoardData = useCallback(
    (params) => dispatch(getBoardAction(params)),
    [dispatch]
  );

  const addBoardData = useCallback(
    (data) => dispatch(addBoardAction(data)),
    [dispatch]
  );
  const editBoardData = useCallback(
    async (data) => {
      const response = await dispatch(editBoardAction(data));
      return response;
    },
    [dispatch]
  );

  // const deleteBoardData = useCallback(
  //   (data) => dispatch(deleteDepartmentAction(data)),
  //   [dispatch]
  // );

  useEffect(() => {
    dispatch(getBoardAction());
  }, []);
  return [
    { boardList },
    {
      getBoardData,
      addBoardData,
      editBoardData,
    },
  ];
};

/** DESIGNATION */
export const useDesignation = () => {
  const designationList = useSelector(designationSelector);
  const dispatch = useDispatch();
  const getDesignation = useCallback(
    (params) => dispatch(getDesignationAction(params)),
    [dispatch]
  );
  useEffect(() => {
    dispatch(getDesignationAction());
  }, []);
  return [designationList, getDesignation];
};

/** ROLES */
export const useRoles = () => {
  const rolesList = useSelector(rolesSelector);
  const dispatch = useDispatch();
  const getRoles = useCallback(
    (params) => dispatch(getRolesAction(params)),
    [dispatch]
  );
  useEffect(() => {
    dispatch(getRolesAction());
  }, []);
  return [rolesList, getRoles];
};

/** SHIFT */
export const useShift = () => {
  const shiftList = useSelector(shiftSelector);
  const dispatch = useDispatch();
  const getShift = useCallback(
    (params) => dispatch(getShiftAction(params)),
    [dispatch]
  );
  useEffect(() => {
    dispatch(getShiftAction());
  }, []);
  return [shiftList, getShift];
};

/** ROLES & RESTRICTIONS */
export const useRoleSetting = () => {
  const roleSettingList = useSelector(roleSettingSelector);
  const dispatch = useDispatch();
  const getRoleSetting = useCallback(
    (params) => dispatch(getRoleSettingAction(params)),
    [dispatch]
  );

  // Update Role Setting
  const updateRoleSetting = useCallback(
    (data) => dispatch(updateRoleSettingAction(data)),
    [dispatch]
  );
  return [roleSettingList, { getRoleSetting, updateRoleSetting }];
};

/*** MAIL SENT **/
export const useBoardAccess = () => {
  const dispatch = useDispatch();
  const getBoardAccess = useCallback(
    () => dispatch(noBoardAccessRequestAction()),
    [dispatch]
  );
  return [{ getBoardAccess }];
};
export const useNewUserAccess = () => {
  const dispatch = useDispatch();
  const getNewUserAccess = useCallback(
    () => dispatch(newUserAccessRequestAction()),
    [dispatch]
  );
  return [{ getNewUserAccess }];
};
/** MASTER LABELS LIST */
export const useLabel = () => {
  const labelList = useSelector(labelSelector);
  const dispatch = useDispatch();
  const getLabels = useCallback(
    (params) => dispatch(getLabelsAction(params)),
    [dispatch]
  );
  const addLabel = useCallback(
    (params) => dispatch(addLabelAction(params)),
    [dispatch]
  );
  const updateLabel = useCallback(
    (params) => dispatch(updateLabelAction(params)),
    [dispatch]
  );

  // useEffect(() => {
  //   dispatch(getLabelsAction());
  // }, []);
  return [labelList, { getLabels, addLabel, updateLabel }];
};

/** GET PARTICIPANTS UPDATES - KANBAN BOARD **/
export const useTicketsParticipants = () => {
  const ticketsParticipantsList = useSelector(
    getTicketsbyboardParticipantsSelector
  );
  const dispatch = useDispatch();
  const getTicketsParticipants = useCallback(
    (params) => dispatch(getTicketsbyboardParticipantsAction(params)),
    [dispatch]
  );
  return [ticketsParticipantsList, getTicketsParticipants];
};

/** Milestone Master */
export const useMilestoneMaster = () => {
  const milestoneDataList = useSelector(milestoneMasterSelector);
  const dispatch = useDispatch();
  const getMilestoneList = useCallback(
    (params) => dispatch(getMilestoneMasterAction(params)),
    [dispatch]
  );
  const addMilestoneData = useCallback(
    (data) => dispatch(createMilestoneMasterAction(data)),
    [dispatch]
  );
  const deleteMilestoneData = useCallback(
    (data) => dispatch(deleteMilestoneMasterAction(data)),
    [dispatch]
  );
  useEffect(() => {
    dispatch(getMilestoneMasterAction());
  }, []);
  return [
    { milestoneDataList },
    {
      getMilestoneList,
      addMilestoneData,
      deleteMilestoneData,
    },
  ];
};

/** Project Status Master */
export const useProjectStatusMaster = () => {
  const projectStatusDataList = useSelector(projectStatusSelector);
  const dispatch = useDispatch();
  const getProjectStatusList = useCallback(
    (params) => dispatch(getProjectStatusMasterAction(params)),
    [dispatch]
  );

  useEffect(() => {
    dispatch(getProjectStatusMasterAction());
  }, []);
  return [
    { projectStatusDataList },
    {
      getProjectStatusList,
    },
  ];
};


/** Task Status Master */
export const useTaskStatusMasterMaster = () => {
  const taskStatusDataList = useSelector(taskStatusSelector);
  const dispatch = useDispatch();
  const getTaskStatusList = useCallback(
    (params) => dispatch(getTaskStatusMasterAction(params)),
    [dispatch]
  );

  useEffect(() => {
    dispatch(getTaskStatusMasterAction());
  }, []);
  return [
    { taskStatusDataList },
    {
      getTaskStatusList,
    },
  ];
};