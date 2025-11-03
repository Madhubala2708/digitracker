import React, { Fragment, useEffect, useRef, useState } from "react";
import notificationIcon from "../../../assets/images/notification.svg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {
  setAuthToken,
  setExpiresOn,
  setAuthType,
} from "../../../utils/storage";
import { useNotification } from "../../../hooks/useNotification";
import appConstants from "../../../constant/common";
import LogoAvatarShowLetter from "../../common/LogoAvatarShowLetter";
import {
  setActiveDepartmentPermissionAction,
  setActiveWorkSpaceAction,
  setDefaultWorkSpaceAction,
  setActiveBoardAction,
} from "../../../store/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  appLogo,
  PRODUCT_LOGO,
  workspaceSwitch,
  notification_icon,
  searchIcon
} from "../../../assets/images";
import { useBoard } from "../../../hooks/useKanban";
import { useTranslation } from "react-i18next";
import { updateDefaultWorkspace } from "../../../services";
import { showToast } from "../../../store/slice/toast";
import { clearFilterList } from "../../../store/slice/kanban";

const Header = ({ onLogout }) => {
  const [
    boardData,
    { getAllBoard, getPeriodicUpdatesBoardInfo, getAgencyBoard },
  ] = useBoard();
  const [showInfo, setShowInfo] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [showWPSwitch, setShowWPSwitch] = useState(false);
  const [{ data }, { setAuth, getUserInfo }] = useAuth();
  const notifyItemRef = useRef(null);
  const popupRef = useRef(null);
  const workspaceItemRef = useRef(null);
  const location = useLocation();

  const userStatus = [
    { id: 1, name: "Available" },
    { id: 2, name: "Busy" },
  ];

  const [currentStatus, setCurrentStatus] = useState();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const isVendor = localStorage.getItem("userType") === "vendor";

  // Function to get first letter of name
  const getFirstLetter = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  // Get the username based on user type
  const getUserName = () => {
    return isVendor 
      ? userData.vendorName || "Vendor Name"
      : data.details?.firstName
        ? data.details?.firstName
        : "User Name";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ((popupRef.current && !popupRef.current.contains(event.target)) ||
          popupRef.current == null) &&
        event.target.id !== "show_more_boards"
      ) {
        setShowInfo(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (workspaceItemRef.current &&
          !workspaceItemRef.current.contains(event.target)) ||
        (workspaceItemRef.current == null &&
          event.target.id !== "workspaceSwitch")
      ) {
        setShowWPSwitch(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (notifyItemRef.current &&
          !notifyItemRef.current.contains(event.target)) ||
        (popupRef.current == null && event.target.id !== "show_notify")
      ) {
        setShowNotify(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    if (data?.details?.workspaceDTO && !isVendor) {
      let defaultBoard;
      if (data?.activeWorkSpace && data?.activeDepartmentPermission) {
        let boardList;
        if (data.activeWorkSpace === 1) {
          boardList = data?.details?.userBoardList;
        } else if (data.activeWorkSpace === 3) {
          boardList = data?.details?.agencyboardsDTO;
        } else {
          boardList = data?.details?.updatesboardsDTO;
        }
        defaultBoard =
          (boardList &&
            (boardList?.find(
              (board) =>
                data?.activeDepartmentPermission == board.deptCode &&
                data?.activeBoard == board.boardId
            ) ||
              boardList?.[0])) ||
          [];
        dispatch(setActiveDepartmentPermissionAction(defaultBoard?.deptCode));
        dispatch(setActiveBoardAction(defaultBoard?.boardId));
        dispatch(setActiveWorkSpaceAction(data?.activeWorkSpace));
      } else {
        const defaultWorkSpace =
          data?.details?.workspaceDTO?.find(
            (w) => w.is_workspace_default === true
          ) || data?.details?.workspaceDTO?.[0];
        let boardList;
        if (defaultWorkSpace.work_space_id === 1) {
          boardList = data?.details?.userBoardList;
        } else if (defaultWorkSpace.work_space_id === 3) {
          boardList = data?.details?.agencyboardsDTO;
        } else {
          boardList = data?.details?.updatesboardsDTO;
        }
        defaultBoard =
          (boardList &&
            (boardList?.find((board) =>
              defaultWorkSpace.work_space_id === 1
                ? board.isDefault
                : board.is_board_default
            ) ||
              boardList?.[0])) ||
          [];

        dispatch(setActiveDepartmentPermissionAction(defaultBoard?.deptCode));
        dispatch(setActiveBoardAction(defaultBoard?.boardId));
        dispatch(setActiveWorkSpaceAction(defaultWorkSpace.work_space_id));
      }
    }
  }, [data.details?.workspaceDTO]);

  const handleMenuItem = (e) => {
    const showPopup = showInfo ? !showInfo : true;
    if (e.type === "click" || e.key === "Enter") {
      setShowInfo(showPopup);
    }
  };

  const handleReset = () => {
    setShowInfo(false);
    setShowNotify(false);
    setShowWPSwitch(false);
  };

  const userLogout = () => {
    setShowInfo(false);
    setShowNotify(false);
    onLogout(); 
  };

  const handleNotify = (e) => {
    const showPopup = showNotify ? !showNotify : true;
    if (e.type === "click" || e.key === "Enter") {
      setShowNotify(showPopup);
    }
  };

  const handleWorkSpaceChange = (res) => {
    if (
      res.work_space_id === data?.activeWorkSpace &&
      location.pathname === "/home"
    )
      return;
    let boardList;
    if (res.work_space_id === 1) {
      boardList = data?.details?.userBoardList;
    } else if (res.work_space_id === 3) {
      boardList = data?.details?.agencyboardsDTO;
    } else {
      boardList = data?.details?.updatesboardsDTO;
    }
    const defaultBoard =
      boardList?.find((board) =>
        res.work_space_id === 1 ? board.isDefault : board.is_board_default
      ) || boardList?.[0];

    if (defaultBoard && defaultBoard.boardId) {
      const fetchFunction =
        res.work_space_id === 1
          ? getAllBoard
          : res.work_space_id === 3
            ? getAgencyBoard
            : getPeriodicUpdatesBoardInfo;

      (res.work_space_id === 2 ? fetchFunction({ boardId: defaultBoard.boardId, sortBy: "" }) : fetchFunction(defaultBoard.boardId)).then(() => {
        dispatch(setActiveDepartmentPermissionAction(defaultBoard.deptCode));
        dispatch(setActiveBoardAction(defaultBoard.boardId));
        dispatch(setActiveWorkSpaceAction(res.work_space_id));
        navigate(`/home`);
        dispatch(clearFilterList());
        handleReset();
      });
    }
  };

  const handleUserStatus = (status) => {
    setCurrentStatus(status);
  };

  const handleDefaultWorkSpace = (data) => {
    try {
      const requestData = {
        workspaceId: data.work_space_id,
      };
      const response = updateDefaultWorkspace(requestData);
      response.then((res) => {
        if (res.data.status) {
          dispatch(setDefaultWorkSpaceAction(data));
          dispatch(
            showToast({ message: res.data.message, variant: "success" })
          );
        } else {
          dispatch(showToast({ message: res.data.message, variant: "danger" }));
        }
      });
    } catch (error) {
      dispatch(showToast({ message: error, variant: "danger" }));
    }
  };

  const showWorkspaceSwitch = (e) => {
    const showPopup = showWPSwitch ? !showWPSwitch : true;
    if (e.type === "click" || e.key === "Enter") {
      setShowWPSwitch(showPopup);
    }
  };

  return (
    <>
      {/* Bootstrap CSS for the profile letter avatar */}
      <style>
        {`
          .profile-letter-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #007bff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 18px;
            margin-right: 10px;
          }
          
          .profile-letter-avatar-lg {
            width: 60px;
            height: 60px;
            font-size: 24px;
          }
          
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background-color: #f8f9fa;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .header-content__options {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          
          .user-info {
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          
          .user-info__popup {
            position: absolute;
            right: 20px;
            top: 60px;
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 15px;
            width: 250px;
            z-index: 1000;
          }
          
          .user-info__popup-profile {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 15px;
          }
          
          .workspace-list-popup {
            position: absolute;
            right: 0;
            top: 40px;
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 15px;
            width: 250px;
            z-index: 1000;
          }
        `}
      </style>
      
      <div className="header-content">
        <div className="header-content__headings">
          <div className="header-content__logo-title">
            <div className="header-content__logo">
              {/* <img src={appLogo} alt="orion-logo" /> */}
              {/* <span className="logo-name">Ccss</span> */}
            </div>

            <div className="header-content__logo-agent">
              <img className="css1" src={PRODUCT_LOGO} alt="Agent Board Icon" />
            </div>
          </div>
        </div>
        <div className="position-relative">
          <img src={searchIcon} alt="" className="search-icon" />
          <input class="header-search-input" placeholder="Search....." autocomplete="off"></input>
        </div>
        <div className="header-content__options">
          <div className="notification" ref={notifyItemRef} id="show_notify">
            <img src={notification_icon} className="icon-notification" alt="" />
          </div>
          
          {/* Hide workspace switch for vendors */}
          {!isVendor && data?.details?.user_type === null && data?.details?.workspaceDTO?.length > 1 && (
            <>
              <div
                className="workspaceSwitch"
                id="workspaceSwitch"
                ref={workspaceItemRef}
              >
                <img
                  className="workspaceSwitch-img"
                  src={workspaceSwitch}
                  alt={"Switching Workspace"}
                  onClick={(e) => showWorkspaceSwitch(e)}
                  title="Switching Workspace"
                />
                {showWPSwitch && data?.details?.workspaceDTO?.length > 1 && (
                  <div className="workspace-list-popup">
                    <h4 className="workspaceSwitch-heading">Switch Workspace</h4>
                    <ul className="workspace-list">
                      {data.details?.workspaceDTO?.map((list, i) => {
                        return (
                          <li key={i}>
                            <div
                              className={`workspace ${data?.activeWorkSpace == list?.work_space_id
                                  ? "active"
                                  : ""
                                }`}
                              onClick={() => handleWorkSpaceChange(list)}
                            >
                              <span className="name">{list.name}</span>
                              <span
                                className={`${(list.is_workspace_default &&
                                    "icon-star-active") ||
                                  "icon-ir-medium"
                                  } `}
                                title={`${(list.is_workspace_default &&
                                    "Default workspace") ||
                                  "Mark as default"
                                  } `}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDefaultWorkSpace(list);
                                }}
                              ></span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="header-user-info" ref={popupRef}>
            <div className="user-info" onClick={handleMenuItem}>
              <div className="profile-letter-avatar">
                {getFirstLetter(getUserName())}
              </div>
              <div
                className={`user-info__details ${(isVendor ? userData.vendorName : data.details?.firstName) ? (isVendor ? userData.vendorName : data.details?.displayName) : "none"
                  }`}
              >
                <p className="user-info__details-name" placeholder="User Name">
                  {getUserName()}
                </p>
                <p className="user-info__details-role" placeholder="Role">
                  {isVendor
                    ? userData.roleName || "Vendor"
                    : data.details?.roleName 
                      ? data.details?.roleName 
                      : "Guest"}
                </p>
              </div>
            </div>
            {showInfo && (
              <div className="user-info__popup">
                <div className="user-info__popup-profile">
                  <div className="profile-letter-avatar profile-letter-avatar-lg">
                    {getFirstLetter(getUserName())}
                  </div>
                  <p
                    className="user-info__popup-profile-name"
                    placeholder="User Name"
                  >
                    {getUserName()}
                  </p>
                </div>
                <div className="user-info__popup-menu" id="show_more_boards">
                  <NavLink
                    // to="/settings"
                    className="user-info__popup-menu-settings"
                    onClick={handleReset}
                  >
                    {" "}
                    {t("layout.header.user_settings")}{" "}
                  </NavLink>
                </div>
                <div className="user-info__popup-logout">
                  <button
                    className="user-info__popup-logout-btn"
                    style={{
                      width: "180px",
                      height: "48px",
                      border: "1px solid black",
                      borderRadius: "4px",
                      padding: "10px",
                      gap: "10px",
                      backgroundColor: "#FF0000",
                      color: "#FFFFFF",
                      fontSize: "20px",
                      fontWeight: "500"
                    }}
                    onClick={userLogout}
                  >
                    {t("layout.header.logout")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;