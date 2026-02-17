import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchBoqProjects,
  fetchApprovedBoqList,
  setApprovedBoqList,
} from "../../../store/slice/Aqs/aqsBoqSlice";

import { getApprovedBoqDetails } from "../../../services";

/* ---------------- BOQ CARD ---------------- */

const BOQCard = ({ boq, onCardClick }) => {
  const approversText =
    boq.approvers && boq.approvers.length > 0
      ? boq.approvers.map((a) => a.employeeName).join(", ")
      : "N/A";

  const formattedDate = boq.approvedAt
    ? new Date(boq.approvedAt)
        .toLocaleString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(",", " •")
    : "N/A";

  return (
    <div
      className="boq-card"
      onClick={onCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="boq-meta">
        <p>ID - {boq.boqCode || `BOQ#${boq.boqId}`}</p>
        <p className="date">{formattedDate}</p>
      </div>

      <h3 className="boq-title">{boq.boqName || "Untitled BOQ"}</h3>

      <div className="boq-content">
        <p>
          Approved by{" "}
          <span className="badge badge-blue">{approversText}</span>
        </p>

        <p className="boq-content">
          Project: {boq.projectName} | Vendor: {boq.vendorName || "N/A"}
        </p>

        {boq.boqItems && boq.boqItems.length > 0 && (
          <p className="boq-content">
            Items: {boq.boqItems.length} | Total:{" "}
            {boq.boqItems.reduce(
              (sum, item) => sum + (item.total || 0),
              0
            )}
          </p>
        )}
      </div>
    </div>
  );
};

/* ---------------- DASHBOARD ---------------- */

const BOQDashboard = () => {
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    projects,
    approvedBoqList,
    loading,
    boqListLoading,
    boqListError,
  } = useSelector((state) => state.aqsBoq);

  /* -------- FETCH PROJECTS -------- */
  useEffect(() => {
    dispatch(fetchBoqProjects());
  }, [dispatch]);

  /* -------- FETCH APPROVED BOQs -------- */
  useEffect(() => {
    if (!selectedSite) {
      dispatch(setApprovedBoqList([]));
      return;
    }

    const fetchData = async () => {
      try {
        const action = await dispatch(
          fetchApprovedBoqList(Number(selectedSite))
        );

        if (!fetchApprovedBoqList.fulfilled.match(action)) {
          console.error("Approved BOQ list API failed");
          dispatch(setApprovedBoqList([]));
          return;
        }

        const list = Array.isArray(action.payload)
          ? action.payload
          : [];

        if (list.length === 0) {
          dispatch(setApprovedBoqList([]));
          return;
        }

        const enrichedList = await Promise.all(
          list.map(async (boq) => {
            try {
              const details = await getApprovedBoqDetails(boq.boqId);
              return {
                ...boq,
                approvers: details?.approvers || [],
                boqItems: details?.boqItems || [],
              };
            } catch (err) {
              console.error("BOQ details fetch failed", err);
              return {
                ...boq,
                approvers: [],
                boqItems: [],
              };
            }
          })
        );

        dispatch(setApprovedBoqList(enrichedList));
      } catch (error) {
        console.error("Unexpected BOQ error:", error);
        dispatch(setApprovedBoqList([]));
      }
    };

    fetchData();
  }, [selectedSite, dispatch]);

  /* ---------------- UI ---------------- */

  return (
    <div className="page-boq container">
      {/* NAVBAR */}
      <div className="navbar">
        <select
          value={selectedSite}
          onChange={(e) => setSelectedSite(Number(e.target.value))}
        >
          <option value="">Select Project</option>
          {loading && <option>Loading...</option>}
          {!loading && projects?.length > 0 ? (
            projects.map((p) => (
              <option key={p.projectId} value={p.projectId}>
                {p.projectName}
              </option>
            ))
          ) : (
            !loading && <option disabled>No Projects Available</option>
          )}
        </select>

        <div className="actions">
          <button className="sort-button me-2">
            <span>Sort By</span>
          </button>

          <button
            className="create-boq-btn"
            onClick={() => navigate("/aqs/aqsboqcreate")}
          >
            + Create BOQ
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <h2>All BOQ’s</h2>

        <span className="date_Picker" onClick={() => setIsOpen(!isOpen)}>
          {selectedDate
            ? selectedDate.toLocaleDateString("en-GB")
            : "Pick a date"}
          <FaRegCalendarAlt className="calendar-icon" />
        </span>

        {isOpen && (
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setIsOpen(false);
            }}
            dateFormat="dd/MM/yyyy"
            inline
          />
        )}
      </div>

      {/* BOQ LIST */}
      <div className="boq-grid">
        {boqListLoading && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            Loading BOQs...
          </div>
        )}

        {boqListError && (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "red",
            }}
          >
            {boqListError}
          </div>
        )}

        {!boqListLoading &&
        !boqListError &&
        approvedBoqList.length > 0 ? (
          approvedBoqList.map((boq) => (
            <BOQCard
              key={boq.boqId}
              boq={boq}
              onCardClick={() =>
                navigate(`/aqs/aqsboqopen?boqId=${boq.boqId}`)
              }
            />
          ))
        ) : (
          !boqListLoading &&
          selectedSite && (
            <div
              style={{ gridColumn: "1 / -1", textAlign: "center" }}
            >
              No approved BOQs found
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BOQDashboard;
