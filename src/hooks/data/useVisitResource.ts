import {useUser} from "./useUser.ts";
import {useEffect} from "react";
import {createResourceVisit} from "../../api/resourceVisits.ts";

export function useVisitResource(id?: string) {
    const {user} = useUser();

    useEffect(() => {
        if (id === undefined || Number.isNaN(+id)) return;
        createResourceVisit({resource_id: +id, user_id: user?.id || 1});
    }, []);
}
