import {useEffect, useState} from "react";
import {getAllResourceUpdates, ResourceUpdate} from "../../api/resourceUpdates.ts";


export function useAllResourceUpdates() {
    const [allResourceUpdates, setAllResourceUpdates] = useState<ResourceUpdate[] | null>(null);

    const refetch = async () => {
        try {
            const response = await getAllResourceUpdates();
            setAllResourceUpdates(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        refetch();
    }, []);

    return {
        allResourceUpdates: allResourceUpdates,
        refetch: refetch
    }
}
