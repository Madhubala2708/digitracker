import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Nav, 
  Card, 
  Badge, 
  Button,
  Modal,
  Alert
} from 'react-bootstrap';
import { ChevronLeft, ChevronRight, Calendar, ChevronDown, X } from 'lucide-react';
import profile from "../../assets/images/Profile-pic.png";
import useAuth from '../../hooks/useAuth';
import { userInfoAction } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { useNotification } from '../../hooks/Ceo/useNotification';
import { useNavigate } from 'react-router-dom';
const Notification = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('unread');
  
  // State for calendar visibility
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  
  // State for current date
  const [currentDate, setCurrentDate] = useState(new Date()); // Today's date
  const [selectedDate, setSelectedDate] = useState(new Date()); // Today's date
  // State for date filter active
  const [dateFilterActive, setDateFilterActive] = useState(false);
  
  // State for calendar view mode
  const [calendarViewMode, setCalendarViewMode] = useState('month'); // 'month', 'year', 'yearList'

  const dispatch = useDispatch();
  
  // Update currentDate to match week of selected date when date changes
  useEffect(() => {
    setCurrentDate(new Date(selectedDate));
  }, [selectedDate]);
  
  // Function to format date as "DD-MM-YYYY"
  const formatDateForComparison = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  // Years to display in year list view (generate a range around current year)
  const generateYearList = () => {
    const currentYear = currentDate.getFullYear();
    const startYear = currentYear - 10;
    const years = [];
    for (let i = 0; i < 21; i++) {
      years.push(startYear + i);
    }
    return years;
  };
  
  const yearList = generateYearList();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const {getnotification} = useNotification();


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const userId = userData?.empId;
  
        if (!userId) {
          console.warn("empId not found in local storage.");
          return;
        }
  
        const userNotifications = await getnotification(userId);
        console.log("notify:", userNotifications);
  
        if (Array.isArray(userNotifications)) {
          const uniqueNotificationsMap = new Map();
          userNotifications.forEach((n) => {
            if (!uniqueNotificationsMap.has(n.notificationId)) {
              uniqueNotificationsMap.set(n.notificationId, n);
            }
          });
  
          const uniqueNotifications = Array.from(uniqueNotificationsMap.values());
  
          const mappedNotifications = uniqueNotifications.map((n) => {
            const dateObj = new Date(n.timestamp);
  
            // Format date as "DD-MM-YYYY"
            const formattedDate = dateObj.toLocaleDateString('en-GB').split('/').join('-'); // "08-05-2025"
  
            // Format time as "HH:MM AM/PM"
            const formattedTime = dateObj.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            });
  
            return {
              id: n.notificationId,
              ticketId: n.sourceEntityId, 
              department: "General",
              title: "Approval Request",
              subtitle: n.message || "No Message",
              description: n.message || "No Description Available",
              date: formattedDate,
              time: formattedTime,
              sender: "System",
              priority: "Medium Prioritize",
              attachment: "None",
              status: n.is_read ? 'approved' : 'unread'
            };
          });
  
          setNotifications(mappedNotifications);
        } else {
          console.log("⚠️ No notifications returned.");
        }
      } catch (error) {
        console.error("❌ Failed to fetch notifications:", error);
      }
    };
  
    fetchNotifications();
  }, []);
  


  
  // Notification data
  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 1,
  //     department: 'Finance',
  //     title: 'KAN Site',
  //     subtitle: 'Approval from MD',
  //     description: 'We would like to update you that we are currently awaiting approval on the material requirement submitted for KAN site. Kindly review and provide your confirmation at the earliest to avoid any delays in the process.',
  //     date: '17-02-2025', // Matches the default selected date
  //     time: '02:55 pm',
  //     sender: 'Marvin McKinney',
  //     priority: 'High Prioritize',
  //     attachment: 'PO file attached',
  //     status: 'unread'
  //   },
  //   {
  //     id: 2,
  //     department: 'Purchase Team',
  //     title: 'KAN Site',
  //     subtitle: 'Approval from MD',
  //     description: 'We would like to update you that we are currently awaiting approval on the material requirement submitted for KAN site. Kindly review and provide your confirmation at the earliest to avoid any delays in the process.',
  //     date: '28-02-2025',
  //     time: '02:55 pm',
  //     sender: 'Marvin McKinney',
  //     priority: 'High Prioritize',
  //     attachment: 'PO file attached',
  //     status: 'unread'
  //   },
  //   {
  //     id: 3,
  //     department: 'Purchase Team',
  //     title: 'KAN Site',
  //     subtitle: 'Approval from MD',
  //     description: 'We would like to update you that we are currently awaiting approval on the material requirement submitted for KAN site. Kindly review and provide your confirmation at the earliest to avoid any delays in the process.',
  //     date: '17-02-2025', // Matches the default selected date
  //     time: '10:30 am',
  //     sender: 'Marvin McKinney',
  //     priority: 'Medium Prioritize',
  //     attachment: 'PO file attached',
  //     status: 'unread'
  //   },
  //   {
  //     id: 4,
  //     department: 'HR',
  //     title: 'Training Session',
  //     subtitle: 'Mandatory Compliance Training',
  //     description: 'Please be informed that a mandatory compliance training session has been scheduled. All team members are required to attend and complete the certification process.',
  //     date: '18-02-2025',
  //     time: '09:00 am',
  //     sender: 'Sarah Johnson',
  //     priority: 'High Prioritize',
  //     attachment: 'Schedule attached',
  //     status: 'unread'
  //   },
  // ]);
  
  // Function to get week dates centered around a specific date
  const getWeekDates = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(date);
      newDate.setDate(diff + i);
      weekDates.push(newDate);
    }
    
    return weekDates;
  };
  
  // Get current week dates
  const weekDates = getWeekDates(currentDate);
  
  // Function to navigate to previous week
  const goToPrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
    // Keep the selected date as-is
  };
  
  // Function to navigate to next week
  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
    // Keep the selected date as-is
  };
  
  // Function to generate calendar for a month
  const generateMonthCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    let calendar = [];
    let day = 1;
    
    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          week.push(null);
        } else if (day > daysInMonth) {
          week.push(null);
        } else {
          week.push(new Date(year, month, day++));
        }
      }
      calendar.push(week);
      if (day > daysInMonth) break;
    }
    
    return calendar;
  };
  
  // Generate calendar for current month
  const currentMonthCalendar = generateMonthCalendar(
    currentDate.getFullYear(), 
    currentDate.getMonth()
  );
  
  // Function to format date as "DD"
  const formatDay = (date) => {
    return date ? date.getDate() : "";
  };
  
  // Function to handle year selection
  const handleYearSelection = (year) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setCalendarViewMode('month');
  };
  
  // Function to handle month selection
  const handleMonthSelection = (monthIndex) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setCalendarViewMode('month');
  };
  
  // Function to handle date selection from monthly calendar
  const handleMonthlyDateSelection = (date) => {
    setSelectedDate(date);
    setDateFilterActive(true);
    setCurrentDate(date); // Update current date to ensure weekly view shows the correct week
    setShowFullCalendar(false);
  };
  
  // Function to handle date selection from weekly calendar
  const handleWeeklyDateSelection = (date) => {
    setSelectedDate(date);
    setDateFilterActive(true);
  };
  
  // Function to clear date filter
  const clearDateFilter = () => {
    setDateFilterActive(false);
  };
  
  // Function to count notifications by status
  const countNotifications = (status) => {
    return notifications.filter(n => n.status === status).length;
  };
  
  // Get counts
  const allCount = notifications.length;
  const unreadCount = countNotifications('unread');
  const approvedCount = countNotifications('approved');
  const pendingCount = countNotifications('pending');
  
  // Get filtered notifications based on active tab and selected date
  const getFilteredNotifications = () => {
    let filtered = activeTab === 'all' 
      ? notifications 
      : notifications.filter(n => n.status === activeTab);
    
    if (dateFilterActive) {
      const formattedSelectedDate = formatDateForComparison(selectedDate);
      filtered = filtered.filter(n => n.date === formattedSelectedDate);
    }
    
    return filtered;
  };
  
  const filteredNotifications = getFilteredNotifications();
  
  // Array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Get calendar title based on view mode
  const getCalendarTitle = () => {
    if (calendarViewMode === 'yearList') {
      return `${yearList[0]} - ${yearList[yearList.length - 1]}`;
    } else if (calendarViewMode === 'year') {
      return currentDate.getFullYear().toString();
    } else {
      return `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
    }
  };
  
  // Function to format date for display
  const formatDateForDisplay = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };
  
  return (
    <Container className="p-0">
      <div className="header-notification">
        <Row className="align-items-center">
          <Col>
            <h2 className="mb-0 title-1">Notification</h2>
          </Col>
          <Col xs="auto">
            <div className="d-flex align-items-center flex-column">
              <div 
                className="d-flex align-items-center cursor-pointer" 
                onClick={() => {
                  setShowFullCalendar(true);
                  setCalendarViewMode('month');
                }}
              >
                
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 11H9V13H7V11ZM7 15H9V17H7V15ZM11 11H13V13H11V11ZM11 15H13V17H11V15ZM15 11H17V13H15V11ZM15 15H17V17H15V15Z" fill="#333333"/>
                  <path d="M5 22H19C20.103 22 21 21.103 21 20V6C21 4.897 20.103 4 19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22ZM19 8L19.001 20H5V8H19Z" fill="#333333"/>
                </svg>
                <span className="ms-2 title-4">
                  {currentDate.toLocaleString('default', { month: 'short' })}, {currentDate.getFullYear()}
                </span>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Week Calendar */}
        <Row className="my-4">
          <Col>
            <div className="d-flex align-items-center">
              <ChevronLeft 
                className="cursor-pointer week-date-arrow" 
                size={40}  strokeWidth={3}
                onClick={goToPrevWeek}
              />
              
              <div className="d-flex justify-content-between flex-grow-1 mx-2">
                {weekDates.map((date, index) => {
                  const isSelected = date.getDate() === selectedDate.getDate() &&
                                    date.getMonth() === selectedDate.getMonth() &&
                                    date.getFullYear() === selectedDate.getFullYear();
                  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                  
                  return (
                    <div 
                      key={index}
                      className={`weekly-date ${
                        isSelected ? 'selected-weekly-date' : ''
                      }`}
                      onClick={() => {
                        handleWeeklyDateSelection(date);
                      }}
                    >
                      <div>{dayNames[date.getDay()]}</div>
                      <div className="">{date.getDate()}</div>
                    </div>
                  );
                })}
              </div>
              
              <ChevronRight 
                className="cursor-pointer week-date-arrow" 
                size={40} strokeWidth={3}
                onClick={goToNextWeek}
              />
            </div>
          </Col>
        </Row>
      
      
      {/* Active Filters */}
      {/* {dateFilterActive && (
        <Row className="mb-3"> */}
          {/* <Col>
            <Alert variant="info" className="d-flex align-items-center justify-content-between mb-0">
              <div>
                <strong>Date Filter: </strong> 
                {formatDateForDisplay(selectedDate)}
              </div>
              <Button 
                variant="outline-secondary" 
                size="sm" 
                className="d-flex align-items-center"
                onClick={clearDateFilter}
              >
                <X size={18} />
                <span className="ms-1">Clear</span>
              </Button>
            </Alert>
          </Col> */}
        {/* </Row>
      )} */}
      
      {/* Tabs */}
      <Nav variant="pills" className="mb-4 tab-nav-notification">
        <Nav.Item>
          <Nav.Link 
            active={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
            className="me-2 bg-light text-dark rounded-pill"
            style={{ opacity: activeTab === 'all' ? 1 : 0.7 }}
          >
            {activeTab === 'all' && allCount} All Request
            
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="nav-item-unread">
          <Nav.Link 
            active={activeTab === 'unread'}
            onClick={() => setActiveTab('unread')}
            className="me-2 bg-warning bg-opacity-25 text-dark rounded-pill"
            style={{ opacity: activeTab === 'unread' ? 1 : 0.7 }}
          >
            {activeTab === 'unread' && unreadCount} Unread
            
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={activeTab === 'approved'}
            onClick={() => setActiveTab('approved')}
            className="me-2 bg-light text-dark rounded-pill"
            style={{ opacity: activeTab === 'approved' ? 1 : 0.7 }}
          >
            {activeTab === 'approved' && approvedCount} Approved
            
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={activeTab === 'pending'}
            onClick={() => setActiveTab('pending')}
            className="me-2 bg-light text-dark rounded-pill"
            style={{ opacity: activeTab === 'pending' ? 1 : 0.7 }}
          >
            {activeTab === 'pending' && pendingCount} Pending
            
          </Nav.Link>
        </Nav.Item>
      </Nav>
      </div>
      
      
     {/* Notification Cards */}
<div className="notifications-list">
  {filteredNotifications.map((notification) => {
    // Create department class
    const deptClass = `dept-${notification.department.toLowerCase().replace(/\s+/g, '')}`;
    
    return (
      <Card key={notification.id} className="card mb-3 border rounded-4 cursorcamer"
      onClick={() => navigate(`/ticket/${notification.ticketId}`)}>
        <div className="card-pending-approvel">
          <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
            <div className="card-pending-approvel-project-title">
            <span className={`project-dept ${deptClass}`}>{notification.department}</span>
              <h4 className="title-3" style={{marginTop:'6px'}}>{notification.title}</h4>
            </div>
            <div className="card-pending-approvel-project-user">
              <p className="text-dark">{notification.date} • {notification.time}</p>
              <h6 className="mb-0 ms-1 d-flex justify-content-between align-items-center">
                <img src={profile} alt="" className="me-1" />{notification.sender}
              </h6>
            </div>
          </div>
          <div className="card-pending-approvel-content border-bottom-0">
            <h6 className="title-4 my-2">{notification.subtitle}</h6>
            <p>{notification.description}</p>
          </div>
          <div className="d-flex div-prioritize">
            <Badge text={notification.priority.includes('High') ? 'high' : notification.priority.includes('Low') ? 'low' : 'medium'} className="me-2 py-2 px-3 badge-prioritize">
              {notification.priority}
            </Badge>
            <Badge className="py-2 px-3 badge-fileattachment">{notification.attachment}</Badge>
          </div>
        </div>
      </Card>
    );
  })}


  {/* No Notifications Message */}
      {filteredNotifications.length === 0 && (
        <Alert variant="light" className="text-center py-5">
          <div className="mb-3">
            <Calendar size={40} className="text-secondary" />
          </div>
          <h4>No notifications found</h4>
          <p className="text-secondary">
            {dateFilterActive 
              ? `No notifications available for ${formatDateForDisplay(selectedDate)}` 
              : "No notifications match the current filter"}
          </p>
          {/* {dateFilterActive && (
            <Button 
              variant="outline-primary" 
              onClick={clearDateFilter}
              className="mt-2"
            >
              Clear Date Filter
            </Button>
          )} */}
        </Alert>
      )}
      </div>
      
      {/* Full Calendar Modal */}
      <Modal 
        show={showFullCalendar} 
        onHide={() => setShowFullCalendar(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title 
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (calendarViewMode === 'month') {
                setCalendarViewMode('year');
              } else if (calendarViewMode === 'year') {
                setCalendarViewMode('yearList');
              }
            }}
          >
            {getCalendarTitle()} {calendarViewMode !== 'yearList' && <ChevronDown size={16} />}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {calendarViewMode === 'month' && (
            <>
              <div className="mb-3">
                <Row className="text-center">
                  <Col>S</Col>
                  <Col>M</Col>
                  <Col>T</Col>
                  <Col>W</Col>
                  <Col>T</Col>
                  <Col>F</Col>
                  <Col>S</Col>
                </Row>
              </div>
              
              {currentMonthCalendar.map((week, weekIndex) => (
                <Row key={weekIndex} className="mb-2 text-center">
                  {week.map((day, dayIndex) => {
                    // Check if this date is in the currently displayed week
                    const isInCurrentWeek = day && weekDates.some(weekDay => 
                      weekDay.getDate() === day.getDate() && 
                      weekDay.getMonth() === day.getMonth() && 
                      weekDay.getFullYear() === day.getFullYear()
                    );
                    
                    const isSelected = day && 
                      day.getDate() === selectedDate.getDate() &&
                      day.getMonth() === selectedDate.getMonth() &&
                      day.getFullYear() === selectedDate.getFullYear();
                    
                    // Check if the day has notifications
                    let hasNotifications = false;
                    if (day) {
                      const formattedDayDate = formatDateForComparison(day);
                      hasNotifications = notifications.some(n => n.date === formattedDayDate);
                    }
                    
                    return (
                      <Col key={dayIndex}>
                        {day && (
                          <div 
                            className={`p-2 rounded-circle position-relative ${
                              isSelected ? 'bg-warning bg-opacity-25' : 
                              isInCurrentWeek ? 'bg-light' : ''
                            }`}
                            style={{ 
                              cursor: 'pointer',
                              width: '40px', 
                              height: '40px',
                              margin: '0 auto',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onClick={() => {
                              handleMonthlyDateSelection(day);
                            }}
                          >
                            {formatDay(day)}
                            {hasNotifications && (
                              <span 
                                className="position-absolute bg-primary"
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  bottom: '2px',
                                  left: '50%',
                                  transform: 'translateX(-50%)'
                                }}
                              ></span>
                            )}
                          </div>
                        )}
                      </Col>
                    );
                  })}
                </Row>
              ))}
            </>
          )}
          
          {calendarViewMode === 'year' && (
            <Row className="g-2">
              {monthNames.map((month, index) => (
                <Col key={index} xs={4}>
                  <div 
                    className={`p-3 text-center rounded ${
                      currentDate.getMonth() === index ? 'bg-warning bg-opacity-25' : 'bg-light'
                    }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleMonthSelection(index)}
                  >
                    {month}
                  </div>
                </Col>
              ))}
            </Row>
          )}
          
          {calendarViewMode === 'yearList' && (
            <Row className="g-2">
              {yearList.map((year) => (
                <Col key={year} xs={4}>
                  <div 
                    className={`p-3 text-center rounded ${
                      currentDate.getFullYear() === year ? 'bg-warning bg-opacity-25' : 'bg-light'
                    }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleYearSelection(year)}
                  >
                    {year}
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          {calendarViewMode === 'month' && (
            <>
              <Button 
                variant="secondary" 
                onClick={() => {
                  const prevMonth = new Date(currentDate);
                  prevMonth.setMonth(prevMonth.getMonth() - 1);
                  setCurrentDate(prevMonth);
                }}
              >
                Previous Month
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => {
                  const nextMonth = new Date(currentDate);
                  nextMonth.setMonth(nextMonth.getMonth() + 1);
                  setCurrentDate(nextMonth);
                }}
              >
                Next Month
              </Button>
            </>
          )}
          
          {calendarViewMode === 'year' && (
            <>
              <Button 
                variant="secondary" 
                onClick={() => {
                  const prevYear = new Date(currentDate);
                  prevYear.setFullYear(prevYear.getFullYear() - 1);
                  setCurrentDate(prevYear);
                }}
              >
                Previous Year
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => {
                  const nextYear = new Date(currentDate);
                  nextYear.setFullYear(nextYear.getFullYear() + 1);
                  setCurrentDate(nextYear);
                }}
              >
                Next Year
              </Button>
            </>
          )}
          
          {calendarViewMode === 'yearList' && (
            <>
              <Button 
                variant="secondary" 
                onClick={() => {
                  const newYearList = yearList.map(y => y - 21);
                  const newCurrentDate = new Date(currentDate);
                  newCurrentDate.setFullYear(newYearList[10]); // Set to middle year
                  setCurrentDate(newCurrentDate);
                }}
              >
                Previous Range
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => {
                  const newYearList = yearList.map(y => y + 21);
                  const newCurrentDate = new Date(currentDate);
                  newCurrentDate.setFullYear(newYearList[10]); // Set to middle year
                  setCurrentDate(newCurrentDate);
                }}
              >
                Next Range
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Notification;