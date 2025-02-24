import { useQuery } from "@tanstack/react-query";
import {  getFaceList } from "../service";

// ============= GET FACE LIST BY TEACHER ID ============
export function useGetFaceList(teacherId:number) {
    return useQuery({
        queryKey:["face-list"],
        queryFn:() => getFaceList(teacherId)
    })
}