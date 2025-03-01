import {useEffect, useState} from "react";
import {getResourceById, Resource} from "../../api/resourses.ts";


export function useResource(id?: string) {
    const [info, setInfo] = useState<Resource | null>(null);

    const refetch = async () => {
        try {
            if (!id) return;
            const response = await getResourceById(+id);
            setInfo(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        if (id) refetch()
    }, []);

    return {info, refetch};
}
