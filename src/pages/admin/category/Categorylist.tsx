import { useGetCategoryQuery, useRemoveCategoryMutation } from '@/api/categoryApi';
import { Table, Button, } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Table, Button,Alert, Popconfirm, message } from 'antd';
import { FaCirclePlus, FaTrash, FaTrashCan, FaWrench } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const Categorylist = () => {
  const { data }: any = useGetCategoryQuery();
  const categories = data?.category.docs;
  const [removeCategory, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveCategoryMutation()



  const data1 = categories?.map((category: any) => {
    return {
      key: category._id,
      name: category.category_name,
      stake: category.price_increase_percent,
      image: <img width={50} src={category.category_image?.url} alt="" />
    }
  });
  const deleteProduct = (id: any) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Khi có thể vào thùng rác để khôi phục lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {        
        removeCategory(id).unwrap().then(() => {
          Swal.fire(
            'Xoá thành công!',
            'danh mục của bạn đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Danh mục xoá thất bại :)',
          'error'
        )
      }
    })
  }
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
      render: ({ key: _id }: { key: number | string }) => (
        <div>
          <Button  onClick={() => deleteProduct(_id)}>
              {isRemoveLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <FaTrashCan/>
              )}
            </Button>
            <Button type="primary" danger className="ml-2">
              <Link to={`/admin/brand/edit/${_id}`}><FaWrench /></Link>
            </Button>
        </div>
      ),

    }

  ];
  return (
    <div className="container">
      <h3 className="font-semibold">Danh sách danh mục</h3>
        <Button className='text-blue-500'>
          <Link to="/admin/brand/add"><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link>
        </Button>
      <Button className='m-2  float-right'><Link to={'trash'}><FaTrash style={{ fontSize: '20', display: 'block' }} /></Link></Button>
        <Table dataSource={data1} columns={columns} />
    </div>
    
  )
}

export default Categorylist