import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Card } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

// This is the Gantt Chart component that can be integrated with your TaskTable
const GanttChart = ({ tasks, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-03-14'));
  const [selectedMonth, setSelectedMonth] = useState('March 2025');
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  
  // Generate dates for the gantt chart display
  const generateDates = () => {
    const dates = [];
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 1);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push({
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        fullDate: date
      });
    }
    return dates;
  };
  
  const [displayDates, setDisplayDates] = useState(generateDates());
  
  useEffect(() => {
    setDisplayDates(generateDates());
  }, [currentDate]);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const years = [2024, 2025, 2026];
  
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
    setSelectedMonth(`${months[newDate.getMonth()]} ${newDate.getFullYear()}`);
  };
  
  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
    setSelectedMonth(`${months[newDate.getMonth()]} ${newDate.getFullYear()}`);
  };
  
  const handleMonthYearSelect = (month, year) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(months.indexOf(month));
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setSelectedMonth(`${month} ${year}`);
    setShowMonthPicker(false);
  };
  
  // Calculate position and width for task bars
  const getTaskBarStyle = (task) => {
    const startDate = new Date(task.startDate.split('-').reverse().join('-'));
    const endDate = new Date(task.endDate.split('-').reverse().join('-'));
    
    const earliestDisplayDate = displayDates[0].fullDate;
    const latestDisplayDate = displayDates[displayDates.length - 1].fullDate;
    
    // Determine if task falls within current view
    if (endDate < earliestDisplayDate || startDate > latestDisplayDate) {
      return { display: 'none' };
    }
    
    // Calculate start position (as percentage of visible range)
    let startPosition = 0;
    if (startDate < earliestDisplayDate) {
      startPosition = 0;
    } else {
      const daysDiff = Math.floor((startDate - earliestDisplayDate) / (24 * 60 * 60 * 1000));
      startPosition = (daysDiff / 7) * 100;
    }
    
    // Calculate width (as percentage of visible range)
    let endPosition = 100;
    if (endDate > latestDisplayDate) {
      endPosition = 100;
    } else {
      const daysDiff = Math.floor((endDate - earliestDisplayDate) / (24 * 60 * 60 * 1000));
      endPosition = (daysDiff / 7) * 100;
    }
    
    const width = Math.max(endPosition - startPosition, 5); // Ensure minimum width
    
    return {
      left: `${startPosition}%`,
      width: `${width}%`,
      opacity: task.id.startsWith('MA-') ? 0.9 : 0.7,
      position: 'absolute',
      height: '30px',
      borderRadius: '4px',
      backgroundColor: task.status === 'Completed' ? '#28a745' : task.id.startsWith('MA-') ? '#4169E1' : '#6495ED'
    };
  };
  
  // Calculate task completion percentage
  const getCompletionPercentage = (task) => {
    // For main tasks, calculate based on completed subtasks
    if (task.subRows && task.subRows.length > 0) {
      const completed = task.subRows.filter(sub => sub.status === 'Completed').length;
      return Math.round((completed / task.subRows.length) * 100);
    }
    
    // For subtasks with finished date
    if (task.status === 'Completed' && task.finishedDate !== '-') {
      return 100;
    }
    
    // For active tasks, estimate 50% completion
    if (task.status === 'Active') {
      return 50;
    }
    
    return 0;
  };
  
  return (
    <div className="full-width">
      <div className="left-container">
        <div className="gantt-header d-flex justify-content-between align-items-center mt-3 mb-4">
          <div className="d-flex align-items-center">
            <button 
              onClick={onClose}
              className="btn fs-16-500 btn-secondary border-radius-2 text-dark-gray border-0 me-3 bg-platinum-gray"
            >
              Back to Table
            </button>
            <h2 className="fs-22-700 mb-0">Gantt View</h2>
          </div>
          
          <div className="date-navigation d-flex align-items-center">
            <button 
              onClick={handlePrevious}
              className="btn btn-light me-2"
            >
              <ChevronLeft size={16} />
            </button>
            
            <div className="position-relative">
              <button 
                onClick={() => setShowMonthPicker(!showMonthPicker)}
                className="btn btn-outline-secondary d-flex align-items-center"
              >
                {selectedMonth} <Calendar size={16} className="ms-2" />
              </button>
              
              {showMonthPicker && (
                <div className="position-absolute mt-1 bg-white border rounded shadow-lg p-2" style={{ zIndex: 10, right: 0 }}>
                  {months.map(month => (
                    <div key={month} className="month-year-options">
                      {years.map(year => (
                        <button 
                          key={`${month}-${year}`}
                          onClick={() => handleMonthYearSelect(month, year)}
                          className="btn btn-light d-block w-100 text-start py-1 px-2 small"
                        >
                          {month} {year}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={handleNext}
              className="btn btn-light ms-2"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="gantt-view-container">
          <div className="gantt-calendar d-flex justify-content-between text-center border-bottom border-2 pb-2 mb-3">
            {displayDates.map((date, index) => (
              <div key={index} className="date-header" style={{ width: '14.28%' }}>
                <div className="fs-22-700">{date.date}</div>
              </div>
            ))}
          </div>
          
          <div className="gantt-tasks mt-4">
            {tasks.map((task, index) => (
              <div key={task.id} className="task-wrapper mb-4">
                <div className="task-header d-flex justify-content-between align-items-center mb-2">
                  <div className="fs-18-600">{task.name}</div>
                  <div className="fs-16-500">{getCompletionPercentage(task)}%</div>
                </div>
                
                <div className="gantt-row position-relative bg-light rounded" style={{ height: '32px' }}>
                  <div 
                    className="text-white rounded d-flex align-items-center ps-2"
                    style={getTaskBarStyle(task)}
                  >
                    <div className="task-label small text-truncate">
                      {task.name} {getCompletionPercentage(task)}%
                    </div>
                  </div>
                </div>
                
                {task.subRows && task.subRows.map((subTask, subIndex) => (
                  <div key={subTask.id} className="sub-task-row ms-4 mt-2">
                    <div className="subtask-header d-flex justify-content-between align-items-center small mb-1">
                      <div className="fs-16-500">{subTask.name}</div>
                      <div>{subTask.status === 'Completed' ? '100%' : subTask.status === 'Active' ? '50%' : '0%'}</div>
                    </div>
                    
                    <div className="gantt-row position-relative bg-light rounded" style={{ height: '24px' }}>
                      <div 
                        className="text-white rounded d-flex align-items-center ps-2"
                        style={{
                          ...getTaskBarStyle(subTask),
                          height: '24px'
                        }}
                      >
                        <div className="task-label small text-truncate">
                          {subTask.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;