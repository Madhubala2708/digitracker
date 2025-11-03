import React from 'react';
import { ProjectProvider } from './ProjectContext';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import { useProject } from './ProjectContext';

const ProjectFormContent = () => {
  const { currentStep } = useProject();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      case 3:
        return <Step4 />;
      case 4:
        return <Step5 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <div className="project-form-container">
      <div className="progress-bar mb-4">
        <div className="progress" style={{ width: `${((currentStep + 1) / 5) * 100}%` }} />
      </div>
      {renderStep()}
    </div>
  );
};

const ProjectForm = () => {
  return (
    <ProjectProvider>
      <ProjectFormContent />
    </ProjectProvider>
  );
};

export default ProjectForm; 