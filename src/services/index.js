import api from "./api";
import graphAPI from "./graphAPI";
import customerAPI from "./customerAPI";
import updatesAPI from "./updatesAPI";
import { API } from "../constant/service";
import { objectToQueryString } from "../utils/common";
import { engineerMaterialsAPI } from "./engineerMaterialsAPI";

/**
 *
 * @param {Record<string, any>} params
 * @returns {Promise<{
 *  data: {Record<string, any>}
 * }>}
 */
/*login */
export const getLogin = (...props) => api.POST(API.GET_LOGIN, ...props);
export const logout = (...props) => api.POST(API.LOGOUT, ...props);

/** USER PROFILE */
// export const getUserProfile = (...props) => graphAPI.GET(API.GET_USER_PROFILE, ...props);
export const getUserInfo = (params) => api.GET(API.GET_USER_INFO, params);
export const getUserDetailsById = (params) =>
  api.GET(API.GET_USER_DETAILS_BY_ID + "/" + params);
export const getAllMembers = (params) => api.GET(API.GET_ALL_MEMBERS, params);
//Department//
export const getDepartments = (params) => api.GET(API.GET_DEPARTMENTS, params);
export const getDepartmentsById = (id) => {
  const endpoint = API.GET_DEPARTMENTS_BY_ID.replace(/\/+$/, "");
  return api.GET(`${endpoint}/${id}`);
};
/** GET PURCHASE ORDER DETAILS */
export const getPurchaseOrderDetails = (purchaseOrderId) =>
  api.GET(`${API.GET_PURCHASE_ORDER_DETAILS}/${purchaseOrderId}`);

// boq apis

export const getBoqDetails = (boqId) => {
  if (!boqId) {
    throw new Error("Boq ID is required.");
  }
  return api.GET(`${API.GET_BOQ_DETAILS}?boqId=${boqId}`);
};

/*Ceo Project */
export const getProjectTypeSector = (params) =>
  api.GET(API.Get_PROJECTTYPE_SECTOR, params);
export const createceoproject = (params) =>
  api.POST(API.CREATE_CEO_PROJECT, params);
export const createProjectBudget = (params) =>
  api.POST(API.CREATE_PROJECT_BUDGET, params);
export const createProjectTeam = (params) =>
  api.POST(API.CREATE_PROJECT_TEAM, params);
export const crateFinanceApproved = (params) =>
  api.POST(API.CREATE_FINACIAL_APPROVAL, params);
export const createProjectMilestone = (params) =>
  api.POST(API.CREATE_PROJECT_MILESTONE, params);
export const createUploadFiles = (params) =>
  api.POST(API.UPSERTRISK_UPLOAD, params);
/** Tickets Comments Create */
export const createTicketsDetails = (params) =>
  api.POST(API.CREATE_TICKET_DETAILS, params);
export const createNewTicketTask = (params) =>
  api.POST(API.CREATE_NEW_TICKET_TASK, params);

//ticket
export const getTicketById = (ticketId) => {
  if (!ticketId) {
    throw new Error("Ticket ID is required.");
  }
  return api.GET(`${API.GET_TICKET_BY_ID}?ticketId=${ticketId}`);
};

//BOQCODE
export const getBoqCode = (params) =>
  api.GET(API.GET_BOQCODE + "/" + params.boqCode, params);

export const getTicketLabels = (params) =>
  api.GET(API.GET_TICKET_LABELS + "/" + params.empId, params);

export const updateprojectapproval = (params) =>
  api.PUT(API.UPDATE_PROJECT_APPROVAL + "/" + params.ticketId, params);
// fetch vendors and subcontractors
export const getVendorsAndSubcontractors = (params) =>
  api.GET(API.GET_VENDORS_AND_SUBCONTRACTORS, params);
export const getProjectDetails = (params) =>
  api.GET(API.GET_PROJECT_DETAILS_BY_ID + "?projectId=" + params);
export const getAllProjectByFilter = (params) =>
  api.GET(API.GET_ALL_PROJECT_FILTER, params);
// fetch all employees by roles in a single API call
export const getEmployeesByRoles = (params) =>
  api.GET(API.GET_EMPLOYEES_BY_ROLES, params);
//get role
export const getroles = (params) => api.GET(API.GET_ROLE, params);
/* get login board details  */
export const loginBoardDetails = (params) =>
  api.GET(API.LOGIN_BOARD_DETAILS + "/" + params);

/** BOQ ITEMS BY ID */
export const getBoqItemsById = (params) =>
  api.GET(API.GET_BOQ_ITEMS_BY_ID + "/" + params);

/* PM Project*/
export const getPmProjectDetails = (params) =>
  api.GET(API.GET_PROJECT_DETAILS, params);
//notification
export const createNotification = (params) =>
  api.POST(API.CREATE_NOTIFICATION, params);
export const getnotification = (params) =>
  api.GET(API.GET_NOTIFICATION + "?UserId=" + params);

/** KANBAN BOARD */
export const getAllBoard = (params) => api.GET(API.GET_ALL_BOARD, params);
export const getBoardById = (params) =>
  api.GET(API.GET_BOARD_BY_ID + "/" + params);
export const createBoard = (params) => api.POST(API.CREATE_BOARD, params);
export const updateBoard = (params) =>
  api.PUT(API.UPDATE_BOARD + "/" + params.boardId, params);
export const deleteBoard = (params) =>
  api.POST(API.DELETE_BOARD + "/" + params);
export const getBoardStatusMovement = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.GET(API.BOARD_STATUS_MOVEMENT);
  } else if (params.activeWorkSpace === 2) {
    return updatesAPI.GET(API.PERIODIC_BOARD_STATUS_MOVEMENT);
  } else {
    return api.GET(API.AGENCY_BOARD_STATUS_MOVEMENT);
  }
};
export const getTicketByBoardLabel = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.GET(
      API.GET_TICKET_BY_BOARD_LABEL + "?" + objectToQueryString(params)
    );
  } else if (params.activeWorkSpace === 2) {
    return updatesAPI.GET(
      API.GET_PERIODIC_TICKET_BY_BOARD_LABEL + "?" + objectToQueryString(params)
    );
  } else {
    return api.GET(
      API.GET_AGENCY_TICKET_BY_BOARD_LABEL + "?" + objectToQueryString(params)
    );
  }
};
export const getFilteredBoardData = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.POST(API.GET_FILTERED_BOARD_DATA, params);
  } else if (params.activeWorkSpace === 2) {
    return updatesAPI.POST(API.GET_FILTERED_UPDATE_BOARD_DATA, params);
  }
};

/** PERIODIC UPDATES - KANBAN BOARD **/
export const getPeriodicUpdatesBoard = (params) => {
  return updatesAPI.GET(
    `${API.GET_PERIODIC_BOARD_LIST}/${params.boardId}${
      params.sortBy ? `?sort_by=${params.sortBy}` : ""
    }`
  );
};
export const updatePeriodicBoardDefault = (params) =>
  updatesAPI.POST(API.UPDATE_PERIODIC_BOARD_DEFAULT, params);
export const createPeriodicTicket = (params) =>
  updatesAPI.POST(API.CREATE_PERIODIC_TICKET, params);
export const getPeriodicTools = (params) =>
  updatesAPI.GET(API.PERIODIC_TOOLS_MASTER, params);
export const getPeriodicDetails = (params) =>
  updatesAPI.GET(API.PERIODIC_DETAILS_MASTER, params);
export const periodicTicketDuedateUpdate = (params) =>
  updatesAPI.POST(
    API.PERIODIC_TICKET_DUEDATE_UPDATE + "?id=" + params.ticketId,
    params.dueDate
  );
export const addUpdateTicketToolDetail = (params) =>
  updatesAPI.POST(API.ADD_UPDATE_TICKET_TOOL_DETAIL, params);
export const addRemoveParticipant = (params) =>
  updatesAPI.POST(API.ADD_REMOVE_PARTICIPANT, params);
export const updateAssigneeTicketDetail = (params) =>
  updatesAPI.POST(API.UPDATE_ASSIGNEE_TICKET_DETAIL, params);
export const getUpdatesMarketRegions = (params) =>
  updatesAPI.GET(API.PERIODIC_UPDATES_MARKET_REGIONS + "?id=" + params);
export const getFormRequirementDetails = (params) =>
  updatesAPI.GET(API.UPDATES_REQUIREMENT_FORM_DETAILS + "/" + params);
export const getAttachementfiles = (params) =>
  updatesAPI.GET(API.GET_ATTACHEMENT_FILES + "/" + params);

/** PERIODIC UPDATES - KANBAN BOARD **/
export const getTicketsbyboardParticipants = (params) =>
  updatesAPI.GET(
    API.TICKETS_BY_BOARD_PARTICIPANTS +
      "?workspaceid=" +
      params.workspaceid +
      "&boardid=" +
      params.boardid
  );
export const saveEventNotes = (params) =>
  updatesAPI.POST(API.SAVE_EVENT_NOTES, params);
export const getEventDetails = (params) =>
  updatesAPI.POST(API.GEt_EVENT_DETAILS, params);

/** PERIODIC UPDATES BOARD CALENDAR **/
export const getCalendarEventList = (params) =>
  updatesAPI.POST(API.GET_CALENDAR_EVENTS, params);

/** WORKSPACE UPDATE */
export const updateDefaultWorkspace = (params) =>
  updatesAPI.POST(API.UPDATE_DEFAULT_WORKSPACE, params);

/** KANBAN BOARD - STATUS */
export const createBoardStatus = (params) =>
  api.POST(API.CREATE_BOARD_STATUS, params);
export const updateBoardStatus = (params) =>
  api.PUT(API.UPDATE_BOARD_STATUS + "/" + params.labelId, params);
export const deleteBoardStatus = (params) =>
  api.POST(API.DELETE_BOARD_STATUS + "/" + params);

/** MASTER */
export const getColor = (params) => api.GET(API.GET_COLOR, params);
export const addColor = (params) => api.POST(API.ADD_COLOR, params);
export const updateColor = (params) =>
  api.PUT(API.UPDATE_COLOR + "/" + params.color_id, params);
export const deleteColor = (params) =>
  api.DELETE(API.DELETE_COLOR + "/" + params.color_id);
export const getCountry = (params) => api.GET(API.GET_COUNTRY, params);
export const addCountry = (params) => api.POST(API.ADD_COUNTRY, params);
export const updateCountry = (params) =>
  api.PUT(API.UPDATE_COUNTRY + "/" + params.country_id, params);
export const deleteCountry = (params) =>
  api.DELETE(API.DELETE_COUNTRY + "/" + params.country_id);
export const getUserDepartment = (params) =>
  api.GET(API.GET_USER_DEPARTMENT, params);
export const getDepartment = (params) => api.GET(API.GET_DEPARTMENT, params);
export const addDepartment = (params) => api.POST(API.ADD_DEPARTMENT, params);
export const updateDepartment = (params) =>
  api.PUT(API.UPDATE_DEPARTMENT + "/" + params.dept_id, params);
export const deleteDepartment = (params) =>
  api.DELETE(API.DELETE_DEPARTMENT + "/" + params.dept_id);
export const addBoard = (params) => api.POST(API.ADD_BOARD, params);
export const getBoard = (params) => api.GET(API.GET_BOARD, params);
export const editBoard = (params) => api.PUT(`${API.EDIT_BOARD}`, params);
export const getDesignation = (params) => api.GET(API.GET_DESIGNATION, params);
export const getRoles = (params) => api.GET(API.GET_ROLES, params);
export const getMarketRegion = (params) =>
  api.GET(API.GET_MARKET_REGION, params);
export const getRegion = (params) => api.GET(API.GET_REGION, params);
export const addRegion = (params) => api.POST(API.ADD_REGION, params);
export const updateRegion = (params) =>
  api.PUT(API.UPDATE_REGION + "/" + params.region_id, params);
export const deleteRegion = (params) =>
  api.DELETE(API.DELETE_REGION + "/" + params.region_id);
export const getLanguage = (params) => api.GET(API.GET_LANGUAGE, params);
export const addLanguage = (params) => api.POST(API.ADD_LANGUAGE, params);
export const updateLanguage = (params) =>
  api.PUT(API.UPDATE_LANGUAGE + "/" + params.language_id, params);
export const deleteLanguage = (params) =>
  api.DELETE(API.DELETE_LANGUAGE + "/" + params.language_id);

export const getShift = (params) => api.GET(API.GET_SHIFT, params);
export const getRoleSetting = (params) => api.GET(API.GET_ROLE_SETTING, params);
export const updateRoleSetting = (params) =>
  api.POST(API.UPDATE_ROLE_SETTING, params);
export const getIndustry = (params) =>
  customerAPI.GET(API.GET_INDUSTRY, params);
export const getCustomerRegion = (params) =>
  customerAPI.GET(API.GET_CUSTOMER_REGION, params);
export const getCustomerType = (params) =>
  customerAPI.GET(API.GET_CUSTOMER_TYPE, params);
export const getPackage = (params) => customerAPI.GET(API.GET_PACKAGE, params);
export const getStatusCodeMaster = () => api.GET(API.STATUS_CODE_MASTER);
export const getFontFamily = () => api.GET(API.GET_FONT_FAMILY_MASTER);
export const addFontFamily = (params) =>
  api.POST(API.ADD_FONT_FAMILY_MASTER, params);
export const updateFontFamily = (params) =>
  api.PUT(API.UPDATE_FONT_FAMILY_MASTER + "/" + params.font_id, params);
export const deleteFontFamily = (params) =>
  api.DELETE(API.DELETE_FONT_FAMILY_MASTER + "/" + params.font_id);

export const getLabels = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.GET(API.GET_LABELS);
  } else if (params.activeWorkSpace === 2) {
    return updatesAPI.GET(API.GET_ALL_UPDATES_LABEL);
  } else if (params.activeWorkSpace === 3) {
    return api.GET(API.GET_ALL_AGENCY_LABELS);
  }
};
export const addLabel = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.POST(API.ADD_LABEL, params);
  } else if (params.activeWorkSpace === 2) {
    return updatesAPI.GET(API.ADD_UPDATES_LABEL);
  }
};
export const updateLabel = (params) =>
  api.PUT(API.UPDATE_LABEL + "/" + params.labelId, params);
export const getCustomerLanguage = (params) =>
  customerAPI.GET(API.GET_CUSTOMER_LANGUAGE, params);
export const getPrimaryMarket = () => customerAPI.GET(API.GET_PRIMARY_MARKET);
export const getAllCountryDetail = () => api.GET(API.GET_ALL_COUNTRY_DETAIL);

/**** Tools Master Data ***/
export const getProductTools = (params) =>
  api.GET(API.GET_PRODUCT_TOOLS, params);
export const getPlatforms = () => api.GET(API.PLATFORMS_LIST);
export const getSubscriptionsList = () => api.GET(API.SUBSCRIPTIONS_TYPES);
export const getToolStatus = () => api.GET(API.TOOL_STATUS);
export const getCategories = () => api.GET(API.CATEGORIES_LIST);
export const getProductOwners = () => api.GET(API.PRODUCT_OWNERS);
export const getCurrency = (params) => api.GET(API.GET_CURRENCY, params);
export const addCurrency = (params) => api.POST(API.ADD_CURRENCY, params);
export const updateCurrency = (params) =>
  api.PUT(API.UPDATE_CURRENCY + "/" + params.currency_id, params);
export const deleteCurrency = (params) =>
  api.DELETE(API.DELETE_CURRENCY + "/" + params.currency_id);

/*** My Team **/
export const getMyTeamMembers = (params) => api.GET(API.GET_MY_TEAM_MEMBER);
export const getMyTeamMemberProfile = (params) =>
  api.GET(API.GET_MY_TEAM_MEMBER_PROFILE + params);
export const updateMyTeamMemberProfile = (params) =>
  api.POST(API.UPDATE_MY_TEAM_MEMBER_PROFILE, params);
export const getAllADMembers = (params) => api.GET(API.GET_AD_MEMBERS);
export const addTeamMembers = (params) =>
  api.POST(API.ADD_TEAM_MEMBERS, params);

/*** MAIL SENT **/
export const noBoardAccessRequest = () => api.GET(API.NO_BOARD_ACCESS_REQUEST);
export const newUserAccessRequest = () => api.GET(API.NEW_USER_ACCESS_REQUEST);

/** CUSTOMER RELATED INFORMATION */
export const getCustomers = (params) =>
  customerAPI.POST(API.GET_CUSTOMERS, params);
export const getCustomerOverview = (params) =>
  customerAPI.GET(API.CUSTOMER_OVERVIEW + params);
export const getCustomerOrdersInvoices = (params) =>
  customerAPI.GET(API.CUSTOMER_ORDERS_INVOICES + params);
export const getCustomerServicesLinks = (params) =>
  customerAPI.GET(API.CUSTOMER_SERVICES_LINKS + params);
export const getCustomerLatestOrderId = (params) =>
  customerAPI.GET(API.CUSTOMER_LATEST_ORDER_ID + "?" + params);
export const updateCustomerOrderId = (params) =>
  api.POST(API.UPDATE_CUSTOMER_ORDER_ID, params);
export const customerSearchwithType = (params) =>
  customerAPI.GET(
    API.CUSTOMER_SEARCH_WITH_TYPE +
      "?type=" +
      params.type +
      "&customersearch=" +
      params.search
  );

/**** Tools Management ***/
export const addTools = (params) => api.POST(API.ADD_TOOLS, params);
export const updateTools = (params) => api.POST(API.UPDATE_TOOLS, params);
export const editorViewTool = (params) =>
  api.GET(API.EDITOR_VIEW_TOOL + params);
export const toolsList = (params) => api.POST(API.TOOLS_LIST, params);
export const deleteTool = (params) => api.GET(API.DELETE_TOOL + params);

/** TASK MANAGEMENT */
export const addTicket = (params) => api.POST(API.ADD_TICKET, params);
export const updateTicket = (params) =>
  api.POST(API.UPDATE_TICKET + "/" + params.ticket_id, params);
export const suggestedMembers = (params) =>
  api.GET(API.SUGGESTED_MEMBERS, params);
export const customerSearch = (params) =>
  customerAPI.POST(API.CUSTOMER_SEARCH + params);
export const getTicketDetails = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.GET(API.GET_TICKET_DETAILS + "/" + params.id);
  } else if (params.activeWorkSpace === 2) {
    return updatesAPI.GET(API.GET_PERIODIC_TICKET_DETAILS + "/" + params.id);
  } else if (params.activeWorkSpace === 3) {
    return api.GET(API.GET_AGENCY_TICKET_DETAILS + "/" + params.id);
  }
};

export const updateTicketSalesData = (params) =>
  api.POST(API.UPDATE_TICKET_SALES_DATA, params);
export const updateTicketCommonData = (params) =>
  api.POST(API.UPDATE_TICKET_COMMON_DATA, params);
export const getPackageToolDetails = (params) =>
  api.GET(API.GET_PACKAGE_TOOL_DETAILS, params);
export const ticketFileUpload = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.FILEUPLOAD(API.TICKET_FILE_UPLOAD, params);
  } else if (params.activeWorkSpace === 2) {
    return updatesAPI.FILEUPLOAD(API.PERIODIC_TICKET_FILE_UPLOAD, params);
  } else if (params.activeWorkSpace === 3) {
    return api.FILEUPLOAD(API.AGENCY_TICKET_SINGLE_FILE_UPLOAD, params);
  }
};
export const deleteTicketAttachment = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.POST(API.DELETE_TICKET_ATTACHMENT, params);
  } else if (params.activeWorkSpace === 2) {
    return updatesAPI.POST(API.DELETE_PERIODIC_TICKET_ATTACHMENT, params);
  } else if (params.activeWorkSpace === 3) {
    return api.POST(API.DELETE_AGENCY_TICKET_ATTACHMENT, params);
  }
};
export const downloadAttachment = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.FILEDOWNLOAD(
      API.FILE_DOWNLOAD + "?filepath=" + params.file_upload_path,
      params
    );
  } else if (params.activeWorkSpace === 2) {
    return updatesAPI.FILEDOWNLOAD(
      API.PERIODIC_FILE_DOWNLOAD + "?filepath=" + params.file_upload_path,
      params
    );
  } else {
    return api.FILEDOWNLOAD(
      API.AGENCY_FILE_DOWNLOAD + "?filepath=" + params.file_upload_path,
      params
    );
  }
};

/** TOOL TICKET */
export const updateToolTicket = (params) =>
  api.POST(API.UPDATE_TOOL_TICKET, params);
export const toolFileUpload = (params) =>
  api.FILEUPLOAD(API.TOOL_FILE_UPLOAD, params);
export const moveTicket = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.POST(API.MOVE_TICKET, params);
  } else if (params.activeWorkSpace === 2) {
    return updatesAPI.POST(API.PERIODIC_MOVE_TICKET, params);
  } else if (params.activeWorkSpace === 3) {
    return api.POST(API.AGENCY_MOVE_TICKET, params);
  }
};
export const getCommentDetails = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.POST(API.GET_COMMENT_DETAILS, params);
  } else if (params.activeWorkSpace === 2) {
    return updatesAPI.POST(API.GET_UPDATES_COMMENT_DETAILS, params);
  } else if (params.activeWorkSpace === 3) {
    return api.POST(API.GET_AGENCY_TICKET_COMMENT_DETAILS, params);
  }
};

export const getFinancialYearCommentDetails = (params) => {
  if (params.activeWorkSpace === 2) {
    return updatesAPI.POST(
      API.FINANACIAL_YEAR_BASED_GET_UPDATES_COMMENT_DETAILS,
      params
    );
  }
};

export const addUpdateComment = (params) => {
  if (params.body.activeWorkSpace === 1) {
    return api.FILEUPLOAD(API.ADD_UPDATE_COMMENT, params);
  } else if (params.body.activeWorkSpace === 2) {
    return updatesAPI.FILEUPLOAD(API.ADD_UPDATE_PERIODIC_COMMENT, params);
  } else if (params.body.activeWorkSpace === 3) {
    return api.FILEUPLOAD(API.ADD_UPDATE_AGENCY_TICKET_COMMENT, params);
  }
};

export const deleteComment = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.POST(API.DELETE_COMMENT, params);
  } else if (params.activeWorkSpace === 2) {
    return updatesAPI.POST(API.DELETE_PERIODIC_COMMENT, params);
  } else if (params.activeWorkSpace === 3) {
    return api.POST(API.DELETE_AGENCY_COMMENT_DETAILS, params);
  }
};

export const deleteToolAttachment = (params) =>
  api.POST(API.DELETE_TOOL_ATTACHMENT, params);
export const addAssigneeStatus = (params) =>
  api.POST(API.ADD_ASSIGNEE_STATUS, params);
export const dataDependencyAdd = (params) =>
  api.POST(API.DATA_DEPENDENCY_ADD, params);
export const dataDependencyStatus = (params) =>
  api.POST(API.DATA_DEPENDENCY_STATUS, params);
export const getToolsReleaseHistory = (params) =>
  updatesAPI.GET(
    API.GET_TOOLS_RELEASE_HISTORY +
      "?id=" +
      params.ticketId +
      "&financial_year=" +
      params.year
  );

/** SUBSCRIPTION/PACKAGE */
export const getAllPackages = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.GET(API.GET_ALL_PACKAGES, params);
  } else if (params.activeWorkSpace === 3) {
    return api.GET(API.GET_AGENCY_ALL_PACKAGES, params);
  }
};
export const addPackage = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.POST(API.ADD_PACKAGE, params);
  } else if (params.activeWorkSpace === 3) {
    return api.POST(API.AGENCY_ADD_UPDATE_PACKAGE, params);
  }
};
export const updatePackage = (params) => {
  if (params.activeWorkSpace === 1) {
    return api.POST(API.UPDATE_PACKAGE, params);
  } else if (params.activeWorkSpace === 3) {
    return api.POST(API.AGENCY_ADD_UPDATE_PACKAGE, params);
  }
};
export const deletePackage = (params) => api.GET(API.DELETE_PACKAGE + params);

/** NOTIFICATION */
export const getRecentNotification = (params) =>
  api.POST(API.GET_RECENT_NOTIFICATION, params);
export const updateNotification = (params) =>
  api.POST(API.UPDATE_NOTIFICATION, params);
export const getPushNotification = (params) =>
  api.POST(API.GET_PUSH_NOTIFICATION, params);
export const getPageNotification = (params) =>
  api.GET(API.GET_PAGE_NOTIFICATION, params);

/** AGENCY & AGENCY USER */
export const getAllAgency = (params) => api.GET(API.GET_ALL_AGENCY, params);
export const agencyUserSignUp = (params) =>
  api.POST(API.AGENCY_USER_SIGNUP, params);
export const approveRejectAgencyUser = (params) =>
  api.POST(API.APPROVE_REJECT_AGENCY_USER, params);
export const getAgencyUserList = (params) =>
  api.POST(API.GET_ALL_AGENCY_USER_LIST, params);
export const createAgencyTicket = (params) =>
  api.POST(API.CREATE_AGENCY_TICKET, params);
export const addAgencyWatchlist = (params) =>
  api.POST(API.ADD_WATCHLIST, params);
export const agencyticketdetails = (params) =>
  api.POST(API.GET_AGENCY_TICKET_DETAILS, params);
export const getAgencyBoard = (params) =>
  api.GET(API.GET_AGENCY_BOARD_LIST + "/" + params);
export const updateAgencyTicketDetail = (params) =>
  api.POST(API.UPDATE_AGENCY_TICKET_DETAIL, params);
export const ticketAddUpdateToolStatus = (params) =>
  api.POST(API.TICKET_ADD_UPDATE_TOOL_STATUS, params);
export const agencyToolSubscription = (params) =>
  api.GET(API.AGENCY_TOOL_SUBSCRIPTION + "?id=" + params.id);
export const getAllTimeZoneDetail = (params) =>
  api.GET(API.GET_TIME_ZONE_DETAIL);
export const getPeersIndicesSearch = (params) =>
  api.GET(
    API.GET_PEERS_INDICES_SEARCH +
      "?searchText=" +
      params.searchText +
      "&filterBy=" +
      params.filterBy
  );

/** AGENCY - CONTACT US */
export const getAgencyIssueType = (params) =>
  api.GET(API.GET_AGENCY_ISSUETYPE, params);
export const submitContactUsForm = (params) =>
  api.POST(API.SUBMIT_CONTACT_US_FORM, params);

export * from "./inventoryAPI";
export { default as materialAPI } from "./aqsmaterialsAPI";
export * as engineerMaterialsAPI from "./engineerMaterialsAPI";
export * from "./aqsBoqAPI";
export { costEstimationAPI } from "./costEstimationAPI";
export { vendorAPI } from "./vendorAPI";
export { reportAPI } from "./reportAPI";
export { default as aqsmaterialsAPI, getMaterialProjects, getMaterialStatusByProject } from "./aqsmaterialsAPI";



