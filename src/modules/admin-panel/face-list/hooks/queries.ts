import { useQuery } from "@tanstack/react-query";
import {  getFaceList, getImageById } from "../service";

// ============= GET FACE LIST BY TEACHER ID ============
export function useGetFaceList(teacherId:number) {
    return useQuery({
        queryKey:["face-list"],
        queryFn:() => getFaceList(teacherId)
    })
}

// ============= GET IMAGE BY IMAGE ID =========
export function useGetImageById(imageId:number) {
    return useQuery({
        queryKey:["face-list",imageId],
        queryFn:() => getImageById(imageId)
    })
}