export const API = {
  GET_LOGIN: "/api/Login/login",
  LOGOUT: "/api/auth/logout",
  GET_USER_PROFILE: "/v1.0/me",
  GET_USER_INFO: "/api/Login/LoginUserDetail",
  GET_ROLE: "/api/Role/getRoles",

  /*Ceo Project */
  Get_PROJECTTYPE_SECTOR: "/api/Project/getProjectTypesAndProjectSectors",
  CREATE_CEO_PROJECT: "/api/Project/upsertProject",
  CREATE_PROJECT_BUDGET: "/api/Project/upsertProjectBudget",
  CREATE_PROJECT_TEAM: "/api/Project/upsertProjectTeam",
  CREATE_FINACIAL_APPROVAL: "/api/Project/upsertPermissionFinanceApproval",
  CREATE_PROJECT_MILESTONE: "/api/Project/upsertProjectMilestones",
  GET_PROJECT_DETAILS_BY_ID: "/api/Project/getProjectDetails",
  GET_ALL_PROJECT_FILTER: "/api/Project/get-projects-by-status",
  GET_TICKET_BY_ID: "/api/Ticket/get-ticket-by-id",
  GET_TICKET_LABELS: "/api/Login/labels-with-tickets",
  CREATE_NEW_TICKET_TASK: "/api/Ticket/create-custom-ticket",
  UPDATE_PROJECT_APPROVAL: '/api/Ticket/update-ticket-by-id',
  UPSERTRISK_UPLOAD: "/api/Project/upsertRisk",
  //department //
  GET_DEPARTMENTS: "/api/Department/get-department",
  GET_DEPARTMENTS_BY_ID: "/api/Login/getEmployeesByDepartment/",
  /*PM FLOW  */
  GET_PROJECT_DETAILS: "/api/Project/getProjectDetails",


  /* Employee data */
  GET_EMPLOYEES_BY_ROLES: "/api/Login/getEmployeesByRoles",
  GET_VENDORS_AND_SUBCONTRACTORS: "/api/Login/getVendorsAndSubcontractors",

  //Notification
  CREATE_NOTIFICATION: "/api/Notification/create-notification",
  GET_NOTIFICATION: "/api/Notification/get-notification",
  //Ticket Comment Create
  CREATE_TICKET_DETAILS: '/api/Ticket/add-comment-attachment',

  /** KANBAN */
  GET_ALL_BOARD: "/api/BoardManagement/boards",
  GET_BOARD_BY_ID: "/api/BoardManagement/boards",
  CREATE_BOARD: "/api/BoardManagement/add",
  UPDATE_BOARD: "/api/BoardManagement/update",
  DELETE_BOARD: "/api/BoardManagement/delete",
  CREATE_BOARD_STATUS: "/api/BoardStatus/add",
  UPDATE_BOARD_STATUS: "/api/BoardStatus/update",
  DELETE_BOARD_STATUS: "/api/BoardStatus/delete",
  BOARD_STATUS_MOVEMENT: "/api/BoardStatus/getboardstatusmovement",
  GET_TICKET_BY_BOARD_LABEL: "/api/BoardManagement/ticketsbyboardlabel",
  GET_FILTERED_BOARD_DATA: "/api/BoardManagement/boardfilter",
  GET_FILTERED_UPDATE_BOARD_DATA: "/api/UpdatesBoardList/boardfilter",
  /** GET BOQ ITEMS BY ID */
  GET_BOQ_ITEMS_BY_ID: '/api/Project/boq-items',
  // LOGIN BOARD DETAILS 
  LOGIN_BOARD_DETAILS: '/api/Login/board-details',
  /** GET PURCHASE ORDER DETAILS */
  GET_PURCHASE_ORDER_DETAILS: '/api/Vendor/Getpurchase-order-details',
  GET_BOQCODE: '/api/Project/getBoqDetailsBy-BOQCode',

  //** BOQ Get DATA ***/
  GET_BOQ_DETAILS: "/api/Project/getBoqDetails",
  /** MASTER */
  GET_COLOR: "/api/CoreColor/corecolors",
  ADD_COLOR: "/api/CoreColor/add",
  UPDATE_COLOR: "/api/CoreColor/update",
  DELETE_COLOR: "/api/CoreColor/delete",
  GET_COUNTRY: "/api/Country/getallcountry",
  ADD_COUNTRY: "/api/Country/add",
  UPDATE_COUNTRY: "/api/Country/update",
  DELETE_COUNTRY: "/api/Country/delete",
  GET_USER_DEPARTMENT: "/api/DepartmentManagement/userdepartments",
  GET_DEPARTMENT: "/api/DepartmentManagement/departments",
  ADD_DEPARTMENT: "/api/DepartmentManagement/add",
  UPDATE_DEPARTMENT: "/api/DepartmentManagement/update",
  DELETE_DEPARTMENT: "/api/DepartmentManagement/delete",
  ADD_BOARD: "/api/BoardManagement/addboardwithlabel",
  GET_BOARD: "/api/BoardManagement/boardlist",
  EDIT_BOARD: "/api/BoardManagement/updateboardwithlabel",
  GET_DESIGNATION: "/api/Designation/designations",
  GET_ROLES: "/api/Role/roles",
  GET_MARKET_REGION: "/api/Region/marketregions",
  GET_REGION: "/api/Region/regions",
  ADD_REGION: "/api/Region/add",
  UPDATE_REGION: "/api/Region/update",
  DELETE_REGION: "/api/Region/delete",
  GET_LANGUAGE: "/api/Language/languages",
  ADD_LANGUAGE: "/api/Language/add",
  UPDATE_LANGUAGE: "/api/Language/update",
  DELETE_LANGUAGE: "/api/Language/delete",
  GET_SHIFT: "/api/Shift/shifts",
  GET_INDUSTRY: "/api/IndustryManagement/industries",
  GET_CUSTOMER_REGION: "/api/MarketManagement/markets",
  GET_CUSTOMER_TYPE: "/api/TypeManagement/customertypes",
  GET_PACKAGE: "/api/PackageManagement/categories",
  STATUS_CODE_MASTER: "/api/StatusCodeMaster/statuscodemaster",
  GET_FONT_FAMILY_MASTER: "/api/FontFamily/fonts",
  ADD_FONT_FAMILY_MASTER: "/api/FontFamily/add",
  UPDATE_FONT_FAMILY_MASTER: "/api/FontFamily/update",
  DELETE_FONT_FAMILY_MASTER: "/api/FontFamily/delete",
  GET_LABELS: "/api/Label/labels",
  ADD_LABEL: "/api/Label/add",
  UPDATE_LABEL: "/api/Label/update",
  GET_CUSTOMER_LANGUAGE: "/api/Role/customerlanguage",
  GET_PRIMARY_MARKET: "/api/MarketManagement/markets",
  GET_ALL_COUNTRY_DETAIL: "/api/CountryDetail/getallcountrydetail",

  /**** TOOLS MASTER DATA ***/
  GET_PRODUCT_TOOLS: "/api/Tool/tools",
  PLATFORMS_LIST: "/api/Tool/platforms",
  SUBSCRIPTIONS_TYPES: "/api/Tool/subscriptions",
  TOOL_STATUS: "/api/Tool/status",
  CATEGORIES_LIST: "/api/Tool/categories",
  PRODUCT_OWNERS: "/api/Tool/productowners",
  GET_CURRENCY: "/api/Currency/currency",
  ADD_CURRENCY: "/api/Currency/add",
  UPDATE_CURRENCY: "/api/Currency/update",
  DELETE_CURRENCY: "/api/Currency/delete",

  /*** My Team **/
  GET_MY_TEAM_MEMBER: "/api/User/userteams",
  GET_MY_TEAM_MEMBER_PROFILE: "/api/User/editorviewuserteam/id?id=",
  UPDATE_MY_TEAM_MEMBER_PROFILE: "/api/User/updateuserteam",
  GET_ALL_MEMBERS: "/api/User/registeredusers",

  /**** AD Users****/
  ADD_TEAM_MEMBERS: "/api/Login/registeruser",
  GET_AD_MEMBERS: "/api/AdManagement/ad-users",

  /** SETTINGS */
  GET_ROLE_SETTING: "/api/Role/roleSetting",
  UPDATE_ROLE_SETTING: "/api/Role/updateRoleSetting",

  /*** MAIL SENT **/
  NO_BOARD_ACCESS_REQUEST: "/api/MailManagement/board-access-request",
  NEW_USER_ACCESS_REQUEST: "/api/MailManagement/access-request",

  /** CUSTOMER */
  GET_CUSTOMERS: "/api/CustomerManagement/customers",
  CUSTOMER_OVERVIEW: "/api/CustomerManagement/customers/id?customerid=",
  CUSTOMER_ORDERS_INVOICES: "/api/CustomerManagement/orders/id?customerid=",
  CUSTOMER_SERVICES_LINKS: "/api/CustomerManagement/servicelink/id?customerid=",
  CUSTOMER_SEARCH_WITH_TYPE: "/api/CustomerManagement/customersearch",

  /**** TOOLS MANAGEMENT ***/
  ADD_TOOLS: '/api/ToolManagement/add-tools',
  UPDATE_TOOLS: '/api/ToolManagement/update-tools',
  EDITOR_VIEW_TOOL: '/api/ToolManagement/editorviewtool/id?id=',
  TOOLS_LIST: '/api/ToolManagement/listorgridviewtool',
  DELETE_TOOL: '/api/ToolManagement/deletetool?id=',

  /** TASK/TICKET MANAGEMENT */
  ADD_TICKET: '/api/Ticket/createTicket',
  UPDATE_TICKET: '/api/TicketManagement/update-ticket',
  SUGGESTED_MEMBERS: '/api/TicketManagement/suggested-members',
  CUSTOMER_SEARCH: '/api/TicketManagement/ticketcustomers?customersearch=',
  GET_TICKET_DETAILS: '/api/TicketManagement/ticket-details',
  UPDATE_TICKET_SALES_DATA: '/api/TicketManagement/add-update-ticket-detail',
  UPDATE_TICKET_COMMON_DATA: '/api/TicketManagement/add-update-common-data',
  GET_PACKAGE_TOOL_DETAILS: '/api/TicketManagement/package-tool-details',
  TICKET_FILE_UPLOAD: '/api/TicketManagement/single-file-upload',
  DELETE_TICKET_ATTACHMENT: '/api/TicketManagement/deleteticketattachmentdetail',
  FILE_DOWNLOAD: '/api/TicketManagement/filedownload',
  CUSTOMER_LATEST_ORDER_ID: '/api/TicketManagement/customerlatestorderid',
  UPDATE_CUSTOMER_ORDER_ID: '/api/TicketManagement/updatecustomerorderid',

  /** TOOL TICKET MANAGEMENT */
  UPDATE_TOOL_TICKET: '/api/TicketToolManagement/upserttoolticket',
  TOOL_FILE_UPLOAD: '/api/TicketToolManagement/attachments',
  MOVE_TICKET: '/api/TicketToolManagement/moveticket',
  GET_COMMENT_DETAILS: '/api/TicketToolManagement/ticketcommentdetails',
  ADD_UPDATE_COMMENT: '/api/TicketToolManagement/addupdatecomment',
  DELETE_COMMENT: '/api/TicketToolManagement/deletecommentdetails',
  DELETE_TOOL_ATTACHMENT: '/api/TicketToolManagement/deletetickettoolattachmentdetail',
  ADD_ASSIGNEE_STATUS: '/api/TicketToolManagement/addassigneestatus',
  DATA_DEPENDENCY_ADD: '/api/TicketToolManagement/addupdateteam',
  DATA_DEPENDENCY_STATUS: '/api/TicketToolManagement/addupdateteamstatus',

  /** SUBSCRIPTION/PACKAGE */
  GET_ALL_PACKAGES: '/api/TicketManagement/package-details',
  ADD_PACKAGE: '/api/TicketManagement/add-packages',
  UPDATE_PACKAGE: '/api/TicketManagement/update-packages',
  DELETE_PACKAGE: '/api/TicketManagement/delete_packages?id=',

  /** NOTIFICATION */
  GET_RECENT_NOTIFICATION: '/api/TicketManagement/getnotification',
  UPDATE_NOTIFICATION: '/api/TicketManagement/updatenotification',
  GET_PUSH_NOTIFICATION: "/api/TicketManagement/getpushnotification",
  GET_PAGE_NOTIFICATION: '/api/TicketManagement/getpagenotification',

  /** PERIODIC UPDATES BOARD **/
  GET_PERIODIC_BOARD_LIST: "/api/UpdatesBoardList/boardlist",
  UPDATE_PERIODIC_BOARD_DEFAULT: "/api/UpdatesBoardList/setdefaultupdatesboard",
  GET_PERIODIC_TICKET_BY_BOARD_LABEL: "/api/UpdatesBoardList/ticketsbyboardlabel",
  PERIODIC_BOARD_STATUS_MOVEMENT: "/api/UpdatesBoardList/getboardstatusmovement",
  TICKETS_BY_BOARD_PARTICIPANTS: "/api/UpdatesBoardList/ticketsbyboardParticipants",

  /** PERIODIC UPDATES MASTER**/
  PERIODIC_TOOLS_MASTER: '/api/UpdatesMaster/updatestools',
  PERIODIC_DETAILS_MASTER: '/api/UpdatesMaster/allperiodicdetail',
  UPDATE_DEFAULT_WORKSPACE: "/api/UpdatesMaster/setdefaultworkspace",
  GET_ALL_UPDATES_LABEL: "/api/UpdatesMaster/getallupdateslabel",
  ADD_UPDATES_LABEL: "/api/UpdatesMaster/addupdateslabel",

  /** PERIODIC UPDATES TICKET COMMENT **/
  GET_UPDATES_COMMENT_DETAILS: '/api/UpdatesTicketComment/updatesticketcommentdetails',
  ADD_UPDATE_PERIODIC_COMMENT: '/api/UpdatesTicketComment/addupdateupdatesticketcomment',
  DELETE_PERIODIC_COMMENT: '/api/UpdatesTicketComment/deleteupdatescommentdetails',
  FINANACIAL_YEAR_BASED_GET_UPDATES_COMMENT_DETAILS: '/api/UpdatesTicketComment/updatesticketcommentfinancialdetails',

  /** PERIODIC UPDATES TICKET MASTER **/
  CREATE_PERIODIC_TICKET: '/api/UpdatesTicketMaster/addupdatesticket',
  PERIODIC_TICKET_FILE_UPLOAD: '/api/UpdatesTicketMaster/singlefileupload',
  PERIODIC_FILE_DOWNLOAD: 'api/UpdatesTicketMaster/filedownload',
  DELETE_PERIODIC_TICKET_ATTACHMENT: '/api/UpdatesTicketMaster/deleteupdatesticketattachmentdetail',
  GET_PERIODIC_TICKET_DETAILS: '/api/UpdatesTicketMaster/ticket-details',
  PERIODIC_MOVE_TICKET: '/api/UpdatesTicketMaster/moveticket',
  PERIODIC_TICKET_DUEDATE_UPDATE: '/api/UpdatesTicketMaster/updateduedate',
  ADD_UPDATE_TICKET_TOOL_DETAIL: '/api/UpdatesTicketTool/addupdatetickettooldetail',
  ADD_REMOVE_PARTICIPANT: '/api/UpdatesTicketMaster/addremoveparticipant',
  UPDATE_ASSIGNEE_TICKET_DETAIL: '/api/UpdatesTicketMaster/updateassigneeticketdetail',
  PERIODIC_UPDATES_MARKET_REGIONS: '/api/UpdatesMaster/getupdatesmarketdetails',
  UPDATES_REQUIREMENT_FORM_DETAILS: '/api/UpdatesTicketMaster/requirement-details',
  GET_ATTACHEMENT_FILES: "/api/UpdatesTicketMaster/getattachementfiles",
  GET_TOOLS_RELEASE_HISTORY: '/api/UpdatesTicketMaster/toolsreleasehistory',

  /** PERIODIC UPDATES BOARD CALENDAR **/
  GET_CALENDAR_EVENTS: "/api/UpdatesTicketTool/getcalendarview",
  SAVE_EVENT_NOTES: "/api/UpdatesTicketMaster/savenotes",
  GEt_EVENT_DETAILS: "/api/UpdatesTicketMaster/event-details",

  /** AGENCY & AGENCY USER */
  GET_ALL_AGENCY: "/api/Agency/getallagency",
  AGENCY_USER_SIGNUP: "/api/AgencyUser/addagencyuser",
  APPROVE_REJECT_AGENCY_USER: "/api/AgencyUser/approverejectagencyuser",
  GET_ALL_AGENCY_USER_LIST: "/api/AgencyUser/agencyuserdetail",

  /** AGENCY & ADD WATCHLIST */
  ADD_WATCHLIST: "/api/AgencyTicket/addwatchlist",
  /** AGENCY & TICKET */
  GET_AGENCY_BOARD_LIST: "/api/AgencyBoard/agencyboardlist",
  CREATE_AGENCY_TICKET: "/api/AgencyTicket/addupdateagencycard",
  GET_AGENCY_TICKET_DETAILS: "/api/AgencyTicket/agencyticketdetails",
  GET_AGENCY_TICKET_COMMENT_DETAILS: "/api/AgencyTicketComment/agencyticketcommentdetails",
  ADD_UPDATE_AGENCY_TICKET_COMMENT: "/api/AgencyTicketComment/addupdateagencyticketcomment",
  DELETE_AGENCY_COMMENT_DETAILS: "/api/AgencyTicketComment/deleteagencycommentdetails",
  AGENCY_TICKET_SINGLE_FILE_UPLOAD: "/api/AgencyTicket/singlefileupload",
  GET_AGENCY_ALL_PACKAGES: "/api/AgencyPackage/getallagencypackage",
  GET_ALL_AGENCY_LABELS: "/api/AgencyTicket/getallagencylabels",
  UPDATE_AGENCY_TICKET_DETAIL: "/api/AgencyTicket/updateagencyticketdetail",
  GET_AGENCY_TICKET_BY_BOARD_LABEL: "/api/AgencyTicket/agencyticketsbyboardlabel",
  AGENCY_FILE_DOWNLOAD: 'api/AgencyTicket/filedownload',
  DELETE_AGENCY_TICKET_ATTACHMENT: "/api/AgencyTicket/deleteagencyticketattachmentdetail",
  AGENCY_MOVE_TICKET: "/api/AgencyTicket/agencymoveticket",
  AGENCY_BOARD_STATUS_MOVEMENT: "/api/AgencyBoard/getagencyboardstatusmovement",
  TICKET_ADD_UPDATE_TOOL_STATUS: "/api/AgencyTicket/addupdatetoolstatus",
  AGENCY_ADD_UPDATE_PACKAGE: "/api/AgencyPackage/addupdateagency",
  AGENCY_TOOL_SUBSCRIPTION: "/api/AgencyTicket/agency-tool-subscription",
  GET_TIME_ZONE_DETAIL: '/api/TimeZoneDetail/GetAllTimeZoneDetail',
  GET_PEERS_INDICES_SEARCH: '/api/PeerAndIndices/getpeerandindicesdetails',

  /** AGENCY - CONTACT US */
  GET_AGENCY_ISSUETYPE: 'api/Agency/getagencyissuetype',
  SUBMIT_CONTACT_US_FORM: 'api/AgencyBoard/add-agencycontactusdetails',

  /**INVENTORY & MATERIALS - SITES */
  GET_APPROVED_PROJECTS_BY_EMPLOYEE: "/api/Project/get-approved-projects-by-employee",

  GET_ENGINEER_MATERIALS_BY_PROJECT: "/api/Material/my-project/materials",
  GET_MATERIAL_STOCK_ALERTS: "/api/MaterialStockAlerts/my-project/alerts",
  GET_MATERIAL_STATUS_BY_PROJECT: "/api/MaterialStatus/", // append {projectId}


  // stockinward and stockoutward
  CREATE_STOCK_INWARD: "/api/Inventory/create-stock-inward",
  CREATE_STOCK_OUTWARD: "/api/Inventory/create-stock-outward",

  // GET APIs for project-wise stock fetching
  GET_STOCK_INWARD_BY_PROJECT: "/api/Inventory/get-stock-inward-by-project",
  GET_STOCK_OUTWARD_BY_PROJECT: "/api/Inventory/get-stock-outward-by-project",



};


