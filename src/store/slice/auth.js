import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  userInfoAction,
  userDetailsByIdAction,
} from "../actions";

const initialState = {
  activeUser: {
    data: {
      accessToken: null,
      details: null,
      restrictions: null,
      activeDepartmentPermission: null,
    },
    loading: false,
    error: null,
  },
  logout: {
    loading: false,
    error: null,
  },
  userDetailsById: {
    data: [],
    loading: false,
    error: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setActiveUserAction: (state, action) => {
      state.activeUser.data = action.payload;
    },
    setAuthAction: (state, action) => {      
      state.activeUser.data.accessToken = action.payload;
    },
    setActiveDepartmentPermissionAction: (state, action) => {
      state.activeUser.data.activeDepartmentPermission = action.payload;
    },
    setActiveWorkSpaceAction: (state, action) => {
      state.activeUser.data.activeWorkSpace = action.payload;
    },
    setActiveBoardAction: (state, action) => {
      state.activeUser.data.activeBoard = action.payload;
    },
    setDefaultWorkSpaceAction: (state, action) => {
      // console.log('action', state.activeUser.data.details.workspaceDTO);

      // Check if workspaceDTO exists and is an array
      if (
        state?.activeUser?.data?.details?.workspaceDTO &&
        Array.isArray(state?.activeUser?.data?.details?.workspaceDTO)
      ) {
        const workspaceToUpdate = state?.activeUser?.data?.details?.workspaceDTO?.find(
          (detail) => detail?.work_space_id === action?.payload?.work_space_id
        );

        if (workspaceToUpdate) {
          // Toggle the is_workspace_default field
          if (workspaceToUpdate.is_workspace_default) {
            // If already true, set to false
            workspaceToUpdate.is_workspace_default = false;
          } else {
            // If false, set to true and reset other workspaces
            state.activeUser.data.details.workspaceDTO.forEach((detail) => {
              if (detail.work_space_id !== action.payload.work_space_id) {
                detail.is_workspace_default = false;
              } else {
                detail.is_workspace_default = true;
              }
            });
          }
        }
      } else {
        // If workspaceDTO is null or undefined, handle this case (e.g., log or initialize as empty)
        console.warn("workspaceDTO is missing or not an array");
        state.activeUser.data.details.workspaceDTO = []; // Initialize as empty array if missing
      }
    },

    setDefaultBoardAction: (state, action) => {
      const getWorkSpaceID =
        action.payload.workspaceId === 2
          ? state.activeUser.data.details.updatesboardsDTO
          : state.activeUser.data.details.agencyboardsDTO;
      const defaultBoardToUpdate = getWorkSpaceID.find(
        (detail) => detail.boardId === action.payload.ubId
      );

      if (defaultBoardToUpdate) {
        // Toggle the is_workspace_default field
        if (defaultBoardToUpdate.is_board_default) {
          // If already true, set to false
          defaultBoardToUpdate.is_board_default = false;
        } else {
          // If false, set to true and reset other workspaces
          getWorkSpaceID.forEach((detail) => {
            if (detail.boardId !== action.payload.ubId) {
              detail.is_board_default = false;
            } else {
              detail.is_board_default = true;
            }
          });
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.activeUser.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.activeUser.data.accessToken = data;
      state.activeUser.loading = false;
      state.activeUser.error = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.activeUser.error = action.error;
      state.activeUser.loading = false;
    });

    // builder.addCase(userProfileAction.pending, (state, action) => {
    //   state.userProfile.loading = true;
    //   state.userProfile.data = {};
    // });
    // builder.addCase(userProfileAction.fulfilled, (state, action) => {
    //   const { data } = action.payload;
    //   state.userProfile.data = data;
    //   state.userProfile.loading = false;
    //   state.userProfile.error = null;
    // });
    // builder.addCase(userProfileAction.rejected, (state, action) => {
    //   state.userProfile.error = action.error;
    //   state.userProfile.loading = false;
    // });

    builder.addCase(logoutAction.pending, (state, action) => {
      state.logout.loading = true;
      state.activeUser.data = {};  // clear activeUser when logging out
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.logout.loading = false;
      state.logout.error = null;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.logout.error = action.error;
      state.logout.loading = false;
    });
    

    /** CURRENT USER INFO */
    builder.addCase(userInfoAction.pending, (state, action) => {
      state.activeUser.loading = true;
    });
    builder.addCase(userInfoAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.activeUser.data.details = data;

      /** FORMAT USER RESTRICTION */
      // if(data.userRoleResponseDetail){
      //   const userRestrictions = data.userRoleResponseDetail.reduce((acc, item) => {
      //     const { permission, details } = item;
      //     const restriction = {};

      //     details.forEach((detail) => {
      //       const { type, ischecked } = detail;
      //       restriction[`can${type.split(' ').join('_')}`] = ischecked;
      //     });

      //     acc[permission.split(' ').join('_').toLowerCase()] = restriction;

      //     return acc;
      //   }, {});
      //   state.activeUser.data.restrictions = userRestrictions;
      // }
      if (data.userRoleResponseDetail) {
        const userRestrictions = data.userRoleResponseDetail.reduce(
          (acc, item) => {
            const { depcode, rolepermission } = item;
            const featureLabel = {};
            rolepermission.forEach((role) => {
              const restriction = {};
              role.details.forEach((detail) => {
                const { type, ischecked } = detail;
                restriction[`can${type?.split(" ")?.join("_")}`] = ischecked;
              });
              featureLabel[
                role.permission?.split(" ").join("_")?.toLowerCase()
              ] = restriction;
            });

            acc[depcode] = featureLabel;

            return acc;
          },
          {}
        );

        state.activeUser.data.restrictions = userRestrictions;
      }

      state.activeUser.loading = false;
    });
    builder.addCase(userInfoAction.rejected, (state, action) => {
      state.fetchError = action.error;
      if (action.payload) {
        state.activeUser.data.errorType = "session_expire";
        state.activeUser.data.error =
          "Session Expired. Please login again to continue.";
      } else {
        state.activeUser.data.errorType = "server_error";
        state.activeUser.data.error =
          "Internal Server Error. Kindly contact your admin.";
      }
      state.activeUser.loading = false;
    });

    /** USER INFO BY ID */
    builder.addCase(userDetailsByIdAction.pending, (state, action) => {
      state.userDetailsById.loading = true;
    });
    builder.addCase(userDetailsByIdAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.userDetailsById.data = data;
      state.userDetailsById.loading = false;
    });
    builder.addCase(userDetailsByIdAction.rejected, (state, action) => {
      state.fetchError = action.error;
      state.userDetailsById.loading = false;
    });
  },
});

export const {
  setActiveUserAction,
  setAuthAction,
  setActiveDepartmentPermissionAction,
  setActiveWorkSpaceAction,
  setDefaultWorkSpaceAction,
  setDefaultBoardAction,
  setActiveBoardAction,
} = authSlice.actions;
export default authSlice;

export const authSelector = createSelector(
  [
    (state) => state.auth.activeUser.data,
    (state) => state.auth.activeUser.loading,
    (state) => state.auth.activeUser.error,
    (state) => state.auth.logout.loading,
    (state) => state.auth.logout.error,
  ],
  (data, loading, error, logoutLoading, logoutError) => ({
    data,
    loading,
    error,
    logoutLoading,
    logoutError,
  })
);
