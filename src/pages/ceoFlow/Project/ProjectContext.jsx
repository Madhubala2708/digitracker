import React, { createContext, useContext, useState, ReactNode } from 'react';

// Project Data Types
const initialProjectData = {
  project: {
    project_id: null,
    project_name: "",
    project_description: "",
    project_type_id: null,
    project_type_name: "",
    project_sector_id: null,
    project_sector_name: "",
    project_status: "NotApproved",
    project_start_date: "",
    project_end_date: "",
    project_total_budget: 0,
    project_location: ""
  },
  budget_details: [],
  team_details: [],
  finance_approval_data: [],
  milestone_details: [],
  risk_management_data: [],
  total_employee_count: 0
};

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projectData, setProjectData] = useState(initialProjectData);
  const [currentStep, setCurrentStep] = useState(0);

  const updateProjectData = (step, data) => {
    setProjectData(prev => ({
      ...prev,
      ...data
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const fetchProjectDetails = async (projectId) => {
    try {
      const response = await fetch(`/api/Project/getProjectDetails?projectId=${projectId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project details');
      }
      const data = await response.json();
      setProjectData(data.value);
    } catch (error) {
      console.error('Error fetching project details:', error);
      throw error;
    }
  };

  const saveStep = async (step) => {
    try {
      const endpoint = `/api/Project/saveStep${step + 1}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save step data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error saving step:', error);
      throw error;
    }
  };

  return (
    <ProjectContext.Provider 
      value={{
        projectData,
        setProjectData,
        currentStep,
        nextStep,
        prevStep,
        updateProjectData,
        saveStep,
        fetchProjectDetails
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}; 