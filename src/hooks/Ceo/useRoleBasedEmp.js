import { useDispatch, useSelector } from "react-redux";
import { 
  getAllEmployeesByRolesAction, 
  getrolesAction, 
  getVendorsAndSubcontractorsAction 
} from "../../store/actions/Ceo/RoleBasedEmpAction";
import { resetRoleBasedEmpState } from "../../store/slice/Ceo/RoleBasedEmpSlice";

export const useRoleBasedEmp = () => {
  const dispatch = useDispatch();

  // Get state from Redux store with safe fallbacks
  const roleBasedEmpState = useSelector((state) => state.rolebasedemp || {});
  
  // Map role data to employees object with proper fallbacks
  const employees = {
    ceoEmployees: roleBasedEmpState.ceoEmployees || [],
    projectManagerEmployees: roleBasedEmpState.projectManagerEmployees || [],
    assistantProjectManagerEmployees: roleBasedEmpState.assistantProjectManagerEmployees || [],
    leadEngineerEmployees: roleBasedEmpState.leadEngineerEmployees || [],
    siteSupervisorEmployees: roleBasedEmpState.siteSupervisorEmployees || [],
    qsEmployees: roleBasedEmpState.qsEmployees || [],
    assistantQsEmployees: roleBasedEmpState.assistantQsEmployees || [],
    siteEngineerEmployees: roleBasedEmpState.siteEngineerEmployees || [],
    engineerEmployees: roleBasedEmpState.engineerEmployees || [],
    designerEmployees: roleBasedEmpState.designerEmployees || []
  };
  
  // Get vendors and subcontractors
  const vendors = roleBasedEmpState.vendors || [];
  const subcontractors = roleBasedEmpState.subcontractors || [];
  // Get roles
  const roles = roleBasedEmpState.roles || [];
  // Status flags
  const loading = roleBasedEmpState.loading || false;
  const error = roleBasedEmpState.error || null;
  const success = roleBasedEmpState.success || false;

  /**
   * Fetch all employees across all roles in a single API call
   * @returns {Promise} Promise that resolves when the API call is complete
   */
  const fetchAllEmployees = async () => {
    try {
      const result = await dispatch(getAllEmployeesByRolesAction()).unwrap();
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      return { success: false, error };
    }
  };

  /**
   * Fetch vendors and subcontractors
   * @returns {Promise} Promise that resolves when the API call is complete
   */
  const fetchVendorsAndSubcontractors = async () => {
    try {
      const result = await dispatch(getVendorsAndSubcontractorsAction()).unwrap();
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to fetch vendors and subcontractors:', error);
      return { success: false, error };
    }
  };

  /**
   * Fetch roles
   * @returns {Promise} Promise that resolves when the API call is complete
   */
  const fetchroles = async () => {
    try {
      const result = await dispatch(getrolesAction()).unwrap(); // <- Add .unwrap()
      console.log("roles:", result);
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      return { success: false, error };
    }
  };

  /**
   * Reset the role-based employee state
   */
  const resetEmployeeState = () => {
    dispatch(resetRoleBasedEmpState());
  };

  // Debug function to help track what's in state
  const logEmployeeState = () => {
    console.log('Current employee state:', {
      ceoEmployees: employees.ceoEmployees.length,
      projectManagerEmployees: employees.projectManagerEmployees.length,
      assistantProjectManagerEmployees: employees.assistantProjectManagerEmployees.length,
      leadEngineerEmployees: employees.leadEngineerEmployees.length,
      siteSupervisorEmployees: employees.siteSupervisorEmployees.length,
      qsEmployees: employees.qsEmployees.length,
      assistantQsEmployees: employees.assistantQsEmployees.length,
      siteEngineerEmployees: employees.siteEngineerEmployees.length,
      engineerEmployees: employees.engineerEmployees.length,
      designerEmployees: employees.designerEmployees.length,
      vendors: vendors.length,
      subcontractors: subcontractors.length
    });
  };

  return {
    // State
    employees,
    vendors,
    subcontractors,
    loading,
    error,
    success,
    roles,
    // Actions
    fetchAllEmployees,
    fetchVendorsAndSubcontractors,
    resetEmployeeState,
    logEmployeeState,
    fetchroles
  };
};