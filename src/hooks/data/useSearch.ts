import {useAppDispatch, useAppSelector} from "../../services/store.ts";
import {refineSearchThunk, searchResourcesThunk} from "../../services/slices/searchSlice.ts";
import {Resource} from "../../api/resourses.ts";

export function useSearch() {
    const {resources, isLoading, refinedResources} = useAppSelector(state => state.search);

    const dispatch = useAppDispatch();

    const search = (query: string, sortBy: "relevance" | "date") => {
        const arr = query.split(" ");
        if (arr) {
            dispatch(searchResourcesThunk({
                query: arr,
                sortBy,
            }));
        }
    }

    const refineSearch = (sortBy: "relevance" | "date") => {
        const queryParams = new URLSearchParams(location.search);

        const searchTerm = queryParams.get("q") || "";
        const refineTerm = queryParams.get("refine") || "";

        const arr = refineTerm.split(" ");

        if (arr) {
            if (!resources.length) {
                dispatch(searchResourcesThunk({
                    query: searchTerm.split(" "),
                    sortBy
                })).unwrap().then((resources: Resource[]) => {
                    dispatch(refineSearchThunk({
                        previousResults: resources,
                        query: arr,
                        sortBy,
                    }))
                })
            } else {
                dispatch(refineSearchThunk({
                    previousResults: resources,
                    query: arr,
                    sortBy,
                }));
            }
        }
    }

    return {
        resources,
        isLoading,
        refinedResources,
        search,
        refineSearch
    }
}
