import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyTeamMembersAction, getMyTeamMemberProfileAction, updateMyTeamMemberProfileAction, getAllMembersAction, addTeamMembersAction ,getAllADMembersAction,} from '../store/actions/teamAction';
import { teamSelector, teamMemberSelector, allMemberSelector, allAdMemberSelector } from '../store/selector/teamSelector';


/** My Team */
export const useMyTeam = () => {
  const myTeamList = useSelector(teamSelector);
  const dispatch = useDispatch();
  const getMyTeamList = useCallback(
    () => dispatch(getMyTeamMembersAction()),
    [dispatch]
  );
  
  const addMyTeamMember = useCallback(
    (params) => dispatch(addTeamMembersAction(params)),
    [dispatch]
  );
  return [myTeamList, {getMyTeamList, addMyTeamMember}];
};

/** My Team Member Info*/
export const useTeamMemberInfo = () => {
  const myTeamMemberInfo = useSelector(teamMemberSelector);
  const dispatch = useDispatch();
  const getMyTeamMemberInfo = useCallback(
    (params) => dispatch(getMyTeamMemberProfileAction(params)),
    [dispatch]
  );

  const updateMyTeamMemberInfo = useCallback(
    (params) => dispatch(updateMyTeamMemberProfileAction(params)),
    [dispatch]
  );
  
  return [myTeamMemberInfo, {getMyTeamMemberInfo, updateMyTeamMemberInfo}];
};

/** All Members */
export const useAllMembers = () => {
  const allMembersList = useSelector(allMemberSelector);
  const dispatch = useDispatch();
  const getAllMembersList = useCallback(
    () => dispatch(getAllMembersAction()),
    [dispatch]
  );
  return [allMembersList, getAllMembersList];
};

export const useAllADMembers = () => {
  const allADMembersList = useSelector(allAdMemberSelector);
  const dispatch = useDispatch();
  const getAllADMembersList = useCallback(
    () => dispatch(getAllADMembersAction()),
    [dispatch]
  );
  // useEffect(()=>{
  //   dispatch(getAllADMembersAction());
  // },[]);
  return [allADMembersList, {getAllADMembersList}];
};
