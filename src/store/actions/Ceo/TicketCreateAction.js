import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTicket, createNewTicketTask, createprojectapproval, getTicketById, getTicketLabels, updateprojectapproval } from "../../../services";


export const createticketAction = createAsyncThunk(
  "createTicket",
  async (ticketPayload) => {
    const response = await addTicket(ticketPayload);
    return response.data;
  }
);

export const createNewTicketTaskAction = createAsyncThunk(
  "ticket/createNewTicketTask",
  async (params, thunkAPI) => {
    try {
      const response = await createNewTicketTask(params); // directly pass full object
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Task creation failed");
    }
  }
);


export const getTicketLabelsAction = createAsyncThunk(
  "ticketLabels/getLabels",
  async (empId, { rejectWithValue }) => {
    try {
      // Make request to get employee data including tickets
      const response = await fetch(
        `${process.env.REACT_APP_MASTER_API_BASE_URL}/api/Login/board-details/${empId}`,
      );
      
      // Log response for debugging
      console.log('Employee data response:', response);
      
      // Extract tickets from the response
      const tickets = response.data?.tickets || [];
      
      // Get unique status values from tickets or use default if none found
      const uniqueStatuses = [...new Set(tickets.map(t => t.status))];
      const labels = uniqueStatuses.length > 0 
        ? uniqueStatuses 
        : ['Open', 'In Progress', 'Review', 'Completed'];
      
      // Group tickets by their status/label
      const ticketsByLabel = {};
      
      // Initialize all labels with empty arrays
      labels.forEach(label => {
        ticketsByLabel[label] = [];
      });
      
      // Sort tickets into their respective labels
      tickets.forEach(ticket => {
        const status = ticket.status || 'Open'; // Default to Open if no status
        if (ticketsByLabel[status]) {
          ticketsByLabel[status].push(ticket);
        } else {
          // If status doesn't match any label, put it in Open
          ticketsByLabel['Open'] = ticketsByLabel['Open'] || [];
          ticketsByLabel['Open'].push(ticket);
        }
      });
      
      return {
        labels,
        ticketsByLabel
      };
    } catch (error) {
      console.error('API request failed:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getticketbyidAction = createAsyncThunk(
  "getticket/byid",
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await getTicketById(ticketId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProjectApprovalAction = createAsyncThunk(
  'updateprojectapproval/submit',
  async ({ payload, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_MASTER_API_BASE_URL}/api/Ticket/update-ticket-by-id`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        let errorMessage = 'Failed to update project approval';
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch (err) {}
        return rejectWithValue(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred during the update');
    }
  }
);

// New action to update ticket status (drag and drop functionality)
export const updateTicketStatusAction = createAsyncThunk(
  'ticket/updateStatus',
  async ({ ticketId, newStatus, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_MASTER_API_BASE_URL}/api/Ticket/update-ticket-status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ticketId,
            status: newStatus
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = 'Failed to update ticket status';
        return rejectWithValue(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred during status update');
    }
  }
);