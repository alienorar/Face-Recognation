import axiosInstance from "@api";

// ========== CREATE FACE LIST BY TEACHER ID==========
export async function recognizeFaceId(formData: any, teacherId: any) {
    return await axiosInstance.post(`v1/teacher/face/recognize/by/id?teacherId=${teacherId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    }
    )
}
