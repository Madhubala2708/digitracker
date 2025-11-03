import { createSlice } from '@reduxjs/toolkit';
import { 
  getAllEmployeesByRolesAction, 
  getRoleBasedEmpAction, 
  getrolesAction, 
  getVendorsAndSubcontractorsAction 
} from '../../actions/Ceo/RoleBasedEmpAction';

// Role key mapping for consistent state management
const ROLE_KEYS = {
  'CEO': 'ceoEmployees',
  'ProjectManager': 'projectManagerEmployees',
  'AssistantProjectManager': 'assistantProjectManagerEmployees',
  'LeadEngineer': 'leadEngineerEmployees',
  'SiteSupervisor': 'siteSupervisorEmployees',
  'QS': 'qsEmployees',
  'AssistantQS': 'assistantQsEmployees',
  'SiteEngineer': 'siteEngineerEmployees',
  'Engineer': 'engineerEmployees',
  'Designer': 'designerEmployees'
};

// API to state mapping for the new unified endpoint
const API_TO_STATE_MAP = {
  'CEO': 'ceoEmployees',
  'Project Manager': 'projectManagerEmployees',
  'Assistant Project Manager': 'assistantProjectManagerEmployees',
  'Lead Engineer': 'leadEngineerEmployees',
  'Site Supervisor': 'siteSupervisorEmployees',
  'QS': 'qsEmployees',
  'Assistant QS': 'assistantQsEmployees',
  'Site Engineer': 'siteEngineerEmployees',
  'Engineer': 'engineerEmployees',
  'Designer': 'designerEmployees'
};

const initialState = {

  //roles
  roles:[],
  // Employee data by role
  ceoEmployees: [],
  projectManagerEmployees: [],
  assistantProjectManagerEmployees: [],
  leadEngineerEmployees: [],
  siteSupervisorEmployees: [],
  qsEmployees: [],
  assistantQsEmployees: [],
  siteEngineerEmployees: [],
  engineerEmployees: [],
  designerEmployees: [],
  
  // Vendors and subcontractors
  vendors: [],
  subcontractors: [],
  
  // Request status
  loading: false,
  error: null,
  success: false
};

const roleBasedEmpSlice = createSlice({
  name: 'rolebasedemp',
  initialState,
  reducers: {
    resetRoleBasedEmpState: () => initialState
  },
  extraReducers: (builder) => {
    // Handle all employees by roles fetching (new unified endpoint)
    builder
      .addCase(getAllEmployeesByRolesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmployeesByRolesAction.fulfilled, (state, action) => {
        state.loading = false;
        
        // Process the new API response format
        if (action.payload && action.payload.employeesByRole) {
          // Process each role category
          Object.entries(action.payload.employeesByRole).forEach(([roleName, employees]) => {
            // Get the corresponding state key for this role
            const stateKey = API_TO_STATE_MAP[roleName];
            
            if (stateKey && Array.isArray(employees)) {
              // Map each employee with standardized id and name properties
              state[stateKey] = employees.map(employee => ({
                id: employee.empId,
                name: employee.employeeName,
                employeeCode: employee.employeeCode,
                role: employee.role,
                // Keep original data too
                ...employee
              }));
            }
          });
        }
        
        state.success = true;
      })
      .addCase(getAllEmployeesByRolesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Legacy handler for role-based employee fetching (backward compatibility)
      .addCase(getRoleBasedEmpAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoleBasedEmpAction.fulfilled, (state, action) => {
        state.loading = false;
        
        // Get role key from payload
        const { roleIdentifier, data } = action.payload;
        const stateKey = ROLE_KEYS[roleIdentifier];
        
        // Update specific role array if key exists
        if (stateKey && Array.isArray(data)) {
          state[stateKey] = data.map(employee => ({
            id: employee.empId,
            name: employee.employeeName,
            employeeCode: employee.employeeCode,
            role: employee.role,
            // Keep original data too
            ...employee
          }));
        }
        
        state.success = true;
      })
      .addCase(getRoleBasedEmpAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Handle vendors and subcontractors fetching (unchanged)
      .addCase(getVendorsAndSubcontractorsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorsAndSubcontractorsAction.fulfilled, (state, action) => {
        state.loading = false;
        
        // Set vendors and subcontractors from payload
        if (action.payload) {
          // Format vendors with id and name for consistent access
          if (action.payload.vendors && Array.isArray(action.payload.vendors)) {
            state.vendors = action.payload.vendors.map(vendor => ({
              id: vendor.id || vendor.vendorId,
              name: vendor.vendorName || vendor.name,
              // Keep original data too
              ...vendor
            }));
          }
          
          // Format subcontractors with id and name for consistent access
          if (action.payload.subcontractors && Array.isArray(action.payload.subcontractors)) {
            state.subcontractors = action.payload.subcontractors.map(subcontractor => ({
              id: subcontractor.id || subcontractor.subcontractorId,
              name: subcontractor.subcontractorName || subcontractor.name,
              // Keep original data too
              ...subcontractor
            }));
          }
        }
        
        state.success = true;
      })
      .addCase(getVendorsAndSubcontractorsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getrolesAction.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getrolesAction.fulfilled, (state, action)=>{
        state.loading = true;
        state.roles = action.payload;
        console.log("getroles", action.payload)
        state.success = true;
      })
      .addCase(getrolesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const { resetRoleBasedEmpState } = roleBasedEmpSlice.actions;
export default roleBasedEmpSlice.reducer;