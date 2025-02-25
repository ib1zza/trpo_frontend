import { getAllCategories, ICategory } from "../../api/categories.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Импортируем тип RootState

interface ICategoriesState {
    categories: ICategory[];
}

const initialState: ICategoriesState = {
    categories: [],
};

export const getCategoriesThunk = createAsyncThunk(
    "categories/getCategoriesThunk",
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as RootState; // Получаем текущий state
        if (state.categories.categories.length > 0) {
            return rejectWithValue("Категории уже загружены"); // Прерываем загрузку
        }
        try {
            const response = await getAllCategories();
            return response; // Возвращаем данные для обработки в extraReducers
        } catch (error: any) {
            return rejectWithValue("Ошибка загрузки категорий");
        }
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.categories = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
    },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
