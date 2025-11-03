import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomersAction, getCustomerOverviewAction, getCustomerOrdersInvoicesAction,getCustomerServicesLinksAction, } from "../store/actions/customerAction";
import { customerSelector, customerOverviewSelector, customerOrdersInvoicesSelector, customerServicesLinksSelector, } from "../store/selector/customerSelector";
import appConstants from '../constant/common';

/** CUSTOMER */
export const useCustomer = () => {
  const customerList = useSelector(customerSelector);
  const dispatch = useDispatch();
  const getCustomerData = useCallback(
    (params) => dispatch(getCustomersAction(params)),
    [dispatch]
  );
  // useEffect(()=>{
  //   let defaultParam = {
  //     offsetno: appConstants.pageOffSet,
  //     pagesize: appConstants.pageSize,
  //   }
  //   return () => dispatch(getCustomersAction(defaultParam));
  // },[]);
  return [customerList, { getCustomerData }];
};

/** Customer Overview Info*/
export const useCustomerOverview = () => {
  const customerOverviewInfo = useSelector(customerOverviewSelector);
  const dispatch = useDispatch();
  const getCustomerOverviewInfo = useCallback(
    (params) => dispatch(getCustomerOverviewAction(params)),
    [dispatch]
  );

  return [customerOverviewInfo, {getCustomerOverviewInfo}];
}
/** Customer Orders Invoices **/
export const useCustomerOrders = () => {
  const customerOrdersInvoices = useSelector(customerOrdersInvoicesSelector);
  const dispatch = useDispatch();
  const getCustomerOrdersInvoices = useCallback(
    (params) => dispatch(getCustomerOrdersInvoicesAction(params)),
    [dispatch]
  );

  return [customerOrdersInvoices, {getCustomerOrdersInvoices}];
}
/** Customer Services Links **/

export const useCustomerServicesLinks = () => {
  const customerServicesLinks = useSelector(customerServicesLinksSelector);
  const dispatch = useDispatch();
  const getCustomerServicesLinks = useCallback(
    (params) => dispatch(getCustomerServicesLinksAction(params)),
    [dispatch]
  );

  return [customerServicesLinks, {getCustomerServicesLinks}];
}