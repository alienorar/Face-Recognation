import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeacherType } from "../types";
import { message } from "antd";
import { createTeacher, deleteTeacher, updateTeacher } from "../service";

// =============== CREATE TEACHER =============
export function useCreateTeacher() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TeacherType) => createTeacher(data),
        onSuccess: () => {
            message.success("Succesfully Created");
        },
        onSettled: (_, error) => {
            if (error) {
                message.error(error.message);
            } else {
                queryClient.invalidateQueries({ queryKey: ["teachers"] });
            }
        }
    });
}

// ============ UPDATE TEACHER ===========
export function useUpdateTeacher() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TeacherType) => updateTeacher(data),
        onSuccess: () => {
            message.success("Successfully updated");
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
        },
        onSettled: (_, error) => {
            if (error) {
                message.error(error.message);
            } else {
                queryClient.invalidateQueries({ queryKey: ["teachers"] });
            }
        }
    });
}

// ============ DELETE TEACHER ============
export function useDeleteTeacher() {
    const queryClient = useQueryClient();
    return useMutation({
        retry: false,
        mutationFn: (id: number | string) => deleteTeacher(id),
        onSuccess: () => {
            message.success("Succesfully deleted");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
        },
        onError: (error) => {
            message.error(error.message);
        }
    });
}
