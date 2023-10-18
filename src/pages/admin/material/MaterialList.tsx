
import { useGetMaterialQuery, useRemoveMaterialMutation } from '@/api/materialApi';
import { IMaterials } from '@/interfaces/materials';
import {  Table, Button,Popconfirm, message, Skeleton } from 'antd';
import {FaCirclePlus, FaTrash, FaTrashCan, FaWrench } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const MaterialList = () => {
    const {data, isLoading} = useGetMaterialQuery();
    const [messageApi, contextHolder] = message.useMessage();

    const [removeMaterial] = useRemoveMaterialMutation();
    if (isLoading) return <Skeleton/>
    const material = data?.material
    const dataSource = material?.map(({_id, material_name, material_price}: IMaterials) => {
      return {
        key: _id,
        name: material_name,
        price: material_price 
      }
    });
    console.log(dataSource);

    const confirm = (_id: IMaterials) => {
      removeMaterial(_id)
    }
    const columns = [
        {
            title: 'Tên vật liệu',
            dataIndex: 'name',
            key: 'name',
        },
        {
          title: 'Giá',
          dataIndex: 'price',
          key: 'price',
      }, 
        {
            title: 'Chức năng',
            render: ({key:_id}:{key:number|string}) => (
              <div>
                    <Popconfirm
                        title="Xóa sản phẩm"
                        description="Mày có chắc cmn chắn muốn xóa không??"
                        onConfirm={() => {
                          removeMaterial(_id)
                                .unwrap()
                                .then(() => {
                                    messageApi.open({
                                        type: "success",
                                        content: "Xóa sản phẩm thành công",
                                    });
                                });
                        }}
                        okText="Có"
                        cancelText="Không"
                    >
                    <Button className='text-red-500' ><FaTrashCan/>
                    </Button>
                    </Popconfirm>
    
                      <Button  className='mr-5 text-blue-500' ><Link to={`/admin/material/edit/${_id}`}><FaWrench/></Link></Button>
    
              </div>
          ),
    
        }
    
    ];
  return (
    <div className="container">
    <h2 className="text-center text-2xl py-2">Trang Vật Liệu </h2>
    <Button className='m-2 text-3xl text-blue-500'><Link to={'add'}><FaCirclePlus style={{ fontSize: '24', display: 'block' }}/></Link></Button>
    <Button className='m-2  float-right'><Link to={''}><FaTrash style={{ fontSize: '20', display: 'block' }}/></Link></Button>
    
    <Table dataSource={dataSource} columns={columns}  />
    </div>
  )
}

export default MaterialList