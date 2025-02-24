import { useQuery } from "@tanstack/react-query";
import {getTeachers } from "../service";

// ============ GET TEACHERS ============
export function useGetTeachers(data:any) {
    return useQuery({
        queryKey: ["teachers", data],
        queryFn: () => getTeachers(data),
    });
}

