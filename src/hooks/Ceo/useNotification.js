import { useDispatch, useSelector } from "react-redux"
import { createNotification, getNotification } from "../../store/selector/ceo/notificationSelector";
import { createnotificationAction, getnotificationAction } from "../../store/actions/Ceo/createNotification";

export const useNotification = () =>{
    const dispatch = useDispatch();

    const notification = useSelector(createNotification);
    const getnotify = useSelector(getNotification);

    const createNotify = async (notificationData) =>{
        try{
            const result = await dispatch(createnotificationAction(notificationData)).unwrap();
            return result;
        }catch(error){
            console.log("Failed to create notification:", error);
            return {success:false, error};
        }
    };

    const getnotification = async (userId) => {
        try{
            const result = await dispatch(getnotificationAction(userId)).unwrap();
            return result;
        }catch(error){
            console.log("Failed to get notification:", error);
            return {success:false, error};
        }

    }

    return{
        notification,
        getnotify,

        createNotify,
        getnotification
    }
}