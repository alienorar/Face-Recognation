import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { NavLink, useParams } from 'react-router-dom';
import { useCreateFace } from '../hooks/mutations';
import { useGetFaceList, useGetImageById } from '../hooks/queries';

interface FileItem {
  imageId: string;
  url: string;
}

const Index: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const teacherId = Number(id);
  const { data, refetch } = useGetFaceList(teacherId);
  const mutation = useCreateFace(teacherId);
  const [fileList, setFileList] = useState<FileItem[]>([]);

const {data:imageData} = useGetImageById(113)

// console.log(imageData?.data.time);

  useEffect(() => {
    if (data?.data?.data) {
      console.log(data?.data?.data);

      setFileList(
        data.data.data.map((item: object,index:number) => ({
          imageId: `image-${index}`,
        
        }))
      );
    }
  }, [data]);

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
      <div className="grid grid-cols-4 gap-4 mt-4">
        {fileList.map((file) => (
          <div key={file.imageId} className="text-center">
            <Image src={file.imageId} alt={`face-${file.imageId}`} className="w-full h-auto" />
            <div className="mt-2 text-sm text-gray-600">ID: {file.imageId}</div>
          </div>
        ))}
      </div>
      <NavLink to={"/admin-panel"} style={{ color: "#58e842", width: "100px", padding: "9px", borderRadius: "10px", fontSize: "18px", textDecorationLine: "underline", marginTop: "20px" }} > Back to Teacher's list</NavLink>
    </div>
  );
};

export default Index; 