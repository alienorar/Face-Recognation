import { Form, Input, Button, Drawer } from 'antd';
import { useEffect } from 'react';
import { TeacherModalProps, TeacherType } from '../types';
import { useCreateTeacher, useUpdateTeacher } from '../hooks/mutations';

const Index = ({ open, handleClose, update }: TeacherModalProps) => {
    const [form] = Form.useForm();
    const { mutate: createMutate, isPending: isCreating } = useCreateTeacher();
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateTeacher();

    useEffect(() => {
        if (update?.id) {
            form.setFieldsValue({
                id: update?.id,
                firstName: update?.firstName,
                lastName: update?.lastName,
                phone: update?.phone,
                pinfl: update?.pinfl,
                degree: update?.degree,
                position: update?.position
            });
        } else {
            form.resetFields();
        }
    }, [update, form]);

    const onFinish = async (values: TeacherType) => {

        if (update?.id) {
            const payload = { ...values, id: update?.id };

            updateMutate(payload, {
                onSuccess: () => {
                    handleClose();
                }
            });
        } else {
            createMutate(values, {
                onSuccess: () => {
                    handleClose();
                }
            });
        }
    };

    return (
        <Drawer onClose={handleClose} open={open} width={600}>
            <h2 className='text-[24px] font-semibold my-3'>Add Teacher</h2>

            <Form
                form={form}
                name="teachers_form"
                layout="vertical"
                onFinish={onFinish}
            >
                <div className='grid grid-cols-2 gap-3'>
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Enter Teacher First Name!' }]}
                    >
                        <Input className='h-10 p-2 border-[1.4px]' />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Enter Teacher Last Name!' }]}
                    >
                        <Input className='h-10 p-2 border-[1.4px]' />
                    </Form.Item>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Enter Teacher Phone Number!' }]}
                    >
                        <Input className='h-10 p-2 border-[1.4px]' type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Pinfl"
                        name="pinfl"
                        rules={[{ required: true, message: 'Enter Teacher Pinfl!' }]}
                    >
                        <Input className='h-10 p-2 border-[1.4px]' />
                    </Form.Item>
                </div>

                <div className='grid grid-cols-2 gap-3 mb-5'>
                    <Form.Item
                        label="Degree"
                        name="degree"
                        rules={[{ required: true, message: 'Enter Teacher Degree!' }]}
                    >
                        <Input className='h-10 p-2 border-[1.4px]' />
                    </Form.Item>
                    <Form.Item
                        label="Position"
                        name="position"
                        rules={[{ required: true, message: 'Enter Teacher Position!' }]}
                    >
                        <Input className='h-10 p-2 border-[1.4px]' />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button
                        block
                        htmlType="submit"
                        loading={isCreating || isUpdating}
                        style={{
                            backgroundColor: "#58e842",
                            color: "white",
                            height: "40px",
                            fontSize: "18px",
                            marginTop: "10px",
                        }}
                    >
                        {update?.id ? "Update" : "Add"} Teacher
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default Index;
