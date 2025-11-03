import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTools, updateTools, editorViewTool, toolsList, deleteTool} from "../../services";

/** USED TO ADD TOOLS */
export const addToolsAction = createAsyncThunk("addTools", async params => {
  const response = await addTools(params);
  return response.data;
});

/** USED TO UPDATE TOOLS */
export const updateToolsAction = createAsyncThunk("updateTools", async params => {
  const response = await updateTools(params);
  return response.data;
});

/** USED TO EDITOR VIEW TOOLS */
export const editorViewToolAction = createAsyncThunk("editorViewTool", async params => {
  const response = await editorViewTool(params);
  return response.data;
});

/** USED TO LIST TOOLS */
export const toolsListAction = createAsyncThunk("toolsList", async params => {
  const response = await toolsList(params);
  return response.data;
});

/** DELETE TOOLS */
export const deleteToolAction = createAsyncThunk("deleteTool", async params => {
  const response = await deleteTool(params);
  return response.data;
});