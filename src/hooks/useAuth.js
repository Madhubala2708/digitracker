import { useCallback, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelector, setAuthAction } from "../store/slice/auth";
import {
  loginAction,
  logoutAction,
  userInfoAction,
  userDetailsByIdAction,
} from "../store/actions";

const useAuth = () => {
  const dispatch = useDispatch();
  const { data, loading, error, logoutError, logoutLoading } = useSelector(
    authSelector
  );

  const getAuth = useCallback((params) => dispatch(loginAction(params)), [
    dispatch,
  ]);
  const setAuth = useCallback((params) => dispatch(setAuthAction(params)), [
    dispatch,
  ]);
  const logout = useCallback(() => dispatch(logoutAction()), [dispatch]);
  const getUserInfo = useCallback(
    (params) => dispatch(userInfoAction(params)),
    [dispatch]
  );
  const getUserDetailsById = useCallback(
    (params) => dispatch(userDetailsByIdAction(params)),
    [dispatch]
  );
  return [
    { data, loading, error, logoutError, logoutLoading },
    { getAuth, setAuth, getUserInfo, getUserDetailsById, logout },
  ];
};

export default useAuth;
