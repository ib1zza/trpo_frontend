import {useAppDispatch, useAppSelector} from "../../services/store.ts";
import {useEffect} from "react";
import {getCategoriesThunk} from "../../services/slices/categoriesSlice.ts";


export function useCategories() {
    const categories = useAppSelector(state => state.categories.categories);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCategoriesThunk());
    }, []);

    return categories;
}
