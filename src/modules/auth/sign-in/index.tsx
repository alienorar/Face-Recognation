import { Button, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
import LoginImg from '../../../assets/login-img.jpg';
const Index: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: any): void => {
        if (values.username === "Admin") {
            navigate("/admin-panel");
           message.success( "You've successfully logged in");
        } else if (values.username === "Teacher") {
            navigate("/teacher-panel");
        } else {
            message.error( "Invalid username or password");  
    };
    }
    return (
        <div className='grid grid-col-1 lg:grid-cols-2 items-center'>
            <div className='hidden lg:block w-full h-[100vh] bg-[#dad3d33f]'>
                <img src={LoginImg} alt="login-img" className='w-full' />
            </div>
            <div className='flex justify-center items-center w-full p-6 pt-20'>
                <Form
                    name="sign_in"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: "600px", width: "340px", display: "flex", flexDirection: "column" }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                        rules={[{ required: true, message: 'Please input username!' }]}
                    >
                        <Input style={{ height: "40px" }} className='border-[1.5px] px-3' />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ marginBottom: '8px' }}
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password style={{ height: "40px" }} className='border-[1.5px]' />
                    </Form.Item>

                    <Form.Item>
                        <Button block htmlType="submit" style={{ backgroundColor: "#58e842", color: "white", height: "40px", fontSize: "18px", marginTop: "10px" }}>
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Index;