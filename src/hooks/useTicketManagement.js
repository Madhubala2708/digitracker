import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  suggestedMembersAction,
  customerSearchAction,
  customerSearchwithTypeAction
} from "../store/actions/ticketManagementAction";

import { suggestedMembersSelector, customerSearchSelector, customerSearchwithTypeSelector } from "../store/selector/ticketManagementSelector";


export const useSuggestedMembers = () => {

  const dispatch = useDispatch();
  const suggestedMembersList = useSelector(suggestedMembersSelector);

  /** TICKET SUGGESTED MEMBER */
  const getSuggestedMembers = useCallback(
    (params) => dispatch(suggestedMembersAction(params)),
    [dispatch]
  );

  // useEffect(()=>{
  //   dispatch(suggestedMembersAction());
  // },[]);

  return [suggestedMembersList, {getSuggestedMembers}];
};

export const useCustomerSearch = () => {

  const dispatch = useDispatch();
  const customerSearchList = useSelector(customerSearchSelector);

  /** CUSTOMER SEARCH - TICKET */
  const getCustomerSearch = useCallback(
    (params) => dispatch(customerSearchAction(params)),
    [dispatch]
  );

  return [customerSearchList, { getCustomerSearch }];
};



export const useCustomerSearchWithType = () => {

  const dispatch = useDispatch();
  const customerCodeNameSearchList = useSelector(customerSearchwithTypeSelector);

  /** CUSTOMER SEARCH - WITH TYPE */
  const getCustomerCodeNameSearchList = useCallback(
    (params) => dispatch(customerSearchwithTypeAction(params)),
    [dispatch]
  );

  return [customerCodeNameSearchList, { getCustomerCodeNameSearchList }];
};