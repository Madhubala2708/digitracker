import { combineReducers } from 'redux';
import authSlice from './slice/auth';
import toastSlice from './slice/toast';
import kanbanSlice from './slice/kanban';
import masterSlice from './slice/master';
import ceoProjectReducer from './slice/Ceo/ceoprojectSlicer'; 
import rolebasedemp from "./slice/Ceo/RoleBasedEmpSlice";
import createNotifyReducer from "./slice/Ceo/notificationSlicer";
import departmentReducer from "./slice/Ceo/DepartmentSlicer";
import riskReducer from "./slice/Ceo/riskSlice";
import roleReducer from "./slice/hr/designationslice"
import employeeReducer from "./slice/hr/createemployeeslice";
import boqReducer from "./slice/Engineer/upsertboqslice";
import purchaseReducer from "./slice/Purchase/purchaseorderidslice";
import purchaseOrderReducer from "./slice/vendorflow/po-vendorslice";
import reportReducer from './slice/report/reportslice';
import vendorReducer from  "./slice/Vendor/getvendorslice";
import ceoReportReducer from './slice/report/ceoreportslice';
import inventoryReducer from "./slice/inventorySlice";
import materialsReducer from "./slice/Aqs/materialsSlice";
import engineerMaterialsReducer from "./slice/Engineer/engineerMaterialsSlice";
import aqsBoqReducer from "./slice/Aqs/aqsBoqSlice";
import costEstimationReducer from "./slice/Aqs/costEstimationSlice";
import aqsVendorReducer from "./slice/Aqs/aqsVendorSlice";
import reportSitesReducer from "./slice/Engineer/reportSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  toast: toastSlice.reducer,
  kanban: kanbanSlice.reducer,
  master: masterSlice.reducer,
  project: ceoProjectReducer,
  rolebasedemp: rolebasedemp,
  createnotify: createNotifyReducer,
  departments: departmentReducer,
  risk: riskReducer,
  department: departmentReducer,
  role: roleReducer,
  employee: employeeReducer,
  boq: boqReducer,
  vendor: vendorReducer, 
  purchase: purchaseReducer,
  purchaseOrder: purchaseOrderReducer,
  report: reportReducer,
  ceoReport: ceoReportReducer,

  inventory: inventoryReducer,
  materials: materialsReducer,
  engineerMaterials: engineerMaterialsReducer, 
  aqsBoq: aqsBoqReducer,
  costEstimation: costEstimationReducer,
  aqsVendor: aqsVendorReducer,
   reportSites: reportSitesReducer,
});