import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from 'antd';
import { EditOutlined, CameraOutlined } from '@ant-design/icons';
import { useNavigate, } from 'react-router-dom';
import { AnyObject } from "antd/es/_util/type";
import { GlobalTable, ConfirmDelete } from '@components';
import TeacherModal from "./modal"
import { useDeleteTeacher } from "../hooks/mutations";
import { getTeachers } from "../service";

const Index = () => {
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const { mutate } = useDeleteTeacher();
  const [params, setParams] = useState({
    limit: 5,
    page: 1
  });

  // ============ DRAWER ==========
  const showDrawer = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //========= PARAMS =========
  useEffect(() => {
    const params = new URLSearchParams();
    let page = Number(params.get("page")) || 1;
    let limit = Number(params.get("limit")) || 5;
    setParams((prev) => ({
      ...prev,
      limit,
      page,
     
    }));
  }, []);

 

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await getTeachers({
          keyword:"",
          filter: {},
          paging: {
            page:params.page,
            size:params.limit
          }
        });
        setTableData(response.data?.content);
        setTotal(response.data?.content.length);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }

     
    }
    fetchTeachers();
  }, []);





  // =========== UPDATE TEACHER ===========
  const editData = (item: any) => {
    setUpdate(item);
    showDrawer();
  };

  // ======== DELETE TEACHER ============== 
  const deleteData = async (id: number) => {
    mutate(id);
  };
 
 

  // ========== VIEW TEACHER DETAILS ========= 
  const handleView = (record: any) => {
    navigate(`face-list/${record.id}`);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Teacher Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Position',
      dataIndex: 'position',
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
    },
  
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: AnyObject) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button onClick={() => editData(record)}><EditOutlined className="text-yellow-400" /></Button>
          </Tooltip>
          <ConfirmDelete
            id={record.id}
            onConfirm={deleteData}
            onCancel={() => console.log('Cancelled')}
            title={"Delete this Teacher?"}
          />
          <Tooltip title="Add Face">
            <Button onClick={() => handleView(record)}><CameraOutlined className="text-[#58e842]"/></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <TeacherModal handleClose={handleClose} open={open} update={update} />
      <div className="flex items-center justify-between py-4 ">
        <div className="flex gap-2 items-center ">
          <Button
            size="large"
            style={{ maxWidth: 160, minWidth: 80, backgroundColor: "#58e842", color: "white", height: 40 }}
            onClick={showDrawer}>
            Create
          </Button>
        </div>
      </div>
      <GlobalTable
        data={tableData}
        columns={columns}
        handleChange={({ current = 1, pageSize = 10 }) => {
          setParams(prev => ({
            ...prev,
            limit: pageSize,
            page: current,
          }));
        }}

        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15', '20']
        }}
      />
    </>
  );
};

export default Index;
