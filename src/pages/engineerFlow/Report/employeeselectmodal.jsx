import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { getEmployeeRoles } from "../../../store/actions/Engineer/upsertboqaction";

const EmployeeSelectModal = ({ show, onClose, onSend }) => {
  const dispatch = useDispatch();
  const [approverList, setApproverList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const projectId = userData?.projects?.[0]?.projectId;

  useEffect(() => {
    console.log("useEffect triggered, projectId:", projectId);
    console.log("show prop:", show);
    if (projectId && show) {
      // Only fetch when modal is shown
      console.log("Making API call...");
      setLoading(true);
      dispatch(getEmployeeRoles(projectId))
        .unwrap()
        .then((result) => {
          console.log("Full API Response:", result);

          // The employee data is directly in the result object, not in result.value
          const employeesByRole = result;
          console.log("Employees by Role:", employeesByRole);

          const APPROVER_ROLE_CODES = ["CEO", "MD", "PROJECTMANAGER"];

          const approverList = [];

          // Debug: Check if employeesByRole exists and is an object
          if (!employeesByRole || typeof employeesByRole !== "object") {
            console.error(
              "employeesByRole is not a valid object:",
              employeesByRole
            );
            setApproverList([]);
            return;
          }

          // Iterate through each role group in employeesByRole
          Object.keys(employeesByRole).forEach((roleKey) => {
            const roleGroup = employeesByRole[roleKey];
            console.log(`Processing role group: ${roleKey}`, roleGroup);

            if (Array.isArray(roleGroup)) {
              roleGroup.forEach((employee) => {
                console.log(`Checking employee:`, employee);
                console.log(`Employee role_code: ${employee.role_code}`);
                console.log(
                  `Is in APPROVER_ROLE_CODES: ${APPROVER_ROLE_CODES.includes(
                    employee.role_code
                  )}`
                );

                if (APPROVER_ROLE_CODES.includes(employee.role_code)) {
                  const approverEmployee = {
                    value: employee.emp_id,
                    label: `${employee.emp_name} - ${employee.role_name}`,
                    empId: employee.emp_id,
                    empName: employee.emp_name,
                    roleName: employee.role_name,
                  };
                  console.log("Adding approver:", approverEmployee);
                  approverList.push(approverEmployee);
                }
              });
            } else {
              console.warn(`Role group ${roleKey} is not an array:`, roleGroup);
            }
          });

          console.log("Final Approver List:", approverList);
          console.log("Approver List Length:", approverList.length);

          // Set the approver list to state
          setApproverList(approverList);
        })
        .catch((error) => {
          console.error("Failed to fetch employees:", error);
          setApproverList([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("Conditions not met - projectId:", projectId, "show:", show);
    }
  }, [dispatch, projectId, show]); // Add 'show' to dependencies

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployees((prev) => {
      const isSelected = prev.some((emp) => emp.empId === employee.empId);
      if (isSelected) {
        return prev.filter((emp) => emp.empId !== employee.empId);
      } else {
        return [...prev, employee];
      }
    });
  };

  // Extracts initials from the name
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const second = parts[1]?.charAt(0).toUpperCase() || "";
    return first + second;
  };

  // Generates a random color
  const getRandomColor = () => {
    const colors = [
      "#FF5733",
      "#33B5E5",
      "#8E44AD",
      "#16A085",
      "#E67E22",
      "#2ECC71",
      "#3498DB",
      "#F39C12",
      "#1ABC9C",
      "#E74C3C",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const handleSendReport = () => {
    const selectedIds = selectedEmployees.map((emp) => emp.empId);
    onSend(selectedIds);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Employees to Send Report</Modal.Title>
      </Modal.Header>

      <Modal.Body className="border-0">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin  h-8 w-8"></div>
            <span className="ml-2 text-gray-600">Loading employees...</span>
          </div>
        ) : approverList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No approver employees found for this project.
          </div>
        ) : (
          <div className="space-y-3">
            {approverList.map((employee) => (
              <div
                key={employee.empId}
                className="d-flex items-center align-items-center p-3 px-0 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleEmployeeSelect(employee)}
              >
                <input
                  type="checkbox"
                  checked={selectedEmployees.some(
                    (emp) => emp.empId === employee.empId
                  )}
                  onChange={() => handleEmployeeSelect(employee)}
                  className="form-check-input z-2 send-report-checkbox"
                />

                {/* Employee Avatar and Details */}
                <div
                  className="d-flex align-items-center send-report-emp-conatiner"
                  style={{ paddingLeft: "40px" }}
                >
                  {/* Initials Avatar */}
                  <div
                    className="rounded-circle text-white d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "36px",
                      height: "36px",
                      fontSize: "16px",
                      backgroundColor: getRandomColor(),
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(employee.empName)}
                  </div>

                  {/* Name and Role */}
                  <div>
                    <div className="mb-0 fs-22-700 text-dark">
                      {employee.empName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {employee.roleName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          disabled={selectedEmployees.length === 0}
          onClick={handleSendReport}
          className={`my-0 mx-auto btn-send-report border-0 border-radius-2 btn-approval-send btn ${
            selectedEmployees.length >= 1 ? "selected-row" : ""
          }`}
        >
          Send Report
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeSelectModal;
