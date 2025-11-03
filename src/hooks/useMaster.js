import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getColorAction,
  addColorAction,
  updateColorAction,
  deleteColorAction,
  getCountryAction,
  addCountryAction,
  updateCountryAction,
  deleteCountryAction,
  getUserDepartmentAction,
  getDepartmentAction,
  addDepartmentAction,
  updateDepartmentAction,
  deleteDepartmentAction,
  getProductToolsAction,
  getDesignationAction,
  getRolesAction,
  getMarketRegionAction,
  getRegionAction,
  addRegionAction,
  updateRegionAction,
  deleteRegionAction,
  getLanguageAction,
  addLanguageAction,
  updateLanguageAction,
  deleteLanguageAction,
  getShiftAction,
  getRoleSettingAction,
  updateRoleSettingAction,
  noBoardAccessRequestAction,
  newUserAccessRequestAction,
  getIndustryAction,
  getCustomerRegionAction,
  getCustomerTypeAction,
  getPackageAction,
  getToolStatusAction,
  getCategoriesAction,
  getPlatformsAction,
  getSubscriptionsListAction,
  getProductOwnersAction,
  getPackageToolDetailsAction,
  getCurrencyAction,
  addCurrencyAction,
  updateCurrencyAction,
  deleteCurrencyAction,
  getStatusCodeMasterAction,
  getFontFamilyAction,
  addFontFamilyAction,
  updateFontFamilyAction,
  deleteFontFamilyAction,
  getLabelsAction,
  addLabelAction,
  updateLabelAction,
  getCustomerLanguageAction,
  getPrimaryMarketAction,
  getPeriodicToolsAction,
  getPeriodicDetailsAction,
  getAllAgencyAction,
  getAllCountryDetailAction,
  getUpdatesMarketRegionsAction,
  getAllTimeZoneDetailAction,
  getTicketsbyboardParticipantsAction,
  addBoardAction,
  getBoardAction,
  updateBoardAction,
  editBoardAction
} from "../store/actions/masterAction";
import {
  colorSelector,
  countrySelector,
  departmentSelector,
  userDepartmentSelector,
  toolSelector,
  designationSelector,
  rolesSelector,
  marketRegionSelector,
  regionMasterListSelector,
  languageSelector,
  shiftSelector,
  roleSettingSelector,
  industrySelector,
  customerTypeSelector,
  customerRegionSelector,
  packageSelector,
  toolStatusSelector,
  categoriesSelector,
  platformsSelector,
  subscriptionsListSelector,
  productOwnersSelector,
  packageToolDetailsSelector,
  currencySelector,
  statusCodeMasterSelector,
  fontFamilyMasterSelector,
  labelSelector,
  customerLanguageSelector,
  primaryMarketSelector,
  periodicToolsSelector,
  periodicDetailsSelector,
  agencySelector,
  allCountryDetailSelector,
  updatesMarketRegionsSelector,
  getAllTimeZoneDetailSelector,
  getTicketsbyboardParticipantsSelector,
  boardSelector
} from "../store/selector/masterSelector";

/** COLORS */
export const useColor = () => {
  const colorList = useSelector(colorSelector);
  const dispatch = useDispatch();
  const getColorData = useCallback(
    (params) => dispatch(getColorAction(params)),
    [dispatch]
  );
  const addColorData = useCallback((data) => dispatch(addColorAction(data)), [
    dispatch,
  ]);
  const updateColorData = useCallback(
    (data) => dispatch(updateColorAction(data)),
    [dispatch]
  );
  const deleteColor = useCallback((data) => dispatch(deleteColorAction(data)), [
    dispatch,
  ]);

  useEffect(() => {
    dispatch(getColorAction());
  }, []);
  return [colorList, getColorData, addColorData, updateColorData, deleteColor];
};

/** COUNTRY */
export const useCountry = () => {
  const countryList = useSelector(countrySelector);
  const dispatch = useDispatch();
  const getCountryData = useCallback(
    (params) => dispatch(getCountryAction(params)),
    [dispatch]
  );
  const addCountry = useCallback(
    (params) => dispatch(addCountryAction(params)),
    [dispatch]
  );

  const updateCountry = useCallback(
    (params) => dispatch(updateCountryAction(params)),
    [dispatch]
  );

  const deleteCountry = useCallback(
    (params) => dispatch(deleteCountryAction(params)),
    [dispatch]
  );
  return [
    countryList,
    getCountryData,
    addCountry,
    updateCountry,
    deleteCountry,
  ];
};

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
/** PRODUCT & TOOLS */
export const useTools = () => {
  const toolsList = useSelector(toolSelector);
  const dispatch = useDispatch();
  const getTools = useCallback(
    (params) => dispatch(getProductToolsAction(params)),
    [dispatch]
  );

  // useEffect(() => {
  //   dispatch(getProductToolsAction());
  // }, []);
  return [toolsList, getTools];
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
  const getRoles = useCallback((params) => dispatch(getRolesAction(params)), [
    dispatch,
  ]);
  useEffect(() => {
    dispatch(getRolesAction());
  }, []);
  return [rolesList, getRoles];
};

/** MARKET / REGION */
export const useRegion = () => {
  const regionList = useSelector(marketRegionSelector);
  const regionMasterList = useSelector(regionMasterListSelector);
  const dispatch = useDispatch();
  const getRegion = useCallback(
    (params) => dispatch(getMarketRegionAction(params)),
    [dispatch]
  );
  const getRegionList = useCallback(
    (params) => dispatch(getRegionAction(params)),
    [dispatch]
  );
  const addRegion = useCallback((params) => dispatch(addRegionAction(params)), [
    dispatch,
  ]);

  const updateRegion = useCallback(
    (params) => dispatch(updateRegionAction(params)),
    [dispatch]
  );

  const deleteRegion = useCallback(
    (params) => dispatch(deleteRegionAction(params)),
    [dispatch]
  );

  return [
    { regionList, regionMasterList },
    getRegion,
    getRegionList,
    addRegion,
    updateRegion,
    deleteRegion,
  ];
};

/** LANGUAGE */
export const useLanguage = () => {
  const languageList = useSelector(languageSelector);
  const dispatch = useDispatch();
  const getLanguage = useCallback(
    (params) => dispatch(getLanguageAction(params)),
    [dispatch]
  );
  const addLanguage = useCallback(
    (params) => dispatch(addLanguageAction(params)),
    [dispatch]
  );
  const updateLanguage = useCallback(
    (params) => dispatch(updateLanguageAction(params)),
    [dispatch]
  );
  const deleteLanguage = useCallback(
    (params) => dispatch(deleteLanguageAction(params)),
    [dispatch]
  );
  return [
    languageList,
    getLanguage,
    addLanguage,
    updateLanguage,
    deleteLanguage,
  ];
};

/** SHIFT */
export const useShift = () => {
  const shiftList = useSelector(shiftSelector);
  const dispatch = useDispatch();
  const getShift = useCallback((params) => dispatch(getShiftAction(params)), [
    dispatch,
  ]);
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

/** INDUSTRY */
export const useIndustry = () => {
  const industryList = useSelector(industrySelector);
  const dispatch = useDispatch();
  const getIndustry = useCallback(
    (params) => dispatch(getIndustryAction(params)),
    [dispatch]
  );
  useEffect(() => {
    dispatch(getIndustryAction());
  }, []);
  return [industryList, getIndustry];
};

/** CUSTOMER TYPE */
export const useCustomerType = () => {
  const customerTypeList = useSelector(customerTypeSelector);
  const dispatch = useDispatch();
  const getCustomerType = useCallback(
    (params) => dispatch(getCustomerTypeAction(params)),
    [dispatch]
  );
  useEffect(() => {
    dispatch(getCustomerTypeAction());
  }, []);
  return [customerTypeList, getCustomerType];
};

/** CUSTOMER REGION */
export const useCustomerRegion = () => {
  const customerRegionList = useSelector(customerRegionSelector);
  const dispatch = useDispatch();
  const getCustomerRegion = useCallback(
    (params) => dispatch(getCustomerRegionAction(params)),
    [dispatch]
  );
  // useEffect(() => {
  //   dispatch(getCustomerRegionAction());
  // }, []);
  return [customerRegionList, getCustomerRegion];
};

/** PACKAGE */
export const usePackage = () => {
  const packageList = useSelector(packageSelector);
  const dispatch = useDispatch();
  const getPackage = useCallback(
    (params) => dispatch(getPackageAction(params)),
    [dispatch]
  );
  useEffect(() => {
    dispatch(getPackageAction());
  }, []);
  return [packageList, getPackage];
};

/** platforms */
export const usePlatforms = () => {
  const platformsList = useSelector(platformsSelector);
  const dispatch = useDispatch();
  const getplatforms = useCallback(
    (params) => dispatch(getPlatformsAction(params)),
    [dispatch]
  );
  useEffect(() => {
    dispatch(getPlatformsAction());
  }, []);
  return [platformsList, getplatforms];
};

/** subscriptionsList */
export const useSubscriptions = () => {
  const subscriptionsList = useSelector(subscriptionsListSelector);
  const dispatch = useDispatch();
  const getsubscriptions = useCallback(
    (params) => dispatch(getSubscriptionsListAction(params)),
    [dispatch]
  );
  // useEffect(() => {
  //   dispatch(getSubscriptionsListAction());
  // }, []);
  return [subscriptionsList, getsubscriptions];
};

/** toolStatus */
export const useToolStatus = () => {
  const toolStatus = useSelector(toolStatusSelector);
  const dispatch = useDispatch();
  const getToolStatus = useCallback(
    (params) => dispatch(getToolStatusAction(params)),
    [dispatch]
  );
  return [toolStatus, getToolStatus];
};

/** categories */
export const useCategories = () => {
  const categoriesList = useSelector(categoriesSelector);
  const dispatch = useDispatch();
  const getcategories = useCallback(
    (params) => dispatch(getCategoriesAction(params)),
    [dispatch]
  );
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);
  return [categoriesList, getcategories];
};

/** productOwners */
export const useProductOwners = () => {
  const productOwners = useSelector(productOwnersSelector);
  const dispatch = useDispatch();
  const getProductOwners = useCallback(
    (params) => dispatch(getProductOwnersAction(params)),
    [dispatch]
  );
  return [productOwners, getProductOwners];
};

/** PACKAGE MAPPED TOOLS - DETAIL */
export const usePackageTool = () => {
  const packageTool = useSelector(packageToolDetailsSelector);
  const dispatch = useDispatch();
  const getPackageToolDetails = useCallback(
    (params) => dispatch(getPackageToolDetailsAction(params)),
    [dispatch]
  );
  useEffect(() => {
    dispatch(getPackageToolDetailsAction());
  }, []);
  return [packageTool, getPackageToolDetails];
};

/** CURRENCY */
export const useCurrency = () => {
  const currencyList = useSelector(currencySelector);
  const dispatch = useDispatch();
  const getCurrency = useCallback(
    (params) => dispatch(getCurrencyAction(params)),
    [dispatch]
  );

  const addCurrency = useCallback(
    (params) => dispatch(addCurrencyAction(params)),
    [dispatch]
  );

  const updateCurrency = useCallback(
    (params) => dispatch(updateCurrencyAction(params)),
    [dispatch]
  );

  const deleteCurrency = useCallback(
    (params) => dispatch(deleteCurrencyAction(params)),
    [dispatch]
  );

  // useEffect(()=>{
  //   dispatch(getCurrencyAction());
  // },[]);
  return [
    currencyList,
    getCurrency,
    addCurrency,
    updateCurrency,
    deleteCurrency,
  ];
};

/** TOOL STATUS CODE */
export const useStatusCodeMaster = () => {
  const statusCodeMasterList = useSelector(statusCodeMasterSelector);
  const dispatch = useDispatch();
  const getStatusCodeMaster = useCallback(
    () => dispatch(getStatusCodeMasterAction()),
    [dispatch]
  );

  // useEffect(()=>{
  //   dispatch(getStatusCodeMasterAction());
  // },[]);
  return [statusCodeMasterList, getStatusCodeMaster];
};

/** FONT FAMILY LIST */
export const useFontFamilyMaster = () => {
  const fontFamilyMasterList = useSelector(fontFamilyMasterSelector);
  const dispatch = useDispatch();
  const getFontFamilyMaster = useCallback(
    () => dispatch(getFontFamilyAction()),
    [dispatch]
  );
  const addFontFamily = useCallback(
    (params) => dispatch(addFontFamilyAction(params)),
    [dispatch]
  );
  const updateFontFamily = useCallback(
    (params) => dispatch(updateFontFamilyAction(params)),
    [dispatch]
  );
  const deleteFontFamily = useCallback(
    (params) => dispatch(deleteFontFamilyAction(params)),
    [dispatch]
  );
  return [
    fontFamilyMasterList,
    { getFontFamilyMaster, addFontFamily, updateFontFamily, deleteFontFamily },
  ];
};

/** MASTER LABELS LIST */
export const useLabel = () => {
  const labelList = useSelector(labelSelector);
  const dispatch = useDispatch();
  const getLabels = useCallback((params) => dispatch(getLabelsAction(params)), [
    dispatch,
  ]);
  const addLabel = useCallback((params) => dispatch(addLabelAction(params)), [
    dispatch,
  ]);
  const updateLabel = useCallback(
    (params) => dispatch(updateLabelAction(params)),
    [dispatch]
  );

  // useEffect(() => {
  //   dispatch(getLabelsAction());
  // }, []);
  return [labelList, { getLabels, addLabel, updateLabel }];
};

/** LANGUAGE */
export const useCustomerLanguage = () => {
  const customerLanguageList = useSelector(customerLanguageSelector);
  const dispatch = useDispatch();
  const getCustomerLanguage = useCallback(
    (params) => dispatch(getCustomerLanguageAction(params)),
    [dispatch]
  );
  // useEffect(() => {
  //   dispatch(getCustomerLanguageAction());
  // }, []);
  return [customerLanguageList, getCustomerLanguage];
};

/** PRIMARY MARKET */
export const usePrimaryMarket = () => {
  const primaryMarketList = useSelector(primaryMarketSelector);
  const dispatch = useDispatch();
  const getPrimaryMarketList = useCallback(
    (params) => dispatch(getPrimaryMarketAction(params)),
    [dispatch]
  );

  return [primaryMarketList, getPrimaryMarketList];
};

/** PRIMARY MARKET */
export const usePeriodicTools = () => {
  const periodicTools = useSelector(periodicToolsSelector);
  const dispatch = useDispatch();
  const getPeriodicTools = useCallback(
    (params) => dispatch(getPeriodicToolsAction(params)),
    [dispatch]
  );

  return [periodicTools, getPeriodicTools];
};

/** PRIMARY MARKET */
export const usePeriodicDetails = () => {
  const periodicDetails = useSelector(periodicDetailsSelector);
  const dispatch = useDispatch();
  const getPeriodicDetails = useCallback(
    (params) => dispatch(getPeriodicDetailsAction(params)),
    [dispatch]
  );

  return [periodicDetails, getPeriodicDetails];
};

/** AGENCY LIST */
export const useAgency = () => {
  const agencyList = useSelector(agencySelector);
  const dispatch = useDispatch();
  const getAllAgency = useCallback(
    (params) => dispatch(getAllAgencyAction(params)),
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAllAgencyAction());
  }, []);
  return [agencyList, getAllAgency];
};

/** ALL COUNTRY DETAILS */
export const useAllCountryDetail = () => {
  const countryList = useSelector(allCountryDetailSelector);
  const dispatch = useDispatch();
  const getAllCountryDetail = useCallback(
    (params) => dispatch(getAllCountryDetailAction(params)),
    [dispatch]
  );
  return [countryList, getAllCountryDetail];
};

/** GET PERIODIC UPDATES MARKET REGIONS **/
export const useUpdatesMarketRegions = () => {
  const updatesRegionsList = useSelector(updatesMarketRegionsSelector);
  const dispatch = useDispatch();
  const getAllUpdatesRegionsList = useCallback(
    (params) => dispatch(getUpdatesMarketRegionsAction(params)),
    [dispatch]
  );
  return [updatesRegionsList, getAllUpdatesRegionsList];
};

/** GET TIME ZONE DETAIL **/
export const useTimeZoneDetail = () => {
  const allTimeZoneDetail = useSelector(getAllTimeZoneDetailSelector);
  const dispatch = useDispatch();
  const getAllTimeZoneDetail = useCallback(
    (params) => dispatch(getAllTimeZoneDetailAction(params)),
    [dispatch]
  );
  return [allTimeZoneDetail, getAllTimeZoneDetail];
};

/** GET PARTICIPANTS UPDATES - KANBAN BOARD **/
export const useTicketsParticipants = () => {
  const ticketsParticipantsList = useSelector(getTicketsbyboardParticipantsSelector);
  const dispatch = useDispatch();
  const getTicketsParticipants = useCallback(
    (params) => dispatch(getTicketsbyboardParticipantsAction(params)),
    [dispatch]
  );
  return [ticketsParticipantsList, getTicketsParticipants];
};