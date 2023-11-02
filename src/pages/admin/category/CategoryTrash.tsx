import { useGetAllDeleteQuery, useRemoveForceCategoryMutation, useRestoreCategoryMutation } from '@/api/categoryApi';
import { Table, Button } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import { FaTrashCan, FaWindowRestore } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const CategoryTrash = () => {
  const { data }: any = useGetAllDeleteQuery();
  const categories = data?.category;
  const [removeCategory, { isLoading: isRemoveLoading }] = useRemoveForceCategoryMutation();
  const [restoreCategory, { isLoading: isRestoreLoading }] = useRestoreCategoryMutation()

  const deleteCategory = (id: any) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Khi xóa bạn không thể khôi phục lại!",
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
            'Danh mục của bạn đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Danh mục xoá thất bại.',
          'error'
        )
      }
    })
  }
  const restoreCategory1 = (id: any) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Bạn có muốn khôi phục lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        restoreCategory(id).unwrap().then(() => {
          Swal.fire(
            'Khôi phục thành công!',
            'Danh mục của bạn đã được khôi phục.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Danh mục của bạn khôi phục thất bại.',
          'error'
        )
      }
    })
  }

  const data1 = categories?.map((category: any) => {
    return {
      key: category._id,
      name: category.category_name,
      stake: category.price_increase_percent,
      image: <img width={50} src={category.category_image?.url} alt="" />
    }
  });

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
           <Button className='mr-1 text-red-500' onClick={() => deleteCategory(_id)}>
            {isRemoveLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FaTrashCan />
            )}
          </Button>
          <Button className='mr-1 text-blue-500' onClick={() => restoreCategory1(_id)} >
            {isRestoreLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FaWindowRestore />
            )}
          </Button>
        </div>
      )

    }

  ];
  return (
    <div className="container">
      <h3 className="font-semibold">Danh sách danh mục</h3>
      <Button className='text-blue-500'>
        <Link to="/admin/categories"><BiFoodMenu style={{ fontSize: '24', display: 'block' }} /></Link>
      </Button>
      <Table dataSource={data1} columns={columns} />
    </div>
  )
}

export default CategoryTrash