import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";
import IconProjects from "../../../assets/images/menu/icon-projects.svg";
import IconDashboard from "../../../assets/images/menu/icon-dashboard.svg";
import IconSettings from "../../../assets/images/menu/icon-settings.svg";
import IconApprovals from "../../../assets/images/menu/icon-approvals.svg";
import IconChat from "../../../assets/images/menu/icon-chat.svg";
import IconVendor from "../../../assets/images/menu/icon-vendor.svg";
import Inventory from "../../../assets/images/menu/active/Inventory.svg";
import Boq from "../../../assets/images/menu/active/Boq.svg";
import CostEstimation from "../../../assets/images/menu/active/Cost-Estimation.svg";
import Vendor from "../../../assets/images/menu/active/Vendor.svg";

const AqssideNav = ({ onChange }) => {
  const [collaps, setCollaps] = useState(false);
  const [{ data: auth }] = useAuth();
  const [contactUsForm, setContactUsForm] = useState(false);
  const location = useLocation();

  const expandCollaps = (e) => {
    let showTitle = collaps ? !collaps : true;
    setCollaps(showTitle);
    onChange(showTitle);
  };

  const handleContactUs = () => {
    setContactUsForm(!contactUsForm);
  };
  const closeModal = () => {
    setContactUsForm(false);
  };

  // Check active states for each nav item including sub-routes
  const isDashboardActive = location.pathname.startsWith("/aqs/aqsdashboard");
  const isApprovalsActive = 
    location.pathname.startsWith("/aqs/aqsapprovals") ||
    location.pathname.startsWith("/aqs/aqsticketdetails");
  const isChatsActive = location.pathname.startsWith("/aqs/aqschats");
  const isMaterialActive = 
    location.pathname.startsWith("/aqs/aqsmaterial") ||
    location.pathname.startsWith("/aqs/materialview");
  const isInventoryActive = location.pathname.startsWith("/aqs/aqsinventory");
  const isBoqActive = 
    location.pathname.startsWith("/aqs/aqsboq") ||
    location.pathname.startsWith("/aqs/aqsboqcreate") ||
    location.pathname.startsWith("/aqs/aqsboqopen");
  const isCostEstimationActive = 
    location.pathname.startsWith("/aqs/aqscostestimation") ||
    location.pathname.startsWith("/aqs/aqscostestimationcreate") ||
    location.pathname.startsWith("/aqs/aqscostestimationopen");
  const isVendorActive = 
    location.pathname.startsWith("/aqs/aqsvendor") ||
    location.pathname.startsWith("/aqs/aqsvendordetails") ||
    location.pathname.startsWith("/aqs/aqsvendorpricedetails");
  const isSettingsActive = location.pathname.startsWith("/aqs/aqssetting");

  return (
    <>
      <div className="sidenav-content">
        <div className="sidenav-content__headings">
          <div
            className={
              !collaps
                ? "sidenav-content__headings-lists collaps"
                : "sidenav-content__headings-lists"
            }
          >
            {/* DASHBOARD */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Dashboard"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/aqs/aqsdashboard"
                className={`link-tag ${isDashboardActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/aqs/aqsdashboard')}
              >
                <img src={IconDashboard} alt={"Dashboard"} />
                <span>Dashboard</span>
                {collaps && "Dashboard"}
              </NavLink>
            </h5>

            {/* APPROVALS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Approvals"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/aqs/aqsapprovals"
                className={`link-tag ${isApprovalsActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/aqs/aqsapprovals') ||
                  location.pathname.startsWith('/aqs/aqsticketdetails')
                }
              >
                <img src={IconApprovals} alt={"Approvals"} />
                <span>Approvals</span>
                {collaps && "Approvals"}
              </NavLink>
            </h5>

            {/* CHATS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Chats"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/aqs/aqschats"
                className={`link-tag ${isChatsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/aqs/aqschats')}
              >
                <img src={IconChat} alt={"Chat"} className="d-block" />
                <span>Chats</span>
                {collaps && "Chats"}
              </NavLink>
            </h5>

            {/* MATERIALS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Materials"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/aqs/aqsmaterial"
                className={`link-tag ${isMaterialActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/aqs/aqsmaterial') ||
                  location.pathname.startsWith('/aqs/materialview')
                }
              >
                <img src={menu.IconMaterial} alt={"Materials"} className="d-block" />
                <span>Materials</span>
                {collaps && "Materials"}
              </NavLink>
            </h5>

            {/* INVENTORY */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Inventory"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/aqs/aqsinventory"
                className={`link-tag ${isInventoryActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/aqs/aqsinventory')}
              >
                <img src={Inventory} alt={"Inventory"} className="d-block" />
                <span>Inventory</span>
                {collaps && "Inventory"}
              </NavLink>
            </h5>

            {/* BOQ */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="BOQ"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/aqs/aqsboq"
                className={`link-tag ${isBoqActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/aqs/aqsboq') ||
                  location.pathname.startsWith('/aqs/aqsboqcreate') ||
                  location.pathname.startsWith('/aqs/aqsboqopen')
                }
              >
                <img src={Boq} alt={"BOQ"} className="d-block" />
                <span>BOQ</span>
                {collaps && "BOQ"}
              </NavLink>
            </h5>

            {/* COST ESTIMATION */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Cost Estimation"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/aqs/aqscostestimation"
                className={`link-tag ${isCostEstimationActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/aqs/aqscostestimation') ||
                  location.pathname.startsWith('/aqs/aqscostestimationcreate') ||
                  location.pathname.startsWith('/aqs/aqscostestimationopen')
                }
              >
                <img src={CostEstimation} alt={"Cost Estimation"} className="d-block" />
                <span>Cost Estimation</span>
                {collaps && "Cost Estimation"}
              </NavLink>
            </h5>

            {/* VENDORS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Vendors"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/aqs/aqsvendor"
                className={`link-tag ${isVendorActive ? "active" : ""}`}
                isActive={(match, location) => 
                  location.pathname.startsWith('/aqs/aqsvendor') ||
                  location.pathname.startsWith('/aqs/aqsvendordetails') ||
                  location.pathname.startsWith('/aqs/aqsvendorpricedetails')
                }
              >
                <img src={Vendor} alt={"Vendors"} className="d-block" />
                <span>Vendors</span>
                {collaps && "Vendors"}
              </NavLink>
            </h5>

            {/* SETTINGS */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Settings"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink
                to="/aqs/aqssetting"
                className={`link-tag ${isSettingsActive ? "active" : ""}`}
                isActive={(match, location) => location.pathname.startsWith('/aqs/aqssetting')}
              >
                <img src={IconSettings} alt={"Settings"} className="d-block" />
                <span>Settings</span>
                {collaps && "Settings"}
              </NavLink>
            </h5>
          </div>
        </div>

        <div className={!collaps ? "others__options collaps" : "others__options"}>
          <div className="setting__info">
            {auth.activeWorkSpace === 3 && (
              <p
                className="setting__info-contact"
                title="Contact us"
                disabled={auth?.details?.roleName == null ? true : false}
              >
                <button onClick={handleContactUs}>
                  <img src={menu.ContactUs} alt="Contact Us" />
                  {collaps && "Contact us"}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {contactUsForm && (
        <PopupModal
          closeModal={closeModal}
          headerText=""
          children={<ContactUsForm closePopup={closeModal} />}
          customClass={"contact-us-form"}
        />
      )}
    </>
  );
};

export default AqssideNav;