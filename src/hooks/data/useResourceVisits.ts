import {getVisitsByResource, ResourceVisit} from "../../api/resourceVisits.ts";
import {useEffect, useState} from "react";

export function useResourceVisits(id?: string) {
    const [visits, setVisits] = useState<ResourceVisit[]>([]);

    const refetch = async () => {
        try {
            if (!id) return;
            const response = await getVisitsByResource(+id);
            setVisits(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        refetch();
    }, []);

    return {
        visits,
        refetch,
    }
}
