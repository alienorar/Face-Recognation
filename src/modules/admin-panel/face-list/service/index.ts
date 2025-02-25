import axiosInstance from "@api";


// ========== GET FACE LIST BY TEACHER ID==========
export async function getFaceList(teacherId: number | undefined) {
    return await axiosInstance.get(`v1/teacher/face/list/${teacherId}`)
}


// ========== CREATE FACE LIST BY TEACHER ID==========
export async function createFaceList(formData:any,teacherId:any) {
    return await axiosInstance.post(`v1/teacher/face/register?teacherId=${teacherId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },} 
    )}

// ========== GET FACE LIST BY TEACHER ID==========
export async function getImageById(imageId:number) {
    return await axiosInstance.get(`/v1/file/view/${imageId}`)
    
}