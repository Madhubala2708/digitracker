import { createSelector } from 'reselect';

const ticketManagementSelector = (field) => ({
  getData: (state) => state.ticketManagement[field].data,
  getLoading: (state) => state.ticketManagement[field].loading,
  getError: (state) => state.ticketManagement[field].error,
});

const fields = ['suggestedMembers', 'customerSearch', 'customerSearchwithType'];

const selectors = fields.reduce((acc, field) => {
  const { getData, getLoading, getError } = ticketManagementSelector(field);

  // acc[`select${field.charAt(0).toUpperCase() + field.slice(1)}`]
  acc[`${field}Selector`] = createSelector(
    getData,
    getLoading,
    getError,
    (data, loading, error) => ({ data, loading, error })
  );

  return acc;
}, {});

export const {
  suggestedMembersSelector,
  customerSearchSelector,
  customerSearchwithTypeSelector,
} = selectors;