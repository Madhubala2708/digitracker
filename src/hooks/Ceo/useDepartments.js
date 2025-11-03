import { useDispatch, useSelector } from "react-redux";
import { getdepartmentsAction, getDepartmentsByIdAction } from "../../store/actions/Ceo/DepartmentAction";
import { selectDepartmentsDetails, selectSelectedDepartmentEmployees } from "../../store/selector/ceo/DepartmentSelector";

export const useDepartments = () => {
  const dispatch = useDispatch();

  const departments = useSelector(selectDepartmentsDetails);
  const employees = useSelector(selectSelectedDepartmentEmployees);

  const fetchDepartments = async () => {
    try {
      const result = await dispatch(getdepartmentsAction()).unwrap();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to fetch departments", error);
      return { success: false, error };
    }
  };

  const fetchEmployeesByDepartment = async (id) => {
    try {
      if (!id) {
        console.error("Invalid department ID:", id);
        return { success: false, error: "Invalid department ID" };
      }
      const result = await dispatch(getDepartmentsByIdAction(id)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to fetch employees", error);
      return { success: false, error };
    }
  };

  return {
    departments,
    employees,
    fetchDepartments,
    fetchEmployeesByDepartment,
  };
};