import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { createFaceList } from "../service";

// ========== CREATE FACE LIST BY TEACHER ID ==========
export function useCreateFace(teacherId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => {
            const formData = new FormData();
            formData.append("file", file);
            return createFaceList(formData, teacherId);
        },
        onSuccess: () => {
            message.success("Face registered successfully");
            queryClient.invalidateQueries({ queryKey: ["face-list", teacherId] });
        },
        onError: () => {
            message.error("Failed to register face");
        },
    });
}
