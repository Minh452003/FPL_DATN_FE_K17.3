import { useGetAllDeleteQuery, useRestoreCategoryMutation } from '@/api/categoryApi';
import { Table, Button } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import { FaWindowRestore } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const CategoryTrash = () => {
  const { data }: any = useGetAllDeleteQuery();
  const categories = data?.category;

  const [restoreCategory, { isLoading: isRemoveLoading }] = useRestoreCategoryMutation()

  const restoreCategory1 = (id: any) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "bạn có muốn khôi phục lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa sản phẩm

        restoreCategory(id).unwrap().then(() => {
          Swal.fire(
            'khôi thành công!',
            'danh mục của bạn đã được khôi.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Thương hiệu xoá thất bại :)',
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
          <Button onClick={() => restoreCategory1(_id)} type="primary" danger className="ml-2">
            {isRemoveLoading ? (
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