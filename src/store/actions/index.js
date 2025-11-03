import { createAsyncThunk } from "@reduxjs/toolkit";

import { getLogin, logout, getUserInfo, getUserDetailsById, agencyUserSignUp } from "../../services";

export const loginAction = createAsyncThunk("login", async params => {
  const response = await getLogin(params);
  return response.data;
});

export const logoutAction = createAsyncThunk("logout", async params => {
  const response = await logout(params);
  return response.data;
});

/** GET CURRENT LOGGED IN USER INFORMATION FROM GRAPTH EXPLORER - MICROSOFT AZURE */
// export const userProfileAction = createAsyncThunk("userProfile", async params => {
//   const response = await getUserProfile(params);
//   return response.data;
// });

/** GET CURRENT LOGGED IN USER INFORMATION */
export const userInfoAction = createAsyncThunk("userInfo", async params => {
  const response = await getUserInfo(params);
  return response.data;
});

/** GET USER INFORMATION BY ID */
export const userDetailsByIdAction = createAsyncThunk("userDetailsById", async params => {
  const response = await getUserDetailsById(params);
  return response.data;
});

/** GET AGENCY USER SIGNUP */
export const agencyUserSignUpAction = createAsyncThunk("agencyUserSignUp", async params => {
  const response = await agencyUserSignUp(params);
  return response.data;
});