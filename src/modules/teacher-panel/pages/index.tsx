import { useState } from "react";
import { Button } from "antd";
import FaceRegisterModal from "./modal";

const MainPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)} className="bg-[#58e842] text-white px-2 py-2 mt-6">
        Register Face
      </Button>
      <FaceRegisterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};

export default MainPage;
