import profile from "../../../assets/images/Profile-pic.png";
import logout from "../../../assets/images/Logout.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken, setAuthType, setExpiresOn } from "../../../utils/storage";
import { useTranslation } from "react-i18next";
import { userInfoAction } from "../../../store/actions";
import { authSelector } from "../../../store/slice/auth";

export const GeneralSettings = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const popupRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: user, loading, error } = useSelector(authSelector);

  useEffect(() => {
    dispatch(userInfoAction());
  }, [dispatch]);

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

  const userLogout = () => {
  localStorage.clear();
  window.location.href = "/login"; 
};

  return (
    <>
      <div className="profile-details">
        <h2>Admin Profile</h2>

        {loading && <p>Loading vendor information...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && user?.details && (
          <>
            <div className="d-flex align-items-center mb-4">
              <img src={profile} alt="profile" className="img-profile" />
              <div>
                <h4 className="mb-1">{user.details.firstName || "Vendor Name"}</h4>
                <p>{user.details.roleName || "Vendor"}</p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4.06L10.87 9.95C10.94 10.01 11.06 10.01 11.13 9.95L18 4.06M2.2 1H19.8C20.46 1 21 1.54 21 2.2V14.6C21 15.92 19.92 17 18.6 17H3.4C2.08 17 1 15.92 1 14.6V2.2C1 1.54 1.54 1 2.2 1Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h6 className="title-3 mb-0 ms-2">{user.details.email || "N/A"}</h6>
            </div>

            <div className="d-flex align-items-center mt-4">
              <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.84 6.85616C4.63 10.75 7.81 13.84 11.76 15.52L12.53 15.86C13.01 16.07 13.54 16.11 14.03 15.98C14.53 15.84 14.97 15.54 15.27 15.12L16.55 13.36L14.28 11.22L13.05 12.44C12.95 12.58 12.8 12.67 12.64 12.71C12.47 12.75 12.3 12.74 12.14 12.67C9.18 11.33 6.81 8.96 5.47 6L6.88 4.23L5.13 1.64L3.01 2.88C2.59 3.18 2.29 3.62 2.15 4.12C2.02 4.63 2.06 5.16 2.28 5.63L2.84 6.85616Z" fill="black"/>
              </svg>
              <h6 className="title-3 mb-0 ms-2">{user.details.phone || "+91 --- --- ----"}</h6>
            </div>
          </>
        )}
      </div>

      <Link to="/" className="btn btn-logut" onClick={userLogout}>
        <img className="me-3" src={logout} alt="" />
        {t("layout.header.logout")}
      </Link>
    </>
  );
};

export default GeneralSettings;
