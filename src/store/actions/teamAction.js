import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMyTeamMembers, getMyTeamMemberProfile, updateMyTeamMemberProfile, getAllMembers, getAllADMembers, addTeamMembers,getAgencyUserList,approveRejectAgencyUser,} from "../../services";

/** USED TO GET ALL MY TEAM MEMBERS */
export const getMyTeamMembersAction = createAsyncThunk("getMyTeamMembers", async params => {
  const response = await getMyTeamMembers();
  return response.data;
});

/** USED TO GET MY TEAM MEMBER PROFILE */
export const getMyTeamMemberProfileAction = createAsyncThunk("getMyTeamMemberProfile", async params => {
    const response = await getMyTeamMemberProfile(params);
    return response.data;
});


/** USED TO UPDATE TEAM MEMBER PROFILE */
export const updateMyTeamMemberProfileAction = createAsyncThunk("updateMyTeamMemberProfile", async params => {
  const response = await updateMyTeamMemberProfile(params);
  return response.data;
});

/** USED TO GET ALL MEMBERS */
export const getAllMembersAction = createAsyncThunk("getAllMembers", async params => {
  const response = await getAllMembers();
  return response.data;
});

/** USED TO GET ALL AD MEMBERS */
export const getAllADMembersAction = createAsyncThunk("getAllADMembers", async params => {
  const response = await getAllADMembers();
  return response.data;
});

/** USED ADD TEAM MEMBERS */
export const addTeamMembersAction = createAsyncThunk("addTeamMembers", async params => {
  const response = await addTeamMembers(params);
  return response.data;
});


/** AGENCY USER LIST */
export const getAgencyUserListAction = createAsyncThunk("getAgencyUserList", async params => {
  const response = await getAgencyUserList(params);
  return response.data;
});

/** APPROVE REJECT AGENCY USER */
export const approveRejectAgencyUserAction = createAsyncThunk("approveRejectAgencyUser", async params => {
  const response = await approveRejectAgencyUser(params);
  return response.data;
});
