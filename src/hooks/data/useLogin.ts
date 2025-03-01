import {useAppDispatch, useAppSelector} from "../../services/store.ts";
import {useEffect} from "react";
import {loginUserThunk} from "../../services/slices/userSlice.ts";
import {LoginData} from "../../api/User.ts";


export function useLogin() {
    const userFromLS = localStorage.getItem('user');
    const userFromStore = useAppSelector(state => state.user.user);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userFromLS && !userFromStore) {
            const data: LoginData = JSON.parse(userFromLS);
            dispatch(loginUserThunk({
                password: data.password,
                email: data.email
            }))
        }
    }, []);
}
