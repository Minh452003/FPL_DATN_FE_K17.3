

import { useGetColorsQuery, useRemoveColorMutation } from '@/api/colorApi';
import { IColor } from '@/interfaces/color';
import { Alert, Button, Popconfirm, Skeleton, Table } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCirclePlus, FaTrashCan, FaWrench } from 'react-icons/fa6';
import { Link } from "react-router-dom";


const Colorslist = () => {
  const {data, error, isLoading} = useGetColorsQuery();
  const [removeColor, {isLoading: isRemoveLoading, isSuccess: isRemoveSuccess}] = useRemoveColorMutation();
  if(isLoading) return <Skeleton />;

  const color = data?.color 
  console.log(color);
  
  const dataSource = color?.map(({_id, colors_name}: IColor) => {
    return {
      key: _id,
      name: colors_name 
    }
  })
  console.log(dataSource);
  
  const confirm = (_id: IColor) => {
    removeColor(_id)
  }
 
  const columns = [
    {
      title: 'Tên màu',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: ({key: _id}: any) => {
        return(
          <>
          <Popconfirm
             placement="topLeft"
             title={"Ban co chac chan muon xoa khong?"}
             onConfirm={() => confirm(_id)}
             okText="Yes"
             cancelText="No"
          >
            <Button>
              {isRemoveLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ): (
                <FaTrashCan style={{ fontSize: '20', display: 'block' }} />
              )}
            </Button>
        </Popconfirm>
        <Button type="primary" danger className="ml-2">
          <Link to={`/admin/color/edit/${_id}`}><FaWrench /></Link>
        </Button>
          </>
        )
      }
    },
  ];

  return (
    <div className='max-w-4xl mx-auto'>
    <div className='flex justify-between items-center mb-4'>
      <h2 className='font-bold text-2xl'>Trang danh sách màu</h2>
      {isRemoveSuccess && <Alert message="Xoa thanh cong" type="success" />}
      <Button type='primary' className='text-blue-500'>
        <Link to="/admin/color/add"><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link>
      </Button>
    </div>
    <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 3}} />
  </div>
  );
}

export default Colorslist;
