import { createSelector } from "reselect";

/** My Teams */
export const teamSelector = createSelector(
    [
      state => state.team.memberList.data,
      state => state.team.memberList.loading,
      state => state.team.memberList.error,
    ],
    (data, loading, error) => ({
      data,
      loading,
      error,
    })
);

/** My Team Member Info */
export const teamMemberSelector = createSelector(
    [
      state => state.team.memberInfo.data,
      state => state.team.memberInfo.loading,
      state => state.team.memberInfo.error,
    ],
    (data, loading, error) => ({
      data,
      loading,
      error,
    })
);

/** All Members */
export const allMemberSelector = createSelector(
  [
    state => state.team.allMembers.data,
    state => state.team.allMembers.loading,
    state => state.team.allMembers.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

/** All AD Members */
export const allAdMemberSelector = createSelector(
  [
    state => state.team.allADMembers.data,
    state => state.team.allADMembers.loading,
    state => state.team.allADMembers.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);