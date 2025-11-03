import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import Header from "./header/header.component";
import SideNav from "./sidenav/sidenav.component";
import {
  getAuthToken,
  getAuthType,
  setAuthToken,
  setAuthType,
  setExpiresOn,
} from "../../utils/storage";
import useAuth from "../../hooks/useAuth";
import serverErrorIcon from "../../assets/images/icons8-server-error-66.png";

const UserLayout = ({ onLogout }) => {
  const [collapseNav, setCollapseNav] = useState(false);
  const [{ data }, { setAuth, getUserInfo }] = useAuth();

  // Check and set access token
  useEffect(() => {
    if (!data?.accessToken) {
      const storageData = localStorage.getItem("accessToken");
      if (storageData) {
        setAuth(storageData);
      }
    }
  }, [data?.accessToken, setAuth]);

  // Fetch user info if userBoardList is empty or undefined
  useEffect(() => {
    if (
      // data?.details?.userBoardList?.length === 0 ||
      data?.details?.userBoardList === undefined
    ) {
      getUserInfo();
    }
  }, [data?.details?.userBoardList, getUserInfo]);

  // Toggle navigation collapse
  const tempChange = (status) => {
    setCollapseNav(status);
  };

  // Redirect if no access token is available
  if (!data?.accessToken && !localStorage.getItem("accessToken")) {
    return <Navigate to="/" replace />;
  }

  return (
    <Fragment>
       <Header onLogout={onLogout} />
      <div className={`layout-container ${collapseNav ? "" : "left-sidebar"}`}>
        <SideNav onChange={tempChange} />
        <div className="body-content">
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </Fragment>
  );
};

export default UserLayout;
