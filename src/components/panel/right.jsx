import React, { useState, useEffect, useRef, Fragment } from "react";
import AssigneeCard from "../common/AssigneeCard";
import { useSuggestedMembers } from "../../hooks/useTicketManagement";
import { formatDate, isDark } from "../../utils/common";
import LogoAvatarShowLetter from "../common/LogoAvatarShowLetter";
import useAuth from "../../hooks/useAuth";
import {
  unChecked,
  checkedIcon,
  searchIcon,
  crossMarkNotFill,
  chevronLeftDuo,
  chevronRightDuo,
} from "../../assets/images/index";
import { useLabel } from "../../hooks/useMaster";
import DateTimeCalendar from "../common/DateTimeCalendar";
import PeriodicDateTimeCalendar from "../../pages/Periodic/PeriodicDateTimeCalendar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import appConstants from "../../constant/common";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../store/slice/toast";
import { addAgencyWatchlist, addRemoveParticipant } from "../../services";

const RightPanel = ({
  ticketData,
  suggMembers,
  disableClass,
  updateRefreshTicket,
  authDeptId,
  hasNullCodeForTicketValue,
  workSpaceId,
  refreshData,
}) => {
  dayjs.extend(utc);
  const [suggestedMembersList, { getSuggestedMembers }] = useSuggestedMembers();
  const dispatch = useDispatch();
  const [onBoradMembersList, setOnBoradMembersList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [assignToSet, setAssignToSet] = useState();
  const [isLoading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(0);
  const popupRef = useRef(null);
  const participantsRef = useRef(null);
  const [userData, setUserData] = useState();
  const [orderID, setOrderID] = useState();
  const [{ data: auth }] = useAuth();
  const [showLabel, setShowLabel] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [ticketlabel, setTicketlabel] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [toolCenter, setToolCenter] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    toolCenter: false,
  });
  const [agencyTeam, setAgencyTeam] = useState([]);
  const inputRef = useRef();
  const location = useLocation();
  const locationId = location?.state ? location?.state : null;
  const [watchlistUser, setWatchlistUser] = useState([]);
  const [participantsUser, setParticipantsUser] = useState([]);
  const [getParticipantsListUser, setGetParticipantsListUser] = useState([]);
  const [getParticipantsRemoveList, setGetParticipantsRemoveList] = useState(
    []
  );
  const [getWatchlistUser, setGetWatchlistUser] = useState([]);
  const [showWacthers, setShowWacthers] = useState(false);
  const [showAddParticipants, setShowAddParticipants] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteParticipants, setDeleteParticipants] = useState(false);
  const [addParticipants, setAddParticipants] = useState(false);
  const [allowMemberEdit, setaAllowMemberEdit] = useState(false);
  const [agencyMembersList, setAgencyMembersList] = useState([]);
  const [agencyUserList, setAgencyUserList] = useState([]);
  const [salesMembersList, setSalesMembersList] = useState([]);
  const [salesUserList, setSalesUserList] = useState([]);
  const [onBoardingUserList, setOnBoardingUserList] = useState([]);
  const [onBoardingAssigneeDetails, setOnBoardingAssigneeDetails] = useState(
    []
  );
  const [salesAssigneeDetails, setSalesAssigneeDetails] = useState([]);
  const [agencyAssigneeDetails, setAgencyAssigneeDetails] = useState([]);

  const [toolDueDate, setToolDueDate] = useState(null);

  function filterUsers(onBoradDept, userType, boardId) {
    // Ensure the onBoradDept is not empty
    if (!onBoradDept || onBoradDept.length === 0) {
      return [];
    }

    // Extract the dept_name from the first department (assuming only one department in the array)
    const deptName = onBoradDept[0]?.dept_name || "";

    // Extract the usersList from the first department
    const usersList = onBoradDept[0]?.usersList || [];

    // Filter the users based on user_type and board_id only if they are not null
    const filteredUsers = usersList
      .filter((user) => {
        const matchesUserType =
          userType === null || user.user_type === userType;
        const matchesBoardId = boardId === null || user.board_id === boardId;
        return matchesUserType && matchesBoardId;
      })
      .map((user) => {
        // Add dept_name to each user
        return { ...user, dept_name: deptName };
      });
    return filteredUsers;
  }

  const compareWatchlists = (getWatchlist, watchlist) => {
    // Convert watchlist and getWatchlist to maps for easier comparison
    const getWatchlistMap = new Map(
      getWatchlist.map((item) => [item.reg_id, item])
    );
    const watchlistMap = new Map(watchlist.map((item) => [item.reg_id, item]));

    // Find removed members (present in watchlist but not in getWatchlist)
    const removedMembers = watchlist.filter(
      (item) => !getWatchlistMap.has(item.reg_id)
    );

    // Find remaining members (present in getWatchlist but not in watchlist)
    const remainingMembers = getWatchlist.filter(
      (item) => !watchlistMap.has(item.reg_id)
    );

    return { removedMembers, remainingMembers };
  };

  const isRegIdInTicketData = (ticketData, regId) => {
    // Check if regId matches `added_by` or `assign_to`
    if (
      ticketData?.added_by === regId ||
      (Array.isArray(ticketData?.assign_to)
        ? ticketData?.assign_to.some((item) => item.regId === regId)
        : ticketData?.assign_to === regId)
    ) {
      return true;
    }

    // Check if regId is in any of the assignee fields within `tool_requirement`
    for (const requirement of ticketData?.tool_requirement || []) {
      if (
        requirement?.assignee?.some((assignee) => assignee?.reg_id === regId)
      ) {
        return true;
      }
    }

    // Return false if regId is not found in any required fields
    return false;
  };

  useEffect(() => {
    const authMember = auth?.details?.regId;
    const result = isRegIdInTicketData(ticketData, authMember);
    setaAllowMemberEdit(result);
  }, [ticketData]);

  useEffect(() => {
    if (suggestedMembersList?.data === null) {
      getSuggestedMembers();
    }
    if (suggestedMembersList?.data?.length > 0) {
      const onBoradDept = suggestedMembersList?.data?.filter(
        (sa) => sa?.dept_code === auth?.activeDepartmentPermission
      );
      const userType =
        auth?.activeDepartmentPermission === "AG" ? "Agency" : null;
      const boardId =
        auth?.activeDepartmentPermission === "AG" ? auth?.activeBoard : null;
      const result = filterUsers(onBoradDept, userType, boardId);
      const getWatchlist = (onBoradDept[0]?.usersList || [])
        .filter(
          (wa) => wa.board_id === auth?.activeBoard || wa.board_id === null
        )
        .map((wa) => ({
          ...wa,
          dept_name:
            wa.board_id === auth?.activeBoard
              ? onBoradDept[0]?.dept_name
              : "ON BOARDING",
          [workSpaceId === 2 ? "isParticipants" : "isWatcher"]: false,
        }));

      // const getOnBoradDeptList = onBoradDept[0]?.usersList.map((li) => {
      //   if (onBoradDept[0]?.dept_code === "AG") {
      //     if (li.user_type == "Agency") {
      //       return { ...li, dept_name: "Agency" };
      //     } else {
      //       return false;
      //     }
      //   } else return { ...li, dept_name: onBoradDept[0]?.dept_name };
      // });
      const salesDept = suggestedMembersList?.data?.filter(
        (st) => st?.dept_code === "ST"
      );
      const getSalesWatchList = filterUsers(salesDept, null, null);

      if (auth?.activeDepartmentPermission === "AG") {
        setOnBoradMembersList(
          getWatchlist.filter((dept) => dept.dept_name === "ON BOARDING")
        );
        setSalesMembersList(getSalesWatchList);
        setAgencyMembersList(result);
      } else setOnBoradMembersList(result);

      setParticipantsUser(result);
      if (
        ticketData?.watchlist !== undefined &&
        ticketData?.watchlist?.length > 0
      ) {
        const { removedMembers, remainingMembers } = compareWatchlists(
          getWatchlist,
          ticketData?.watchlist
        );
        setWatchlistUser(
          ticketData?.assign_to
            ? remainingMembers.filter(
              (res) => res.reg_id !== ticketData?.assign_to
            )
            : remainingMembers
        );
        setGetWatchlistUser(
          ticketData?.assign_to
            ? remainingMembers.filter(
              (res) => res.reg_id !== ticketData?.assign_to
            )
            : remainingMembers
        );
      } else {
        setWatchlistUser(
          ticketData?.assign_to
            ? getWatchlist.filter((res) => res.reg_id !== ticketData?.assign_to)
            : getWatchlist
        );
        setGetWatchlistUser(
          ticketData?.assign_to
            ? getWatchlist.filter((res) => res.reg_id !== ticketData?.assign_to)
            : getWatchlist
        );
      }

      if (
        ticketData?.participants !== undefined &&
        ticketData?.participants?.length > 0
      ) {
        const { removedMembers, remainingMembers } = compareWatchlists(
          result,
          ticketData?.participants
        );

        setGetParticipantsListUser(remainingMembers);
        setGetParticipantsRemoveList(ticketData?.participants);
        setParticipantsUser(remainingMembers);
      } else {
        setGetParticipantsListUser(result);
      }
    }
  }, [suggestedMembersList?.data, ticketData]);

  const filterUsersByAssignTo = (assignTo) => {
    const uniqueUsers = new Map();
    suggestedMembersList?.data?.forEach((department) => {
      department.usersList
        .filter((user) => {
          if (Array.isArray(assignTo)) {
            return assignTo.includes(user.reg_id);
          } else {
            return user.reg_id === assignTo;
          }
        })
        .forEach((user) => {
          if (!uniqueUsers.has(user.reg_id)) {
            uniqueUsers.set(user.reg_id, {
              ...user,
              dept_name: department.dept_name,
            });
          }
        });
    });

    return Array.from(uniqueUsers.values());
  };

  useEffect(() => {
    if (
      ticketData.assign_to !== "" &&
      ticketData.assign_to !== null &&
      ticketData.assign_to !== undefined
    ) {
      if (onBoradMembersList?.length > 0) {
        const setData = filterUsersByAssignTo(ticketData?.assign_to);
        setAssignToSet(setData);
        if (setData?.length > 0) {
          setUserData({
            ...ticketData,
            assignee: {
              photo: setData[0]?.photo,
              name: setData[0]?.display_name,
              status: setData[0]?.status,
            },
            ticket_labels:
              ticketData?.ticket_labels?.length > 0
                ? ticketData?.ticket_labels.map((label) => label.label_id)
                : [],
          });
        } else {
          setUserData({
            ...ticketData,
            ticket_labels:
              ticketData?.ticket_labels?.length > 0
                ? ticketData?.ticket_labels.map((label) => label.label_id)
                : [],
          });
        }
      }
    } else {
      setUserData({
        ...ticketData,
        ticket_labels:
          ticketData?.ticket_labels?.length > 0
            ? ticketData?.ticket_labels.map((label) => label.label_id)
            : [],
      });
    }

    if (workSpaceId === 3) {
      const setOnboardingUserData = filterUsersByAssignTo(
        ticketData?.ticket_include_onboard
      );
      const setSalesUserData = filterUsersByAssignTo(
        ticketData?.ticket_include_sales
      );
      const setAgencyUserData = filterUsersByAssignTo(ticketData?.assign_to);

      if (setAgencyUserData?.length > 0) {
        setAgencyAssigneeDetails(setAgencyUserData);
      } else {
        const userDetails = ticketData
          ? ticketData?.participants?.filter(
            (aid) => aid?.reg_id === ticketData?.assign_to[0]
          )
          : null;
        if (userDetails?.length > 0) {
          setAgencyAssigneeDetails([
            {
              reg_id: userDetails[0]?.reg_id,
              photo: userDetails[0]?.photo,
              display_name: userDetails[0]?.display_name,
            },
          ]);
        }
      }
      if (setOnboardingUserData?.length > 0) {
        setOnBoardingAssigneeDetails(setOnboardingUserData);
        const uniqueOnboardingData = setOnboardingUserData.filter(
          (value, index, self) => {
            return index === self.findIndex((t) => t.reg_id === value.reg_id);
          }
        );
        setUserData((prev) => ({
          ...prev,
          onBoardingAssignee: {
            photo: setOnboardingUserData[0]?.photo,
            name: setOnboardingUserData[0]?.display_name,
            status: setOnboardingUserData[0]?.status,
          },
        }));
      }
      if (setSalesUserData?.length > 0) {
        setSalesAssigneeDetails(setSalesUserData);
        const uniqueSalesData = setSalesUserData.filter(
          (value, index, self) => {
            return index === self.findIndex((t) => t.reg_id === value.reg_id);
          }
        );
        setUserData((prev) => ({
          ...prev,
          salesAssignee: {
            photo: setSalesUserData[0]?.photo,
            name: setSalesUserData[0]?.display_name,
            status: setSalesUserData[0]?.status,
          },
        }));
      }
    }
    setOrderID(ticketData?.order_id ? ticketData?.order_id : "");
    setTicketlabel(
      ticketData?.ticket_labels?.length > 0
        ? ticketData?.ticket_labels.map((label) => label.label_id)
        : []
    );
    setToolCenter(ticketData?.tool_center ? ticketData?.tool_center : "");
  }, [onBoradMembersList, ticketData]);

  const userDetails = assignToSet ? assignToSet : "";

  useEffect(() => {
    setUserList(createUserList(onBoradMembersList));
  }, [onBoradMembersList]);

  const createUserList = (membersList) => {
    const countries = ["Suggested members"];
    // , "India", "Philippines", "Vietnam"];

    return countries.map((country) => ({
      name: country,
      list:
        country === "Suggested members"
          ? membersList || []
          : membersList?.filter((member) => member?.country === country) || [],
    }));
  };

  useEffect(() => {
    setAgencyUserList(createUserList(agencyMembersList));
  }, [agencyMembersList]);

  useEffect(() => {
    setSalesUserList(createUserList(salesMembersList));
  }, [salesMembersList]);

  useEffect(() => {
    setOnBoardingUserList(createUserList(onBoradMembersList));
  }, [onBoradMembersList]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the popup, close it
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLabel(false);
      }
    };
    // Attach the event listener to the document body
    document.addEventListener("click", handleClickOutside);
    setEditMode(0);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the popup, close it
      if (
        participantsRef.current &&
        !participantsRef.current.contains(event.target)
      ) {
        setShowAddParticipants(false);
        setSearch("");
        setParticipantsUser(getParticipantsListUser);
      }
    };
    // Attach the event listener to the document body
    document.addEventListener("click", handleClickOutside);
    setEditMode(0);
    // Cleanup the event listener when the component is unmounted

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const assignUser = (data, deptType, multiSelect) => {
    if (data) {
      let regId;
      if (multiSelect) {
        regId = [];
        data.forEach((d) => {
          regId.push(d.reg_id);
        });
      } else {
        regId = data?.reg_id;
      }

      suggMembers({
        reg_id: regId,
        updateKeyValue:
          deptType === "OB"
            ? "TicketIncludeToOnboard"
            : deptType === "ST"
              ? "TicketIncludeToSales"
              : "TicketAssigned",
      });
      if (deptType === "OB") {
        setOnBoardingAssigneeDetails(data);
      } else if (deptType === "ST") {
        setSalesAssigneeDetails(data);
      } else {
        setAssignToSet(data);
      }
    }
  };

  const [orderIdForm, setOrderIdForm] = useState(false);

  const enableForm = (type) => {
    // if (type == "orderId" && ticketData?.saledata?.company_name != null)
    if (type == "orderId") {
      setOrderIdForm(true);
    }
  };
  const regexVal = new RegExp("^([0-9a-zA-Z- ]*#?[0-9a-zA-Z- ])");

  const handleOrderIdUpdate = (e) => {
    const orderVal = e.target.value.trim(); // Trim whitespace from input value
    if (orderVal.length > 1 && !orderVal.match(regexVal)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    } else {
      setOrderID(orderVal);
      setEditMode(0);
    }
  };

  const handleEditClick = (type) => {
    // USED TO RESET BACK TO PREVIOUS STATE VALUE IF USER GO FOR ANOTHER FIELD EDITION
    setToolCenter(ticketData?.tool_center ? ticketData?.tool_center : "");
    // if (ticketData?.saledata?.company_name != null)
    if (type == "order_date") {
      setEditMode(1);
      const showData = showEdit ? !showEdit : true;
      setShowEdit(showData);
    } else if (type == "due_date") {
      const showData = showEdit ? !showEdit : true;
      setShowEdit(showData);
      setEditMode(2);
    } else if (type == "tool_center") {
      setEditMode(3);
      setShowEdit(false);
    } else {
      setEditMode(0);
      setShowEdit(false);
    }
  };

  /** AUTO FOCUS INPUT FIELD - TOOL CENTER */
  useEffect(() => {
    if (editMode === 3 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const handleDateUpdate = async (fieldName, value) => {
    const setDateTime = value ? dayjs(value._d).format() : null; // Allow null values
    if (!isLoading) {
      setLoading(true);
      setEditMode(0);
      try {
        setUserData((prevUserData) => {
          let updatedUserData;
          if (fieldName === "due_date") {
            updatedUserData = {
              ...prevUserData,
              due_date: setDateTime, // Allow empty due_date
              updateKeyValue: "DueDateUpdated",
              activeWorkSpace: workSpaceId,
            };
          } else if (fieldName === "order_date") {
            updatedUserData = {
              ...prevUserData,
              order_date: setDateTime, // Allow empty order_date
              updateKeyValue: "OrderDateUpdated",
              activeWorkSpace: workSpaceId,
            };
          } else {
            updatedUserData = prevUserData;
          }

          // Now, call the API with the updatedUserData
          updateRefreshTicket(updatedUserData);
          return updatedUserData;
        });
      } finally {
        setLoading(false);
      }
    }
  };


  const handleOrderIdSubmit = async (e) => {
    e.preventDefault();
    if (orderID?.length == 0 || orderID === null) return;
    if (!isLoading) {
      setLoading(true);

      try {
        // Update orderId in the local state
        setUserData((prevUserData) => {
          const updatedUserData = {
            ...prevUserData,
            order_id: orderID,
            updateKeyValue: "OrderIDUpdated",
          };
          return updatedUserData;
        });
        setOrderIdForm(false);

        // Now, call the API with the updatedUserData
        const updatedUserData = {
          ...userData,
          order_id: orderID,
          updateKeyValue: "OrderIDUpdated",
        };
        await updateRefreshTicket(updatedUserData);
      } finally {
        // Reset the loading state after the API call is complete
        setLoading(false);
      }
    }
  };

  const handleOrderIdCancel = () => {
    setOrderID(userData?.order_id);
    setOrderIdForm(false);
  };

  /** PARTICIPANT CELL DESIGN */
  const ParticipantCellData = ({ data, keyVal }) => {
    let count = 0;
    let remainingCount = [];

    return (
      <Fragment>
        <div key={keyVal?.toString()?.replace("#", "")}>
          <div className="data_section_list_data">
            {data &&
              data.map((val, i) => {
                if (count <= 5) {
                  count++;
                  return (
                    <LogoAvatarShowLetter
                      genaralData={val}
                      profileName={"display_name"}
                      outerClassName={"data_section_list_image"}
                      innerClassName={""}
                      index={
                        "participants-" +
                        keyVal?.toString()?.replace("#", "") +
                        i
                      }
                      key={
                        "participants-" +
                        keyVal?.toString()?.replace("#", "") +
                        i
                      }
                    ></LogoAvatarShowLetter>
                  );
                } else {
                  remainingCount = [
                    ...remainingCount,
                    { name: val.display_name },
                  ];
                  return null; // Do not render the additional avatars for now
                }
              })}
            {remainingCount?.length > 0 && (
              <div className="data_section_list_image">
                <span
                  className="avatars__others"
                  title={remainingCount.map((n) => n.name)}
                >{`+${remainingCount?.length}`}</span>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const addNewLabel = (id) => {
    setTicketlabel([...ticketlabel, id]);
  };

  const addLabel = (id) => {
    const parsedId = parseInt(id);
    if (!ticketlabel.includes(parsedId)) {
      setTicketlabel([...ticketlabel, parsedId]);
    } else {
      const updatedTicketlabel = ticketlabel.filter(
        (labelId) => labelId !== parsedId
      );
      setTicketlabel(updatedTicketlabel);
    }
  };

  const handleChangedLabel = async (e) => {
    e.preventDefault();
    if (ticketlabel?.length === 0) return;
    if (!isLoading) {
      setLoading(true);
      try {
        // Update orderId in the local state
        setUserData((prevUserData) => {
          const updatedUserData = {
            ...prevUserData,
            ticket_labels: ticketlabel,
            updateKeyValue: "TicketLabelSelected",
          };
          return updatedUserData;
        });
        const showData = showLabel ? !showLabel : true;
        setShowLabel(showData);

        // Now, call the API with the updatedUserData
        const updatedUserData = {
          ...userData,
          ticket_labels: ticketlabel,
          updateKeyValue: "TicketLabelSelected",
        };
        await updateRefreshTicket(updatedUserData);
      } finally {
        // Reset the loading state after the API call is complete
        setLoading(false);
      }
    }
  };

  const handleCancelLabel = (e) => {
    e.preventDefault();
    setShowLabel(false);
    setSearchInput("");
    setTicketlabel(
      ticketData?.ticket_labels?.length > 0
        ? ticketData?.ticket_labels.map((label) => label.label_id)
        : []
    );
  };

  const [labelList, { getLabels }] = useLabel();

  useEffect(() => {
    getLabels({ activeWorkSpace: workSpaceId });
  }, []);

  const filteredLabels = labelList.data.filter((label) =>
    label?.name?.toLowerCase()?.includes(searchInput?.toLowerCase())
  );

  const handleChangeLabel = () => {
    const showData = showLabel ? !showLabel : true;
    setShowLabel(showData);
    setEditMode(0);
  };

  /** TOOL CENTER - HANDLE UPDATE FORM */
  const handleToolCenterUpdate = (e) => {
    const toolCenterVal = e.target.value;
    if (
      toolCenterVal.length > 0 &&
      !appConstants.VALIDATION_PATTERNS.customUrl.test(toolCenterVal)
    ) {
      setToolCenter(toolCenterVal);
      setErrorMsg({ ...errorMsg, toolCenter: true });
      return false;
    } else {
      setToolCenter(toolCenterVal);
      setErrorMsg({ ...errorMsg, toolCenter: false });
      setEditMode(3);
    }
  };

  /** TOOL CENTER - SUBMIT UPDATED FORM */
  const handleToolCenterSubmit = async (e) => {
    e.preventDefault();
    // if (toolCenter?.length == 0){
    //   setErrorMsg({ ...errorMsg, toolCenter: true });
    //   return;
    // }
    // CHECK WHETHER ANY CHANGE HAPPENS ON TOOL CENTER VALUE ELSE EXIT
    if (
      (toolCenter.length === 0 && userData.tool_center === null) ||
      (toolCenter.length > 0 &&
        userData.tool_center != null &&
        toolCenter == userData.tool_center)
    ) {
      setEditMode(0);
      return;
    }
    if (!isLoading) {
      setLoading(true);

      try {
        // Update orderId in the local state
        setUserData((prevUserData) => {
          const updatedUserData = {
            ...prevUserData,
            tool_center: toolCenter,
            updateKeyValue: "ToolCenterUpdated",
          };
          return updatedUserData;
        });
        setEditMode(0);

        // Now, call the API with the updatedUserData
        const updatedUserData = {
          ...userData,
          tool_center: toolCenter,
          updateKeyValue: "ToolCenterUpdated",
        };
        await updateRefreshTicket(updatedUserData);
      } finally {
        // Reset the loading state after the API call is complete
        setLoading(false);
      }
    }
  };

  /** TOOL CENTER - CANCEL FORM */
  const handleToolCenterCancel = () => {
    setToolCenter(userData?.tool_center);
    setErrorMsg({ ...errorMsg, toolCenter: false });
    setEditMode(0);
  };

  const handleWatchMember = (reg_id) => {
    const data = watchlistUser.map((user) => {
      if (user.reg_id === reg_id) {
        const setIcon = user.isWatcher ? !user.isWatcher : true;
        return { ...user, isWatcher: setIcon };
      } else return user;
    });
    setWatchlistUser(data);
  };

  const onSearchWatchMember = (val) => {
    setShowWacthers(true);
    setWatchlistUser(
      getWatchlistUser !== null
        ? getWatchlistUser.filter(
          (user) =>
            (user.display_name &&
              user.display_name
                .toLocaleLowerCase()
                .includes(val.toLocaleLowerCase())) ||
            (user.dept_name &&
              user.dept_name
                .toLocaleLowerCase()
                .includes(val.toLocaleLowerCase()))
        )
        : []
    );
  };

  /** APPROVE ADD WATCH AGENCY USER */
  const triggerApproveAddWatchAgency = async (data) => {
    setSearch("");
    setShowWacthers(false);
    try {
      const response = await addAgencyWatchlist(data);
      if (response?.data?.status) {
        dispatch(
          showToast({ message: response?.data?.message, variant: "success" })
        );
        setShowWacthers(false);
        setSearch("");
        refreshData();
      } else {
        dispatch(
          showToast({ message: response?.data?.message, variant: "danger" })
        );
      }
    } catch (error) { }
  };

  const handleshowWacthers = (addWatch) => {
    if (addWatch === "addWatch") {
      const setVal = showWacthers ? !showWacthers : true;
      setShowWacthers(setVal);
    } else if (addWatch === "saveWatchers") {
      const ticketId = ticketData?.ticket_id;
      const data = watchlistUser
        .filter((item) => item.isWatcher)
        .map((item) => item.reg_id);
      const paramData = {
        ticket_id: ticketId,
        regId: data,
      };
      triggerApproveAddWatchAgency(paramData);
    } else {
      setShowWacthers(false);
    }
  };

  /** ADD REMOVE PARTICIPANTS */
  const triggerAddRemoveParticipants = async (data) => {
    setSearch("");
    setShowAddParticipants(false);

    try {
      const response = await addRemoveParticipant(data);
      if (response?.data?.status) {
        dispatch(
          showToast({ message: response?.data?.message, variant: "success" })
        );
        setShowAddParticipants(false);
        setGetParticipantsRemoveList(
          getParticipantsRemoveList.filter(
            (pa) => pa.reg_id !== data?.remove_participant_id
          )
        );
        setSearch("");
        refreshData();
      } else {
        dispatch(
          showToast({ message: response?.data?.message, variant: "danger" })
        );
      }
    } catch (error) { }
  };

  const enableAddParticipants = (e) => {
    const setVal = showAddParticipants ? !showAddParticipants : true;
    setShowAddParticipants(setVal);
    setParticipantsUser(
      participantsUser.map((pa) => {
        return { ...pa, isParticipants: false };
      })
    );
    const paraData = {
      ticket_id: ticketData?.ticket_id,
      regId: participantsUser
        ?.filter((p) => p?.isParticipants)
        ?.map((item) => item?.reg_id),
      remove_participant_id: "",
      updateKeyValue: "ParticipantAdd",
    };
    if (e === "addParticipants") {
      triggerAddRemoveParticipants(paraData);
    } else {
      setSearch("");
      setParticipantsUser(getParticipantsListUser);
    }
  };

  const handleParticipantsMember = (reg_id) => {
    const data = participantsUser.map((user) => {
      if (user.reg_id === reg_id) {
        const setIcon = user.isParticipants ? !user.isParticipants : true;
        return { ...user, isParticipants: setIcon };
      } else return user;
    });
    setParticipantsUser(data);
  };

  const handleParticipantsRemove = (reg_id) => {
    // setGetParticipantsRemoveList(
    //   getParticipantsRemoveList.filter((pa) => pa.reg_id !== reg_id)
    // );
    const paraData = {
      ticket_id: ticketData?.ticket_id,
      regId: [],
      remove_participant_id: reg_id,
      updateKeyValue: "ParticipantRemove",
    };
    triggerAddRemoveParticipants(paraData);
  };

  const onSearchParticipantsMember = (val) => {
    setShowAddParticipants(true);
    setParticipantsUser(
      getParticipantsListUser !== null
        ? getParticipantsListUser.filter(
          (user) =>
            (user.display_name &&
              user.display_name
                .toLocaleLowerCase()
                .includes(val.toLocaleLowerCase())) ||
            (user.dept_name &&
              user.dept_name
                .toLocaleLowerCase()
                .includes(val.toLocaleLowerCase()))
        )
        : []
    );
  };
  const [divWidth, setDivHeight] = useState(window.innerWidth);
  const [collapsCreateDivStyle, setCollapsCreateDivStyle] = useState();
  const [collapsIconStyle, setCollapsIconStyle] = useState();

  useEffect(() => {
    const handleResize = () => {
      setDivHeight(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const periodicDivStyle = {
      margin: `0 ${divWidth >= 1100 ? 0 : -355}px 0 0`,
      overflow: "auto",
      transition: "margin-right 1s ease-in-out",
      /* Other styles if needed */
    };
    setCollapsCreateDivStyle(periodicDivStyle);
  }, [divWidth]);

  const [collaps, setCollaps] = useState(false);
  const expandCollaps = (e) => {
    let showPanel = collaps ? !collaps : true;
    setCollaps(showPanel);
    const periodicDivStyle = {
      ...collapsCreateDivStyle,
      margin: `0 ${showPanel ? 0 : -355}px 0 0`,
    };
    const collapsStyle = {
      right: `${collaps ? 0 : 355}px`,
      transition: "right 1s ease-in-out",
    };
    setCollapsIconStyle(collapsStyle);
    setCollapsCreateDivStyle(periodicDivStyle);
  };
  const doesDeptCodeExist = (code) => {
    return auth?.details?.departmentGetDTO.some(
      (department) => department.deptCode === code
    );
  };
  const formatDateUpcomingWithMicroseconds = (dateString) => {
    const date = new Date(dateString);
    const dayjsDate = dayjs(date);

    // Manually get the microseconds
    const microseconds =
      date.getMilliseconds().toString().padStart(3, "0") + "000";

    // Format the date without microseconds
    const formattedDate = dayjsDate.format("YYYY-MM-DDTHH:mm:ss");

    // Append the microseconds to the formatted date
    return `${formattedDate}.${microseconds}`;
  };

  useEffect(() => {
    if (workSpaceId === 2) {
      const getGreatestReleaseDate = (data) => {
        if (!data || data.length === 0) {
          return "Invalid Date";
        }

        // Extract all valid release dates
        const dates = data
          .map((item) => {
            const time = item.due_date
              ? new Date(item.due_date).getTime()
              : NaN;
            return time;
          })
          .filter((time) => !isNaN(time)); // Filter out invalid dates

        if (dates.length === 0) {
          // If no valid dates are present, return "Invalid Date"
          return "Invalid Date";
        }

        // Find the greatest date
        const maxDate = new Date(Math.max(...dates));
        // Return as ISO string or in the desired format
        return formatDateUpcomingWithMicroseconds(maxDate);
      };

      const greatestReleaseDate = getGreatestReleaseDate(
        ticketData?.tool_requirement
      );
      setToolDueDate(greatestReleaseDate);
    }
  }, [ticketData]);

  return (
    <Fragment>
      {divWidth < 1100 && (
        <div
          className="ticket_info_right-panel-expand__arrow"
          onClick={expandCollaps}
          style={collapsIconStyle}
        >
          <img
            src={collaps ? chevronLeftDuo : chevronRightDuo}
            alt="arrow-icon"
          />
        </div>
      )}
      <div
        className={
          disableClass
            ? "ticket_info_right-panel ticket_info_right-panel-expanded disableClass"
            : "ticket_info_right-panel ticket_info_right-panel-expanded"
        }
        style={collapsCreateDivStyle}
      >
        {/* assignee section */}
        {workSpaceId === 1 && (
          <div className="data_section">
            <div className="data_section_list">
              <span>
                Ticket{" "}
                {auth?.activeDepartmentPermission === "AG"
                  ? "Assignee"
                  : "Owner"}
              </span>
              {userData !== undefined && userData?.assignee !== undefined && (
                <LogoAvatarShowLetter
                  genaralData={userData?.assignee}
                  profileName={"name"}
                  outerClassName={"data_section_list_image"}
                  innerClassName={""}
                ></LogoAvatarShowLetter>
              )}
            </div>

            {onBoradMembersList?.length > 0 &&
              userList?.length > 0 &&
              (auth?.details?.isSuperAdmin ||
                (auth?.restrictions &&
                  Object.keys(auth?.restrictions)?.length !== 0 &&
                  auth?.activeDepartmentPermission &&
                  auth?.restrictions?.[auth?.activeDepartmentPermission]?.tickets?.canTicket_Assignee)) &&
              workSpaceId === 1 && (
                <AssigneeCard
                  assignedUser={userDetails}
                  userList={userList}
                  key="AssigneeCard"
                  onChange={(data) => assignUser(data)}
                  authDeptId={authDeptId}
                  ticketData={ticketData}
                  workSpaceId={workSpaceId}
                />
              )}

          </div>
        )}

        {/* order id section */}
        {workSpaceId === 1 && (
          <div className="data_section">
            <div className="data_section_list order-id">
              <span
                disabled={
                  auth?.details?.isSuperAdmin ||
                    (auth?.restrictions &&
                      Object.keys(auth?.restrictions)?.length !== 0 &&
                      auth?.activeDepartmentPermission &&
                      auth?.restrictions[auth?.activeDepartmentPermission] &&
                      auth?.restrictions[auth?.activeDepartmentPermission]?.tickets?.canOrder_ID_Update)
                    ? false
                    : true
                }
                className={"order_id"}
                tabIndex={0}
              >
                Order ID
              </span>
              {!orderIdForm && orderID && (
                <div className="data_section_list_data orderID">
                  <span>{orderID}</span>
                </div>
              )}
              {orderIdForm && (
                <div className="data_section_list_form">
                  <input
                    className="inputField"
                    placeholder="EUR015562"
                    value={orderID}
                    onChange={handleOrderIdUpdate}
                    maxLength={"100"}
                  />

                  <div className="form-btn">
                    <button onClick={handleOrderIdSubmit}>Save</button>
                    <button onClick={handleOrderIdCancel}>Cancel</button>
                  </div>
                </div>
              )}  </div>
          </div>
        )}
        {/* order date section */}
        {workSpaceId === 1 && (
          <div className="data_section">
            <div className="data_section_list">
              <span>Order date</span>
              {editMode == 1 && showEdit ? (
                <div className="data_section_list_data">
                  <div className="picker-date">
                    <span className="date-label">Date</span>
                    <DateTimeCalendar
                      value={ticketData?.order_date || null} // Allow null
                      dateFormat="DD/MM/YYYY"
                      placeholder="Order Date (Optional)" // Indicate it's optional
                      getDateTime={(d) => handleDateUpdate("order_date", d || null)} // Send null if empty
                      orderDateValidation={false} // Disable validation
                      isDueDate={ticketData?.due_date}
                      timeFormat={workSpaceId === 1}
                    />

                    <span className="icon-ss-calendar"></span>
                  </div>
                </div>
              ) : (
                <div className="data_section_list_data date-show">
                  {ticketData?.order_date ? (
                    <span>
                      {dayjs
                        .utc(ticketData?.order_date)
                        .local()
                        .format("DD/MM/YYYY [at] h:mma [GMT] Z")}
                    </span>
                  ) : (
                    <span className="no-date">No Order Date</span> // Handle empty case
                  )}
                </div>
              )}
            </div>

            {/* Edit Button */}
            <div className="data_section_update DateTimeCalendar">
              <button
                onClick={() => handleEditClick("order_date")}
                disabled={
                  auth?.details?.isSuperAdmin ||
                    (auth?.restrictions &&
                      Object.keys(auth?.restrictions)?.length !== 0 &&
                      auth?.activeDepartmentPermission &&
                      auth?.restrictions[auth?.activeDepartmentPermission] &&
                      auth?.restrictions[auth?.activeDepartmentPermission]?.tickets
                        ?.canOrder_Date_Update &&
                      ticketData?.ticket_flow_dept?.length === 1)
                    ? false
                    : true
                }
              >
                {editMode == 1 && showEdit ? "Cancel" : "Edit"}
              </button>
            </div>
          </div>
        )}


        {/* due date section */}
        {workSpaceId !== 2 && (
          <div className="data_section" style={{ paddingTop: "16px" }}>
            <div className="data_section_list">
              <span>Due date</span>
              {editMode == 2 && showEdit ? (
                <div className="data_section_list_data">
                  <div className="picker-date">
                    <span className="date-label">Date</span>
                    <DateTimeCalendar
                      value={ticketData?.due_date}
                      dateFormat="DD/MM/YYYY"
                      placeholder="Due date"
                      getDateTime={(d) => handleDateUpdate("due_date", d)}
                      dueDateValidation={true}
                      isOrderDate={ticketData?.order_date}
                      timeFormat={workSpaceId === 1 ? true : false}
                    />
                    <span className="icon-ss-calendar"></span>
                  </div>
                </div>
              ) : (
                <div className="data_section_list_data date-show">
                  {ticketData?.due_date && (
                    <span>
                      {dayjs
                        .utc(ticketData?.due_date)
                        .local()
                        .format("DD/MM/YYYY")}
                      {/* .format("DD/MM/YYYY [at] h:mma [GMT] Z")} */}
                    </span>
                  )}
                </div>
              )}
            </div>
            {
              <div className="data_section_update DateTimeCalendar">
                <button
                  onClick={() => handleEditClick("due_date")}
                  disabled={
                    auth?.details?.isSuperAdmin ||
                      (auth?.restrictions &&
                        Object.keys(auth?.restrictions)?.length !== 0 &&
                        auth?.activeDepartmentPermission &&
                        auth?.restrictions[auth?.activeDepartmentPermission] &&
                        auth?.restrictions[auth?.activeDepartmentPermission]?.tickets?.canDue_Date_Update)
                      ? false
                      : true
                  }
                >
                  {editMode == 2 && showEdit ? "Cancel" : "Edit"}
                </button>
              </div>
            }
          </div>
        )}
        {/* labels section */}
        {(workSpaceId === 1 || workSpaceId === 2 || workSpaceId === 3) &&
          auth?.details?.user_type === null && (
            <div className="data_section">
              <div className="data_section_list">
                <span>Labels</span>
                {userData?.ticket_labels && labelList.data && (
                  <div className="data_section_list_data">
                    {labelList.data
                      .filter((label) =>
                        userData?.ticket_labels.includes(label.labelId)
                      )
                      .map((e) => (
                        <span
                          className={`data_section_list_data_labelBox`}
                          style={{
                            backgroundColor: e?.colorcode,
                            color: isDark(e?.colorcode) ? "white" : "black",
                          }}
                        >
                          {e?.name}
                        </span>
                      ))}
                  </div>
                )}
              </div>
              <div className="data_section_update" ref={popupRef}>
                <button
                  onClick={() => handleChangeLabel()}
                  disabled={
                    auth?.details?.isSuperAdmin ||
                      hasNullCodeForTicketValue ||
                      (auth?.restrictions &&
                        Object.keys(auth?.restrictions)?.length !== 0 &&
                        auth?.activeDepartmentPermission &&
                        auth?.restrictions?.[auth?.activeDepartmentPermission]?.tickets?.canTicket_Assignee &&
                        auth?.details?.user_type === null)
                      ? false
                      : true
                  }

                >
                  Edit
                </button>

                {showLabel && (
                  <div className="label-list-box assignee-container">
                    <header className="header-flex">
                      <span className="header-text">Labels</span>{" "}
                      <div className="buttons">
                        <button
                          className="save-label-btn"
                          onClick={handleCancelLabel}
                        >
                          Cancel
                        </button>
                        <button
                          className="save-label-btn"
                          onClick={handleChangedLabel}
                        >
                          Save
                        </button>
                      </div>
                    </header>
                    <div className="search-label">
                      <input
                        onChange={handleSearchInputChange}
                        className="search-label-input"
                        placeholder="Search labels"
                        // disabled={boardData.data.length === 0 ? true : false}
                        value={searchInput}
                      />
                      <img
                        className="search-icon"
                        src={searchIcon}
                        alt="searchIcon"
                      />
                    </div>
                    <div className="labelList">
                      <ul className="labelList-names">
                        {filteredLabels.map((l) => {
                          return (
                            <li onClick={() => addLabel(parseInt(l?.labelId))}>
                              <img
                                src={
                                  ticketlabel?.includes(parseInt(l?.labelId))
                                    ? checkedIcon
                                    : unChecked
                                }
                                alt="checkbox"
                              />{" "}
                              <span
                                style={{ backgroundColor: l?.colorcode }}
                                className="color-box"
                              ></span>{" "}
                              {l?.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        {/* participants section */}
        {(workSpaceId === 1) && (
          <div
            className={`data_section_participants  ${ticketData?.participants?.length > 2 ? "participants" : ""
              }
`}
            ref={participantsRef}
          >
            <div className={`data_section_list flex-display`}>
              <div>
                <span>Participants </span>
                {ticketData?.participants?.length > 0 &&
                  !showAddParticipants && (
                    <span className="data_section_list_count">
                      {ticketData?.participants?.length}
                    </span>
                  )}
              </div>
              {workSpaceId === 1 && (
                <div className="data_section_update">
                  <button
                    className={`add-watchers-btn ${participantsUser?.some((ch) => ch.isParticipants === true)
                      ? "save"
                      : ""
                      }`}
                    onClick={() =>
                      enableAddParticipants(
                        participantsUser?.some(
                          (ch) => ch.isParticipants === true
                        )
                          ? "addParticipants"
                          : ""
                      )
                    }
                  // disabled={
                  //   appConstants.periodic.ticketToolEditableStages.includes(
                  //     ticketData?.label_code
                  //   ) &&
                  //   (allowMemberEdit ||
                  //     auth?.details?.roleId === 2 ||
                  //     (auth?.restrictions &&
                  //       Object.keys(auth?.restrictions)?.length !== 0 &&
                  //       auth?.activeDepartmentPermission &&
                  //       auth?.restrictions[auth?.activeDepartmentPermission][
                  //         "tickets"
                  //       ]?.canTicket_Assignee))
                  //     ? false
                  //     : true
                  // }
                  >
                    {!showAddParticipants && "Add"}
                    {participantsUser?.some(
                      (ch) => ch.isParticipants === true
                    ) && "Save"}
                  </button>
                  <button
                    className={`add-watchers-btn ${participantsUser?.some((ch) => ch.isParticipants === true)
                      ? "save"
                      : ""
                      }`}
                    onClick={() => enableAddParticipants("cancel")}
                    disabled={
                      appConstants.periodic.ticketToolEditableStages.includes(
                        ticketData?.label_code
                      ) &&
                        (allowMemberEdit ||
                          auth?.details?.roleId === 2 ||
                          (auth?.restrictions &&
                            Object.keys(auth?.restrictions)?.length !== 0 &&
                            auth?.activeDepartmentPermission &&
                            auth?.restrictions[auth?.activeDepartmentPermission][
                              "tickets"
                            ]?.canTicket_Assignee))
                        ? false
                        : true
                    }
                  >
                    {showAddParticipants && "Cancel"}
                  </button>
                </div>
              )}
            </div>
            {ticketData?.participants && !showAddParticipants && (
              <ParticipantCellData data={ticketData?.participants} />
            )}
            {showAddParticipants && (
              <Fragment>
                <div className="participants_search">
                  <input
                    className="participants_search_input"
                    placeholder="Search members"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      onSearchParticipantsMember(e.target.value);
                    }}
                  />
                  <img
                    className="searchIcon"
                    src={searchIcon}
                    alt="searchIcon"
                  />
                </div>

                <div className="participants_scroll">
                  {getParticipantsRemoveList.length > 0 &&
                    search?.length === 0 && (
                      <div className="participants_dropdwon border-bottom">
                        <h5 className="participants_heading">
                          Edit Participants
                        </h5>
                        <ul className="participants_dropdwon_list">
                          {getParticipantsRemoveList?.map((participants, i) => {
                            const deleteParticipants =
                              ticketData?.assign_to === auth?.details?.regId ||
                              // ticketData?.tool_requirement?.some(
                              //   (user) =>
                              //     user?.assignee[0]?.reg_id ===
                              //     auth?.details?.regId
                              // ) ||
                              ticketData?.participants?.some(
                                (user) => user?.reg_id === ticketData?.added_by
                              ) ||
                              ticketData?.participants?.some(
                                (user) => user?.reg_id === ticketData?.added_by
                              ) ||
                              auth?.details?.isSuperAdmin ||
                              auth?.details?.roleHierarchy === 1 ||
                              participants?.reg_id === auth?.details?.regId;

                            const cannotDeleteParticipants =
                              ticketData?.added_by === participants?.reg_id ||
                              // ticketData?.tool_requirement.some(
                              //   (user) =>
                              //     user?.assignee[0]?.reg_id ===
                              //     participants?.reg_id
                              // ) ||
                              ticketData?.assign_to === participants?.reg_id;

                            return (
                              <li
                                key={i}
                                className={` ${deleteParticipants ? "" : "disabled"
                                  }
                                 ${cannotDeleteParticipants ? "disabled" : ""}
                                `}
                              >
                                <LogoAvatarShowLetter
                                  genaralData={participants}
                                  profileName={"display_name"}
                                  outerClassName={"data_section_list_image"}
                                  innerClassName={"userNull-image"}
                                ></LogoAvatarShowLetter>
                                <div className="participants-details">
                                  <p className="participants-name">
                                    {participants.display_name}
                                  </p>
                                </div>
                                <div
                                  className="list__checkbox crossMarkNotFill"
                                  onClick={() =>
                                    handleParticipantsRemove(
                                      participants?.reg_id
                                    )
                                  }
                                >
                                  <img
                                    src={crossMarkNotFill}
                                    alt="crossMarkNotFill"
                                  />
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                  <div className="participants_dropdwon">
                    <h5 className="participants_heading">Suggest Members</h5>
                    <ul className="participants_dropdwon_list">
                      {participantsUser.length > 0 ? (
                        participantsUser?.map((participants, i) => {
                          const addParticipants =
                            ticketData?.participants?.some(
                              (user) => user?.reg_id === ticketData?.added_by
                            ) ||
                            ticketData?.assign_to === auth?.details?.regId ||
                            ticketData?.tool_requirement?.some(
                              (user) =>
                                user?.assignee[0]?.reg_id ===
                                auth?.details?.regId
                            ) ||
                            auth?.details?.isSuperAdmin ||
                            auth?.details?.roleHierarchy === 1 ||
                            participants?.reg_id === auth?.details?.regId;
                          return (
                            <li
                              key={i}
                              onClick={() =>
                                handleParticipantsMember(participants?.reg_id)
                              }
                              className={`user-selection ${addParticipants ? "" : "disabled"
                                }`}
                            >
                              <div className="list__checkbox">
                                {participants?.isParticipants ? (
                                  <img src={checkedIcon} alt="checkedIcon" />
                                ) : (
                                  <img src={unChecked} alt="unchecked" />
                                )}
                              </div>
                              <LogoAvatarShowLetter
                                genaralData={participants}
                                profileName={"display_name"}
                                outerClassName={"data_section_list_image"}
                                innerClassName={"userNull-image"}
                              ></LogoAvatarShowLetter>
                              <div className="participants-details">
                                <p className="participants-name">
                                  {participants.display_name}
                                </p>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li className="no-user-found">No User name found</li>
                      )}
                    </ul>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        )}
        {/* TOOL CENTER */}
        {(workSpaceId === 1 && ticketData?.saledata?.company_name !== null) && (
          <div className="data_section">
            <div className="data_section_list tool-center-link">
              <span>Tool Center</span>
              {editMode == 3 ? (
                <div className="data_section_list_form">
                  <input
                    className="inputField"
                    placeholder="https://"
                    value={toolCenter}
                    onChange={handleToolCenterUpdate}
                    ref={inputRef}
                  />
                  <label className="error-msg">
                    {errorMsg.toolCenter === true && "Please enter valid url"}
                  </label>

                  <div className="form-btn">
                    <button
                      className={toolCenter.length > 0 && "active"}
                      onClick={handleToolCenterCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className={toolCenter.length > 0 && "active"}
                      disabled={errorMsg.toolCenter ? true : false}
                      onClick={handleToolCenterSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                toolCenter && (
                  <div className="tool-center-link-content">
                    <a
                      href={toolCenter}
                      className="tool-center-link-content-name"
                      target="_blank"
                      title={toolCenter} rel="noreferrer"
                    >
                      Click to view Tool Center
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default RightPanel;
