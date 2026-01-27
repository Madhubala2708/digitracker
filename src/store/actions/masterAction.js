import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getColor,
  addColor,
  updateColor,
  deleteColor,
  getCountry,
  addCountry,
  updateCountry,
  deleteCountry,
  addCurrency,
  updateCurrency,
  deleteCurrency,
  getUserDepartment,
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  getProductTools,
  getDesignation,
  getRoles,
  getMarketRegion,
  getRegion,
  addRegion,
  updateRegion,
  deleteRegion,
  getLanguage,
  addLanguage,
  updateLanguage,
  deleteLanguage,
  getShift,
  getRoleSetting,
  updateRoleSetting,
  noBoardAccessRequest,
  newUserAccessRequest,
  getIndustry,
  getCustomerRegion,
  getCustomerType,
  getPackage,
  getToolStatus,
  getCategories,
  getPlatforms,
  getSubscriptionsList,
  getProductOwners,
  getPackageToolDetails,
  getCurrency,
  getStatusCodeMaster,
  getFontFamily,
  addFontFamily,
  updateFontFamily,
  deleteFontFamily,
  getLabels,
  addLabel,
  updateLabel,
  getAllAgency,
  getTicketsbyboardParticipants,
  addBoard,
  getBoard,
  editBoard,
  getPurchaseOrderDetails,
  getBoqItemsById,
  getMileStoneList,
  createMileStone,
  updateMileStone,
  deleteMileStone,
  getProjectStatusMaster,
  getTaskStatusMaster
} from "../../services";
import axios from "axios";
import { getAuthToken } from "../../utils/storage";

const generateLabelCode = (name) => {
  if (!name) return '';
  
  return name
    .split(/\s+/)
    .map(word => word[0]?.toUpperCase())
    .join('')
    .slice(0, 3)
    .toUpperCase();
};

/** USED TO GET ALL CORE COLORS LISTING */
export const getColorAction = createAsyncThunk("getColor", async (params) => {
  const response = await getColor();
  return response.data;
});

/** USED TO ADD CORE COLORS LISTING */
export const addColorAction = createAsyncThunk("addColor", async (params) => {
  const response = await addColor(params);
  return response.data;
});

/** USED TO UPDATE CORE COLORS LISTING */
export const updateColorAction = createAsyncThunk(
  "updateColor",
  async (params) => {
    const response = await updateColor(params);
    return response.data;
  }
);

/** USED TO DELETE CORE COLORS LISTING */
export const deleteColorAction = createAsyncThunk(
  "deleteColor",
  async (params) => {
    const response = await deleteColor(params);
    return response.data;
  }
);

/** USED TO GET COUNTRY LISTING */
export const getCountryAction = createAsyncThunk(
  "getCountry",
  async (params) => {
    const response = await getCountry();
    return response.data;
  }
);

/** USED TO ADD COUNTRY LISTING */
export const addCountryAction = createAsyncThunk(
  "addCountry",
  async (params) => {
    const response = await addCountry(params);
    return response.data;
  }
);

/** USED TO UPDATE COUNTRY LISTING */
export const updateCountryAction = createAsyncThunk(
  "updateCountry",
  async (params) => {
    const response = await updateCountry(params);
    return response.data;
  }
);

/** USED TO DELETE COUNTRY LISTING */
export const deleteCountryAction = createAsyncThunk(
  "deleteCountry",
  async (params) => {
    const response = await deleteCountry(params);
    return response.data;
  }
);

/** USED TO GET CURRENCY LIST */
export const getCurrencyAction = createAsyncThunk(
  "getCurrency",
  async (params) => {
    const response = await getCurrency(params);
    return response.data;
  }
);

/** USED TO ADD CURRENCY LISTING */
export const addCurrencyAction = createAsyncThunk(
  "addCurrency",
  async (params) => {
    const response = await addCurrency(params);
    return response.data;
  }
);

/** USED TO UPDATE CURRENCY LISTING */
export const updateCurrencyAction = createAsyncThunk(
  "updateCurrency",
  async (params) => {
    const response = await updateCurrency(params);
    return response.data;
  }
);

/** USED TO DELETE CURRENCY LISTING */
export const deleteCurrencyAction = createAsyncThunk(
  "deleteCurrency",
  async (params) => {
    const response = await deleteCurrency(params);
    return response.data;
  }
);

/** USED TO GET USER DEPARTMENT LISTING */
export const getUserDepartmentAction = createAsyncThunk(
  "getUserDepartment",
  async (params) => {
    const response = await getUserDepartment();
    return response.data;
  }
);

/** USED TO GET DEPARTMENT LISTING */
export const getDepartmentAction = createAsyncThunk(
  "getDepartment",
  async (params) => {
    const response = await getDepartment();
    return response.data;
  }
);

/** USED TO ADD DEPARTMENT */
export const addDepartmentAction = createAsyncThunk(
  "addDepartment",
  async (params) => {
    const response = await addDepartment(params);
    return response.data;
  }
);
/**USED TO ADD BOARD */
export const getBoardAction = createAsyncThunk(
  "getBoard",
  async (params) => {
    const response = await getBoard(params);
    return response.data;
  }
);

export const addBoardAction = createAsyncThunk(
  "addBoard",
  async (params) => {
    const response = await addBoard(params);
    return response.data;
  }
)
export const editBoardAction = createAsyncThunk(
  "editBoard",
  async (data, { rejectWithValue }) => {
    try {
      // Ensure userlabels have correct structure with labelId
      const processedLabels = data.userlabels.map(label => {
        // Preserve existing labelId, only use 0 if truly new
        const labelId = label.labelId || 
                        label.labelID || 
                        (label.isNew ? 0 : null);

        return {
          labelId: labelId, 
          labelCode: label.labelCode || generateLabelCode(label.name),
          name: label.name,
          position: label.position,
          colorCode: label.colorCode || '',
          description: label.description || '',
        };
      });

      // Prepare payload for API
      const payload = {
        boardId: data.boardId, // Ensure boardId is passed correctly
        boardName: data.boardName,
        workspaceid: data.workspaceid,
        userlabels: processedLabels
      };

      // Call API to edit board
      const response = await editBoard(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


/** USED TO UPDATE DEPARTMENT */
export const updateDepartmentAction = createAsyncThunk(
  "updateDepartment",
  async (params) => {
    const response = await updateDepartment(params);
    return response.data;
  }
);

/** USED TO DELETE DEPARTMENT */
export const deleteDepartmentAction = createAsyncThunk(
  "deleteDepartment",
  async (params) => {
    const response = await deleteDepartment(params);
    return response.data;
  }
);

/** USED TO GET PRODUCT & TOOLS LIST */
export const getProductToolsAction = createAsyncThunk(
  "getProductTools",
  async (params) => {
    const response = await getProductTools();
    return response.data;
  }
);

/** USED TO GET DESIGNATION LISTING */
export const getDesignationAction = createAsyncThunk(
  "getDesignation",
  async (params) => {
    const response = await getDesignation();
    return response.data;
  }
);

/** USED TO GET USER ROLES */
export const getRolesAction = createAsyncThunk("getRoles", async (params) => {
  const response = await getRoles();
  return response.data;
});

/** USED TO GET MARKET REGION LISTING */
export const getMarketRegionAction = createAsyncThunk(
  "getMarketRegion",
  async (params) => {
    const response = await getMarketRegion();
    return response.data;
  }
);

/** USED TO GET REGION LISTING */
export const getRegionAction = createAsyncThunk("getRegion", async (params) => {
  const response = await getRegion();
  return response.data;
});

/** USED TO ADD REGION LISTING */
export const addRegionAction = createAsyncThunk("addRegion", async (params) => {
  const response = await addRegion(params);
  return response.data;
});

/** USED TO UPDATE REGION LISTING */
export const updateRegionAction = createAsyncThunk(
  "updateRegion",
  async (params) => {
    const response = await updateRegion(params);
    return response.data;
  }
);

/** USED TO DELETE REGION LISTING */
export const deleteRegionAction = createAsyncThunk(
  "deleteRegion",
  async (params) => {
    const response = await deleteRegion(params);
    return response.data;
  }
);

/** USED TO GET LANGUAGE */
export const getLanguageAction = createAsyncThunk(
  "getLanguage",
  async (params) => {
    const response = await getLanguage();
    return response.data;
  }
);

/** USED TO ADD LANGUAGE LISTING */
export const addLanguageAction = createAsyncThunk(
  "addLanguage",
  async (params) => {
    const response = await addLanguage(params);
    return response.data;
  }
);

/** USED TO UPDATE LANGUAGE LISTING */
export const updateLanguageAction = createAsyncThunk(
  "updateLanguage",
  async (params) => {
    const response = await updateLanguage(params);
    return response.data;
  }
);

/** USED TO DELETE LANGUAGE LISTING */
export const deleteLanguageAction = createAsyncThunk(
  "deleteLanguage",
  async (params) => {
    const response = await deleteLanguage(params);
    return response.data;
  }
);

/** USED TO GET SHIFT */
export const getShiftAction = createAsyncThunk("getShift", async (params) => {
  const response = await getShift();
  return response.data;
});

/** USED TO GET ROLES RESTRICTIONS SETTING */
export const getRoleSettingAction = createAsyncThunk(
  "getRoleSetting",
  async (params) => {
    const response = await getRoleSetting();
    return response.data;
  }
);

/** USED TO UPDATE ROLES RESTRICTIONS SETTING  */
export const updateRoleSettingAction = createAsyncThunk(
  "updateRoleSetting",
  async (params) => {
    const response = await updateRoleSetting(params);
    return response.data;
  }
);

/*** MAIL SENT **/
export const noBoardAccessRequestAction = createAsyncThunk(
  "noBoardAccessRequest",
  async (params) => {
    const response = await noBoardAccessRequest();
    return response.data;
  }
);
export const newUserAccessRequestAction = createAsyncThunk(
  "newUserAccessRequest",
  async (params) => {
    const response = await newUserAccessRequest();
    return response.data;
  }
);

/** USED TO GET INDUSTRY LIST */
export const getIndustryAction = createAsyncThunk(
  "getIndustry",
  async (params) => {
    const response = await getIndustry(params);
    return response.data;
  }
);

/** USED TO GET CUSTOMER REGION */
export const getCustomerRegionAction = createAsyncThunk(
  "getCustomerRegion",
  async (params) => {
    const response = await getCustomerRegion(params);
    return response.data;
  }
);

/** USED TO GET CUSTOMER TYPE */
export const getCustomerTypeAction = createAsyncThunk(
  "getCustomerType",
  async (params) => {
    const response = await getCustomerType(params);
    return response.data;
  }
);

/** USED TO GET PACKAGE LIST */
export const getPackageAction = createAsyncThunk(
  "getPackage",
  async (params) => {
    const response = await getPackage(params);
    return response.data;
  }
);

/** USED TO GET TOOL STATUS */
export const getToolStatusAction = createAsyncThunk(
  "getToolStatus",
  async (params) => {
    const response = await getToolStatus(params);
    return response.data;
  }
);

/** USED TO GET TOOL CATEGORIES */
export const getCategoriesAction = createAsyncThunk(
  "getCategories",
  async (params) => {
    const response = await getCategories(params);
    return response.data;
  }
);

/** USED TO GET TOOL PLATFORMS */
export const getPlatformsAction = createAsyncThunk(
  "getPlatforms",
  async (params) => {
    const response = await getPlatforms(params);
    return response.data;
  }
);

/** USED TO GET TOOL SUBSCRIPTIONS */
export const getSubscriptionsListAction = createAsyncThunk(
  "getSubscriptionsList",
  async (params) => {
    const response = await getSubscriptionsList(params);
    return response.data;
  }
);

/** USED TO GET TOOL PRODUCT OWNERS */
export const getProductOwnersAction = createAsyncThunk(
  "getProductOwners",
  async (params) => {
    const response = await getProductOwners(params);
    return response.data;
  }
);

/** USED TO GET PACKAGE TOOL MAPPED DETAILS*/
export const getPackageToolDetailsAction = createAsyncThunk(
  "getPackageToolDetails",
  async (params) => {
    const response = await getPackageToolDetails(params);
    return response.data;
  }
);

/** USED TO GET STATUS CODE LIST */
export const getStatusCodeMasterAction = createAsyncThunk(
  "getStatusCodeMaster",
  async (params) => {
    const response = await getStatusCodeMaster(params);
    return response.data;
  }
);

/** USED TO GET FONT FAMILY LIST */
export const getFontFamilyAction = createAsyncThunk(
  "getFontFamily",
  async (params) => {
    const response = await getFontFamily(params);
    return response.data;
  }
);

/** USED TO ADD FONT FAMILY LIST */
export const addFontFamilyAction = createAsyncThunk(
  "addFontFamily",
  async (params) => {
    const response = await addFontFamily(params);
    return response.data;
  }
);

/** USED TO ADD FONT FAMILY LIST */
export const updateFontFamilyAction = createAsyncThunk(
  "updateFontFamily",
  async (params) => {
    const response = await updateFontFamily(params);
    return response.data;
  }
);

/** USED TO ADD FONT FAMILY LIST */
export const deleteFontFamilyAction = createAsyncThunk(
  "deleteFontFamily",
  async (params) => {
    const response = await deleteFontFamily(params);
    return response.data;
  }
);

/** USED TO GET LABELS */
export const getLabelsAction = createAsyncThunk("getLabels", async (params) => {
  const response = await getLabels(params);
  return response.data;
});

/** USED TO ADD LABELS */
export const addLabelAction = createAsyncThunk("addLabel", async (params) => {
  const response = await addLabel(params);
  return response.data;
});

/** USED TO UPDATE LABELS */
export const updateLabelAction = createAsyncThunk(
  "updateLabel",
  async (params) => {
    const response = await updateLabel(params);
    return response.data;
  }
);

/** AGENCY LIST MASTER */
export const getAllAgencyAction = createAsyncThunk(
  "getAllAgency",
  async (params) => {
    const response = await getAllAgency(params);
    return response.data;
  }
);
/** USED TO GET PARTICIPANTS UPDATES - KANBAN BOARD */
export const getTicketsbyboardParticipantsAction = createAsyncThunk(
  "getTicketsbyboardParticipants",
  async (params) => {
    const response = await getTicketsbyboardParticipants(params);
    return response.data;
  }
);
/** USED TO GET ROLES RESTRICTIONS SETTING */
export const getPurchaseOrderDetailsAction = createAsyncThunk(
  "getPurchaseOrderDetails",
  async (params) => {
    const response = await getPurchaseOrderDetails(params);
    return response.data;
  }
);
const BASE_URL = process.env.REACT_APP_MASTER_API_BASE_URL;
export const createTicketDetailsAction = createAsyncThunk(
  'ticket/createDetails',
  async (formData, thunkAPI) => {
    try {
      // Try to get token from multiple possible sources
      let token;
      
      // Option 1: Get from userData.token (primary source based on your Login.jsx)
      const userData = JSON.parse(localStorage.getItem("userData"));
      token = userData?.token;
      
      // Option 2: If not found, try accessing directly from accessToken
      if (!token) {
        token = localStorage.getItem("accessToken");
      }
      
      // Option 3: Try getting from your auth utility if available
      if (!token && typeof getAuthToken === 'function') {
        token = getAuthToken();
      }
      
      // If still no token, return error
      if (!token) {
        console.error('Authentication token not found');
        return thunkAPI.rejectWithValue('Authentication token not found. Please log in again.');
      }
      
      console.log('Using token:', token.substring(0, 10) + '...'); // Log first part of token for debugging
      
      const response = await axios.post(
        `${BASE_URL}/api/Ticket/add-comment-attachment`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('API request failed:', error);
      
      // Provide more detailed error information
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
        
        // If token expired (common 401 reason), suggest re-login
        if (error.response.status === 401) {
          return thunkAPI.rejectWithValue({
            message: 'Your session has expired. Please log in again.',
            originalError: error.response.data
          });
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', error.message);
      }
      
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
/** USED TO GET BOQ ITEMS BY ID */
export const getBoqItemsAction = createAsyncThunk(
  "getBoqItemsByID",
  async (params) => {
    const response = await getBoqItemsById(params);
    return response.data;
  }
);

/** CRETAE REPORT ATTACHMENT */
export const createReportAttachmentAction = createAsyncThunk(
  "report/createAttachment",
  async ({ reportId, files }, { rejectWithValue }) => {
    try {
      // ✅ Get token from localStorage (or wherever you store it)
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${BASE_URL}/api/Report/upload-attachments?reportId=${reportId}`,
        files,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/** Milestone Master LIST */
export const getMilestoneMasterAction = createAsyncThunk(
  "getMilestoneMaster",
  async (params) => {
    const response = await getMileStoneList(params);
    return response.data;
  }
);
export const createMilestoneMasterAction = createAsyncThunk(
  "createMilestoneMaster",
  async (params) => {
    const response = await createMileStone(params);
    return response.data;
  }
);
export const deleteMilestoneMasterAction = createAsyncThunk(
  "deleteMilestoneMaster",
  async (params) => {
    const response = await deleteMileStone(params);
    return response.data;
  }
);
/** PROJECT Status Master List */
export const getProjectStatusMasterAction = createAsyncThunk(
  "getProjectStatusMaster",
  async (params) => {
    const response = await getProjectStatusMaster(params);
    return response.data;
  }
);
/** TASK Status Master List */
export const getTaskStatusMasterAction = createAsyncThunk(
  "getTaskStatusMaster",
  async (params) => {
    const response = await getTaskStatusMaster(params);
    return response.data;
  }
);