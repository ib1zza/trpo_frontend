import {useAppDispatch, useAppSelector} from "../../services/store.ts";


export function useUser() {
    const user = useAppSelector(state => state.user.user);

    return user;
}
