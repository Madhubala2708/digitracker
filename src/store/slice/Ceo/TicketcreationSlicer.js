import { createSlice } from "@reduxjs/toolkit";
import { 
  createNewTicketTaskAction,
  createticketAction, 
  getticketbyidAction, 
  getTicketLabelsAction, 
  updateProjectApprovalAction,
  updateTicketStatusAction
} from "../../actions/Ceo/TicketCreateAction";

const initialState = {
  ticketDetails: null,
  createticket: [],
  labels: [],
  ticketsByLabel: {},
  newTicketTasks: [],
  loading: false,
  error: null,
  success: false,
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    // Reset error and success states
    resetTicketState: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder 
      .addCase(createticketAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createticketAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createticket.push(action.payload);
        
        // Also update the ticket in the appropriate label bucket
        const ticket = action.payload;
        const status = ticket.status || 'Open';
        
        if (state.ticketsByLabel[status]) {
          state.ticketsByLabel[status].push(ticket);
        } else if (state.labels.includes(status)) {
          state.ticketsByLabel[status] = [ticket];
        } else {
          // If status doesn't match any existing label, add it to Open
          if (state.ticketsByLabel['Open']) {
            state.ticketsByLabel['Open'].push(ticket);
          } else {
            state.ticketsByLabel['Open'] = [ticket];
          }
        }
      })
      .addCase(createticketAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getTicketLabelsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTicketLabelsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.labels = action.payload.labels || [];
        state.ticketsByLabel = action.payload.ticketsByLabel || {};
      })
      .addCase(getTicketLabelsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getticketbyidAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getticketbyidAction.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketDetails = action.payload;
      })
      .addCase(getticketbyidAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProjectApprovalAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectApprovalAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (state.ticketDetails) {
          state.ticketDetails.isapproved = action.payload.isapproved;
          state.ticketDetails.approved_by = action.payload.approved_by || "Unknown";
        }
      })
      .addCase(updateProjectApprovalAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update project approval';
        state.success = false;
      })
      .addCase(updateTicketStatusAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTicketStatusAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        const updatedTicket = action.payload;
        const oldStatus = updatedTicket.previousStatus || 'Open';
        const newStatus = updatedTicket.status;
        
        // Remove from old status
        if (state.ticketsByLabel[oldStatus]) {
          state.ticketsByLabel[oldStatus] = state.ticketsByLabel[oldStatus].filter(
            ticket => ticket.ticketId !== updatedTicket.ticketId
          );
        }
        
        // Add to new status
        if (state.ticketsByLabel[newStatus]) {
          state.ticketsByLabel[newStatus].push(updatedTicket);
        } else {
          state.ticketsByLabel[newStatus] = [updatedTicket];
        }
        
        // Update ticket details if it's the currently selected ticket
        if (state.ticketDetails && state.ticketDetails.ticketId === updatedTicket.ticketId) {
          state.ticketDetails = {
            ...state.ticketDetails,
            status: newStatus
          };
        }
      })
      .addCase(updateTicketStatusAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update ticket status';
        state.success = false;
      })
      .addCase(createNewTicketTaskAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewTicketTaskAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.newTicketTasks.push(action.payload); // payload contains newtasktitle & generated ticketId
      })
      .addCase(createNewTicketTaskAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create new ticket task";
        state.success = false;
      });
      
  },
});

export const { resetTicketState } = ticketSlice.actions;
export default ticketSlice.reducer;