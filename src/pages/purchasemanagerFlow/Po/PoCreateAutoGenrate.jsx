//D:\ccs\Project\React JS\latest\PRECISE INFRATRACKER\src\pages\purchasemanagerFlow\Po\purchaseOrderCreate.jsx
"use client";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getVendorsAndSubcontractors } from "../../../store/actions/vendor/getvendoraction";
import {
  getNewPoId,
  upsertPurchaseOrder,
  getBoqByCode,
} from "../../../store/actions/Purchase/purcharseorderidaction";
import { Form } from "react-bootstrap";
import MultipleSelect from "../../../components/DropDown/MultipleSelect";
import { fetchRoles } from "../../../store/actions/hr/designationaction";
import { getAllEmployeesByRolesAction } from "../../../store/actions/Ceo/RoleBasedEmpAction";
import { fetchProjects } from "../../../store/actions/hr/projectaction";
import { toast } from "react-toastify";
import { useTicket } from "../../../hooks/Ceo/useTicket";
import { debounce } from "lodash";
import { useNotification } from "../../../hooks/Ceo/useNotification";

export default function PoCreateAutoGenrate ({ params }) {
  const location = useLocation();
  const { createTicket } = useTicket();
  const { createNotify } = useNotification();
  const navigate = useNavigate();
  const { poId, loading, boqDetails, boqLoading } = useSelector(
    (state) => state.purchase
  );
  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => state.vendor);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const { projects = [] } = useSelector((state) => state.project);
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [selectedApprover, setSelectedApprover] = useState([]);
  const [initialApproverArray, setInitialApproverArray] = useState([]);
  const { boqData, ticket } = location.state || {};
const [boqCodeInput, setBoqCodeInput] = useState(boqData?.boqCode || "");
  const [boqSearchError, setBoqSearchError] = useState("");
  const [lineItems, setLineItems] = useState([]);
const [validationErrors, setValidationErrors] = useState({
    approver: false
  });
  const handleApproverSelect = (selectedOptions) => {
    setSelectedApprover(selectedOptions);
    if (selectedOptions && selectedOptions.length > 0) {
      setValidationErrors({...validationErrors, approver: false});
    }
  };
const validateForm = () => {
    const errors = {
      approver: !selectedApprover.length
    };
    
    setValidationErrors(errors);
    
    // Return true if no errors
    return !Object.values(errors).some(error => error);
  };
  console.log("selectedApprover", selectedApprover);
useEffect(() => {
  if (boqData?.boqCode) {
    // Set the BOQ code input
    setBoqCodeInput(boqData.boqCode);
    
    // Automatically trigger the search with the provided BOQ code
    debouncedSearch(boqData.boqCode);
  }
}, [boqData]);
  const [poData, setPoData] = useState({
    poNumber: "",
    poDate: new Date().toISOString().split("T")[0],
    vendorName: boqData?.vendorName || "",
    items: [],
  });

  // Create a debounced search function
  const debouncedSearch = debounce(async (code) => {
    if (!code) {
      setBoqSearchError("");
      return;
    }

    try {
      // Ensure the BOQ code is properly formatted
      let formattedBoqCode = code;
      if (!formattedBoqCode.toLowerCase().startsWith("boq#")) {
        formattedBoqCode = `boq#${formattedBoqCode}`;
      }

      const result = await dispatch(getBoqByCode(formattedBoqCode)).unwrap();
      console.log("BOQ Data received:", result);

      // Handle both array response and direct object response
      if (result) {
        // Use the result directly if it's an object, or the first item if it's an array
        const boqData = Array.isArray(result) ? result[0] : result;

        if (boqData) {
          console.log("Processing BOQ data:", boqData);

          // Update form fields with BOQ details
          setPoData((prev) => ({
            ...prev,
            vendorName: boqData.vendorName || "",
          }));

          // Set line items for display - use boqItems from the API response
          if (boqData.boqItems && boqData.boqItems.length > 0) {
            const formattedItems = boqData.boqItems.map((item, index) => ({
              id: index + 1,
              name: item.itemName,
              unit: item.unit,
              rate: item.price,
              quantity: item.quantity,
              total: item.total,
            }));

            console.log("Setting line items:", formattedItems);
            setLineItems(formattedItems);
          }

          // Set project if it exists
          if (boqData.projectId) {
            setSelectedProjectId(boqData.projectId.toString());
          }

          // Set vendor if it exists in the vendors list
          if (boqData.vendorId) {
            setSelectedVendorId(boqData.vendorId.toString());
          }

          // Store BOQ details in selector state
          dispatch({
            type: "purchase/getBoqByCode/fulfilled",
            payload: {
              boqId: boqData.boqId,
              boqName: boqData.boqName,
              boqCode: boqData.boqCode,
              projectId: boqData.projectId,
              projectName: boqData.projectName,
              vendorId: boqData.vendorId,
              vendorName: boqData.vendorName,
            },
          });

          setBoqSearchError("");
          toast.success("BOQ details loaded successfully");
        } else {
          setBoqSearchError("Invalid BOQ data format received");
        }
      } else {
        setBoqSearchError(
          "No BOQ found with the provided code. Please check and try again."
        );
      }
    } catch (error) {
      setBoqSearchError(
        "Failed to fetch BOQ details. Please check the code and try again."
      );
      console.error("BOQ fetch error:", error);
    }
  }, 500);

  // Handle BOQ code input change with automatic search
  const handleBoqCodeChange = (e) => {
    const value = e.target.value;
    setBoqCodeInput(value);

    if (value.length >= 2) {
      // Only search if at least 2 characters entered
      debouncedSearch(value);
    }
  };

  // Handle input change for line items
  const handleInputChange = (index, field, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index][field] = value;

    const rate = parseFloat(updatedItems[index].rate) || 0;
    const quantity = parseFloat(updatedItems[index].quantity) || 0;

    updatedItems[index].total = rate * quantity;

    setLineItems(updatedItems);
  };

  // Handle add new row
  const handleAddRow = () => {
    const newId =
      lineItems.length > 0
        ? Math.max(...lineItems.map((item) => item.id)) + 1
        : 1;
    const newRow = {
      id: newId,
      name: "",
      unit: "",
      rate: "",
      quantity: "",
      total: "",
    };
    setLineItems([...lineItems, newRow]);
  };

  // Handle create PO
  // Handle create PO
  const handleCreatePO = async () => {
    if (!validateForm()) {
          if (validationErrors.approver) toast.warn("Please select at least one approver.");
          return;
        }
    if (lineItems.length === 0) {
      toast.error("Please add at least one item to the purchase order");
      return;
    }

    if (!selectedProjectId) {
      toast.error("Please select a project");
      return;
    }

    // Check if BOQ Code is available
    if (!boqCodeInput && !boqDetails?.boqCode && !boqData?.boqCode) {
      toast.error("BOQ Code is required");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    const empId = userData?.empId;

    const payload = {
      purchaseOrderId: 0,
      poId: poData.poNumber || poId,
      poDate: poData.poDate,
      vendorName: poData.vendorName,
      boqId: boqDetails?.boqId || parseInt(boqData?.boqId) || 0,
      boqTitle: boqDetails?.boqName || boqData?.boqName || "",
      boqCode: boqDetails?.boqCode || boqData?.boqCode || boqCodeInput, // Add the BOQ code
      projectId: parseInt(selectedProjectId) || 0,
      createdBy: empId,
      Items: lineItems.map((item) => ({
        itemName: item.name,
        unit: item.unit,
        price: parseFloat(item.rate) || 0,
        quantity: parseFloat(item.quantity) || 0,
        total: parseFloat(item.total) || 0,
      })),
    };

    console.log("Sending payload:", payload); // Log payload for debugging

    try {
  let ticketId = null;
  const response = await dispatch(upsertPurchaseOrder(payload)).unwrap();
  if (response?.success) {
    toast.success("PO Created Successfully");

    // Create ticket for approval
    if (selectedApprover.length > 0) {
      console.log("this if working");
      const ticketResponse = await createTicket({
        poId: response?.data?.purchaseOrderId,
        ticketType: "PO_APPROVAL",
        assignTo:
          selectedApprover.length > 0
            ? selectedApprover.map(
                (approver) => approver.empId || approver.empId
              )
            : [1, 2, 7],
        createdBy: userData?.empId,
      });

      if (ticketResponse?.data?.success) {
        toast.success("Ticket Created Successfully");
      }

      console.log("Ticket response:", ticketResponse); // Log ticket response for debugging
      ticketId = ticketResponse?.data?.data?.ticketId; // ✅ FIXED: no const
      const projectName = ticketResponse?.data?.data?.projectName;

      if (ticketId) {
        // Create notification with ticket ID as sourceEntityId
        const notificationPayload = {
          empId:
            selectedApprover.length > 0
              ? selectedApprover.map(
                  (approver) => approver.empId || approver.empId
                )
              : [1, 2, 7],
          notificationType: "Generate_Purchase_Order ",
          sourceEntityId: ticketId,
          message: `We would like to update you that we are currently awaiting your PO on the for ${projectName}. Kindly review and provide your confirmation at the earliest to avoid any delays in the process.`,
        };

        // Create notification
        await createNotify(notificationPayload);
        toast.success("Notification Created Successfully");
      }
    } else {
      // Default approvers if none selected
      const ticketResponse = await createTicket({
        poId: response?.data?.purchaseOrderId,
        ticketType: "PO_APPROVAL",
        assignTo:
          selectedApprover.length > 0
            ? selectedApprover.map(
                (approver) => approver.empId || approver.id
              )
            : [1, 2, 7], // array of empIds
        createdBy: userData?.empId,
      });

      const projectName = ticketResponse?.data?.data?.projectName;
      ticketId = ticketResponse?.data?.data?.ticketId; // ✅ correctly assigned

      if (ticketId) {
        // Create notification with ticket ID as sourceEntityId
        const notificationPayload = {
          empId:
            selectedApprover.length > 0
              ? selectedApprover.map(
                  (approver) => approver.empId || approver.empId
                )
              : [1, 2, 7],
          notificationType: "Generate_Purchase_Order ",
          sourceEntityId: ticketId,
          message: `We would like to update you that we are currently awaiting your PO on the for ${projectName}. Kindly review and provide your confirmation at the earliest to avoid any delays in the process.`,
        };

        // Create notification
        await createNotify(notificationPayload);
        toast.success("Notification Created Successfully");
      }
    }

    navigate(`../ticket/${ticketId}`); // ✅ will now have the correct ticketId
  } else {
    toast.error(response?.message || "Failed to create PO");
  }
}
 catch (error) {
      // Show more specific error message from API if available
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join(", ");
        toast.error(`Validation error: ${errorMessages}`);
      } else {
        toast.error(
          "Failed to create PO: " + (error.message || "Unknown error")
        );
      }
      console.error("PO creation error:", error);
    }
  };
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await dispatch(getAllEmployeesByRolesAction()).unwrap();
        const firstEmployees = Object.entries(result.employeesByRole).map(
          ([role, employees]) => ({
            role,
            employee: employees[0], // Only the first employee
          })
        );
        const approverRoles = firstEmployees
          ?.filter((role) =>
            ["CEO", "Head Finance", "Managing Director"].includes(role.role)
          )
          .map((role) => ({
            ...role.employee,
            value: role.role,
            label: role.role,
          }));

        setInitialApproverArray(approverRoles);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, [dispatch]);

  useEffect(() => {
    // Set PO ID when it's available
    if (poId) {
      setPoData((prev) => ({
        ...prev,
        poNumber: poId,
      }));
    }
  }, [poId]);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleProjectChange = (e) => {
    setSelectedProjectId(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getNewPoId());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVendorsAndSubcontractors());
  }, [dispatch]);

  // Calculate total amount
  const totalAmount = lineItems.reduce(
    (sum, item) => sum + (parseFloat(item.total) || 0),
    0
  );

  return (
    <div className="container mt-4 mb-5">
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "24px",
        }}
      >
        Purchase Order
      </h1>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>
              PO Id <span style={{ color: "red" }}>*</span>
            </label>
            <input disabled
              type="text"
              className="form-control"
              value={loading ? "Loading..." : poId || ""}
              readOnly
              style={{
                padding: "10px 12px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>
              Projects <span style={{ color: "red" }}>*</span>
            </label>
            <select disabled
              className="form-control"
              value={selectedProjectId}
              onChange={handleProjectChange}
              style={{
                padding: "10px 12px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            >
              <option value="">Select Project</option>
              {projects.map((proj) => (
                <option key={proj.project_id} value={proj.project_id}>
                  {proj.project_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>
              Title <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text" disabled
              className="form-control"
              value={boqDetails?.boqName || boqData?.boqName || ""}
              readOnly
              style={{
                padding: "10px 12px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>
              BOQ Code <span style={{ color: "red" }}>*</span>
            </label>
            <div className="input-group">
              <input disabled
                type="text"
                className="form-control"
                value={boqCodeInput}
                onChange={handleBoqCodeChange}
                placeholder="Enter BOQ Code (e.g. 47 or boq#47)"
                style={{
                  padding: "10px 12px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                }}
              />
              {boqLoading && (
                <div className="input-group-append">
                  <span
                    className="input-group-text"
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #ced4da",
                    }}
                  >
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </span>
                </div>
              )}
            </div>
            {boqSearchError && (
              <div className="text-danger mt-2">{boqSearchError}</div>
            )}
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>
              Vendor Name
            </label>
            <input
              type="text" disabled
              className="form-control"
              value={boqDetails?.vendorName || poData.vendorName || ""}
              readOnly
              style={{
                padding: "10px 12px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        <div className={validationErrors.approver ? "is-invalid col-sm-6" : "col-sm-6"}>
          <Form.Group className="mb-3">
            <Form.Label className="text-black fs-5">Approved By</Form.Label>
            <MultipleSelect required
              selectedOptions={selectedApprover}
              handleSelected={setSelectedApprover}
              data={initialApproverArray}
              isSearchable={true}
              placeholder={"Select Approver"}
              isMulti={true}
            />
          </Form.Group>
        </div>
      </div> {validationErrors.approver && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  Please select at least one approver.
                </div>
              )}

      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th
                className="text-center"
                style={{
                  padding: "12px 16px",
                  fontWeight: "500",
                  color: "#555",
                  width: "80px",
                }}
              >
                S. No
              </th>
              <th
                className="text-center"
                style={{
                  padding: "12px 16px",
                  fontWeight: "500",
                  color: "#555",
                }}
              >
                Item Name
              </th>
              <th
                className="text-center"
                style={{
                  padding: "12px 16px",
                  fontWeight: "500",
                  color: "#555",
                  width: "120px",
                }}
              >
                Unit
              </th>
              <th
                className="text-center"
                style={{
                  padding: "12px 16px",
                  fontWeight: "500",
                  color: "#555",
                  width: "120px",
                }}
              >
                Rate ₹
              </th>
              <th
                className="text-center"
                style={{
                  padding: "12px 16px",
                  fontWeight: "500",
                  color: "#555",
                  width: "120px",
                }}
              >
                Quantity
              </th>
              <th
                className="text-center"
                style={{
                  padding: "12px 16px",
                  fontWeight: "500",
                  color: "#555",
                  width: "120px",
                }}
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, index) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td className="text-center" style={{ padding: "12px 16px" }}>
                  {item.id}
                </td>
                <td className="text-center">
                  <input
                    type="text" disabled
                    className="form-control"
                    value={item.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </td>
                <td className="text-center">
                  <input
                    type="text" disabled
                    className="form-control"
                    value={item.unit}
                    onChange={(e) =>
                      handleInputChange(index, "unit", e.target.value)
                    }
                  />
                </td>
                <td className="text-center">
                  <input
                    type="number" disabled
                    className="form-control"
                    value={item.rate}
                    onChange={(e) =>
                      handleInputChange(index, "rate", e.target.value)
                    }
                  />
                </td>
                <td className="text-center">
                  <input
                    type="number" disabled
                    className="form-control"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                  />
                </td>
                <td className="text-center" style={{ padding: "12px 16px" }}>
                  ₹ {(item.total || 0).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="5"
                className="text-end"
                style={{ fontWeight: "bold", padding: "12px 16px" }}
              >
                Grand Total:
              </td>
              <td
                className="text-center"
                style={{ fontWeight: "bold", padding: "12px 16px" }}
              >
                ₹ {totalAmount.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>

        
      </div>

      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-end">
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate("../po")}
            style={{ padding: "8px 16px" }}
          >
            Back
          </button>
          <button
            className="btn"
            onClick={handleCreatePO}
            style={{
              backgroundColor: "#ff6600",
              color: "white",
              padding: "8px 16px",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}