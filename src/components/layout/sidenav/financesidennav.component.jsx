import { useState } from "react";

import { NavLink, useLocation } from "react-router-dom";
import * as menu from "../../../assets/images";
import useAuth from "../../../hooks/useAuth";
import PopupModal from "../../common/PopupModal";
import ContactUsForm from "../../common/ContactUsForm";
import Budget from "../../../assets/images/menu/active/Budget.svg";
import Invoice from "../../../assets/images/menu/active/Invoice.svg";
import Cashflow from "../../../assets/images/menu/active/CashFlow.svg";
import Vendor from "../../../assets/images/menu/active/Vendor&Po.svg";
import Tax from "../../../assets/images/menu/active/Tax.svg";

const FinancesideNav = ({ onChange }) => {
  const [collaps, setCollaps] = useState(false);
  const [{ data: auth }] = useAuth();
  const [contactUsForm, setContactUsForm] = useState(false);
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
  const location = useLocation();
  const isApprovelActive =
    location.pathname === "/finance/approvals" ||
    location.pathname.startsWith("/finance/ticket");
  const isReportActive =
    location.pathname === "/finance/report" ||
    location.pathname.startsWith("/finance/reportcreate");
  const isInvoiceDetailsActive =
    location.pathname === "/finance/invoice" ||
    location.pathname.startsWith("/finance/invoicedetails");
  const isBudgetDetailsActive =
    location.pathname === "/finance/budget" ||
    location.pathname === "/finance/budgetcreate" ||
    location.pathname.startsWith("/finance/budgetdetails");
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
              <NavLink to="/finance/dashboard" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconDashboard}
                      alt={"Kanban"}
                    />                    
                    <span>Dashboard</span>
                    {collaps && "Dashboard"}
                  </>
                  
                )}
              </NavLink>
            </h5>
            {/* TEAM */}
            <h5
              className="sidenav-content__headings-lists--title"
              title="Budget"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/finance/budget" className={`link-tag ${isBudgetDetailsActive ? "active" : ""}`}>
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={Budget}
                      alt={"Projects"}
                    />
                    <span>Budget</span>
                    {collaps && "Budget"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Approvals"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/finance/approvals" className={`link-tag ${isApprovelActive ? "active" : ""}`}>
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconApprovals}
                      alt={"Approval"}
                    />
                    <span>Approvals</span>
                    {collaps && "Approvals"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Chats"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/finance/chats" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconChat}
                      alt={"Chat"} className="d-block"
                    />
                    <span>Chats</span>
                    {collaps && "Chats"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Invoices"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/finance/invoice" className={`link-tag ${isInvoiceDetailsActive ? "active" : ""}`}>
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={Invoice}
                      alt={"Material"} className="d-block"
                    />
                    <span>Invoices</span>
                    {collaps && "Invoices"}
                  </>
                )}
              </NavLink>
            </h5>
  <h5
              className="sidenav-content__headings-lists--title"
              title="Cash Flow"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/finance/cashflow" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={Cashflow}
                      alt={"CashFlow"} className="d-block"
                    />
                    <span>Cash Flow</span>
                    {collaps && "Cash Flow"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Vendor & PO"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/finance/vendorandpo" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={Vendor}
                      alt={"Vendor"} className="d-block"
                    />
                    <span>Vendor & PO</span>
                    {collaps && "Vendor & PO"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Tax"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/finance/tax" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={Tax}
                      alt={"Report"} className="d-block"
                    />
                    <span>Tax</span>
                    {collaps && "Tax"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Report"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/finance/report" className={`link-tag ${isReportActive ? "active" : ""}`}>
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconReports}
                      alt={"Report"} className="d-block"
                    />
                    <span>Report</span>
                    {collaps && "Report"}
                  </>
                )}
              </NavLink>
            </h5>
            <h5
              className="sidenav-content__headings-lists--title"
              title="Settings"
              disabled={auth?.details?.roleName == null ? true : false}
            >
              <NavLink to="/finance/settings" className="link-tag">
                {({ isActive, isPending }) => (
                  <>
                    <img
                      src={menu.IconSettings}
                      alt={"Settings"}
                    />
                    <span>Settings</span>
                    {collaps && "Settings"}
                  </>
                )}
              </NavLink>
            </h5> 
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

export default FinancesideNav;
