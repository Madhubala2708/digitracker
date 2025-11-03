import React, { useEffect, useState } from "react";
import "../../../styles/components/css/hr/hrms.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchDepartments } from "../../../store/actions/hr/departmentaction";
import {
  createEmployee,
  createOrUpdateEmployee,
  deleteEmployee,
  getEmployees,
  getNewEmpId,
} from "../../../store/actions/hr/createemployeaction";
import { fetchRolesByDepartment } from "../../../store/actions/hr/designationaction";
import { fetchProjects } from "../../../store/actions/hr/projectaction";
import { MdDelete } from "react-icons/md";

const AddEmployee = () => {
  const { empId } = useParams();
  const dispatch = useDispatch();
  const {
    departments = [],
    loading,
    error,
  } = useSelector((state) => state.department || {});
  const { roles = [] } = useSelector((state) => state.role || {});
  const { projects = [] } = useSelector((state) => state.project);
  const [validationErrors, setValidationErrors] = useState({});
  const location = useLocation();
  const [employeeList, setEmployeeList] = useState([]);

  const [editingEmployee, setEditingEmployee] = useState(
    location.state?.employeeData || null
  );

  const [employee, setEmployee] = useState({
    name: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    EmployeeCode: "",
    department: "",
    designation: "",
    project: "",
  });

  // Get all employees for email validation
  useEffect(() => {
    dispatch(getEmployees()).then((res) => {
      if (res && res.payload) {
        setEmployeeList(res.payload);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.employeeData) {
      const emp = location.state.employeeData;
      setEditingEmployee(emp);
      setEmployee({
        name: emp.firstName || "",
        dob: emp.dateOfBirth || "",
        gender: emp.gender || "",
        mobile: emp.phone || "",
        email: emp.email || "",
        EmployeeCode: emp.employeeCode || "",
        department: emp.deptId?.toString() || "",
        designation: emp.roleName?.toString() || "",
        project: emp.project_id?.toString() || "",
      });
    } else if (empId) {
      dispatch(getEmployees()).then((res) => {
        const employeeList = res.payload || [];
        const found = employeeList.find(
          (emp) => emp.empId.toString() === empId.toString()
        );
        if (found) {
          setEditingEmployee(found);
          setEmployee({
            name: found.firstName || "",
            dob: found.dateOfBirth || "",
            gender: found.gender || "",
            mobile: found.phone || "",
            email: found.email || "",
            EmployeeCode: found.employeeCode || "",
            department: found.deptId?.toString() || "",
            designation: found.roleId?.toString() || "",
            project: found.project_id?.toString() || "",
          });
        }
      });
    }
  }, [empId, location.state, dispatch]);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (employee.department && employee.department !== "0") {
      dispatch(fetchRolesByDepartment(employee.department));
    }
  }, [employee.department, dispatch]);

  useEffect(() => {
    console.log("Roles for department", employee.department, ":", roles);
  }, [roles]);

  useEffect(() => {
    console.log("Editing Employee: ", editingEmployee);
    console.log("Employee state set to: ", employee);
  }, [employee]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      // dispatch delete action here (you need to implement or import it)
      dispatch(deleteEmployee(editingEmployee.empId))
        .then(() => {
          alert("Employee deleted successfully.");
          navigate("/hr/employee"); // redirect after deletion
        })
        .catch(() => {
          alert("Failed to delete employee. Please try again.");
        });
    }
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched departments:", departments);
  }, [departments]);

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Email uniqueness validation function
  const isEmailUnique = (email) => {
    // If we're in edit mode, exclude the current employee's email from the check
    if (editingEmployee) {
      return !employeeList.some(
        (emp) => emp.email === email && emp.empId !== editingEmployee.empId
      );
    } else {
      // For new employee, check if email exists in any employee
      return !employeeList.some((emp) => emp.email === email);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for individual fields on change
    let updatedErrors = { ...validationErrors };

    switch (name) {
      case "name":
        if (/^[A-Za-z\s]+$/.test(value)) delete updatedErrors.name;
        break;
      case "mobile":
        if (/^[6-9]\d{9}$/.test(value)) delete updatedErrors.mobile;
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          updatedErrors.email = "Invalid email format";
        } else if (!isEmailUnique(value)) {
          updatedErrors.email = "This email is already registered. Please use a different email.";
        } else {
          delete updatedErrors.email;
        }
        break;
      case "dob":
        if (value) delete updatedErrors.dob;
        break;
      case "gender":
        if (value) delete updatedErrors.gender;
        break;
      case "department":
        if (value) delete updatedErrors.department;
        break;
      case "designation":
        if (value) delete updatedErrors.designation;
        break;
      default:
        break;
    }

    setValidationErrors(updatedErrors);

    setEmployee((prev) => ({
      ...prev,
      [name]: ["department", "designation", "project"].includes(name)
        ? Number(value)
        : value,
      ...(name === "department" ? { designation: "" } : {}),
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!employee.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(employee.name)) {
      errors.name = "Name must contain only letters";
    }

    if (!/^[6-9]\d{9}$/.test(employee.mobile)) {
      errors.mobile = "Enter a valid mobile number ";
    }

    if (!employee.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
      errors.email = "Invalid email format";
    } else if (!isEmailUnique(employee.email)) {
      errors.email = "This email is already registered. Please use a different email.";
    }

    if (!employee.department) {
      errors.department = "Department is required";
    }

    if (!employee.designation) {
      errors.designation = "Designation is required";
    }

    // if (!employee.dob) {
    //   errors.dob = "Date of Birth is required";
    // }

    // if (!employee.gender) {
    //   errors.gender = "Gender is required";
    // }

    // 'project' is optional, no validation needed

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const formattedData = {
      EmpId: editingEmployee?.empId || 0,
      FirstName: employee.name,
      DateOfBirth: employee.dob,
      Gender: employee.gender,
      Phone: employee.mobile,
      Email: employee.email,
      Department: Number(employee.department),
      Designation: Number(employee.designation),
      Project: Number(employee.project),
      EmployeeCode: employee.EmployeeCode,
    };

    const action = editingEmployee
      ? createOrUpdateEmployee
      : createOrUpdateEmployee;

    dispatch(action(formattedData))
      .then(() => {
        setSuccessMessage(
          editingEmployee
            ? "Employee updated successfully!"
            : "Employee added successfully!"
        );
        setValidationErrors({});
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/hr/employee");
        }, 1000);
        setEmployee({
          name: "",
          dob: "",
          gender: "",
          mobile: "",
          email: "",
          EmployeeCode: "",
          department: "",
          designation: "",
          project: "",
        });
      })
      .catch((error) => {
        // Handle API error responses
        if (error.response && error.response.data) {
          // Check if error is related to email uniqueness
          if (error.response.data.includes && error.response.data.includes("email")) {
            setValidationErrors({
              ...validationErrors,
              email: "This email is already registered. Please use a different email."
            });
          } else {
            setSuccessMessage("Operation failed. Try again.");
          }
        } else {
          setSuccessMessage("Operation failed. Try again.");
        }
      });
  };

  const newEmpId = useSelector((state) => state.employee.newEmpId);
  useEffect(() => {
    if (!editingEmployee) {
      dispatch(getNewEmpId());
    }
  }, [dispatch, editingEmployee]);

  useEffect(() => {
    if (!editingEmployee && newEmpId) {
      setEmployee((prev) => ({
        ...prev,
        EmployeeCode: `${newEmpId}`,
      }));
    }
  }, [newEmpId, editingEmployee]);

  const handleCancel = () => {
    if (editingEmployee) {
      navigate("/hr/employee");
    } else {
      setEmployee({
        name: "",
        dob: "",
        gender: "",
        mobile: "",
        email: "",
        EmployeeCode: "",
        department: "",
        designation: "",
        project: 0,
      });
      setValidationErrors({});
    }
  };

  return (
    <div className="addemployee-container">
      <div className="addemployee-breadcrumb">
        <span className="addemployee-link" onClick={() => navigate("/hr/employee")}>Employee</span>
        <span className="addemployee-separator">&gt;</span>
        <span className="addemployee-current">
          {editingEmployee ? "Edit Employee" : "Add Employee"}
        </span>
      </div>

      {successMessage && <div className="addemployee-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="addemployee-form">
        <h6 className="addemployee-section-title">Personal Info</h6>

        <div className="addemployee-form-row">
          <div className="addemployee-form-group">
            <label>Name <span className="addemployee-required">*</span></label>

            <input type="text" name="name" placeholder="Employee Name" value={employee.name} onChange={(e) => {
              const value = e.target.value;
              // Allow only letters and spaces
              if (/^[A-Za-z\s]*$/.test(value)) {
                handleChange(e);
              }
            }} />
            {validationErrors.name && <p className="error-text">{validationErrors.name}</p>}
          </div>

          <div className="addemployee-form-group">
            <label>Date of Birth <span className="addemployee-required"></span></label>
            <input type="date" name="dob" placeholder="Select DOB" value={employee.dob} onChange={handleChange} max={new Date().toISOString().split("T")[0]} />
            {/* {validationErrors.dob && <p className="error-text">{validationErrors.dob}</p>} */}
          </div>

          <div className="addemployee-form-group">
            <label>Gender <span className="addemployee-required"></span></label>
            <select name="gender" value={employee.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {/* {validationErrors.gender && <p className="error-text">{validationErrors.gender}</p>} */}
          </div>
        </div>

        <div className="addemployee-form-row2">
          <div className="addemployee-form-group">
            <label>Mobile No <span className="addemployee-required">*</span></label>
            <div className="mobile-input-wrapper">
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India Flag"
                className="flag-icon"
              />
              <span className="country-code">+91</span>
              <input
                type="tel"
                name="mobile"
                value={employee.mobile}
                maxLength={10}
                placeholder="92xxx xxxxx"
                className="mobile-input"
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only digits
                  if (!/^\d*$/.test(value)) return;

                  // Block if first digit is not 6-9
                  if (value.length === 1 && !/^[6-9]$/.test(value)) return;

                  handleChange(e); // Update state

                  // Clear mobile error once valid number is entered
                  if (/^[6-9]\d{9}$/.test(value)) {
                    setValidationErrors((prevErrors) => ({
                      ...prevErrors,
                      mobile: undefined,
                    }));
                  }
                }}
              />
            </div>
            {validationErrors.mobile && (
              <p className="error-text">{validationErrors.mobile}</p>
            )}
          </div>

          <div className="addemployee-form-group">
            <label className="addemployee-form-group-label">Email ID <span className="addemployee-required">*</span> </label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="Enter Email Id"
              className="email-input"
              readOnly={!!editingEmployee}
            />
            {validationErrors.email && <p className="error-text">{validationErrors.email}</p>}
          </div>
        </div>

        <div className="addemployee"></div>

        <h6 className="addemployee-section-title">Employment Details</h6>

        <div className="addemployee-form-row">
          <div className="addemployee-form-group">
            <label>Employee ID</label>
            <input
              type="text"
              name="EmployeeCode"
              value={employee.EmployeeCode}
              onChange={handleChange}
              readOnly // optional: make it read-only
            />
          </div>

          <div className="addemployee-form-group">
            <label>Department <span className="addemployee-required">*</span></label>
            <select
              name="department"
              value={employee.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {loading ? (
                <option disabled>Loading departments...</option>
              ) : Array.isArray(departments) && departments.length > 0 ? (
                departments.map((dept) => (
                  <option key={dept.deptId} value={dept.deptId}>
                    {dept.deptName.trim()}
                  </option>
                ))
              ) : (
                <option disabled>No departments available</option>
              )}
            </select>
            {validationErrors.department && <p className="error-text">{validationErrors.department}</p>}
          </div>

          <div className="addemployee-form-group">
            <label>
              Designation <span className="addemployee-required">*</span>
            </label>
            <select
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              disabled={!employee.department}
            >
              <option value="0">Select Designation</option>
              {Array.isArray(roles) ? (
                roles.map((roles) => (
                  <option key={roles.roleId} value={roles.roleId}>
                    {roles.roleName}
                  </option>
                ))
              ) : (
                <option disabled>Loading roles...</option>
              )}
            </select>
            {validationErrors.designation && <p className="error-text">{validationErrors.designation}</p>}
          </div>
        </div>
        <div className="addemployee-form-actions-wrapper">
          {editingEmployee && (
            <button
              type="button"
              className="addemployee-btn-delete"
              onClick={handleDelete}
              style={{ marginRight: "auto" }}
            >
              <MdDelete className="delete-icon" />
              <span>Delete</span>
            </button>
          )}
          <button type="button" className="addemployee-btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="addemployee-btn-save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;