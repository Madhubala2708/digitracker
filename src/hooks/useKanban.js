import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kanbanSelector } from "../store/selector/kanbanSelector";
import {
  getAllBoardAction,
  getBoardByIdAction,
  getFilteredBoardDataAction,
  createBoardAction,
  updateBoardAction,
  deleteBoardAction,
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
  createPeriodicTicketAction,
  createAgencyTicketAction,
  getAgencyBoardAction,
  updateAgencyTicketDetailAction,
} from "../store/actions/kanbanAction";
import { useEffect } from "react";

/** TO GET BOARD LIST BY ID */
export const useBoard = () => {
  const boardData = useSelector(kanbanSelector);
  const dispatch = useDispatch();

  /** TO GET ALL BOARDS */
  const getAllBoard = useCallback(
    (params) => dispatch(getBoardByIdAction(params)),
    [dispatch]
  );

  /** GET BOARD BY ID'S */
  const getBoardInfo = useCallback(
    (params) => dispatch(getBoardByIdAction(params)),
    [dispatch]
  );

  /** TO GET FILTERED BOARD DATA */
  const getFilteredBoardData = useCallback(
    (params) => dispatch(getFilteredBoardDataAction(params)),
    [dispatch]
  );

  /** CREATE NEW BOARD */
  const createBoard = useCallback(
    (params) => dispatch(createBoardAction(params)),
    [dispatch]
  );

  /** UPDATE BOARD */
  const updateBoard = useCallback((data) => dispatch(updateBoardAction(data)), [
    dispatch,
  ]);

  /** DELETE BOARD */
  const deleteBoard = useCallback((data) => dispatch(deleteBoardAction(data)), [
    dispatch,
  ]);

  /** CREATE BOARD STATUS */
  const createBoardStatus = useCallback(
    (params) => dispatch(createBoardStatusAction(params)),
    [dispatch]
  );

  /** UPDATE BOARD STATUS */
  const updateBoardStatus = useCallback(
    (params) => dispatch(updateBoardStatusAction(params)),
    [dispatch]
  );

  /** DELETE BOARD STATUS */
  const deleteBoardStatus = useCallback(
    (params) => dispatch(deleteBoardStatusAction(params)),
    [dispatch]
  );

  /** CREATE NEW TICKET */
  const addTicket = useCallback((params) => dispatch(addTicketAction(params)), [
    dispatch,
  ]);

  /** UPDATE TICKET */
  const updateTicket = useCallback(
    (params) => dispatch(updateTicketAction(params)),
    [dispatch]
  );

  /** ADD/UPDATE TICKET SALES DATA */
  const updateTicketSalesData = useCallback(
    (params) => dispatch(updateTicketSalesDataAction(params)),
    [dispatch]
  );

  /** ADD/UPDATE TICKET COMMON DATA */
  const updateTicketCommonData = useCallback(
    (params) => dispatch(updateTicketCommonDataAction(params)),
    [dispatch]
  );

  /** GET TICKET DETAILED INFO */
  const getTicketDetails = useCallback(
    (params) => dispatch(getTicketDetailsAction(params)),
    [dispatch]
  );

  /** GET TICKET FILE UPLOAD */
  const ticketFileUpload = useCallback(
    (params) => dispatch(ticketFileUploadAction(params)),
    [dispatch]
  );

  /** GET BOARD - TICKET MOVEMENT */
  const getBoardStatusMovement = useCallback(
    (params) => dispatch(getBoardStatusMovementAction(params)),
    [dispatch]
  );

  /** GET TICKET BY BOARD LABELS */
  const getTicketByBoardLabel = useCallback(
    (params) => dispatch(getTicketByBoardLabelAction(params)),
    [dispatch]
  );

  /** GET PERIODIC UPDATES BOARD BY ID'S */
  const getPeriodicUpdatesBoardInfo = useCallback(
    (params) => dispatch(getPeriodicUpdatesBoardAction(params)),
    [dispatch]
  );

  /** GET PERIODIC UPDATES BOARD BY ID'S */
  const addPeriodicTicket = useCallback(
    (params) => dispatch(createPeriodicTicketAction(params)),
    [dispatch]
  );

  /** GET Agency Ticket */
  const addAgencyTicket = useCallback(
    (params) => dispatch(createAgencyTicketAction(params)),
    [dispatch]
  );

  /** GET Agency BOARD BY ID'S **/
  const getAgencyBoard = useCallback(
    (params) => dispatch(getAgencyBoardAction(params)),
    [dispatch]
  );

  /** Update Agency Ticket Detail **/
  const  updateAgencyTicketDetail = useCallback(
    (params) => dispatch(updateAgencyTicketDetailAction(params)),
    [dispatch]
  );

  return [
    boardData,
    {
      getAllBoard,
      getFilteredBoardData,
      getBoardInfo,
      createBoard,
      updateBoard,
      deleteBoard,
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
      getPeriodicUpdatesBoardInfo,
      addPeriodicTicket,
      addAgencyTicket,
      getAgencyBoard,
      updateAgencyTicketDetail
    },
  ];
};
