import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecentNotificationAction } from "../store/actions/notificationAction";
import { notificationSelector } from "../store/selector/notificationSelector";
import appConstants from '../constant/common';

/** NOTIFICATION */
export const useNotification = () => {
  const recentNotification = useSelector(notificationSelector);
  const dispatch = useDispatch();
  const getRecentNotification = useCallback(
    (params) => dispatch(getRecentNotificationAction(params)),
    [dispatch]
  );
  return [recentNotification, getRecentNotification];
};