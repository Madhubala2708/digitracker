"use client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getVendorsAndSubcontractors } from "../../store/actions/vendor/getvendoraction";
import {
  getNewPoId,
  upsertPurchaseOrder,
  getBoqByCode,
} from "../../store/actions/Purchase/purcharseorderidaction";
import { Form } from "react-bootstrap";
import MultipleSelect from "../../components/DropDown/MultipleSelect";
import { fetchRoles } from "../../store/actions/hr/designationaction";
import { getAllEmployeesByRolesAction } from "../../store/actions/Ceo/RoleBasedEmpAction";
import { fetchProjects } from "../../store/actions/hr/projectaction";
import { toast } from "react-toastify";
import { useTicket } from "../../hooks/Ceo/useTicket";
import { debounce } from "lodash";
import { getPurchaseOrderDetails } from "../../store/actions/vendorflow/po-vendroaction";
import Select from "react-dropdown-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck, faDownload } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";


export default function POViewPage({ params }) {
  const location = useLocation();
  const { createTicket } = useTicket();
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
  const [boqCodeInput, setBoqCodeInput] = useState("");
  const [boqSearchError, setBoqSearchError] = useState("");
  const [lineItems, setLineItems] = useState([]);
  const route = useParams();
  const [purchaseData, setPurchaseData] = useState("");

  const [poData, setPoData] = useState({
    poNumber: "",
    poDate: new Date().toISOString().split("T")[0],
    vendorName: boqData?.vendorName || "",
    items: [],
  });




const thStyle = {
  padding: "12px 16px",
  fontWeight: "500",
  color: "#A2A2A2",
  border: "1px solid #A2A2A2",
};

const tdStyle = {
  padding: "12px 16px",
  fontWeight: "400",
  color: "#333",
  border: "1px solid #A2A2A2",
};




  useEffect(() => {
    if (route.purchaseOrderId) {
      get_PO_Details();
    }
  }, [route]);

  const get_PO_Details = async () => {
    const response = await dispatch(
      getPurchaseOrderDetails(route?.purchaseOrderId)
    );
    console.log("response", response);
    if (response?.payload) {
      setPurchaseData(response?.payload);
    }
  };

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
      const response = await dispatch(upsertPurchaseOrder(payload)).unwrap();
      if (response?.success) {
        toast.success("PO Created Successfully");

        // Create ticket for approval
        if (selectedApprover.length > 0) {
          const approverIds = selectedApprover.map(
            (approver) => approver.emp_id || approver.id
          );
          const ticketResponse = await createTicket({
            poId: response?.data?.purchaseOrderId,
            ticketType: "PO_APPROVAL",
            assignTo: approverIds,
            createdBy: userData?.empId,
          });
        } else {
          // Default approvers if none selected
          const ticketResponse = await createTicket({
            poId: response?.data?.purchaseOrderId,
            ticketType: "PO_APPROVAL",
            assignTo: [1, 2, 7], // array of empIds
            createdBy: userData?.empId,
          });
        }

        navigate("../po"); // Redirect after success
      } else {
        toast.error(response?.message || "Failed to create PO");
      }
    } catch (error) {
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
  const totalAmount = purchaseData?.purchaseOrderItems?.reduce(
    (sum, item) => sum + (parseFloat(item.total) || 0),
    0
  );

  const getApproverName = () => {
    if (purchaseData?.approvers?.length > 0) {
      const employeeOptions = purchaseData?.approvers?.map((emp) => ({
        ...emp,
        label: emp.roleName,
        value: emp.roleName,
      }));
      console.log("employeeOptions_employeeOptions", employeeOptions);
      return employeeOptions;
    }
  };

  console.log("AppovedBy", getApproverName());


  
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

    const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const second = parts[1]?.charAt(0).toUpperCase() || "";
    return first + second;
  };


  const handleDownloadPOExcel = () => {
  const items = purchaseData?.purchaseOrderItems || [];

  const formattedData = items.map((item, index) => ({
    "S. No": index + 1,
    "Item Name": item.itemName,
    "Unit": item.unit,
    "Rate ₹": item.price,
    "Quantity": item.quantity,
    "Total ₹": item.total,
  }));

  const ws = XLSX.utils.json_to_sheet(formattedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Purchase Order");

  XLSX.writeFile(wb, "Purchase_Order.xlsx");
};


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
            <input
              type="text"
              className="form-control"
              value={loading ? "Loading..." : purchaseData?.poId || ""}
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
            <input
              type="text"
              className="form-control"
              value={loading ? "Loading..." : purchaseData?.projectName || ""}
              readOnly
              style={{
                padding: "10px 12px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            />
            {/* <select
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
            </select> */}
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
              type="text"
              className="form-control"
              value={purchaseData?.boqName || purchaseData?.boqName || ""}
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
              <input
                type="text"
                className="form-control"
                value={purchaseData?.boqCode}
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
    <label style={{ fontWeight: "500", marginBottom: "12px" }}>
      Vendor Name
    </label>

    <div className="d-flex align-items-center gap-2 position-relative mb-3">
      <div
        className="rounded-circle text-white d-flex align-items-center justify-content-center"
        style={{
          width: "30px",
          height: "30px",
          fontSize: "15px",
          flexShrink: 0,
          backgroundColor: getRandomColor(), // random color
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          marginTop:"-3px"
        }}
      >
        {getInitials(purchaseData?.vendorName || poData.vendorName)}
      </div>

      <input
        type="text"
        className="form-control ps-5"
        value={purchaseData?.vendorName || poData.vendorName || ""}
        readOnly
        style={{
          padding: "10px 12px",
          border: "1px solid #ced4da",
          borderRadius: "4px",
        }}
      />
    </div>
  </div>
</div>


        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className="text-black fs-5">Approved By</Form.Label>
            {/* <MultipleSelect
              selectedOptions={selectedApprover}
              handleSelected={setSelectedApprover}
              data={initialApproverArray}

              isSearchable={true}
              placeholder={"Select Approver"}
              isMulti={true}

            /> */}
            <MultipleSelect
              placeholder="Approved By"
              selectedOptions={getApproverName()}
              disabled
              isMulti={true}
            />
          </Form.Group>
        </div>
      </div>

  <div className="table-responsive mt-4">
  <table className="table table-bordered" style={{ borderCollapse: "collapse" }}>
    <thead style={{ backgroundColor: "#f0f0f0" }}>
      <tr>
        <th className="text-center" style={thStyle}>S. No</th>
        <th className="text-center" style={thStyle}>Item Name</th>
        <th className="text-center" style={thStyle}>Unit</th>
        <th className="text-center" style={thStyle}>Rate ₹</th>
        <th className="text-center" style={thStyle}>Quantity</th>
        <th className="text-center" style={thStyle}>Total</th>
      </tr>
    </thead>
    <tbody>
      {purchaseData?.purchaseOrderItems?.map((item, index) => (
        <tr key={item.id}>
          <td className="text-center" style={tdStyle}>{String(index + 1).padStart(2, "0")}</td>
          <td className="text-center" style={tdStyle}>{item.itemName}</td>
          <td className="text-center" style={tdStyle}>{item.unit}</td>
          <td className="text-center" style={tdStyle}>{item.price}</td>
          <td className="text-center" style={tdStyle}>{item.quantity}</td>
          <td className="text-center" style={tdStyle}>₹ {item.total.toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Total section styled like image */}
<div className="mt-3" style={{ backgroundColor: "#FF6F00", padding: "12px 16px", borderRadius: "4px" }}>
  <div className="d-flex justify-content-between align-items-center">
    <p className="m-0 text-white" style={{ fontWeight: "500" }}>Total</p>
    <p className="m-0 text-white" style={{ fontWeight: "500" }}>
      ₹ {totalAmount?.toLocaleString()}
    </p>
  </div>
</div>

        {/* <button
          className="btn"
          onClick={handleAddRow}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          + Add New Row
        </button> */}

             <div className="d-flex justify-content-end align-items-center mt-3 gap-2">
         
          <button
  className="btn text-white d-flex align-items-center"
  style={{ backgroundColor: "#ff6600" }}
  onClick={handleDownloadPOExcel}
>
  <FontAwesomeIcon
    icon={faDownload}
    className="me-2"
    style={{ color: "white" }}
  />
  Download .xlsx
</button>

      {/* <div className="row mt-4">
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
      </div> */}
      </div>
    </div>
  );
}
