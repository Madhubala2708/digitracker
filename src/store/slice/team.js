import { createSlice } from "@reduxjs/toolkit";

import {
  getMyTeamMembersAction,
  getMyTeamMemberProfileAction,
  updateMyTeamMemberProfileAction,
  getAllMembersAction,
  getAllADMembersAction,
  addTeamMembersAction,
} from "../actions/teamAction";

const initialState = {
  memberList: {
    data: [],
    loading: false,
    error: null,
  },
  memberInfo: {
    data: [],
    loading: false,
    error: null,
  },
  allMembers: {
    data: [],
    loading: false,
    error: null,
  },
  allADMembers: {
    data: [],
    loading: false,
    error: null,
  },
  addTeamMembers: {
    data: [],
    loading: false,
    error: null,
  },
 
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** MY TEAM MEMBERS*/
    builder.addCase(getMyTeamMembersAction.pending, (state, action) => {
      state.memberList.loading = true;
    });
    builder.addCase(getMyTeamMembersAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.memberList.data = data;
      state.memberList.loading = false;
    });
    builder.addCase(getMyTeamMembersAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.memberList.loading = false;
    });

    /** MY TEAM MEMBER PROFILE*/
    builder.addCase(getMyTeamMemberProfileAction.pending, (state, action) => {
      state.memberInfo.loading = true;
    });
    builder.addCase(getMyTeamMemberProfileAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.memberInfo.data = data;
      state.memberInfo.loading = false;
    });
    builder.addCase(getMyTeamMemberProfileAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.memberInfo.loading = false;
    });

    /** MY TEAM MEMBER PROFILE - UPDATE */
    builder.addCase(
      updateMyTeamMemberProfileAction.pending,
      (state, action) => {
        state.memberInfo.loading = true;
      }
    );
    builder.addCase(
      updateMyTeamMemberProfileAction.fulfilled,
      (state, action) => {
        state.memberInfo.loading = false;
      }
    );
    builder.addCase(
      updateMyTeamMemberProfileAction.rejected,
      (state, action) => {
        state.fetchError = action.error;
        state.memberInfo.loading = false;
      }
    );

    /** GET ALL MEMBERS LISTING */
    builder.addCase(getAllMembersAction.pending, (state, action) => {
      state.allMembers.loading = true;
    });
    builder.addCase(getAllMembersAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.allMembers.data = data;
      state.allMembers.loading = false;
    });
    builder.addCase(getAllMembersAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.allMembers.loading = false;
    });

    /** GET ALL MEMBERS LISTING */
    builder.addCase(getAllADMembersAction.pending, (state, action) => {
      state.allADMembers.loading = true;
    });
    builder.addCase(getAllADMembersAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.allADMembers.data = data;
      state.allADMembers.loading = false;
    });
    builder.addCase(getAllADMembersAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.allADMembers.loading = false;
    });

    /** ADD TEAM MEMBERS */
    builder.addCase(addTeamMembersAction.pending, (state, action) => {
      state.addTeamMembers.loading = true;
    });
    builder.addCase(addTeamMembersAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.addTeamMembers.data = data;
      state.addTeamMembers.loading = false;
    });
    builder.addCase(addTeamMembersAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.addTeamMembers.loading = false;
    });

   

  },
});

export default teamSlice;
