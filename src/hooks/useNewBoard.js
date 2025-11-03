import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newBoardSelector } from "../store/selector/newBoardSelector";
import { createBoardAction} from "../store/actions/kanbanAction";

/** TO GET BOARD LIST BY ID */
export const useNewBoard = () => {
  const newBoardData = useSelector(newBoardSelector);
  const dispatch = useDispatch();
  const createNewBoard = useCallback((params) => dispatch(createBoardAction(params)), [dispatch]);
  return [newBoardData, createNewBoard];
};