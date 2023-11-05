

import { useGetBrandQuery, useRemoveBrandMutation } from '@/api/brandApi';
import { IBrand } from '@/interfaces/brand';
import { Button, Skeleton, Table, Alert } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCirclePlus, FaTrashCan, FaWrench } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const BrandsList = () => {
  const { data, error, isLoading }: any = useGetBrandQuery();
  const [removeBrand, { isLoading: isRemoveLoading }] = useRemoveBrandMutation();
  const brand = data?.brand
  const dataSource = brand?.map(({ _id, brand_name }: IBrand) => {
    return {
      key: _id,
      name: brand_name
    }
  })
  const deleteBrand = (id: any) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Khi xoá không thể phục hồi lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa sản phẩm
        removeBrand(id).then(() => {
          Swal.fire(
            'Xoá thành công!',
            'Thương hiệu của bạn đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Đã huỷ',
          'Thương hiệu xoá thất bại.',
          'error'
        )
      }
    })
  }
  const columns = [
    {
      title: 'Tên thương hiệu',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: any) => {
        return (
          <div style={{ width: '150px' }}>
            <Button className='mr-1 text-red-500' onClick={() => deleteBrand(_id)}>
              {isRemoveLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <FaTrashCan />
              )}
            </Button>
            <Button className='mr-1 text-blue-500'>
              <Link to={`/admin/brands/edit/${_id}`}><FaWrench /></Link>
            </Button>
          </div>
        )
      }
    },
  ];
  if (isLoading) return <Skeleton />;
  if (error) {
    if ("data" in error && "status" in error) {
      return (
        <div>
          {error.status} - {JSON.stringify(error.data)}
        </div>
      );
    }
  }
  return (
    <div className="container">
      <h3 className="font-semibold">Danh sách thương hiệu </h3>
      <div className="overflow-x-auto drop-shadow-xl rounded-lg">
        <Button className='text-blue-500'>
          <Link to="/admin/brands/add"><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link>
        </Button>
        <Table dataSource={dataSource} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
      </div>
    </div>
  );
}

export default BrandsList;
