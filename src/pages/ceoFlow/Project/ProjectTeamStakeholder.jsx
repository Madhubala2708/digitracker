"use client"

import { useEffect, useState, useRef } from "react"
import { Form, Row, Col, Button, Spinner, Modal } from "react-bootstrap"
import { useRoleBasedEmp } from "../../../hooks/Ceo/useRoleBasedEmp"
import { useProject } from "../../../hooks/Ceo/useCeoProject"
import Swal from "sweetalert2"
import {
  createProjectFinanceApprovedAction,
  createProjectTeamAction,
  getProjectDetailsAction,
} from "../../../store/actions/Ceo/ceoprojectAction"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { profile } from "../../../assets/images"
import { getAllEmployeesByRolesAction } from "../../../store/actions/Ceo/RoleBasedEmpAction"
import { getEmployees } from "../../../store/actions/hr/createemployeaction"

const ProjectTeamStakeholder = ({
  formData,
  setFormData,
  searchFilters,
  dropdownVisible,
  handleSearchFilterChange,
  toggleDropdown,
  handleSelectItem,
  handleRemoveItem,
  onNext,
  fetchroles,
  createTicket,
  createNotify,
}) => {
  const {
    employees: roleBasedEmployees,
    vendors,
    subcontractors,
    loading,
    fetchAllEmployees,
    fetchVendorsAndSubcontractors,
  } = useRoleBasedEmp()

  const { createProjectteams, createProjectFinanceApprove, loading: projectActionLoading } = useProject()

  const [dataLoaded, setDataLoaded] = useState(false)
  const [localDropdownVisible, setLocalDropdownVisible] = useState({})
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [permissionData, setPermissionData] = useState([])
  const isSubmitting = useRef(false)
  const [filteredRoles, setFilteredRoles] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [localProjectId, setLocalProjectId] = useState(null)
  const [employeesData, setEmployeesData] = useState({})
  const [hrEmployees, setHrEmployees] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const projectId = localStorage.getItem("projectId")
  // Get all employees for the dropdown
  const [allEmployees, setAllEmployees] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await dispatch(getEmployees())
        console.log("All employee data:", res.payload)

        if (res.payload && Array.isArray(res.payload)) {
          setAllEmployees(res.payload)
        }
      } catch (err) {
        console.error("Error fetching employees:", err)
      }
    }

    fetchEmployees()
  }, [dispatch])

  // Enhanced fetchProjectTeamDetails function with better data handling
  const fetchProjectTeamDetails = async (projectId) => {
    try {
      const result = await dispatch(getProjectDetailsAction(projectId))

      if (result?.payload?.value) {
        const projectData = result.payload.value
        const team = projectData.team_details || []
        const finance = projectData.finance_approval_data || []
        const vendorDetails = projectData.vendor_details || []
        const subcontractorDetails = projectData.subcontractor_details || []

        console.log("Project Data:", projectData)

        const roleToFieldMap = {
          "Project Manager": "projectManager",
          "Assistant Project Manager": "assistantProjectManager",
          "Lead Engineer": "leadEngineer",
          "Site Supervisor": "siteSupervisor",
          "Quantity Surveyor": "qs", // Fixed mapping
          "Assistant Quantity Surveyor": "assistantQs", // Fixed mapping
          QS: "qs", // Alternative mapping
          "Assistant QS": "assistantQs", // Alternative mapping
          "Site Engineer": "siteEngineer",
          Engineer: "engineer",
          Designer: "designer",
        }

        const updatedFormData = {
          projectManager: [],
          assistantProjectManager: [],
          leadEngineer: [],
          siteSupervisor: [],
          qs: [],
          assistantQs: [],
          siteEngineer: [],
          engineer: [],
          designer: [],
          vendors: [],
          subcontractors: [],
        }

        // Process team data with better role matching
        if (Array.isArray(team) && team.length > 0) {
          team.forEach((member) => {
            const field = roleToFieldMap[member.role]
            if (field && member.emp_id && member.emp_name) {
              updatedFormData[field].push({
                id: member.emp_id,
                name: member.emp_name,
                empId: member.emp_id,
              })
            }
          })
        }

        // Process vendor data
        if (Array.isArray(vendorDetails) && vendorDetails.length > 0) {
          vendorDetails.forEach((vendor) => {
            if (vendor.vendor_id && vendor.vendor_name) {
              updatedFormData.vendors.push({
                id: vendor.vendor_id,
                name: vendor.vendor_name,
                vendorName: vendor.vendor_name,
              })
            }
          })
        }

        // Process subcontractor data
        if (Array.isArray(subcontractorDetails) && subcontractorDetails.length > 0) {
          subcontractorDetails.forEach((subcontractor) => {
            if (subcontractor.subcontractor_id && subcontractor.subcontractor_name) {
              updatedFormData.subcontractors.push({
                id: subcontractor.subcontractor_id,
                name: subcontractor.subcontractor_name,
                subcontractorName: subcontractor.subcontractor_name,
              })
            }
          })
        }

        setFormData((prev) => ({
          ...prev,
          ...updatedFormData,
        }))

        // Enhanced finance approval data processing with priority roles and additional roles
        if (Array.isArray(finance) && finance.length > 0) {
          // Define the 6 priority roles in the order you want them displayed
          const priorityRoles = [
            "Managing Director",
            "Directors",
            "CEO",
            "General Manager (Technology)",
            "General Manager (Operation)",
            "Head Finance",
          ]

          // Map all finance approval data from backend - use role_name directly from finance data
          const allPermissionData = finance.map((item, index) => {
            return {
              id: index + 1,
              role: item.role_name || "N/A", // Use role_name from finance data, not team data
              employee: item.emp_name || "N/A",
              employeeId: item.emp_id || 0,
              amount: item.amount || 0,
              roleCode: item.role_code ? item.role_code.trim() : "",
              roleId: item.role_id || 0,
            }
          })

          // Separate priority roles and additional roles
          const priorityRoleData = []
          const additionalRoleData = []

          // First, add priority roles in the defined order
          priorityRoles.forEach((priorityRole) => {
            const roleData = allPermissionData.filter((item) => item.role === priorityRole)
            priorityRoleData.push(...roleData)
          })

          // Then, add any additional roles that are not in the priority list
          allPermissionData.forEach((item) => {
            if (!priorityRoles.includes(item.role)) {
              additionalRoleData.push(item)
            }
          })

          // Combine priority roles first, then additional roles
          const finalPermissionData = [...priorityRoleData, ...additionalRoleData]

          // Re-assign sequential IDs
          const reorderedPermissionData = finalPermissionData.map((item, index) => ({
            ...item,
            id: index + 1,
          }))

          setPermissionData(reorderedPermissionData)
        } else {
          setPermissionData([])
        }
      }
    } catch (error) {
      console.error("Error fetching project team details:", error)
      setPermissionData([])
    }
  }

  useEffect(() => {
    const id = formData.projectId || Number.parseInt(localStorage.getItem("projectId"))
    if (id) {
      fetchProjectTeamDetails(id)
    }
  }, [])

  // Enhanced fetch all employees by roles with better error handling
  useEffect(() => {
    dispatch(getAllEmployeesByRolesAction())
      .unwrap()
      .then((response) => {
        console.log("API Response:", response)
        if (response && response.employeesByRole) {
          setEmployeesData(response.employeesByRole)

          const mappedEmployees = {}

          // Enhanced mapping with null checks
          const roleMapping = [
            { apiRole: "Project Manager", stateKey: "projectManagerEmployees" },
            {
              apiRole: "Assistant Project Manager",
              stateKey: "assistantProjectManagerEmployees",
            },
            { apiRole: "Lead Engineer", stateKey: "leadEngineerEmployees" },
            { apiRole: "Site Supervisor", stateKey: "siteSupervisorEmployees" },
            { apiRole: "QS", stateKey: "qsEmployees" },
            { apiRole: "Quantity Surveyor", stateKey: "qsEmployees" }, // Alternative mapping
            { apiRole: "Assistant QS", stateKey: "assistantQsEmployees" },
            {
              apiRole: "Assistant Quantity Surveyor",
              stateKey: "assistantQsEmployees",
            }, // Alternative mapping
            { apiRole: "Site Engineer", stateKey: "siteEngineerEmployees" },
            { apiRole: "Engineer", stateKey: "engineerEmployees" },
            { apiRole: "Designer", stateKey: "designerEmployees" },
          ]

          roleMapping.forEach(({ apiRole, stateKey }) => {
            if (response.employeesByRole[apiRole]) {
              mappedEmployees[stateKey] = response.employeesByRole[apiRole].map((emp) => ({
                empId: emp.empId,
                employeeName: emp.employeeName,
                isAllocated: emp.isAllocated,
              }))
            }
          })

          // Store HR employees for modal
          if (response.employeesByRole["HR"]) {
            setHrEmployees(response.employeesByRole["HR"])
          }

          // Update roleBasedEmployees with mapped data
          Object.keys(mappedEmployees).forEach((key) => {
            roleBasedEmployees[key] = mappedEmployees[key] || []
          })
        }
      })
      .catch((error) => {
        console.error("API Error:", error)
      })
  }, [dispatch])

  const updateFinanceApprovalWithSelectedTeam = () => {
    // If we already have data from backend, don't override it
    // This function should only add new data when there's no existing data
    if (permissionData.length > 0) {
      return
    }

    const newPermissionData = []
    let idCounter = 1

    // Define the 6 priority roles - ONLY these will be shown when creating new project
    const priorityRoles = [
      "Managing Director",
      "Directors",
      "CEO",
      "General Manager (Technology)",
      "General Manager (Operation)",
      "Head Finance",
    ]

    // Only add the 6 priority roles when creating new data
    priorityRoles.forEach((role) => {
      if (employeesData && employeesData[role]) {
        employeesData[role].forEach((emp) => {
          newPermissionData.push({
            id: idCounter++,
            role: role,
            employee: emp.employeeName,
            employeeId: emp.empId,
            amount: existingAmountMap[emp.empId] || 0,
            roleCode: emp.rolecode || "",
          })
        })
      }
    })

    // Do NOT add additional roles when creating new data
    // Additional roles will only be shown if they exist in backend data

    setPermissionData(newPermissionData)
  }

  // Enhanced data loading with vendors and subcontractors
  useEffect(() => {
    if (!dataLoaded) {
      const loadAllData = async () => {
        try {
          await Promise.all([fetchAllEmployees(), fetchVendorsAndSubcontractors()])
          setDataLoaded(true)
        } catch (error) {
          console.error("Error loading role data:", error)
          setErrorMessage("Failed to load employee data. Please refresh and try again.")
        }
      }
      loadAllData()
    }
  }, [dataLoaded])

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const getRoleNameById = (id) => {
    const role = filteredRoles.find((r) => r.roleId === Number.parseInt(id))
    return role?.roleName || null
  }

  useEffect(() => {
    const getFilteredRoles = async () => {
      try {
        const { success, data } = await fetchroles()
        if (success && data) {
          const filtered = data.filter((r) => r.roleName === "HR")
          setFilteredRoles(filtered)
        }
      } catch (error) {
        console.error("Error fetching roles:", error)
      }
    }

    getFilteredRoles()
  }, [])

  // Create existing amount map with null safety
  const existingAmountMap = {}
  if (Array.isArray(permissionData)) {
    permissionData.forEach((item) => {
      if (item && item.employeeId) {
        existingAmountMap[item.employeeId] = item.amount || 0
      }
    })
  }

  const handleTicketSubmission = async () => {
    const projectId = formData.projectId || localProjectId || Number.parseInt(localStorage.getItem("projectId"))
    const createdBy = Number.parseInt(localStorage.getItem("userRoleId"))

    if (selectedUsers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Employees Selected",
        text: "Please select at least one employee to assign the ticket.",
      })
      return
    }

    const ticketPayload = {
      projectId,
      ticketType: "permissionFinanceApproval",
      assignTo: selectedUsers,
      createdBy: createdBy,
    }

    try {
      const ticketResponse = await createTicket(ticketPayload)
      const ticketId = ticketResponse?.data?.data?.ticketId
      const projectName = ticketResponse?.data?.data?.projectName

      if (!ticketId) {
        throw new Error("Ticket ID not returned from createTicket")
      }

      const notificationPayload = {
        empId: selectedUsers,
        notificationType: "Resource_Allocation",
        sourceEntityId: ticketId,
        message: `We would like you to Allocate Resources for our ${projectName} Project with consideration to all criteria's required.Kindly provide your confirmation at the earliest to avoid any delays in the process.`,
      }

      await createNotify(notificationPayload)

      Swal.fire({
        icon: "success",
        title: "Tickets and Notifications Created",
        text: "Tickets and notifications successfully submitted.",
        timer: 1500,
        showConfirmButton: false,
      })

      setShowModal(false)
    } catch (err) {
      console.error("Failed to create ticket or notification:", err)
    }
  }

  const getRoleMapping = (position) => {
    const roleMapping = {
      projectManager: "Project Manager",
      assistantProjectManager: "Assistant Project Manager",
      leadEngineer: "Lead Engineer",
      siteSupervisor: "Site Supervisor",
      qs: "QS",
      assistantQs: "Assistant QS",
      siteEngineer: "Site Engineer",
      engineer: "Engineer",
      designer: "Designer",
    }
    return roleMapping[position] || position
  }

  const handleToggleDropdown = (field) => {
    setLocalDropdownVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
    if (toggleDropdown) {
      toggleDropdown(field)
    }
  }

  const closeAllDropdowns = () => setLocalDropdownVisible({})

  const handleAmountChange = (id, value) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, "")
    setPermissionData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, amount: sanitizedValue } : item)),
    )
  }

  const handleSubmit = async () => {
    if (isSubmitting.current) return
    isSubmitting.current = true

    setSubmitLoading(true)
    setErrorMessage(null)

    const projectId = Number(localStorage.getItem("projectId") || formData.projectId)
    if (!projectId) {
      setErrorMessage("Missing Project ID. Please create a project first.")
      setSubmitLoading(false)
      isSubmitting.current = false
      return
    }

    try {
      const teamData = {
        projectId,
        pmId: (formData.projectManager || []).map((emp) => Number(emp.empId || emp.id)),
        apmId: (formData.assistantProjectManager || []).map((emp) => Number(emp.empId || emp.id)),
        LeadEnggId: (formData.leadEngineer || []).map((emp) => Number(emp.empId || emp.id)),
        SiteSupervisorId: (formData.siteSupervisor || []).map((emp) => Number(emp.empId || emp.id)),
        qsId: (formData.qs || []).map((emp) => Number(emp.empId || emp.id)),
        aqsId: (formData.assistantQs || []).map((emp) => Number(emp.empId || emp.id)),
        SiteEnggId: (formData.siteEngineer || []).map((emp) => Number(emp.empId || emp.id)),
        EnggId: (formData.engineer || []).map((emp) => Number(emp.empId || emp.id)),
        designerId: (formData.designer || []).map((emp) => Number(emp.empId || emp.id)),
        vendorId: (formData.vendors || []).map((emp) => Number(emp.id)),
        subcontractorId: (formData.subcontractors || []).map((emp) => Number(emp.id)),
      }

      const financeData = {
        projectId,
        projectPermissionFinanceApprovalList: (permissionData || [])
          .filter((emp) => emp && emp.employeeId)
          .map((emp) => ({
            empId: Number(emp.employeeId),
            amount: Number.parseFloat(emp.amount || 0),
          })),
      }

      const [teamResult, financeResult] = await Promise.all([
        dispatch(createProjectTeamAction(teamData)),
        dispatch(createProjectFinanceApprovedAction(financeData)),
      ])

      const teamSuccess = teamResult?.payload?.success
      const financeSuccess = financeResult?.payload?.success

      const teamMessage = teamResult?.payload?.message
      const financeMessage = financeResult?.payload?.message

      if (!teamSuccess || !financeSuccess) {
        throw new Error("One or more operations failed")
      }

      const combinedMessage =
        teamMessage && financeMessage
          ? `${teamMessage} & ${financeMessage}`
          : teamMessage || financeMessage || "Project team and finance data saved successfully"

      await Swal.fire({
        title: "Success!",
        text: combinedMessage,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      })

      const nextPath = `/ceo/project/timelinemilestone/${projectId}`
      if (onNext) {
        onNext()
      } else {
        navigate(nextPath, {
          state: { projectId },
          replace: true,
        })
      }
    } catch (err) {
      console.error("Submit error:", err)
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setSubmitLoading(false)
      isSubmitting.current = false
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".multi-select-container")) {
        closeAllDropdowns()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (dataLoaded && employeesData) {
      updateFinanceApprovalWithSelectedTeam()
    }
  }, [formData.projectManager, dataLoaded, employeesData])
  function getInitials(name) {
    if (!name) return ""
    const words = name.trim().split(" ")
    const first = words[0]?.charAt(0).toUpperCase() || ""
    const second = words[1]?.charAt(0).toUpperCase() || ""
    return first + second
  }

  function getRandomColor() {
    const colors = [
      "#007bff",
      "#28a745",
      "#dc3545",
      "#ffc107",
      "#17a2b8",
      "#6610f2",
      "#fd7e14",
      "#6f42c1",
      "#20c997",
      "#e83e8c",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Enhanced getEmployeesByField with better vendor/subcontractor handling
  const getEmployeesByField = (field) => {
    switch (field) {
      case "projectManager":
        return (
          roleBasedEmployees.projectManagerEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
            value: emp.isAllocated,
          })) || []
        )
      case "assistantProjectManager":
        return (
          roleBasedEmployees.assistantProjectManagerEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
            value: emp.isAllocated,
          })) || []
        )
      case "leadEngineer":
        return (
          roleBasedEmployees.leadEngineerEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
            value: emp.isAllocated,
          })) || []
        )
      case "siteSupervisor":
        return (
          roleBasedEmployees.siteSupervisorEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
            value: emp.isAllocated,
          })) || []
        )
      case "qs":
        return (
          roleBasedEmployees.qsEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
            value: emp.isAllocated,
          })) || []
        )
      case "assistantQs":
        return (
          roleBasedEmployees.assistantQsEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
            value: emp.isAllocated,
          })) || []
        )
      case "siteEngineer":
        return (
          roleBasedEmployees.siteEngineerEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
            value: emp.isAllocated,
          })) || []
        )
      case "engineer":
        return (
          roleBasedEmployees.engineerEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
            value: emp.isAllocated,
          })) || []
        )
      case "designer":
        return (
          roleBasedEmployees.designerEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
            value: emp.isAllocated,
          })) || []
        )
      case "vendors":
        return (
          vendors?.map((v) => ({
            id: v.id || v.vendor_id,
            name: v.vendorName || v.vendor_name || v.name,
            value: false,
          })) || []
        )
      case "subcontractors":
        return (
          subcontractors?.map((s) => ({
            id: s.id || s.subcontractor_id,
            name: s.subcontractorName || s.subcontractor_name || s.name,
            value: false,
          })) || []
        )
      default:
        return []
    }
  }

  const handleLocalSelectItem = (field, item) => {
    setFormData((prevState) => {
      const currentSelection = prevState[field] || []
      const isSelected = currentSelection.some(
        (selected) =>
          (selected.id && String(selected.id) === String(item.id)) ||
          (selected.empId && String(selected.empId) === String(item.id)),
      )
      const updatedSelection = isSelected ? currentSelection : [...currentSelection, item]

      return {
        ...prevState,
        [field]: updatedSelection,
      }
    })

    setLocalDropdownVisible((prev) => ({
      ...prev,
      [field]: true,
    }))

    // If this is a Project Manager selection, update the finance approvals table
    if (field === "projectManager") {
      updateFinanceApprovalWithSelectedTeam()
    }
  }
  const handleAddRow = () => {
    const newRow = {
      id: Date.now(), // Unique ID
      role: "",
      employee: "",
      employeeId: null,
      amount: "",
      showEmployeeDropdown: false,
      employeesList: allEmployees, // Use all employees from getEmployees()
    }
    setPermissionData([...permissionData, newRow])
  }

  const isItemSelected = (field, itemId) => {
    return (formData[field] || []).some(
      (item) =>
        (item.id && String(item.id) === String(itemId)) || (item.empId && String(item.empId) === String(itemId)),
    )
  }

  const getFilteredItems = (field) => {
    const itemsList = getEmployeesByField(field)
    if (!searchFilters[field]) return itemsList
    return itemsList.filter((item) => item.name.toLowerCase().includes(searchFilters[field].toLowerCase()))
  }

  const MultiSelect = ({ field, label }) => {
    const inputRef = useRef(null)
    const isDropdownVisible = localDropdownVisible[field] || false

    useEffect(() => {
      if (isDropdownVisible && inputRef.current) {
        inputRef.current.focus()
      }
    }, [isDropdownVisible])

    const handleItemClick = (item) => {
      handleLocalSelectItem(field, item)
      handleSearchFilterChange({ target: { value: "" } }, field)
      handleToggleDropdown(field)
    }

    return (
      <Form.Group style={{ position: "relative", marginBottom: "15px" }}>
        <Form.Label className="text-dark">{label}</Form.Label>
        <div className="multi-select-container" style={{ position: "relative" }}>
          <div className="selected-items mb-2">
            {(formData[field] || []).map((item) => (
              <div key={item.id || item.empId} className="selected-item d-inline-block bg-white p-1 me-2 mb-1 rounded">
                <span>{item.name}</span>
                <button
                  type="button"
                  className="remove-btn ms-1 border-0 bg-transparent text-danger"
                  onClick={() => handleRemoveItem(field, item.id || item.empId)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <Form.Control
            ref={inputRef}
            type="text"
            className="dropdown-toggle w-100"
            placeholder={formData[field] && formData[field].length > 0 ? "" : loading ? "Loading..." : "Search..."}
            value={searchFilters[field] || ""}
            onChange={(e) => handleSearchFilterChange(e, field)}
            onClick={() => handleToggleDropdown(field)}
            disabled={loading}
            autoComplete="off"
          />

          {isDropdownVisible && (
            <div className="dropdown-menu show w-100" style={{ maxHeight: "200px", overflowY: "auto", zIndex: "9999" }}>
              {getFilteredItems(field).length > 0 ? (
                getFilteredItems(field).map((item) => (
                  <div
                    key={item.id}
                    className={`dropdown-item ${isItemSelected(field, item.id) ? "active" : ""}`}
                    onClick={() => handleItemClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex justify-content-between align-items-center text-capitalize">
                      <span>{item.name}</span>
                      <span
                        className={`allocate-status small fs-12-400 ms-2 ${
                          item.value ? "text-danger" : "text-success"
                        }`}
                      >
                        {item.value ? "Allocated" : "Not Allocated"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="dropdown-item text-muted">No results found</div>
              )}
            </div>
          )}
        </div>
      </Form.Group>
    )
  }

  const [employeeDropdownIndex, setEmployeeDropdownIndex] = useState(null)

  const toggleEmployeeDropdown = (index) => {
    setPermissionData((prevData) => {
      return prevData.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            showEmployeeDropdown: !item.showEmployeeDropdown,
            employeesList: allEmployees, // Use all employees instead of just HR
          }
        } else {
          return { ...item, showEmployeeDropdown: false }
        }
      })
    })
  }

  const handleEmployeeSelect = (index, employee) => {
    setPermissionData((prevData) => {
      return prevData.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            employee: employee.firstName, // Use firstName instead of employeeName
            employeeId: employee.empId,
            role: employee.roleName, // Use roleName instead of role
            showEmployeeDropdown: false,
          }
        } else {
          return item
        }
      })
    })
  }

  return (
    <Form>
      <h4 className="mb-4">Project Team & Stakeholder Assignment</h4>

      {loading && (
        <div className="text-center mb-4">
          <Spinner animation="border" role="status" />
          <p>Loading team data...</p>
        </div>
      )}

      {!loading && (
        <>
          {errorMessage && (
            <div className="alert alert-danger mb-3">{errorMessage}</div>
          )}

          <Row>
            <Col md={6} lg={4}>
              <MultiSelect
                field="projectManager"
                label="Project Manager"
                required
              />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect
                field="assistantProjectManager"
                label="Assistant Project Manager"
                required
              />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="leadEngineer" label="Lead Engineer" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="siteSupervisor" label="Site Supervisor" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="qs" label="QS" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="assistantQs" label="Assistant QS" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="siteEngineer" label="Site Engineer" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="engineer" label="Engineer" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="designer" label="Designer" />
            </Col>
            <Col md={6} lg={4} className="vendors-multiselect">
              <MultiSelect field="vendors" label="Vendors" />
            </Col>
            <Col md={6} lg={4} className="subcontractors-multiselect">
              <MultiSelect field="subcontractors" label="Subcontractors" />
            </Col>
          </Row>

          <h5 className="mt-4 mb-3 fs-28-700">
            Permission and Finance Approval
          </h5>
          <table className="tbl w-100 tbl-permission">
            <thead>
              <tr>
                <th className="w48 text-center fs-18-500 text-dark">S.No</th>
                <th className="text-center  fs-18-500 text-dark">Role</th>
                <th className="text-center fs-18-500 text-dark">Employee</th>
                <th className="text-center fs-18-500 text-dark">
                  Amount Limit (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {permissionData && permissionData.length > 0 ? (
                permissionData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-center">{index + 1}</td>

                    {/* Role Field - Auto-populated from employee selection */}
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Role will auto-populate"
                        value={item.role}
                        onChange={(e) => {
                          const updated = [...permissionData];
                          updated[index].role = e.target.value;
                          setPermissionData(updated);
                        }}
                        readOnly={item.employeeId !== null} // Make readonly if employee is selected
                      />
                    </td>

                    {/* Employee Field with Dropdown */}
                    <td className="position-relative">
                      <Form.Control
                        type="text"
                        placeholder="Select Employee"
                        value={item.employee}
                        onChange={(e) => {
                          const updated = [...permissionData];
                          updated[index].employee = e.target.value;
                          setPermissionData(updated);
                        }}
                        onClick={() => toggleEmployeeDropdown(index)}
                      />

                      {/* Employee Dropdown */}
                      {item.showEmployeeDropdown && item.employeesList && (
                        <div
                          className="dropdown-menu show w-100 position-absolute"
                          style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                            zIndex: "9999",
                          }}
                        >
                          {item.employeesList.map((emp) => (
                            <div
                              key={emp.empId}
                              className="dropdown-item"
                              onClick={() => handleEmployeeSelect(index, emp)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <span>{emp.firstName}</span>
                                <span className="small fs-12-400 ms-2 text-muted">
                                  {emp.roleName || "No Role"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Amount Field */}
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="%"
                        value={item.amount}
                        onChange={(e) => {
                          const updated = [...permissionData];
                          updated[index].amount = e.target.value;
                          setPermissionData(updated);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No permission data. Click 'Add Row' to begin.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
      <div className="text-end mt-3">
        <Button
          className="text-primary bg-transparent border-0 fs-16-500 me-0 ms-auto"
          onClick={handleAddRow}
        >
          + Add Row
        </Button>
      </div>
      <div
        className="d-flex justify-content-end align-items-end"
        style={{ minHeight: "80px", marginTop: "20px" }}
      >
        <Button
          className="btn-primary btn fs-14-600 bg-transparent text-primary border-0 border-radius-2"
          onClick={async () => {
            const roleKey = "HR";
            const { success, data } = await fetchAllEmployees();

            if (
              !success ||
              !data?.employeesByRole ||
              !data.employeesByRole[roleKey] ||
              data.employeesByRole[roleKey].length === 0
            ) {
              Swal.fire({
                icon: "info",
                title: "No Employees",
                text: `No employees found in HR team.`,
              });
              return;
            }

            setHrEmployees(data.employeesByRole[roleKey]);
            setShowModal(true);
          }}
        >
          <svg
            className="me-2"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3.33464C9.22645 3.33464 8.48459 3.64193 7.93761 4.18891C7.39062 4.73589 7.08333 5.47775 7.08333 6.2513C7.08333 7.02485 7.39062 7.76672 7.93761 8.3137C8.48459 8.86068 9.22645 9.16797 10 9.16797C10.7735 9.16797 11.5154 8.86068 12.0624 8.3137C12.6094 7.76672 12.9167 7.02485 12.9167 6.2513C12.9167 5.47775 12.6094 4.73589 12.0624 4.18891C11.5154 3.64193 10.7735 3.33464 10 3.33464ZM5.41667 6.2513C5.41667 5.03573 5.89955 3.86994 6.75909 3.0104C7.61864 2.15085 8.78442 1.66797 10 1.66797C11.2156 1.66797 12.3814 2.15085 13.2409 3.0104C14.1004 3.86994 14.5833 5.03573 14.5833 6.2513C14.5833 7.46688 14.1004 8.63267 13.2409 9.49221C12.3814 10.3518 11.2156 10.8346 10 10.8346C8.78442 10.8346 7.61864 10.3518 6.75909 9.49221C5.89955 8.63267 5.41667 7.46688 5.41667 6.2513ZM2.5 15.8346C2.5 14.7296 2.93899 13.6698 3.72039 12.8884C4.50179 12.107 5.5616 11.668 6.66667 11.668H13.3333C14.4384 11.668 15.4982 12.107 16.2796 12.8884C17.061 13.6698 17.5 14.7296 17.5 15.8346V18.3346H2.5V15.8346ZM6.66667 13.3346C6.00363 13.3346 5.36774 13.598 4.8989 14.0669C4.43006 14.5357 4.16667 15.1716 4.16667 15.8346V16.668H15.8333V15.8346C15.8333 15.1716 15.5699 14.5357 15.1011 14.0669C14.6323 13.598 13.9964 13.3346 13.3333 13.3346H6.66667Z"
              fill="#FF6F00"
            />
          </svg>
          Send To
        </Button>
        <Button
          className="btn-primary btn fs-14-600 bg-primary border-0 border-radius-2"
          onClick={async () => {
            if (!submitLoading) {
              await handleSubmit();
              if (onNext) {
                onNext();
              }
            }
          }}
          disabled={submitLoading}
        >
          {submitLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Submitting...
            </>
          ) : (
            "Next >"
          )}
        </Button>
      </div>

      <Modal
        show={showModal}
        className="model-approvel-send"
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Body>
          {hrEmployees.map((user) => (
            <div key={user.empId} className="d-flex align-items-center mb-3">
              <Form.Check
                type="checkbox"
                className="me-3"
                checked={selectedUsers.includes(user.empId)}
                onChange={() => handleCheckboxChange(user.empId)}
              />
              <img
                src={profile || "/placeholder.svg"}
                alt={`${user.employeeName}'s profile`}
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <p className="mb-0 fs-22-700 text-dark">
                {user.employeeName}
                <span className="d-block fs-14-400 text-dark-grey">
                  {user.role}
                </span>
              </p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className={`d-flex justify-content-center ${
              selectedUsers.length > 0 ? "btn-allow" : "btn-not-allow"
            }`}
            onClick={handleTicketSubmission}
            disabled={selectedUsers.length === 0}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}

export default ProjectTeamStakeholder