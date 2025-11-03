import { useDispatch, useSelector } from "react-redux";
import { 
  selectApprovals, 
  selectTickets, 
  selectTicketDetails, 
  selectTicketLabels, 
  selectTicketsByLabel, 
  selectLabelsLoading, 
  selectLabelsError, 
  selectNewTicketTasks
} from "../../store/selector/ceo/ticketSelector";
import { 
  updateProjectApprovalAction, 
  createticketAction, 
  getticketbyidAction, 
  getTicketLabelsAction, 
  createNewTicketTaskAction
} from "../../store/actions/Ceo/TicketCreateAction";

export const useTicket = () => {
  const dispatch = useDispatch();

  const ticket = useSelector(selectTickets);
  const ticketDetails = useSelector(selectTicketDetails);
  const approvals = useSelector(selectApprovals);
  const labels = useSelector(selectTicketLabels);
  const ticketsByLabel = useSelector(selectTicketsByLabel);
  const loading = useSelector(selectLabelsLoading);
  const error = useSelector(selectLabelsError);
  const newTicketTasks = useSelector(selectNewTicketTasks);

  const createTicket = async (ticketData) => {
    try {
      const result = await dispatch(createticketAction(ticketData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to create ticket:", error);
      return { success: false, error };
    }
  };

  const fetchLabelsByEmployeeId = async (employeeId) => {
    try {
      const result = await dispatch(getTicketLabelsAction(employeeId)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to fetch ticket labels:", error);
      return { success: false, error };
    }
  };

  const fetchTicketById = async (ticketId) => {
    try {
      const result = await dispatch(getticketbyidAction(ticketId)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to fetch ticket by ID:", error);
      return { success: false, error };
    }
  };

  const updateProjectApprovalHook = async (approvalData) => {
    try {
      const result = await dispatch(updateProjectApprovalAction(approvalData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to update project approval:", error);
      return { success: false, error };
    }
  };

 

const createNewTicketTaskHook = async (newtasktitle) => {
  try {
    const result = await dispatch(createNewTicketTaskAction({ newtasktitle })).unwrap();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to create new ticket task:", error);
    return { success: false, error };
  }
};


  return {
    ticket,
    ticketDetails,
    approvals,
    labels,
    ticketsByLabel,
    loading,
    error,
    newTicketTasks,
    createTicket,
    fetchTicketById,
    updateProjectApprovalHook,
    fetchLabelsByEmployeeId,
    createNewTicketTaskHook,
  };
};