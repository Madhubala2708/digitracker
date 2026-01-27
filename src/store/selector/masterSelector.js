import { createSelector } from "reselect";

/** COLORS */
export const colorSelector = createSelector(
    [
      state => state.master.color.data,
      state => state.master.color.loading,
      state => state.master.color.error,
    ],
    (data, loading, error) => ({
      data,
      loading,
      error,
    })
);
/** USE TO GET PURCHASE ORDER DETAILS  */
export const getPurchaseOrderDetailsSelector = createSelector(
  [
    state => state.master.purchaseOrderDetails.data,
    state => state.master.purchaseOrderDetails.loading,
    state => state.master.purchaseOrderDetails.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);


/** COUNTRY */
export const countrySelector = createSelector(
    [
      state => state.master.country.data,
      state => state.master.country.loading,
      state => state.master.country.error,
    ],
    (data, loading, error) => ({
      data,
      loading,
      error,
    })
);

/** USER_DEPARTMENT */
export const userDepartmentSelector = createSelector(
    [
      state => state.master.userDepartment.data,
      state => state.master.userDepartment.loading,
      state => state.master.userDepartment.error,
    ],
    (data, loading, error) => ({
      data,
      loading,
      error,
    })
);

/** DEPARTMENT */
export const departmentSelector = createSelector(
  [
    state => state.master.department.data,
    state => state.master.department.loading,
    state => state.master.department.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** BOARD */
export const boardSelector = createSelector(
  [
    state => state.master.board.data,
    state => state.master.board.loading,
    state => state.master.board.error,
  ],
  (data, loading, error) => ({ 
    data,
    loading,
    error,
  })
);
/** PRODUCT & TOOLS */
export const toolSelector = createSelector(
  [
    state => state.master.tools.data,
    state => state.master.tools.loading,
    state => state.master.tools.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** DESIGNATION */
export const designationSelector = createSelector(
  [
    state => state.master.designation.data,
    state => state.master.designation.loading,
    state => state.master.designation.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** ROLES */
export const rolesSelector = createSelector(
  [
    state => state.master.roles.data,
    state => state.master.roles.loading,
    state => state.master.roles.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** MARKET REGION */
export const marketRegionSelector = createSelector(
  [
    state => state.master.region.data,
    state => state.master.region.loading,
    state => state.master.region.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);


/** MARKET REGION */
export const regionMasterListSelector = createSelector(
  [
    state => state.master.regionMasterList.data,
    state => state.master.regionMasterList.loading,
    state => state.master.regionMasterList.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** LANGUAGE */
export const languageSelector = createSelector(
  [
    state => state.master.language.data,
    state => state.master.language.loading,
    state => state.master.language.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** SHIFT TYPE */
export const shiftSelector = createSelector(
  [
    state => state.master.shift.data,
    state => state.master.shift.loading,
    state => state.master.shift.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);


/** ROLES & RESTRICTION SETTING */
export const roleSettingSelector = createSelector(
  [
    state => state.master.permission.data,
    state => state.master.permission.loading,
    state => state.master.permission.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** INDUSTRY */
export const industrySelector = createSelector(
  [
    state => state.master.industry.data,
    state => state.master.industry.loading,
    state => state.master.industry.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** CUSTOMER TYPE */
export const customerTypeSelector = createSelector(
  [
    state => state.master.customerType.data,
    state => state.master.customerType.loading,
    state => state.master.customerType.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** CUSTOMER REGION */
export const customerRegionSelector = createSelector(
  [
    state => state.master.customerRegion.data,
    state => state.master.customerRegion.loading,
    state => state.master.customerRegion.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** PACKAGES */
export const packageSelector = createSelector(
  [
    state => state.master.package.data,
    state => state.master.package.loading,
    state => state.master.package.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);


/**  TOOL LIST  */
// export const toolListSelector = createSelector(
//   [
//     state => state.master.toolList.data,
//     state => state.master.toolList.loading,
//     state => state.master.toolList.error,
//   ],
//   (data, loading, error) => ({
//     data,
//     loading,
//     error,
//   })
// );

/** TOOL STATUS */
export const toolStatusSelector = createSelector(
  [
    state => state.master.toolStatus.data,
    state => state.master.toolStatus.loading,
    state => state.master.toolStatus.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** TOOL CATEGORIES */
export const categoriesSelector = createSelector(
  [
    state => state.master.categories.data,
    state => state.master.categories.loading,
    state => state.master.categories.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** TOOL PLATFORMS  */
export const platformsSelector = createSelector(
  [
    state => state.master.platforms.data,
    state => state.master.platforms.loading,
    state => state.master.platforms.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);


/** TOOL SUBSCRIPTIONS*/
export const subscriptionsListSelector = createSelector(
  [
    state => state.master.subscriptionsList.data,
    state => state.master.subscriptionsList.loading,
    state => state.master.subscriptionsList.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** TOOL PRODUCT OWNERS  */
export const productOwnersSelector = createSelector(
  [
    state => state.master.productOwners.data,
    state => state.master.productOwners.loading,
    state => state.master.productOwners.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** DEPARTMENT */
export const packageToolDetailsSelector = createSelector(
  [
    state => state.master.packageTool.data,
    state => state.master.packageTool.loading,
    state => state.master.packageTool.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** CURRENCY */
export const currencySelector = createSelector(
  [
    state => state.master.currency.data,
    state => state.master.currency.loading,
    state => state.master.currency.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);
/** Tool Status Code */
export const statusCodeMasterSelector = createSelector(
  [
    state => state.master.statusCodeMaster.data,
    state => state.master.statusCodeMaster.loading,
    state => state.master.statusCodeMaster.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** Get Font Family  */
export const fontFamilyMasterSelector = createSelector(
  [
    state => state.master.fontFamilyMaster.data,
    state => state.master.fontFamilyMaster.loading,
    state => state.master.fontFamilyMaster.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** Get Labels  */
export const labelSelector = createSelector(
  [
    state => state.master.labels.data,
    state => state.master.labels.loading,
    state => state.master.labels.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** CUSTOMER LANGUAGE */
export const customerLanguageSelector = createSelector(
  [
    state => state.master.customerLanguage.data,
    state => state.master.customerLanguage.loading,
    state => state.master.customerLanguage.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** Primary Market */
export const primaryMarketSelector = createSelector(
  [
    state => state.master.primaryMarket.data,
    state => state.master.primaryMarket.loading,
    state => state.master.primaryMarket.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** Primary Market */
export const periodicToolsSelector = createSelector(
  [
    state => state.master.periodicTools.data,
    state => state.master.periodicTools.loading,
    state => state.master.periodicTools.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** Primary Market */
export const periodicDetailsSelector = createSelector(
  [
    state => state.master.periodicDetails.data,
    state => state.master.periodicDetails.loading,
    state => state.master.periodicDetails.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** Agency */
export const agencySelector = createSelector(
  [
    state => state.master.agency.data,
    state => state.master.agency.loading,
    state => state.master.agency.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** ALL COUNTRY DETAILED INFO */
export const allCountryDetailSelector = createSelector(
  [
    state => state.master.allCountryDetail.data,
    state => state.master.allCountryDetail.loading,
    state => state.master.allCountryDetail.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** ALL COUNTRY DETAILED INFO */
export const updatesMarketRegionsSelector = createSelector(
  [
    state => state.master.updatesMarketRegions.data,
    state => state.master.updatesMarketRegions.loading,
    state => state.master.updatesMarketRegions.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);


/** TO GET TIME ZONE DETAIL */
export const getAllTimeZoneDetailSelector = createSelector(
  [
    state => state.master.getAllTimeZoneDetail.data,
    state => state.master.getAllTimeZoneDetail.loading,
    state => state.master.getAllTimeZoneDetail.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);


/** TO GET TIME ZONE DETAIL */
export const getTicketsbyboardParticipantsSelector = createSelector(
  [
    state => state.master.getTicketsbyboardParticipants.data,
    state => state.master.getTicketsbyboardParticipants.loading,
    state => state.master.getTicketsbyboardParticipants.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** TO CREATE TICKET COMMENT */
export const createTicketsDetailsSelector = createSelector(
  [
    state => state.master.createTicketDetails.data,
    state => state.master.createTicketDetails.loading,
    state => state.master.createTicketDetails.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

export const loginBoardDetailsSelector = createSelector(
  [
    state => state.master.loginBoardDetails.data,
    state => state.master.loginBoardDetails.loading,
    state => state.master.loginBoardDetails.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);
/** TO GET BOQ ITEMS BY ID */
export const getBoqItemsSelector = createSelector(
  [
    state => state.master.boqItems.data,
    state => state.master.boqItems.loading,
    state => state.master.boqItems.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);


/** CREATE REPORT ATTACHMENTS */
export const createReportAttachmentSelector = createSelector(
  [
    state => state.master.ReportAttachments.data,
    state => state.master.ReportAttachments.loading,
    state => state.master.ReportAttachments.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);


/** MILESTONE */
export const milestoneMasterSelector = createSelector(
  [
    state => state.master.getMilestone.data,
    state => state.master.getMilestone.loading,
    state => state.master.getMilestone.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);
export const projectStatusSelector = createSelector(
  [
    state => state.master.getProjectStatus.data,
    state => state.master.getProjectStatus.loading,
    state => state.master.getProjectStatus.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

export const taskStatusSelector = createSelector(
  [
    state => state.master.getTaskStatus.data,
    state => state.master.getTaskStatus.loading,
    state => state.master.getTaskStatus.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);