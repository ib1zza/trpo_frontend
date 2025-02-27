import { configureStore } from '@reduxjs/toolkit'
import CategoriesSlice from "./slices/categoriesSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import UserSlice from "./slices/userSlice.ts";
import SearchSlice from "./slices/searchSlice.ts";
export const store = configureStore({
    reducer: {
        categories: CategoriesSlice,
        user: UserSlice,
        search: SearchSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
