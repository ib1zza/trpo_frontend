import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchResources, refineSearch, Resource, SearchResourcesData, RefineSearchData } from "../../api/resourses.ts";

interface ISearchState {
    resources: Resource[];
    refinedResources: Resource[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ISearchState = {
    resources: [],
    refinedResources: [],
    isLoading: false,
    error: null,
};

export const searchResourcesThunk = createAsyncThunk(
    "search/searchResourcesThunk",
    async (data: SearchResourcesData, { rejectWithValue }) => {
        try {
            const response = await searchResources(data);
            return response; // Возвращаем данные для обработки в extraReducers
        } catch (error: any) {
            return rejectWithValue("Ошибка поиска ресурсов");
        }
    }
);

export const refineSearchThunk = createAsyncThunk(
    "search/refineSearchThunk",
    async (data: RefineSearchData, { rejectWithValue }) => {
        try {
            const response = await refineSearch(data);
            return response; // Возвращаем данные для обработки в extraReducers
        } catch (error: any) {
            return rejectWithValue("Ошибка уточнения поиска");
        }
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        clearSearchResults: (state) => {
            state.resources = [];
            state.refinedResources = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchResourcesThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(searchResourcesThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.resources = action.payload;
            })
            .addCase(searchResourcesThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(refineSearchThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(refineSearchThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.refinedResources = action.payload;
            })
            .addCase(refineSearchThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
