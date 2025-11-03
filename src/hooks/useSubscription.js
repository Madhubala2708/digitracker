import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPackagesAction, addPackageAction, updatePackageAction, deletePackageAction } from "../store/actions/subscriptionAction";
import { subscriptionSelector } from "../store/selector/subscriptionSelector";

/** SUBSCRIPTION LIST */
export const useSubscription = () => {

  const dispatch = useDispatch();
  const listData = useSelector(subscriptionSelector);

  /** TO GET ALL PACKAGES */
  const getAllPackage = useCallback(
    (params) => dispatch(getAllPackagesAction(params)),
    [dispatch]
  );

  /** ADD PACKAGE */
  const addPackage = useCallback(
    (params) => dispatch(addPackageAction(params)),
    [dispatch]
  );

  /** UPDATE PACKAGE */
  const updatePackage = useCallback(
    (params) => dispatch(updatePackageAction(params)),
    [dispatch]
  );

  /** UPDATE PACKAGE */
  const deletePackage = useCallback(
    (params) => dispatch(deletePackageAction(params)),
    [dispatch]
  );

  return [ listData, { getAllPackage, addPackage, updatePackage, deletePackage }];
};