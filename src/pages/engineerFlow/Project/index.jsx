import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectMilestoneTable from "./ProjectMilestoneTable";
import ProjectEmployeesList from "../../../components/common/ProjectEmployeesList";
import ProjectProgressBar from "./ProjectProgressBar";
import { useProject } from "../../../hooks/Ceo/useCeoProject";

export const roleCheck = { role: "admin" };

const EngineerProject = () => {
  const getProjectIdFromLocalStorage = () => {
    const storedData = localStorage.getItem("userData"); // Assuming key is 'userDetails'

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);

        // Ensure projects array exists
        if (parsedData.projects && Array.isArray(parsedData.projects)) {
          return parsedData.projects[0]?.projectId || null; // Get projectId of the first project
        } else {
          console.error("No projects found in local storage");
          return null;
        }
      } catch (error) {
        console.error("Error parsing local storage data:", error);
        return null;
      }
    } else {
      console.error("No data found in local storage for key 'userDetails'");
      return null;
    }
  };

  const { fetchProjectDetails } = useProject();

  // Local state to hold project details
  const [projectDetails, setProjectDetails] = useState(null);

  // Retrieve projectId dynamically from local storage
  const projectId = getProjectIdFromLocalStorage();

  useEffect(() => {
    if (!projectId) {
      console.error("Project ID not found in local storage");
      return;
    }

    const getDetails = async () => {
      try {
        const details = await fetchProjectDetails(projectId);
        setProjectDetails(details);
        console.log("Fetched Project Details:", details);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    getDetails();
  }, [projectId]);

  if (!projectDetails) {
    return <div>Loading project details...</div>;
  }

  const {
    project,
    milestone_details: milestones,
    financeApprovals,
  } = projectDetails.value || {};

  return (
    <main className="page-project-details d-flex">
      <div className="left-container">
        <div className="row mt-4">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="card-site-conatiner">
              {/* Project Title */}
              <h2 className="title-1">
                {project?.project_name || "Project Name"}
              </h2>

              {/* Project Dates */}
              <div className="d-flex justify-content-between align-items-center project-date mt-3">
                <h4 className="text-start">
                  <span>Start Date: </span>
                  {project?.project_start_date || "N/A"}
                </h4>
                <h4 className="text-end">
                  <span>End Date: </span>
                  {project?.project_end_date || "N/A"}
                </h4>
              </div>

              {/* Project Progress Bar */}
              <ProjectProgressBar progress={project?.completion || 0} />
            </div>

            {/* Project Milestones */}
            <div className="card-site-conatiner project-milestone mt-4">
              <h4>Project Milestones</h4>
              <ProjectMilestoneTable
                milestoneDetails={milestones || []}
                projectId={project?.project_id}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Project Employees (Finance Approvals) */}
      <div className="right-container">
        <ProjectEmployeesList
          employeesList={projectDetails?.value?.team_details || []}
          projectId={projectDetails?.value?.project?.project_id}
        />
      </div>
    </main>
  );
};
export default EngineerProject;
