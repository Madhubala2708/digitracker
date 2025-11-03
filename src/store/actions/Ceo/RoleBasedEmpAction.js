import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEmployeesByRoles, getroles, getVendorsAndSubcontractors } from "../../../services/index";

/**
 * Fetch all employees grouped by roles
 */
export const getAllEmployeesByRolesAction = createAsyncThunk(
  "GetAllEmployeesByRoles/fetch",
  async () => {
    const response = await getEmployeesByRoles();
    return response.data;
  }
);

/**
 * Fetch vendors and subcontractors
 */
export const getVendorsAndSubcontractorsAction = createAsyncThunk(
  "GetVendorsAndSubcontractors/fetch",
  async () => {
    const response = await getVendorsAndSubcontractors();
    return response.data;
  }
);

// Legacy actions for backward compatibility
export const getRoleBasedEmpAction = createAsyncThunk(
  "GetEmployeesByRole/fetch",
  async (roleId = 1) => {
    console.warn('Using deprecated getRoleBasedEmpAction. Consider switching to getAllEmployeesByRolesAction');
    // Since we're transitioning to a new API, we'll call the unified endpoint
    // and filter the results for the specific role
    const response = await getEmployeesByRoles();
    
    // Map of roleId to role name in the API response
    const ROLE_MAP = {
      1: 'CEO',
      2: 'Site Engineer',
      3: 'Assistant QS',
      4: 'QS',
      5: 'Site Supervisor',
      6: 'Lead Engineer',
      7: 'Assistant Project Manager',
      8: 'Project Manager',
      9: 'Designer',
      10: 'Engineer'
    };
    
    const roleName = ROLE_MAP[roleId];
    
    // Extract only the data for the requested role
    const roleData = response.data.employeesByRole[roleName] || [];
    
    return {
      data: roleData,
      roleId: roleId,
      roleIdentifier: ROLE_MAP[roleId].replace(/\s+/g, '')
    };
  }
);

//Fetch Roles
export const getrolesAction = createAsyncThunk(
  "GetRoles/fetch",
  async() =>{
    const response = await getroles();
    console.log("API Response:", response);
    return response.data;
  }
)