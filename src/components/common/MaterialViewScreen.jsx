//D:\ccs\Project\React JS\latest\PRECISE INFRATRACKER\src\components\common\MaterialViewScreen.jsx
import React, { useEffect, useState } from "react";
import { Form, Table, Dropdown } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { getBoqDetails } from "../../services";
import { toast } from "react-toastify";
import * as XLSX from "xlsx"; // Import the xlsx library
import MultipleSelect from "../DropDown/MultipleSelect";
import { useDispatch } from "react-redux";

const MaterialViewScreen = () => {
  const { id: paramId } = useParams(); // route param (if route uses :id)
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // try multiple sources for boqId
  const search = new URLSearchParams(location.search);
  const queryBoqId = search.get("boqId");
  const stateBoqId =
    location.state?.boqId ??
    location.state?.material?.parent?.boqId ??
    location.state?.material?.boqId;

  const boqId = paramId || queryBoqId || stateBoqId;

  const [boqDetails, setboqDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const { ticket } = location.state || {};
  const [boqApprovers, setBoqApprovers] = useState([]);

  const boqData = [
    {
      id: "01",
      name: "Dalmia Cements",
      unit: "Bag",
      rate: 321,
      quantity: 12,
      total: 3852,
    },
    {
      id: "02",
      name: "MTR TMT Rod",
      unit: "Piece",
      rate: 86,
      quantity: 54,
      total: 4644,
    },
    {
      id: "03",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
    {
      id: "04",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
    {
      id: "05",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
    {
      id: "06",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
    {
      id: "07",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
    {
      id: "08",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
    {
      id: "09",
      name: "Engineer Helmet",
      unit: "Piece",
      rate: 300,
      quantity: 12,
      total: 3600,
    },
  ];

  const handleDownloadExcel = () => {
    const items = boqDetails?.boqItems || []; // Ensure that boqItems are present
    const formattedData = items.map((item) => ({
      "S. No": item.boqItemsId,
      "Item Name": item.itemName,
      Unit: item.unit,
      "Rate ₹": item.price,
      Quantity: item.quantity,
      Total: item.total,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData); // Convert to sheet format
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BOQ Data");

    // Generate and download the Excel file
    XLSX.writeFile(wb, "BOQ_Data.xlsx");
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

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const second = parts[1]?.charAt(0).toUpperCase() || "";
    return first + second;
  };

  console.log("boqDetails", boqDetails);
  console.log("location", location);

  const getBOQDetails = async (boqId) => {
    console.log("boqId", typeof boqId, boqId);
    const response = await getBoqDetails(Number(boqId));
    if (response?.status === 204 || response?.status === 500) {
      toast.warning("No Data Found");
      return;
    }

    // normalize backend shapes: response.data.data || response.data
    const data = response?.data?.data ?? response?.data ?? null;
    if (!data) {
      toast.warning("No BOQ data returned from server");
      return;
    }
    console.log("response.data (normalized)", data);
    setboqDetails(data);

    // Extract approvers and map for display
    const approversMapped = (data.approvers || []).map((emp) => ({
      ...emp,
      label: emp.roleName,
      value: emp.roleName,
    }));
    setBoqApprovers(approversMapped);
    console.log("response:", response);
  };

  // NEW: fetch BOQ details when component mounts or boqId changes.
  // Also hydrate UI quickly from location.state.material if passed.
  useEffect(() => {
    // quick hydrate from navigation state to avoid empty screen
    const navMaterial = location.state?.material;
    if (navMaterial) {
      if (navMaterial.parent) setboqDetails(navMaterial.parent);
      else setboqDetails(navMaterial);
    }

    if (!boqId) {
      toast.error("BOQ ID is required to open this view.");
      setTimeout(() => navigate("/admin/engineermaterial"), 700);
      return;
    }

    let mounted = true;
    (async () => {
      setFetchError(null);
      setLoading(true);
      try {
        await getBOQDetails(boqId);
      } catch (err) {
        console.error("getBOQDetails error:", err);
        if (mounted) setFetchError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [boqId, location.state, navigate]);

  const isValidforApproval = () => {
    const path = location.pathname.split("/").slice(1);
    console.log("path", path);
    if (path.includes("purchasemanager")) {
      return true;
    }
  };
  const handleConvertToPO = () => {
    // Navigate to PO create page with boqDetails and ticket data
    if (boqDetails) {
      navigate("/purchasemanager/pocreateautogenrate", {
        state: {
          boqData: {
            ...boqDetails,
            boqCode: boqDetails.boqCode || `boq#${boqDetails.boqId}`, // Ensure boqCode is available
          },
          ticket: ticket,
        },
      });
    } else {
      toast.warning("No BOQ details available to convert");
    }
  };

  // render guards
  if (loading) {
    return <div className="text-center mt-5">Loading BOQ...</div>;
  }
  if (!boqDetails && !loading) {
    return <div className="text-center mt-5">No BOQ data to display.</div>;
  }

  return (
    <main className="page-engineer-dashboard d-flex">
      <div className="left-container w-100">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="border-1 breadcrumb-container pt-1 pb-4 d-flex align-items-center">
              <Link
                to=""
                className="text-decoration-none breadcrumb-item fs-16-500 text-dark-gray"
                style={{ cursor: "pointer" }}
              >
                BOQ
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
                Open BOQ
              </span>
            </div>
          </div>
        </div>
        <div className="row mt-4 align-items-center">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="text-black fs-5">BOQ ID</Form.Label>
                  <Form.Control
                    className="minh52px bg-white  fs-16-500 text-dark"
                    type="text"
                    placeholder="BOQ ID"
                    value={boqDetails?.boqCode}
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
                    className="minh52px bg-white fs-16-500 text-dark"
                    disabled
                    type="text"
                    placeholder="BOQ TITLE"
                    value={boqDetails?.boqName}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="text-black fs-5">Vendor</Form.Label>
                  <div className="d-flex align-items-center gap-2 position-relative mb-3">
                    <div
                      className="rounded-circle text-white d-flex align-items-center justify-content-center"
                      style={{
                        width: "20px",
                        height: "20px",
                        fontSize: "8px",
                        flexShrink: 0,
                        backgroundColor: getRandomColor(),
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {getInitials(boqDetails?.vendorName)}
                    </div>
                    <Form.Control
                      className="ps-5 minh52px bg-white  fs-16-500 text-dark"
                      type="text"
                      disabled
                      value={boqDetails?.vendorName}
                    />
                  </div>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="text-black fs-5">
                    Approved By
                  </Form.Label>

                  <Form.Control
                    className="text-black minh52px bg-white  fs-16-500 text-dark"
                    type="text"
                    disabled
                    value={boqApprovers.map((a) => a.roleName).join(", ")}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <Table bordered className="mt-3">
                    <thead className="table-light">
                      <tr>
                        <th style={{ textAlign: "center" }}>S. No</th>
                        <th style={{ textAlign: "center" }}>Item Name</th>
                        <th style={{ textAlign: "center" }}>Unit</th>
                        <th style={{ textAlign: "center" }}>Rate ₹</th>
                        <th style={{ textAlign: "center" }}>Quantity</th>
                        <th className="w200" style={{ textAlign: "center" }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boqDetails?.boqItems?.length > 0 &&
                        boqDetails.boqItems.map((item, index) => {
                          const sno = index + 1;
                          return (
                            <tr key={index}>
                              <td style={{ textAlign: "center" }}>{sno}</td>
                              <td style={{ textAlign: "center" }}>
                                {item.itemName}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.unit}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.price}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.quantity}
                              </td>
                              <td className="w200" style={{ textAlign: "center" }}>
                                {item.total}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
                <div
                  className="d-flex justify-content-between align-items-center text-white h40px ps-3 mt-4"
                  style={{ backgroundColor: "#ff6600" }}
                >
                  <div className="text-white">Total</div>
                  <div className="text-white w200 text-center">
                    {(boqDetails?.boqItems?.length > 0
                      ? boqDetails.boqItems.reduce(
                          (acc, item) => acc + (item.total || 0),
                          0
                        )
                      : boqData.reduce(
                          (acc, item) => acc + (item.total || 0),
                          0
                        )
                    ).toLocaleString()}
                  </div>
                </div>

                <div className="d-flex  justify-content-end align-items-center mt-5 gap-2">
                  {(() => {
                    const userRoleId = parseInt(
                      localStorage.getItem("userRoleId")
                    );
                    const isRole1 = userRoleId === 17;

                    return (
+                      isValidforApproval() && (
                        <button
                          className={`border-0 bg-primary d-flex fs-16-500 justify-content-center text-white d-flex align-items-center w180 border-radius-4 h48px text-white ${
                            isRole1 ? "d-block" : "d-none"
                          }`}
                          style={{ backgroundColor: "#ff6600" }}
                          onClick={handleConvertToPO}
                        >
                          <svg className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.3975 18.4336H7.26783C7.10639 18.4336 7.03722 18.2215 7.16365 18.124L8.99136 16.7193H19.4345C20.177 16.7193 20.7929 16.109 20.8073 15.3677L20.9243 9.34473C20.9377 8.65812 20.4349 8.06194 19.7548 7.96029C19.4276 7.91135 19.1212 8.1363 19.0722 8.46394C19.0232 8.79158 19.2492 9.09647 19.5772 9.14549C19.6624 9.15822 19.7254 9.23228 19.7237 9.31808L19.6067 15.3443C19.6049 15.437 19.5277 15.5194 19.4346 15.5194H9.26415L7.36953 7.32789L8.33115 7.46808C8.65901 7.51693 8.9647 7.28941 9.01378 6.96177C9.0628 6.63413 8.83673 6.32791 8.50875 6.27889L7.06838 6.06319L6.51775 3.92279C6.44965 3.65746 6.21034 3.47656 5.93618 3.47656H3.59847C3.26689 3.47656 2.99805 3.74527 2.99805 4.07656C2.99805 4.40784 3.26685 4.67655 3.59847 4.67655H5.47033L8.1149 15.8673L6.43024 17.1651C5.41389 17.9482 5.98551 19.6336 7.26779 19.6336H8.84398C8.77421 19.805 8.73589 20.0236 8.73589 20.2382C8.73589 21.2306 9.5491 22.0347 10.5487 22.0347C11.5483 22.0347 12.3615 21.2323 12.3615 20.2398C12.3615 20.0253 12.3232 19.805 12.2534 19.6336H15.5326C15.4628 19.805 15.4245 20.0236 15.4245 20.2382C15.4245 21.2306 16.2377 22.0347 17.2373 22.0347C18.2369 22.0347 19.0502 21.2323 19.0502 20.2398C19.0502 20.0253 19.0118 19.805 18.9421 19.6336H20.3976C20.7292 19.6336 20.998 19.3649 20.998 19.0336C20.998 18.7023 20.7292 18.4336 20.3975 18.4336ZM10.5487 20.8317C10.2112 20.8317 9.93674 20.5624 9.93674 20.2315C9.93674 19.9005 10.2113 19.6313 10.5487 19.6313C10.8861 19.6313 11.1607 19.9005 11.1607 20.2315C11.1607 20.5624 10.8861 20.8317 10.5487 20.8317ZM17.2373 20.8317C16.8998 20.8317 16.6253 20.5624 16.6253 20.2315C16.6253 19.9005 16.8999 19.6313 17.2373 19.6313C17.5748 19.6313 17.8493 19.9005 17.8493 20.2315C17.8493 20.5624 17.5747 20.8317 17.2373 20.8317Z" fill="white"/>
                          <path d="M13.978 10.6732C11.5734 10.6732 9.61719 8.72253 9.61719 6.32486C9.61719 3.92719 11.5734 1.97656 13.978 1.97656C16.3825 1.97656 18.3387 3.92719 18.3387 6.32486C18.3387 8.72253 16.3825 10.6732 13.978 10.6732ZM13.978 3.1763C12.2356 3.1763 10.818 4.58873 10.818 6.32486C10.818 8.06099 12.2356 9.47342 13.978 9.47342C15.7203 9.47342 17.1379 8.06099 17.1379 6.32486C17.1379 4.58873 15.7203 3.1763 13.978 3.1763Z" fill="white"/>
                          <path d="M12.9141 7.84617L11.9497 6.70168C11.7362 6.44826 11.7686 6.06984 12.0223 5.85645C12.2759 5.64307 12.6547 5.67551 12.8683 5.92901L13.3982 6.55785L15.0468 4.80612C15.274 4.56479 15.654 4.55309 15.8955 4.78002C16.1372 5.00695 16.1488 5.38661 15.9217 5.62794L13.8109 7.87077C13.6223 8.06924 13.1398 8.10854 12.9141 7.84617Z" fill="white"/>
                          </svg>
                          Convert To PO
                        </button>
                      )
                    );
                  })()}
                  <button className="border-0 bg-white d-flex fs-16-500 justify-content-center text-white d-flex align-items-center w200 border-radius-4 h48px text-dark-gray">
                    
                    <svg className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.87721 21H5.49488C3.81209 21 3 20.2214 3 18.614V5.38605C3 3.7786 3.82047 3 5.49488 3H8.87721C10.56 3 11.3721 3.7786 11.3721 5.38605V18.614C11.3721 20.2214 10.5516 21 8.87721 21ZM5.49488 4.25581C4.43163 4.25581 4.25581 4.54046 4.25581 5.38605V18.614C4.25581 19.4595 4.43163 19.7442 5.49488 19.7442H8.87721C9.94047 19.7442 10.1163 19.4595 10.1163 18.614V5.38605C10.1163 4.54046 9.94047 4.25581 8.87721 4.25581H5.49488ZM18.5051 15.1395H15.1228C13.44 15.1395 12.6279 14.3609 12.6279 12.7535V5.38605C12.6279 3.7786 13.4484 3 15.1228 3H18.5051C20.1879 3 21 3.7786 21 5.38605V12.7535C21 14.3609 20.1795 15.1395 18.5051 15.1395ZM15.1228 4.25581C14.0595 4.25581 13.8837 4.54046 13.8837 5.38605V12.7535C13.8837 13.5991 14.0595 13.8837 15.1228 13.8837H18.5051C19.5684 13.8837 19.7442 13.5991 19.7442 12.7535V5.38605C19.7442 4.54046 19.5684 4.25581 18.5051 4.25581H15.1228Z" fill="#606060"/>
                    </svg>

                    Go Approval
                  </button>
                  <button
                    className="border-0 bg-primary d-flex fs-16-500 justify-content-center text-white d-flex align-items-center w240 border-radius-4 h48px text-white "
                    onClick={handleDownloadExcel}
                  >
                    <svg className="me-2" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 15.575C12.3667 15.575 12.2417 15.5543 12.125 15.513C12.0083 15.4717 11.9 15.4007 11.8 15.3L8.2 11.7C8 11.5 7.904 11.2667 7.912 11C7.92 10.7333 8.016 10.5 8.2 10.3C8.4 10.1 8.63767 9.996 8.913 9.988C9.18833 9.98 9.42567 10.0757 9.625 10.275L11.5 12.15V5C11.5 4.71667 11.596 4.47934 11.788 4.288C11.98 4.09667 12.2173 4.00067 12.5 4C12.7827 3.99934 13.0203 4.09534 13.213 4.288C13.4057 4.48067 13.5013 4.718 13.5 5V12.15L15.375 10.275C15.575 10.075 15.8127 9.979 16.088 9.987C16.3633 9.995 16.6007 10.0993 16.8 10.3C16.9833 10.5 17.0793 10.7333 17.088 11C17.0967 11.2667 17.0007 11.5 16.8 11.7L13.2 15.3C13.1 15.4 12.9917 15.471 12.875 15.513C12.7583 15.555 12.6333 15.5757 12.5 15.575ZM6.5 20C5.95 20 5.47933 19.8043 5.088 19.413C4.69667 19.0217 4.50067 18.5507 4.5 18V16C4.5 15.7167 4.596 15.4793 4.788 15.288C4.98 15.0967 5.21733 15.0007 5.5 15C5.78267 14.9993 6.02033 15.0953 6.213 15.288C6.40567 15.4807 6.50133 15.718 6.5 16V18H18.5V16C18.5 15.7167 18.596 15.4793 18.788 15.288C18.98 15.0967 19.2173 15.0007 19.5 15C19.7827 14.9993 20.0203 15.0953 20.213 15.288C20.4057 15.4807 20.5013 15.718 20.5 16V18C20.5 18.55 20.3043 19.021 19.913 19.413C19.5217 19.805 19.0507 20.0007 18.5 20H6.5Z" fill="white"/>
                    </svg>
                    Download .xlsx
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MaterialViewScreen;
