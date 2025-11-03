import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAllBoard,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  getFilteredBoardData,
  createBoardStatus,
  updateBoardStatus,
  deleteBoardStatus,
  addTicket,
  updateTicket,
  updateTicketSalesData,
  updateTicketCommonData,
  getTicketDetails,
  ticketFileUpload,
  getBoardStatusMovement,
  getTicketByBoardLabel,
  getPeriodicUpdatesBoard,
  updatePeriodicBoardDefault,
  updateDefaultWorkspace,
  createPeriodicTicket,
  periodicTicketDuedateUpdate,
  createAgencyTicket,
  getAgencyBoard,
  updateAgencyTicketDetail,
  loginBoardDetails,
} from "../../services";

/** KANBAN */
export const getAllBoardAction = createAsyncThunk(
  "getAllBoard",
  async (params) => {
    const response = await getAllBoard();
    return response.data;
  }
);

/** GET KANBAN BOARD BY ID */
export const getBoardByIdAction = createAsyncThunk(
  "getBoardById",
  async (params) => {
    const response = await getBoardById(params);
    return response.data;
  }
);

/** CREATE NEW BOARD - KANBAN */
export const createBoardAction = createAsyncThunk(
  "createBoard",
  async (params) => {
    const response = await createBoard(params);
    return response.data;
  }
);

/** UPDATE BOARD - KANBAN */
export const updateBoardAction = createAsyncThunk(
  "updateBoard",
  async (params) => {
    const response = await updateBoard(params);
    return response.data;
  }
);

/** DELETE BOARD - KANBAN */
export const deleteBoardAction = createAsyncThunk(
  "deleteBoard",
  async (params) => {
    const response = await deleteBoard(params);
    return response.data;
  }
);

/** DELETE BOARD - KANBAN */
export const getFilteredBoardDataAction = createAsyncThunk(
  "getFilteredBoardData",
  async (params) => {
    const response = await getFilteredBoardData(params);
    return response.data;
  }
);

/** CREATE BOARD STATUS - KANBAN */
export const createBoardStatusAction = createAsyncThunk(
  "createBoardStatus",
  async (params) => {
    const response = await createBoardStatus(params);
    return response.data;
  }
);

/** UPDATE BOARD STATUS - KANBAN */
export const updateBoardStatusAction = createAsyncThunk(
  "updateBoardStatus",
  async (params) => {
    const response = await updateBoardStatus(params);
    return response.data;
  }
);

/** DELETE BOARD STATUS - KANBAN */
export const deleteBoardStatusAction = createAsyncThunk(
  "deleteBoardStatus",
  async (params) => {
    const response = await deleteBoardStatus(params);
    return response.data;
  }
);

/** USED TO ADD TICKET */
export const addTicketAction = createAsyncThunk("addTicket", async (params) => {
  const response = await addTicket(params);
  return response.data;
});

/** USED TO UPDATE TICKET */
export const updateTicketAction = createAsyncThunk(
  "updateTicket",
  async (params) => {
    const response = await updateTicket(params);
    return response.data;
  }
);

/** USED TO ADD/UPDATE TICKET SALES DATA*/
export const updateTicketSalesDataAction = createAsyncThunk(
  "updateTicketSalesData",
  async (params) => {
    const response = await updateTicketSalesData(params);
    return response.data;
  }
);

/** USED TO ADD/UPDATE TICKET COMMON DATA*/
export const updateTicketCommonDataAction = createAsyncThunk(
  "updateTicketCommonData",
  async (params) => {
    const response = await updateTicketCommonData(params);
    return response.data;
  }
);

/** USED TO GET TICKET DETAILS */
export const getTicketDetailsAction = createAsyncThunk(
  "getTicketDetails",
  async (params) => {
    const response = await getTicketDetails(params);
    return response.data;
  }
);

/** USED TO UPLOAD TICKET RELEVANT FILES */
export const ticketFileUploadAction = createAsyncThunk(
  "ticketFileUpload",
  async (params) => {
    const response = await ticketFileUpload(params);
    return response.data;
  }
);

/** KANBAN BOARD - TICKET MOVEMENT */
export const getBoardStatusMovementAction = createAsyncThunk(
  "getBoardStatusMovement",
  async (params) => {
    const response = await getBoardStatusMovement(params);
    return response.data;
  }
);

/** KANBAN BOARD -GET TICKET BY BOARD LABELS */
export const getTicketByBoardLabelAction = createAsyncThunk(
  "getTicketByBoardLabel",
  async (params) => {
    const response = await getTicketByBoardLabel(params);
    return response.data;
  }
);

/** PERIODIC UPDATES BOARD BY ID */
export const getPeriodicUpdatesBoardAction = createAsyncThunk(
  "getPeriodicUpdatesBoard",
  async (params) => {
    const response = await getPeriodicUpdatesBoard(params);
    return response.data;
  }
);

/** UPDATE PERIODIC BOARD DEFAULT */
export const updatePeriodicBoardDefaultAction = createAsyncThunk(
  "updatePeriodicBoardDefault",
  async (params) => {
    const response = await updatePeriodicBoardDefault(params);
    return response.data;
  }
);

/** UPDATE DEFAULT WORKSPACE */
export const updateDefaultWorkspaceAction = createAsyncThunk(
  "updateDefaultWorkspace",
  async (params) => {
    const response = await updateDefaultWorkspace(params);
    return response.data;
  }
);

/** PERIODIC UPDATES BOARD TICKET CREATE **/
export const createPeriodicTicketAction = createAsyncThunk(
  "createPeriodicTicket",
  async (params) => {
    const response = await createPeriodicTicket(params);
    return response.data;
  }
);

/** PERIODIC UPDATES BOARD TICKET CREATE **/
export const periodicTicketDuedateUpdateAction = createAsyncThunk(
  "periodicTicketDuedateUpdate",
  async (params) => {
    const response = await periodicTicketDuedateUpdate(params);
    return response.data;
  }
);

/** Agency BOARD TICKET CREATE **/
export const createAgencyTicketAction = createAsyncThunk(
  "createAgencyTicket",
  async (params) => {
    const response = await createAgencyTicket(params);
    return response.data;
  }
);

/** Agency BOARD BY ID */
export const getAgencyBoardAction = createAsyncThunk(
  "getAgencyBoard",
  async (params) => {
    const response = await getAgencyBoard(params);
    return response.data;
  }
);


/** Agency BOARD BY ID */
export const updateAgencyTicketDetailAction = createAsyncThunk(
  "updateAgencyTicketDetail",
  async (params) => {
    const response = await updateAgencyTicketDetail(params);
    return response.data;
  }
);

/** LOGIN BOARD DETAILS BY ID */
export const getLoginBoardDetailsdAction = createAsyncThunk(
  "getLoginBoardDetails",
  async (params) => {
    const response = await loginBoardDetails(params);
    return response.data;
  }
);
