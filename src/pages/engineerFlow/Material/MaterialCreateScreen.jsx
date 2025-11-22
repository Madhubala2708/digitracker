import React, { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getVendorsAndSubcontractors } from "../../../store/actions/vendor/getvendoraction";
import { fetchRoles } from "../../../store/actions/hr/designationaction";
import MultipleSelect from "../../../components/DropDown/MultipleSelect";
import {
  getEmployeeRoles,
  getNewBoqId,
  upsertBoq,
} from "../../../store/actions/Engineer/upsertboqaction";
import { toast } from "react-toastify";
import { useTicket } from "../../../hooks/Ceo/useTicket";
import { getAllEmployeesByRolesAction } from "../../../store/actions/Ceo/RoleBasedEmpAction";
import { getticketbyidAction } from "../../../store/actions/Ceo/TicketCreateAction";
import { useNotification } from "../../../hooks/Ceo/useNotification";
import { fetchProjects } from "../../../store/actions/hr/projectaction";

const MaterialCreateScreen = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([
    { itemName: "", unit: "", rate: "", quantity: "", total: "" },
  ]);
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.role);
  const [title, setTitle] = useState("");
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [selectedApprover, setSelectedApprover] = useState([]);
  const { projects = [] } = useSelector((state) => state.project);
  const { boqId } = useSelector((state) => state.boq);
  const { createTicket } = useTicket();
  const { createNotify } = useNotification();
  const [initialApproverArray, setInitialApproverArray] = useState([]);
  const [validationErrors, setValidationErrors] = useState({
    title: false,
    vendor: false,
    approver: false,
  });
  const { vendors, loading, error } = useSelector((state) => state.vendor);

  const handleAddRow = () => {
    setRows([
      ...rows,
      { itemName: "", unit: "", rate: "", quantity: "", total: "" },
    ]);
  };
  const [approvedBy, setApprovedBy] = useState([]);

  const handleApproverChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setApprovedBy(selectedOptions);
  };
  const getProjectIdFromLocalStorage = () => {
    const storedData = localStorage.getItem("userData"); // Assuming key is 'userDetails'

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);

        // Ensure projects array exists
        if (parsedData.projects && Array.isArray(parsedData.projects)) {
          return parsedData.projects[0]?.projectId || null; // Get projectId of the first project
        } else {
          console.error("No projects found in local storage");
          return null;
        }
      } catch (error) {
        console.error("Error parsing local storage data:", error);
        return null;
      }
    } else {
      console.error("No data found in local storage for key 'userDetails'");
      return null;
    }
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  // Retrieve projectId dynamically from local storage
  const projectId = getProjectIdFromLocalStorage();

  useEffect(() => {
    if (projectId) {
      dispatch(getEmployeeRoles(projectId))
        .unwrap()
        .then((result) => {
          console.log("RAW API RESPONSE FROM BACKEND:", result);
          console.log("AQS DATA:", result?.AssistantQuantitySurveyor);

          // The API response seems to have the roles directly, not under employeesByRole
          const employeesByRole = result;

          const approverList = [];

          // Add Engineer approvers
          for (const [key, value] of Object.entries(employeesByRole)) {
            if (Array.isArray(value)) {
              value.forEach((employee) => {
                if (
                  ["CEO", "HEADFINANCE", "MD", "PROJECTMANAGER"].includes(
                    employee.role_code
                  )
                ) {
                  approverList.push({
                    value: employee.emp_id,
                    label: employee.role_name,
                    empId: employee.emp_id,
                  });
                }
              });
            }
          }

          // ADD AQS if exists
          if (
            employeesByRole.AssistantQuantitySurveyor &&
            employeesByRole.AssistantQuantitySurveyor.length > 0
          ) {
            const aqsEmployee = employeesByRole.AssistantQuantitySurveyor[0];
            approverList.push({
              value: aqsEmployee.emp_id,
              label: aqsEmployee.role_name,
              empId: aqsEmployee.emp_id,
            });
          }

          // remove duplicates
          const unique = [];
          const found = new Set();

          for (const item of approverList) {
            if (!found.has(item.empId)) {
              found.add(item.empId);
              unique.push(item);
            }
          }

          setInitialApproverArray(unique);
        })
        .catch((error) => {
          console.error("Failed to fetch employees:", error);
        });
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    dispatch(getNewBoqId());
  }, [dispatch]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;

    // Auto-update total if rate or quantity changes
    if (name === "rate" || name === "quantity") {
      const rate = parseFloat(updatedRows[index].rate) || 0;
      const quantity = parseFloat(updatedRows[index].quantity) || 0;
      updatedRows[index].total = rate * quantity;
    }

    setRows(updatedRows);
  };
  const handleVendorSelect = (e) => {
    const value = e.target.value;
    setSelectedVendorId(value);
    if (value) {
      setValidationErrors({ ...validationErrors, vendor: false });
    }
  };

  // Function to handle title change and clear validation error
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    if (value.trim()) {
      setValidationErrors({ ...validationErrors, title: false });
    }
  };
  const validateForm = () => {
    const errors = {
      title: !title.trim(),
      vendor: !selectedVendorId,
      approver: !selectedApprover.length,
    };

    setValidationErrors(errors);

    // Return true if no errors
    return !Object.values(errors).some((error) => error);
  };
  const handleApproverSelect = (selectedOptions) => {
    setSelectedApprover(selectedOptions);
    if (selectedOptions && selectedOptions.length > 0) {
      setValidationErrors({ ...validationErrors, approver: false });
    }
  };

  const getApproverIds = () => {
    return selectedApprover
      .map((approver) => {
        if (!approver) return null;
        const rawValue =
          approver.empId ??
          approver.value ??
          approver.id ??
          (typeof approver === "number" || typeof approver === "string"
            ? approver
            : null);

        if (rawValue === null || rawValue === undefined) return null;

        if (typeof rawValue === "string") {
          return rawValue.trim();
        }

        return rawValue;
      })
      .filter(
        (id) =>
          id !== null &&
          id !== undefined &&
          !(typeof id === "string" && id.length === 0)
      );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (validationErrors.title) toast.warn("Please enter a title.");
      if (validationErrors.vendor) toast.warn("Please select a vendor.");
      if (validationErrors.approver)
        toast.warn("Please select at least one approver.");
      return;
    }

    let empData = JSON.parse(localStorage.getItem("userData"));

    if (!selectedVendorId) {
      toast.warn("Please select a vendor.");
      return;
    }

    const normalizedVendorId = Number(selectedVendorId);
    if (Number.isNaN(normalizedVendorId) || normalizedVendorId <= 0) {
      toast.error("Invalid vendor selected. Please choose a valid vendor.");
      return;
    }

    if (!projectId) {
      toast.error(
        "Unable to determine project context. Please reopen the material module."
      );
      return;
    }

    const approverIds = getApproverIds();
    const numericApproverIds = approverIds
      .map((id) => {
        if (typeof id === "number") return id;
        const parsed = Number(id);
        return Number.isNaN(parsed) ? null : parsed;
      })
      .filter((id) => id !== null);

    if (!numericApproverIds.length) {
      toast.error("Selected approvers are invalid. Please reselect and try again.");
      return;
    }
    const boqPayload = {
      empId: Number(empData?.empId),
      boqId: 0,
      boqName: title,
      boqCode: boqId?.toString?.() || "",
      boqDescription: "",
      boqItems: rows.map((row) => ({
        boqItemsId: 0,
        itemName: row.itemName,
        unit: row.unit,
        price: parseFloat(row.rate) || 0,
        quantity: parseFloat(row.quantity) || 0,
      })),
      assignTo: numericApproverIds,
      ticketType: "BOQ_APPROVAL",
      vendorId: normalizedVendorId,
      projectId,
    };

    try {
      // Step 1: Create BOQ
      const boqResponse = await dispatch(upsertBoq(boqPayload)).unwrap();
      console.log("BOQ Response:", boqResponse);

      if (boqResponse?.success) {
        toast.success("BOQ created successfully.");
        const createdBoqId =
          Number(
            boqResponse?.data?.boqId ??
            boqResponse?.data?.boqID ??
            boqResponse?.boqId ??
            boqResponse?.boqID
          ) || null;

        if (!createdBoqId) {
          toast.error(
            "BOQ created but no BOQ ID was returned. Please contact support."
          );
          return;
        }

        // Step 2: Create Ticket with error handling
        try {
          const ticketPayload = {
            ticketName: title,          // REQUIRED
            ticketDescription: `BOQ approval request for ${title}`,
            projectId,
            vendorId: normalizedVendorId,
            boqId: Number(createdBoqId),
            ticketType: "BOQ_APPROVAL",
            assignTo: numericApproverIds.map(Number).filter(x => !isNaN(x)),
            createdBy: Number(empData?.empId),
          };


          console.group("BOQ Ticket Creation");
          console.log("Payload:", ticketPayload);
          console.log("Project ID sent:", projectId);
          console.log("Approver IDs:", numericApproverIds);



          const ticketResponse = await createTicket(ticketPayload);
          console.log("Response:", ticketResponse);

          const ticketApiResponse = ticketResponse?.data;
          if (ticketResponse?.success && ticketApiResponse?.success) {
            toast.success("Ticket created successfully.");

            const ticketId = ticketApiResponse?.data?.ticketId;
            const projectName = ticketApiResponse?.data?.projectName;

            // Step 3: Send Notification
            try {
              await createNotify({
                empId: numericApproverIds,
                notificationType: "Material Requirement(BOQ)",
                sourceEntityId: ticketId,
                message: `We would like to update you that we are currently awaiting BOQ on the material requirement submitted for ${projectName} Project. Kindly review and provide BOQ at the earliest to avoid any delays in the process.`,
              });
              toast.success("Notification sent.");
            } catch (notifyError) {
              console.warn("Notification failed:", notifyError);
              toast.warn("BOQ and Ticket created but notification failed.");
            }

            // Step 4: Fetch Ticket Details and Navigate
            try {
              navigate(`/admin/engineerapprovals/ticketdetails/${ticketId}`, {
                state: {
                  from: "engineer",
                  ticketId,
                  flow: selectedApprover.map((a) => a.empId),
                },
              });
            } catch (err) {
              console.error("Navigation Error:", err);

            }

            // Reset form
            setRows([
              { itemName: "", unit: "", rate: "", quantity: "", total: "" },
            ]);
            setTitle("");
            setSelectedVendorId("");
            setSelectedApprover([]);
          } else {

            // If ticket creation fails, still show BOQ success
            toast.error(
              ticketResponse?.data?.message || "Ticket creation failed."
            );
            console.error("Ticket creation error:", ticketResponse?.data);

            // Navigate to material page after BOQ creation
            setTimeout(() => {
              navigate("/admin/engineermaterial");
            }, 1500);

          }
          console.groupEnd();
        } catch (ticketError) {

          // Catch ticket creation error
          console.error("Ticket API Error:", ticketError);
          toast.error("Ticket creation failed. Please contact support.");

          // Navigate to material page with BOQ created
          setTimeout(() => {
            navigate("/admin/engineermaterial");
          }, 1500);

        }
      } else {
        toast.error(boqResponse?.payload?.message || "BOQ creation failed.");
      }
    } catch (boqError) {
      console.error("BOQ Creation Error:", boqError);
      toast.error("BOQ creation failed. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVendorsAndSubcontractors());
  }, [dispatch]);

  return (
    <main className="page-engineer-dashboard d-flex">
      <div className="left-container w-100">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="border-1 breadcrumb-container pt-1 pb-4 d-flex align-items-center">
              <Link
                to="/admin/engineermaterial"
                className="text-decoration-none breadcrumb-item fs-16-500 text-dark-gray"
                style={{ cursor: "pointer" }}
              >
                Material
              </Link>
              <svg
                className="mx-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060"></path>
              </svg>
              <span className="breadcrumb-item fs-16-500 text-primary">
                Create
              </span>
            </div>
          </div>
        </div>
        <div className="row mt-4 align-items-center">
          <div className="col-lg-12">
            <h2 className="fs-28-700">New BOQ</h2>
          </div>
        </div>
        <div className="row mt-4 align-items-center">
          <div className="col-lg-12">
            <Form onSubmit={handleSubmit} className="boq-form-css">
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label className="text-black fs-5">
                      BOQ ID <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="minh52px"
                      style={{ backgroundColor: "white" }}
                      type="text"
                      placeholder="BOQ ID"
                      value={boqId}
                      // onChange={(e) => setBoqId(e.target.value)}
                      required
                      disabled
                    />{" "}
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label className="text-black fs-5">
                      Title <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="minh52px"
                      type="text"
                      placeholder="BOQ TITLE"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />{" "}
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label className="text-black fs-5">
                      Vendor <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      className="form-control minh52px"
                      style={{ backgroundColor: "white" }}
                      value={selectedVendorId}
                      onChange={(e) => setSelectedVendorId(e.target.value)}
                    >
                      {" "}
                      <option value="">Select Vendor</option>
                      {vendors.map((vendor) => (
                        <option key={vendor.id} value={vendor.id}>
                          {vendor.vendorName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div
                  className={
                    validationErrors.approver
                      ? "col-md-6 is-invalid"
                      : "col-md-6"
                  }
                >
                  <Form.Group className="mb-3">
                    <Form.Label className="text-black fs-5">
                      Approved By <span className="text-danger">*</span>
                    </Form.Label>

                    <MultipleSelect
                      className="minh52px"
                      required
                      selectedOptions={selectedApprover}
                      handleSelected={setSelectedApprover}
                      data={initialApproverArray}
                      isSearchable={true}
                      placeholder={"Select Approver"}
                      isMulti={true}
                    />
                    {validationErrors.approver && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        Please select at least one approver.
                      </div>
                    )}
                  </Form.Group>
                </div>
              </div>

              <table className="boq-table mt-4 clean-inputs">
                <thead className="bg-orange">
                  <tr>
                    <th className="text-center text-white">S. No</th>
                    <th className="text-center text-white">Item Name</th>
                    <th className="text-center text-white">Unit</th>
                    <th className="text-center text-white">Rate</th>
                    <th className="text-center text-white">Quantity</th>
                    <th className="text-center text-white">Total</th>
                  </tr>
                </thead>
                <tbody className="tbl">
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="cell-no-border">
                        <input
                          type="text"
                          name="itemName"
                          value={row.itemName}
                          onChange={(e) => handleInputChange(index, e)}
                          className="input-no-border"
                        />
                      </td>
                      <td className="cell-no-border">
                        <input
                          type="text"
                          name="unit"
                          value={row.unit}
                          onChange={(e) => handleInputChange(index, e)}
                          className="input-no-border text-center"
                        />
                      </td>
                      <td className="cell-no-border">
                        <input
                          type="number"
                          name="rate"
                          value={row.rate}
                          onChange={(e) => handleInputChange(index, e)}
                          className="input-no-border text-center"
                        />
                      </td>
                      <td className="cell-no-border">
                        <input
                          type="number"
                          name="quantity"
                          value={row.quantity}
                          onChange={(e) => handleInputChange(index, e)}
                          className="input-no-border text-center"
                        />
                      </td>
                      <td className="text-center">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex flex-column align-items-end mt-3">
                <Button
                  variant=""
                  className="text-orange fs-16-500 bg-orange add-column-btn p-0 mb-3"
                  onClick={handleAddRow}
                >
                  + Add Row
                </Button>

                <Button
                  type="submit"
                  className="mt-4 me-0 w180 bg-primary border-0 border-radius-4 fs-16-500 text-white d-flex align-items-center justify-content-center"
                >
                  <svg
                    className="me-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.7885 2.50872C20.6693 2.40981 20.5245 2.34679 20.3709 2.32701C20.2173 2.30723 20.0612 2.33149 19.9209 2.39698L3.08105 10.3013V11.8307L10.1541 14.6599L14.6911 21.6399H16.2208L21.0544 3.34216C21.0936 3.19231 21.0895 3.03441 21.0424 2.88685C20.9953 2.73929 20.9072 2.60815 20.7885 2.50872ZM15.2763 20.1811L11.3766 14.1814L17.3776 7.60875L16.4281 6.74183L10.3802 13.3657L4.54841 11.033L19.5532 3.98986L15.2763 20.1811Z"
                      fill="white"
                    />
                  </svg>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MaterialCreateScreen;
