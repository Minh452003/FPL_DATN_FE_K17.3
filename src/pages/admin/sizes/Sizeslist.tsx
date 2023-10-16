


import { useGetSizeQuery, useRemoveSizeMutation } from '@/api/sizeApi';
import { ISize } from '@/interfaces/size';
import { Alert, Button, Popconfirm, Skeleton, Table } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from "react-router-dom";


const Sizeslist = () => {
  const {data, error, isLoading} = useGetSizeQuery();
  const [removeSize, {isLoading: isRemoveLoading, isSuccess: isRemoveSuccess}] = useRemoveSizeMutation();
  if(isLoading) return <Skeleton />;

  const size = data?.size 
  console.log(size);
  
  const dataSource = size?.map(({_id, size_name, size_price, size_height, size_length, size_weight, size_width}: ISize) => {
    return {
      key: _id,
      size_name,
      size_price,
      size_height,
      size_length,
      size_weight,
      size_width
    }
  })
  console.log(dataSource);
  
  const confirm = (_id: ISize) => {
    removeSize(_id)
  }
 
  const columns = [
    {
      title: 'size_name',
      dataIndex: 'size_name',
      key: 'size_name',
    },
    {
      title: 'size_price',
      dataIndex: 'size_price',
      key: 'size_price',
    },
    {
      title: 'size_height',
      dataIndex: 'size_height',
      key: 'size_height',
    },
    {
      title: 'size_length',
      dataIndex: 'size_length',
      key: 'size_length',
    },
    {
      title: 'size_weight',
      dataIndex: 'size_weight',
      key: 'size_weight',
    },
    {
      title: 'size_width',
      dataIndex: 'size_width',
      key: 'size_width',
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
                "Delete"
              )}
            </Button>
        </Popconfirm>
        <Button type="primary" danger className="ml-2">
          <Link to={`/admin/size/edit/${_id}`}>Update</Link>
        </Button>
          </>
        )
      }
    },
  ];

  return (
    <div className='max-w-4xl mx-auto'>
    <div className='flex justify-between items-center mb-4'>
      <h2 className='font-bold text-2xl'>Trang danh sách size</h2>
      {isRemoveSuccess && <Alert message="Xoa thanh cong" type="success" />}
      <Button type='primary' danger>
        <Link to="/admin/size/add">Thêm mới</Link>
      </Button>
    </div>
    <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 3}} />
  </div>
  );
}

export default Sizeslist;
