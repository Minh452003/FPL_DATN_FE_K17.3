import { useGetCategoryQuery, useRemoveCategoryMutation } from '@/api/categoryApi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Table, Button } from 'antd';
import { FaCirclePlus, FaTrash, FaTrashCan, FaWrench } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';


const Categorylist = () => {
  const { data }: any = useGetCategoryQuery();
  const categories = data?.category.docs;
  const [removeCategory, { isLoading: isRemoveLoading }] = useRemoveCategoryMutation()
  const [sortedInfo, setSortedInfo] = useState({} as any);
  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };


  const data1 = categories?.map((category: any, index: number) => {
    return {
      key: category._id,
      STT: index + 1,
      category_name: category.category_name,
      price_increase_percent: category.price_increase_percent,
      category_image: <img width={50} src={category.category_image?.url} alt="" />
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
            'Danh mục của bạn đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Đã huỷ',
          'Danh mục xoá thất bại.',
          'error'
        )
      }
    })
  }
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      render: (index: any) => <a>{index}</a>,
      sorter: (a: any, b: any) => a.STT - b.STT, // Sắp xếp theo STT
      sortOrder: sortedInfo.columnKey === 'STT' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Ảnh ',
      dataIndex: 'category_image',
      key: 'category_image',
    },
    {
      title: 'Danh Mục',
      dataIndex: 'category_name',
      key: 'category_name',
      sorter: (a: any, b: any) => a.category_name.localeCompare(b.category_name),
      sortOrder: sortedInfo.columnKey === 'category_name' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Tiền đặt cọc (%)',
      dataIndex: 'price_increase_percent',
      key: 'price_increase_percent',
      render: (index: any) => <a>{index}%</a>,
      sorter: (a: any, b: any) => a.price_increase_percent - b.price_increase_percent, // Sắp xếp theo giá
      sortOrder: sortedInfo.columnKey === "price_increase_percent" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: { key: number | string }) => (
        <div style={{ width: '150px' }}>
          <Button className='mr-1 text-red-500' onClick={() => deleteProduct(_id)}>
            {isRemoveLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FaTrashCan />
            )}
          </Button>
          <Button className='mr-1 text-blue-500'>
            <Link to={`/admin/categories/${_id}/edit`}><FaWrench /></Link>
          </Button>
        </div>
      ),

    }

  ];
  return (
    <div className="container">
      <h3 className="font-semibold">Danh sách danh mục</h3>
      <Button className='text-blue-500'>
        <Link to="/admin/categories/add"><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link>
      </Button>
      <Button className='m-2  float-right'><Link to={'trash'}><FaTrash style={{ fontSize: '20', display: 'block' }} /></Link></Button>
      <Table onChange={handleChange} dataSource={data1} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
    </div>

  )
}

export default Categorylist