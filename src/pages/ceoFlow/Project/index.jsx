import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getAllProjectByFilterAction } from "../../../store/actions/Ceo/ceoprojectAction";
import { deleteProjectAction } from "../../../store/actions/Ceo/ceoprojectAction";

import ProjectProgressBar from "./ProjectProgressBar";
import { profile, constructions_img } from "../../../assets/images";

const CeoProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const menuRefs = useRef({});

  const handleCreateProjectClick = () => {
    localStorage.setItem("projectId", 0);
    navigate("/ceo/createproject");
  };

  useEffect(() => {
    

    fetchAllProjects();
  }, [dispatch]);

  const fetchAllProjects = async () => {
      setLoading(true);
      try {
        const result = await dispatch(getAllProjectByFilterAction()).unwrap();
        setProjects(result);
        setFilteredProjects(result);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    const applyFilter = () => {
      if (statusFilter === "all") {
        setFilteredProjects(projects);
      } else {
        const filtered = projects.filter(
          (project) =>
            project.project_status.toLowerCase() === statusFilter.toLowerCase()
        );
        setFilteredProjects(filtered);
      }
    };

    applyFilter();
  }, [statusFilter, projects]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = Object.values(menuRefs.current);
      if (refs.some((ref) => ref && ref.contains(event.target))) return;
      setDropdownOpenId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleEdit = (projectId) => {
    console.log("Edit clicked for project =>", projectId);
    localStorage.setItem("projectId", projectId);
    navigate(`/ceo/createproject/${projectId}`, { state: { isEdit: true } });
  };

  const handleDelete = (projectId) => {
  dispatch(deleteProjectAction(projectId))
    .unwrap()
    .then(() => {
      console.log('Project deleted successfully');
      fetchAllProjects(); // refresh the list
    })
    .catch((error) => {
      console.error('Error deleting project:', error);
    });
};



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const ProjectCard = ({ project }) => {
    const menuRef = useRef(null);
    menuRefs.current[project.project_id] = menuRef.current;

    return (
      <div className="card-project">
        <div className="d-flex justify-content-between">
          <h2 className="site-name">{project.project_name}</h2>
          <div className="div-constructions">
            <img src={constructions_img} alt={project.constructionName} />
            <h6 className="constructions-name">
              {project.subcontractor_names}
            </h6>
          </div>
          <div
            style={{ position: "relative", display: "inline-block" }}
            ref={menuRef}
          >
            <BsThreeDotsVertical
              onClick={() =>
                setDropdownOpenId(
                  dropdownOpenId === project.project_id
                    ? null
                    : project.project_id
                )
              }
              style={{ cursor: "pointer" }}
            />
            {dropdownOpenId === project.project_id && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  borderRadius: "4px",
                  zIndex: 1,
                }}
              >
                <ul
                  style={{ listStyle: "none", margin: 0, padding: "8px 0" }}
                >
                  <li
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => handleEdit(project.project_id)}
                    style={{ padding: "8px 16px", cursor: "pointer" }}
                  >
                    Edit
                  </li>
                  <li
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => handleDelete(project.project_id)}
                    style={{ padding: "8px 16px", cursor: "pointer" }}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between my-3">
          <div className="d-flex justify-content-between align-items-center">
            <img src={profile} alt="" className="proprietor-img" />
            <h4 className="proprietor-name d-flex justify-content-center align-items-center fs-5 gap-2">
              {project.project_manager_names}
              <p
                className="text-secondary"
                style={{ fontSize: "14px", marginTop: "18px" }}
              >
                Project Manager
              </p>
            </h4>
            <h6 className="site-category">{project.siteCategory}</h6>
          </div>
          <div>
            <span className="project-status text-uppercase">
              {project.project_status}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between project-date">
          <h4 className="title-5 text-start">
            <span className="d-block mb-1">Start Date</span>
            {formatDate(project.project_start_date)}
          </h4>
          <h4 className="title-5 text-end">
            <span className="d-block mb-1">End Date</span>
            {formatDate(project.project_end_date)}
          </h4>
        </div>
        <div className="small-progress">
          <ProjectProgressBar progress={project.project_status} />
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Link className="requests-count">
            {project.ticket_count} Requests Pending
          </Link>
          <Link
            className="view-project text-decoration-none"
            to="/ceo/projectdetails"
            onClick={() =>
              localStorage.setItem("projectId", project.project_id)
            }
          >
            View Project
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <main className="page-project d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <h2 className="title-1">Projects</h2>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-end">
              <div className="d-flex align-items-center justify-content-end">
                <select
                  className="link-filter"
                  value={statusFilter}
                  onChange={handleFilterChange}
                  style={{ width: "150px", height: "35px" }}
                >
                  <option value="all">All</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Pending">Pending</option>
                  <option value="Planned">Planned</option>
                  <option value="NotApproved">Not Approved</option>
                </select>
                <button
                  onClick={handleCreateProjectClick}
                  className="ms-4 btn btn-primary bg-primary border-0 fs-14-600 me-0 border-radius-2"
                >
                  + Create Project
                </button>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            {loading ? (
              <div>Loading projects...</div>
            ) : error ? (
              <div className="text-danger">
                Failed to load projects: {error}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div>No projects found.</div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.project_id}
                  className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4"
                >
                  <ProjectCard project={project} />
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default CeoProjects;
