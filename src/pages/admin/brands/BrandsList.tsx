

import { useGetBrandQuery, useRemoveBrandMutation } from '@/api/brandApi';
import { IBrand } from '@/interfaces/brand';
import { Button, Skeleton, Table, Popconfirm, Alert } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from "react-router-dom";



const BrandsList = () => {
  const {data, error, isLoading} = useGetBrandQuery();
  const [removeBrand, {isLoading: isRemoveLoading, isSuccess: isRemoveSuccess}] = useRemoveBrandMutation();
  if(isLoading) return <Skeleton />;

  const brand = data?.brand 
  console.log(brand);
  
  const dataSource = brand?.map(({_id, brand_name}: IBrand) => {
    return {
      key: _id,
      name: brand_name 
    }
  })
  console.log(dataSource);
  
  const confirm = (_id: IBrand) => {
    removeBrand(_id)
  }

  const columns = [
    {
      title: 'Tên thương hiệu',
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
                "Delete"
              )}
            </Button>
        </Popconfirm>
        <Button type="primary" danger className="ml-2">
          <Link to={`/admin/brand/edit/${_id}`}>Update</Link>
        </Button>
          </>
        )
      }
    },
  ];
  
  return (

    <div className='max-w-4xl mx-auto'>
    <div className='flex justify-between items-center mb-4'>
      <h2 className='font-bold text-2xl'>Trang danh sách thương hiệu</h2>
      {isRemoveSuccess && <Alert message="Xoa thanh cong" type="success" />}
      <Button type='primary' danger>
        <Link to="/admin/brand/add">Thêm mới</Link>
      </Button>
    </div>
    <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 3}} />
  </div>

    
  );
}

export default BrandsList;
