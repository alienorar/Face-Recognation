import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { NavLink, useParams } from 'react-router-dom';
import { useCreateFace } from '../hooks/mutations';
import { useGetFaceList } from '../hooks/queries';

interface FileItem {
  imageId: number;
  url: string;
}

const Index: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const teacherId = Number(id);
  const { data, refetch } = useGetFaceList(teacherId);
  const mutation = useCreateFace(teacherId);
  const [imageIds, setImageIds] = useState<number[]>([]);
  const [fileList, setFileList] = useState<FileItem[]>([]);

  useEffect(() => {
    if (data?.data?.data) {
      console.log("✅ Face List Response:", data.data.data);
      setImageIds(data.data.data.map((item: { imgId: number }) => item.imgId));
    }
  }, [data]);

  useEffect(() => {
    const fetchImages = async () => {
      const newFileList: FileItem[] = await Promise.all(
        imageIds.map(async (imageId) => {
          const response = await fetch(`http://217.114.4.62:30300/api/v1/file/view/${imageId}`);
          const blob = await response.blob(); 
          const url = URL.createObjectURL(blob); 
          return { imageId, url };
        })
      );
      setFileList(newFileList);
    };

    if (imageIds.length > 0) {
      fetchImages();
    }
  }, [imageIds]);

  // 3️⃣ Yangi rasm yuklash
  const handleUpload: UploadProps['customRequest'] = ({ file }) => {
    if (!(file instanceof File)) {
      message.error('Invalid file type');
      return;
    }

    mutation.mutate(file, {
      onSuccess: () => {
        refetch(); 
      },
      onError: () => {
        message.error('Upload failed');
      },
    });
  };

  return (
    <div>
      <Upload
        customRequest={handleUpload}
        listType="picture-card"
        showUploadList={false}
        className='mt-6'
      >
        {fileList.length >= 8 ? null : (
          <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Register Face</div>
          </button>
        )}
      </Upload>

      <div className="grid grid-cols-6 gap-2 mt-4">
        {fileList.map((file) => (
          <div key={file.imageId} className="w-32 h-32 overflow-hidden border border-gray-300 rounded-lg">
            <Image
              src={file.url}
              alt={`face-${file.imageId}`}
              className="w-full h-full object-cover"
            />
            <div className="mt-2 text-sm text-gray-600 text-center">ID:{file.imageId}</div>
          </div>
        ))}
      </div>


      <NavLink to={"/admin-panel"} style={{ color: "#58e842", width: "100px", padding: "9px", borderRadius: "10px", fontSize: "18px", textDecorationLine: "underline", marginTop: "20px" }} >
        Back to Teacher's list
      </NavLink>
    </div>
  );
};

export default Index;
