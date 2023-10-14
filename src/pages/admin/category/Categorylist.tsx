import { useGetCategoryQuery, useRemoveCategoryMutation } from '@/api/categoryApi';
import { Image, Table, Button,Popconfirm,message } from 'antd';
import {FaCirclePlus, FaTrash, FaTrashCan, FaWrench } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const Categorylist = () => {
  const { data} = useGetCategoryQuery();
  const categories = data?.category.docs;
  const [removeCategory] = useRemoveCategoryMutation()
  const [messageApi, contextHolder] = message.useMessage();
    


  const data1 = categories?.map((category: any) => {
    return {
        key: category._id,
        name: category.category_name,
        stake: category.price_increase_percent,
        image :<img width={50} src={category.category_image?.url} alt="" />
    }
});
console.log(data1);

const columns = [
    {
        title: 'Ảnh ',
        dataIndex: 'image',
        key: 'image',
    },
    {
        title: 'Danh Mục',
        dataIndex: 'name',
        key: 'name',
    },
    {
      title: 'Tiền đặt cọc (%)',
      dataIndex: 'stake',
      key: 'stake',
  }, 
    {
        title: 'Chức năng',
        render: ({key:_id}:{key:number|string}) => (
          <div>
                <Popconfirm
                    title="Xóa sản phẩm"
                    description="Mày có chắc cmn chắn muốn xóa không??"
                    onConfirm={() => {
                      removeCategory(_id)
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
                <Button className='text-red-500'><FaTrashCan/></Button>
                </Popconfirm>

                  <Button  className='mr-5 text-blue-500' ><Link to={'edit/:id'}><FaWrench/></Link></Button>

          </div>
      ),

    }

];
  return (
    <div className="container">
    <h2 className="text-center text-2xl py-2">Trang Danh mục </h2>
    <Button className='m-2 text-3xl text-blue-500'><Link to={'add'}><FaCirclePlus style={{ fontSize: '24', display: 'block' }}/></Link></Button>
    <Button className='m-2  float-right'><Link to={''}><FaTrash style={{ fontSize: '20', display: 'block' }}/></Link></Button>
    
    <Table dataSource={data1} columns={columns}  />
    </div>
  )
}

export default Categorylist