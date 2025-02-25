import {
    UsergroupAddOutlined,
    CameraOutlined
} from '@ant-design/icons';

export const adminRights = [
    { path: '/admin-panel', label: 'Teacher', icon: <UsergroupAddOutlined style={{ fontSize: "22px" }} /> },
];
export const teacherRights = [
    { path: '/teacher-panel', label: 'Face Id', icon: <CameraOutlined   style={{ fontSize: "22px" }} /> },
];

