import axiosInstance from "@api";
import { TeacherType } from "../types";

// ============ GET TEACHERS ============
export async function getTeachers(data:any) {
    return await axiosInstance.post("/teachers/filter", data );
}

// ============ CREATE TEACHER ============
export async function createTeacher(data: TeacherType) {
    return await axiosInstance.post("/teachers/create", data);
}

// ============ UPDATE TEACHER ============
export async function updateTeacher(data: TeacherType) {
    return await axiosInstance.put(`/teachers/update`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    });
}


// ============ DELETE TEACHER ============
export async function deleteTeacher(id: number | string) {
    return await axiosInstance.delete(`/teachers/delete/${id}`);
}
