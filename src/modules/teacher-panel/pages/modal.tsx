import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Input, Button, Space, Modal, message } from "antd";
import { useCreateFace } from "../hooks/mutation";

const FaceRegisterModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    const webcamRef = useRef<Webcam | null>(null);
    const [teacherId, setTeacherId] = useState<string>("");
    const { mutate, isPending } = useCreateFace(Number(teacherId));

    const capture = () => {
        if (!teacherId) {
            message.error("Please enter teacher ID");
            return;
        }
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                fetch(imageSrc)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "face.jpg", { type: "image/jpeg" });
                        mutate(file);
                    });
            }
        }
    };

    return (
        <Modal
            title="Register Face"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose} style={{ backgroundColor: "red", color: "white" }} className="ml-2 mr-2 px-2 py-2">
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    onClick={capture}
                    loading={isPending}
                    style={{ backgroundColor: "#58e842", color: "white" }}
                    className="ml-2 mr-2 px-2 py-2"
                >
                    Capture & Register Face
                </Button>
            ]}
        >
            <Space direction="vertical" style={{ width: "100%" }}>
                <Input
                    placeholder="Enter Teacher ID"
                    value={teacherId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeacherId(e.target.value)}
                    type="number"
                />
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    style={{ width: "100%", borderRadius: 10 }}
                />
            </Space>
        </Modal>
    );
};

export default FaceRegisterModal;
