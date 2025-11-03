import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/common/Breadcrumb";
import Accordion from "react-bootstrap/Accordion";
import { showToast } from "../../../store/slice/toast";
import { useDispatch } from "react-redux";
import {
  useRoleSetting,
  useDepartment,
  useRoles,
} from "../../../hooks/useMaster";
import useAuth from "../../../hooks/useAuth";
import SelectDropDown from "../../../components/common/SelectDropDown";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../../components/common/Table";
import ToggleSwitch from "../../../components/common/ToggleSwitch";

const ManageRoles = () => {
  // Get role permission settings
  const [
    roleSettingList,
    { getRoleSetting, updateRoleSetting },
  ] = useRoleSetting();

  // Create a copy of the initial data to reset later
  const [initialData, setInitialData] = useState(
    JSON.parse(JSON.stringify(roleSettingList.data))
  );

  const [data, setData] = useState();
  const [checkedStatus, setCheckedStatus] = useState([]);
  const [apiFlag, setApiFlag] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const dispatch = useDispatch();
  const [{ data: auth }] = useAuth();

  // Get department & role list data
  const [{ departmentList }, { getDepartmentData }] = useDepartment();
  const [rolesList] = useRoles();
  const [departmentType, setDepartmentType] = useState([]);
  const [roleType, setRoleType] = useState([]);
  const columnHelper = createColumnHelper();
  const [activeTab, setActiveTab] = useState(0);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [activeDepartmentIndex, setActiveDepartmentIndex] = useState(0);
  let updatedDataState = [];
  let updatedPermissionState = [];

  useEffect(() => {
    getRoleSetting();
    if (departmentList?.data?.length === 0) {
      getDepartmentData();
    }
  }, []);

  useEffect(() => {
    if (departmentList?.data?.length > 0) {
      setDepartmentType([departmentList?.data[0]]);
    }
  }, [departmentList]);

  useEffect(() => {
    if (rolesList?.data.length > 0) {
      setRoleType([rolesList?.data[0]]);
    }
  }, [rolesList]);

  /** RESET TO INITIAL STATE */
  const handleCancel = () => {
    setData(initialData);
    setCheckedStatus([]);
    updatedDataState = [];
    updatedPermissionState = [];
    // setActiveAccordion(0); // Optionally, close all accordions
    // setTempResult(apiResult);
  };

  const refreshData = () => {
    setCheckedStatus([]);
    updatedDataState = [];
    updatedPermissionState = [];
  }

  /** SAVE */
  const handleSave = () => {
    // update changes data
    if (updatedDataState.length > 0) {
      setData(updatedDataState);
    }
    if (updatedPermissionState.length > 0) {
      setCheckedStatus((prev) => [...prev, updatedPermissionState]);
    }

    let updatedCheckedStatus = checkedStatus.flat(); // Make a copy to avoid mutating state directly
    updatedPermissionState.forEach(permission => {
      const index = updatedCheckedStatus.findIndex(item => item.id === permission.id);
      if (index !== -1) {
        updatedCheckedStatus[index] = permission;
      } else {
        updatedCheckedStatus.push(permission);
      }
    });

    if (updatedCheckedStatus.length > 0) {
      setApiFlag(true);
      updateRoleSetting(updatedCheckedStatus).then((res) => {
        if (res.payload.status) {
          dispatch(
            showToast({
              message: "Roles Updated Successfully",
              variant: "success",
            })
          );
          getRoleSetting();
          refreshData();
        } else {
          dispatch(
            showToast({ message: res.payload.message, variant: "danger" })
          );
        }
        setApiFlag(false);
      });
    }
  };


  useEffect(() => {
    setData(roleSettingList.data);
    setInitialData(JSON.parse(JSON.stringify(roleSettingList.data)));
  }, [roleSettingList.data]);

  useEffect(() => {
  }, [apiFlag]);


  const handleChangeDepartmentList = (e) => {
    setDepartmentType(e);
    // LOAD DEPARTMENT WISE DATA'S
    if (data?.length > 0) {
      setActiveDepartmentIndex(
        data[activeRoleIndex].departments.findIndex((item) => item.DeptId == e[0]?.deptId)
      );
      // update changes data
      if (updatedDataState.length > 0) {
        setData(updatedDataState);
      }

      if (updatedPermissionState.length > 0) {
        setCheckedStatus((prev) => [...prev, updatedPermissionState]);
      }
    }
  };

  /** TANSTACK TABLE COLUMNS */
  const columns = [
    columnHelper.accessor("Name", {
      header: "Actions",
      cell: (info) => info.getValue(),
      canSort: true,
    }),
    columnHelper.accessor("IsChecked", {
      header: "Permissions",
      cell: (info) => <ToggleButton data={info?.row?.original} />,
    }),
  ];

  /** ON/OFF TOOGLE BUTTON */
  const ToggleButton = ({ data }) => {
    return (
      <>
        <ToggleSwitch
          toggled={data.IsChecked}
          onClick={() => handlePermissionChange(data.Id, !data.IsChecked)}
          status={roleType && roleType[0].roleId !== auth.details?.roleId ? 'enable' : 'disable'}
          disabled={roleType && roleType[0].roleId === auth.details?.roleId}
        />
      </>
    );
  };

  /** TO MAKE ACTIVE TAB PERMISSION VISIBILITY */
  const handleTabActive = (tab) => {
    setActiveTab(tab);

    // update changes data
    if (updatedDataState.length > 0) {
      setData(updatedDataState);
    }
    if (updatedPermissionState.length > 0) {
      setCheckedStatus((prev) => [...prev, updatedPermissionState]);
    }
  };

  /** USED TO CHANGE PERMISSION SETUP BASED ON ROLE TYPE SELECTION */
  const handleChangeRoleList = (e) => {
    setRoleType(e);
    if (data?.length > 0) {
      setActiveRoleIndex(
        data.findIndex((item) => item.RoleId == e[0]?.roleId)
      );
      // update changes data
      if (updatedDataState.length > 0) {
        setData(updatedDataState);
      }
      if (updatedPermissionState.length > 0) {
        setCheckedStatus((prev) => [...prev, updatedPermissionState]);
      }
    }
  };

  /** USED TO UPDATE PERMISSION RELATED CHANGES */
  const handlePermissionChange = (permissionId, isChecked) => {
    // Make a deep copy of the current data state
    let newData;
    if (updatedDataState.length > 0) {
      // Deep copy updatedDataState if it has data
      newData = JSON.parse(JSON.stringify(updatedDataState));
    } else {
      // Deep copy original data if updatedDataState is empty
      newData = JSON.parse(JSON.stringify(data));
    }

    // Find the correct role based on activeRoleIndex
    const activeRole = newData[activeRoleIndex];

    if (!activeRole) {
      console.error(`Role with index ${activeRoleIndex} not found.`);
      return data;
    }

    // Find the correct department based on activeDepartmentIndex and activeTab
    const activeDepartment = activeRole.departments[activeDepartmentIndex]

    if (!activeDepartment) {
      console.error(`Department with DeptId ${activeDepartmentIndex} not found.`);
      return data;
    }

    // Find the correct permissions based on activeTab
    const permissions = activeDepartment.permissions[activeTab]?.data;

    if (!permissions) {
      console.error(`Permissions for tab ${activeTab} not found.`);
      return data;
    }

    // Update the IsChecked property for the matching permissionId
    const updatedPermissions = permissions.map(detail => {
      if (detail.Id === permissionId) {
        return { ...detail, IsChecked: isChecked };
      }
      return detail;
    });

    // Check if permissionId already exists in updatedPermissionState
    const existingIndex = updatedPermissionState.findIndex(item => item.id === permissionId);

    if (existingIndex !== -1) {
      // If permissionId exists, update its status
      updatedPermissionState[existingIndex].status = isChecked;
    } else {
      // If permissionId does not exist, add it to updatedPermissionState
      updatedPermissionState.push({ id: permissionId, status: isChecked });
    }

    // Update the permissions array in newData
    activeDepartment.permissions[activeTab].data = updatedPermissions;

    updatedDataState = newData;

  };


  /** ROLE & DEPARTMENT WISE PERMISSION LISTING UI */
  const PermissionList = ({ roleId, deptId }) => {
    // Find the role object
    const role = data.find(role => role.RoleId === roleId);

    if (!role) {
      return <div>Role not found</div>;
    }
    // Find the department object within the role
    const department = role.departments[deptId];

    if (!department) {
      return <div>Department not found</div>;
    }

    // Extract the permissions
    const permissions = department.permissions;

    return (
      <>
        <div className="manage__roles__details__container-sidemenu">
          <ul>
            {permissions.map((val, index) => (
              <li
                key={val.id || index} // Use a unique key (e.g., val.id, or fallback to index)
                className={index === activeTab ? "active" : ""}
                onClick={() => handleTabActive(index)}
              >
                {val.Permission}
              </li>
            ))}
          </ul>

        </div>
        <div className="border-radius-0 manage__roles__details__container-form">
          {rolesList && departmentList && roleType && roleType.length > 0 && departmentType && (
            <Table
              columns={columns}
              columnData={role.departments[deptId].permissions[activeTab]?.data || []}
              getDatas={() => { }}
              onSortingChange={() => { }}
              sorting={[]}
              setSorting={[]}
              className="manage__roles__details__container-form-table"
            />
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="manage manage__roles page-rolesmanagement">
        <div className="manage__roles">
          <div className="manage__roles__details">
            <div className="manage__roles__details__top">
              <div className="manage__roles__details__top__title">
                <h4 className="mb-0">Permissions</h4>
                {/* <p>List of roles</p> */}
              </div>
              <div className="manage__roles__details__top__dropdown">
                <div className="manage__roles__details__top__dropdown-role">
                  <label> Role </label>
                  {rolesList && (
                    <SelectDropDown
                      multi={false}
                      options={rolesList?.data}
                      labelField="roleName"
                      valueField="roleId"
                      values={roleType ? roleType : []}
                      // optionType="radio"
                      searchable={false}
                      onChange={handleChangeRoleList}
                      placeholder={"Select Role"}
                      className="role_list"
                      nestedList={false}
                      disabled={rolesList?.data.length === 0 ? true : false}
                    />
                  )}
                </div>
                <div className="manage__roles__details__top__dropdown-department">
                  <label> Department </label>
                  {departmentList && (
                    <SelectDropDown
                      multi={false}
                      options={departmentList?.data}
                      labelField="deptName"
                      valueField="deptId"
                      values={departmentType ? departmentType : []}
                      optionType="radio"
                      searchable={false}
                      onChange={handleChangeDepartmentList}
                      placeholder={"Select Department"}
                      className="department_list"
                      nestedList={false}
                      disabled={
                        departmentList?.data?.length === 0 ? true : false
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="manage__roles__details__container">
              {roleType && roleType.length > 0 && (
                <PermissionList roleId={roleType[0].roleId} deptId={activeDepartmentIndex} />
              )}
            </div>
            <div className="manage__roles__details-footer">
              <button type="button" className="cancel" onClick={handleCancel}>
                {" "}
                Reset{" "}
              </button>
              <button type="submit" className="submit" onClick={handleSave}>
                {" "}
                Save{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageRoles;
