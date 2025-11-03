export const selectApprovals = (state) => state.ticket?.approvals || [];
export const selectTicketDetails = (state) => state.ticket?.ticketDetails || null;
export const selectTickets = (state) => state.ticket?.createticket || [];
export const selectTicketLabels = (state) => state.ticket?.labels || [];
export const selectTicketsByLabel = (state) => state.ticket?.ticketsByLabel || {};
export const selectLabelsLoading = (state) => state.ticket?.loading || false;
export const selectLabelsError = (state) => state.ticket?.error || null;
export const selectNewTicketTasks = (state) => state.ticket?.newTicketTasks || [];
