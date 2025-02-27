import {useAppDispatch, useAppSelector} from "../../services/store.ts";
import {useEffect} from "react";
import {getUsersResources} from "../../services/slices/userSlice.ts";


export function useUser() {
    const {user, resources} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (resources === null && user?.id) {
            dispatch(getUsersResources(user.id))
        }
    }, [user]);

    return {user, resources: resources || []};
}
