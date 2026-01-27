import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../../store/slice/toast";
import {
  setAuthToken,
  getAuthToken,
  setExpiresOn,
  getAuthType,
  getDeepLinkURL,
  setDeepLinkURL,
} from "../../utils/storage";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { PRODUCT_LOGO } from "../../assets/images";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { PiBuildingOffice } from "react-icons/pi";
import "../../styles/components/css/login.css";
import { setJustLoggedIn } from "../../services/api";

export default function Login({ onLoginSuccess }) {
  const [{ data }, { getAuth, setAuth, getUserInfo }] = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Login mode state (employee or vendor)
  const [loginMode, setLoginMode] = useState("employee");

  // Form state
  const [activeForm, setActiveForm] = useState("login");
  const [inProgress, setInProgress] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    type: "", // Will be set to "vendor" for vendor login
  });
  const [errorMsg, setErrorMsg] = useState({});

  const inputRef = useRef(null);

  // Toggle between employee and vendor login
  const toggleLoginMode = () => {
    const newMode = loginMode === "employee" ? "vendor" : "employee";
    setLoginMode(newMode);

    // Reset form data when switching modes
    setFormData((prev) => ({
      ...prev,
      username: "",
      password: "",
      type: newMode === "vendor" ? "vendor" : "", // Set type for vendor login
    }));

    // Clear any error messages
    setErrorMsg({});
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMsg((prev) => ({
        ...prev,
        username: !formData.username,
        password: !formData.password,
      }));
      return;
    }

    setInProgress(true);
    try {
      const payload = {
        username: formData.username,
        password: formData.password,
        Email: formData.username,
      };

      if (loginMode === "vendor") {
        payload.type = "vendor";
      }

      // Set flag before making login request
      setJustLoggedIn(true);

      const response = await getAuth(payload);

      if (response?.payload?.token) {
        // Store authentication token
        setAuthToken(response.payload.token);
        localStorage.setItem("accessToken", response.payload.token);
        localStorage.setItem("refreshToken", response.payload.refreshToken);

        // Store token expiration time if available
        if (response.payload.expiresIn || response.payload.expires_in) {
          const expiresIn =
            response.payload.expiresIn || response.payload.expires_in;
          const expirationTime = Date.now() + expiresIn * 1000;
          localStorage.setItem("tokenExpiration", expirationTime.toString());

          // If we have setExpiresOn function, use it too
          if (setExpiresOn) {
            setExpiresOn(expirationTime.toString());
          }
        }

        setAuth(response.payload.token);

        // Fetch user details
        const userInfoResponse = await getUserInfo();

        console.log("User info response:", userInfoResponse); // Debug log

        // Check if user details exist in the response
        if (userInfoResponse?.payload?.details) {
          const userDetails = userInfoResponse.payload.details;

          // For debugging, let's log what we received
          console.log("User details:", userDetails);

          // Set default role if not present
          // Assuming role hierarchy: SuperAdmin > Admin > User
          const userData = {
            ...userDetails,
            roleName:
              userDetails.roleName ||
              (loginMode === "vendor" ? "Vendor" : "ManagingDirector"),
            roleId:
              userDetails.roleId || (loginMode === "vendor" ? "Vendor" : "1"),
            roleCode:
              userDetails.roleCode ||
              (loginMode === "vendor" ? "VENDOR" : "MD"),
            token: response.payload.token,
            isVendor: loginMode === "vendor", // Flag to identify vendor users
          };
          localStorage.setItem("userData", JSON.stringify(userData));

          console.log("Processed user data:", userData); // Debug log

          // Store user data and role information
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("userRole", userData.roleName);
          localStorage.setItem("userRoleId", userData.roleId);
          localStorage.setItem("userRoleCode", userData.roleCode);

          // For vendor users, set a special identifier
          if (loginMode === "vendor") {
            localStorage.setItem("userType", "vendor");
          } else {
            localStorage.removeItem("userType"); // Remove if exists from previous login
          }

          // Call onLoginSuccess callback
          if (onLoginSuccess) {
            onLoginSuccess(userData);
          }
        } else if (userInfoResponse?.payload) {
          // If details are not in the expected structure, try to use the payload directly
          const userData = {
            ...userInfoResponse.payload,
            roleName:
              userInfoResponse.payload.roleName ||
              userInfoResponse.payload.role_name ||
              (loginMode === "vendor" ? "Vendor" : "ManagingDirector"),
            roleId:
              userInfoResponse.payload.roleId ||
              userInfoResponse.payload.role_id ||
              (loginMode === "vendor" ? "Vendor" : "1"),
            roleCode:
              userInfoResponse.payload.roleCode ||
              (loginMode === "vendor" ? "VENDOR" : "MD"),
            isVendor: loginMode === "vendor",
          };

          console.log("Using payload as user data:", userData); // Debug log

          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("userRole", userData.roleName);
          localStorage.setItem("userRoleId", userData.roleId);
          localStorage.setItem("userRoleCode", userData.roleCode);

          if (loginMode === "vendor") {
            localStorage.setItem("userType", "vendor");
          } else {
            localStorage.removeItem("userType");
          }

          if (onLoginSuccess) {
            onLoginSuccess(userData);
          }
        } else {
          // If we have a token but no user details, create a default user
          // This is a fallback to prevent login failures
          console.log("No user details found, using default values"); // Debug log

          const defaultUserData = {
            username: formData.username,
            email: formData.username, // Store email too
            roleName: loginMode === "vendor" ? "Vendor" : "ManagingDirector",
            roleId: loginMode === "vendor" ? "Vendor" : "1",
            roleCode: loginMode === "vendor" ? "VENDOR" : "MD",
            isVendor: loginMode === "vendor",
          };

          localStorage.setItem("userData", JSON.stringify(defaultUserData));
          localStorage.setItem("userRole", defaultUserData.roleName);
          localStorage.setItem("userRoleId", defaultUserData.roleId);
          localStorage.setItem("userRoleCode", defaultUserData.roleCode);

          if (loginMode === "vendor") {
            localStorage.setItem("userType", "vendor");
          } else {
            localStorage.removeItem("userType");
          }

          if (onLoginSuccess) {
            onLoginSuccess(defaultUserData);
          }

          // Show a warning that we're using default values
          dispatch(
            showToast({
              message:
                "Logged in with default permissions. Some features may be limited.",
              variant: "warning",
            })
          );
        }
      } else {
        throw new Error(response?.message || t("login.error.invalid"));
      }
    } catch (error) {
      console.error("Login Error:", error);
      dispatch(showToast({ message: error.message, variant: "danger" }));
    } finally {
      setInProgress(false);
    }
  };

  // Check if already authenticated on component mount
  useEffect(() => {
    // We're intentionally not doing anything here now
    // Token validation is handled at the App level
  }, []);

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  // Update form field to show it as email input
  const updateUsername = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      username: value,
      email: value, // Update both fields to ensure consistency
    }));
  };

  return (
    <main className="main-login">
      <div className="login-page">
        <div className="login-form">
          <div className="login-form-container">
            {activeForm === "login" && (
              <div className="login-form-container-button">
                <div className="user-flex">
                  <img
                    className="mb-5"
                    src={PRODUCT_LOGO}
                    alt="Agent Board Icon"
                    style={{ width: "230px", height: "52px" }}
                  />

                  <div className="user-row">
                    <label>{t("Email Id")} </label>
                    <input
                      type="email"
                      value={formData.username}
                      onChange={updateUsername}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter your email"
                    />
                    {errorMsg.username && (
                      <p className="errorMsg">{t("login.error.email")}</p>
                    )}
                  </div>
                  <div
                    className="user-row mb-0"
                    style={{ position: "relative" }}
                  >
                    <label>{t("login.label.password")}</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      onKeyDown={handleKeyDown}
                      style={{ paddingRight: "40px", marginBottom: "10px" }}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "40%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#BBBBBB",
                      }}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                    {errorMsg.password && (
                      <p className="errorMsg">
                        {t("please enter valid password.")}
                      </p>
                    )}
                  </div>
                  <div className="forgot-password">
                    <Link className="text-decoration-none forgot">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <button
                  className="login-form-container-button-common btn-login my-4"
                  onClick={(e) => handleLogin(e)}
                  disabled={inProgress}
                >
                  {inProgress ? (
                    t("login.inprogress")
                  ) : (
                    <span className="d-flex text-white fs-14-600 align-items-center justify-content-center">
                      {loginMode === "employee" ? (
                        <>{t("login.with_eurolandID")}</>
                      ) : (
                        <>Login</>
                      )}
                    </span>
                  )}
                </button>

                {/* Toggle button to switch between employee and vendor login with icons */}
                <button
                  className="h48px login-form-container-button-common  btn-switch-role btn-toggle-login my-2"
                  onClick={toggleLoginMode}
                  type="button"
                >
                  {loginMode === "employee" ? (
                    <span className="d-flex align-items-center justify-content-center">
                      Switch to Vendor Login
                    </span>
                  ) : (
                    <span className="d-flex align-items-center justify-content-center">
                      Switch to Employee Login
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
