import { createSelector } from "reselect";

/** CUSTOMER */
export const customerSelector = createSelector(
    [
      state => state.customer.list.data,
      state => state.customer.list.loading,
      state => state.customer.list.error,
    ],
    (data, loading, error) => ({
      data,
      loading,
      error,
    })
);

/** Customer Overview Info **/
export const customerOverviewSelector = createSelector(
    [
      state => state.customer.overview.data,
      state => state.customer.overview.loading,
      state => state.customer.overview.error,
    ],
    (data, loading, error) => ({
      data,
      loading,
      error,
    })
);
 /** CUSTOMER ORDERS & INVOICES*/

 export const customerOrdersInvoicesSelector = createSelector(
  [
    state => state.customer.ordersInvoices.data,
    state => state.customer.ordersInvoices.loading,
    state => state.customer.ordersInvoices.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** USED TO GET CUSTOMER SERVICES LINKS */


export const customerServicesLinksSelector = createSelector(
  [
    state => state.customer.servicesLinks.data,
    state => state.customer.servicesLinks.loading,
    state => state.customer.servicesLinks.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);