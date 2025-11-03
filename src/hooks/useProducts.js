import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToolsAction,
  updateToolsAction,
  editorViewToolAction,
  toolsListAction,
  deleteToolAction,
} from "../store/actions/productsAction";

import { productsSelector } from "../store/selector/productsSelector";

/** ADD TOOLS LIST */
export const useProducts = () => {

  const dispatch = useDispatch();
  const toolsListData = useSelector(productsSelector);

  /** TO GET ALL TOOLS */
  const getToolsList = useCallback(
    (params) => dispatch(toolsListAction(params)),
    [dispatch]
  );

  /** CREATE NEW TOOLS */
  const addTool = useCallback((params) => dispatch(addToolsAction(params)), [
    dispatch,
  ]);

  /** UPDATE TOOLS */
  const updateTool = useCallback(
    (params) => dispatch(updateToolsAction(params)),
    [dispatch]
  );

  /** DELETE BOARD STATUS */
  const deleteTool = useCallback(
    (params) => dispatch(deleteToolAction(params)), 
    [dispatch]
  );

  return [toolsListData, { getToolsList, addTool, updateTool, deleteTool }];
};

export const useEditorView = () => {
  const dispatch = useDispatch();
  /** UPDATE TOOLS */
  const editorViewTool = useCallback(
    (params) => dispatch(editorViewToolAction(params)),
    [dispatch]
  );

  return [{ editorViewTool }];
};
