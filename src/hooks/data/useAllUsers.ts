import {getAllUsers, IUser} from "../../api/User.ts";
import {useEffect, useState} from "react";


export function useAllUsers() {
    const [allUsers, setAllUsers] = useState<IUser[] | null>(null);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            setAllUsers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {

        fetchUsers();
    }, []);

    return {
        allUsers,
        refetch: fetchUsers
    }
}
