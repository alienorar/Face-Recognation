import { GlobalModalProps } from "@types";

// ============= TEACHER TYPE =============
export interface TeacherType {
    id?: number | string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    pinfl?: string;
    degree?: string;
    position?: string;
}

export interface TeacherModalProps extends GlobalModalProps {
    update?: TeacherType;
}
