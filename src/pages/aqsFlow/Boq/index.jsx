import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoqProjects } from "../../../store/slice/Aqs/aqsBoqSlice";

const boqData = [
  { id: "BOQ00024", title: "BOQ’s for resource", approvedBy: "HR", roleClass: "badge-red", content: "Lorem ipsum dolor sit amet..." },
  { id: "BOQ00025", title: "BOQ’s for materials", approvedBy: "Quantity Surveyor", roleClass: "badge-blue", content: "Lorem ipsum dolor sit amet..." },
  // ... (keep your full static data)
];

const BOQCard = ({ boq, onCardClick }) => (
  <div className="boq-card" onClick={onCardClick} style={{ cursor: "pointer" }}>
    <div className="boq-meta">
      <p>ID - {boq.id}</p>
      <p className="date">02:54 pm • 14/05/2024</p>
    </div>
    <h3 className="boq-title">{boq.title}</h3>
    <div className="boq-content">
      <p>
        Approved by <span className={`badge ${boq.roleClass}`}>{boq.approvedBy}</span>
      </p>
      <p className="boq-content">{boq.content}</p>
    </div>
  </div>
);

const BOQDashboard = () => {
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projects, loading, error } = useSelector((state) => state.aqsBoq);

  // Fetch API data on mount
  useEffect(() => {
    dispatch(fetchBoqProjects());
  }, [dispatch]);

  return (
    <div className="page-boq container">
      {/* Navbar */}
      <div className="navbar">
        <select
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-filter-left"
              viewBox="0 0 16 16"
            >
              <path d="M2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z" />
            </svg>
            <span className="ms-1">Sort By</span>
          </button>

          <button
            className="create-boq-btn"
            onClick={() => navigate("/aqs/aqsboqcreate")}
          >
            + Create BOQ
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters">
        <h2>All BOQ’s</h2>
        <span className="date_Picker" onClick={() => setIsOpen(!isOpen)}>
          {selectedDate ? selectedDate.toLocaleDateString("en-GB") : "Pick a date"}
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

      {/* BOQ List */}
      <div className="boq-grid">
        {boqData.map((boq, index) => (
          <BOQCard
            key={index}
            boq={boq}
            onCardClick={() => navigate("/aqs/aqsboqopen")}
          />
        ))}
      </div>
    </div>
  );
};

export default BOQDashboard;
