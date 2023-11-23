
import { useGetSizeQuery, useRemoveSizeMutation } from '@/api/sizeApi';
import { ISize } from '@/interfaces/size';
import { Button, Skeleton, Table } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCirclePlus, FaTrashCan, FaWrench } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Sizeslist = () => {
  const { data, error, isLoading }: any = useGetSizeQuery();
  const [removeSize, { isLoading: isRemoveLoading }] = useRemoveSizeMutation();
  const size = data?.size
  const dataSource = size?.map(({ _id, size_name, size_height, size_length, size_weight, size_width }: ISize) => {
    return {
      key: _id,
      size_name,
      size_height,
      size_length,
      size_weight,
      size_width
    }
  })
  const deleteSize = (id: any) => {
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
        removeSize(id).then(() => {
          Swal.fire(
            'Xoá thành công!',
            'Kích cỡ của bạn đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Kích cỡ xoá thất bại.',
          'error'
        )
      }
    })
  }
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'size_name',
      key: 'size_name',
    },
    {
      title: 'Chiều cao',
      dataIndex: 'size_height',
      key: 'size_height',
    },
    {
      title: 'Độ dài',
      dataIndex: 'size_length',
      key: 'size_length',
    },
    {
      title: 'Cân nặng',
      dataIndex: 'size_weight',
      key: 'size_weight',
    },
    {
      title: 'Chiều dài',
      dataIndex: 'size_width',
      key: 'size_width',
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: any) => {
        return (
          <div style={{ width: '150px' }}>
            <Button className='mr-1 text-red-500' onClick={() => deleteSize(_id)}>
              {isRemoveLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <FaTrashCan />
              )}
            </Button>
            <Button className='mr-1 text-blue-500'>
              <Link to={`/admin/sizes/edit/${_id}`}><FaWrench /></Link>
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
      <h3 className="font-semibold">Danh sách kích cỡ</h3>
      <div className="overflow-x-auto drop-shadow-xl rounded-lg">
        <Button className='text-blue-500'>
          <Link to="/admin/sizes/add"><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link>
        </Button>
        <Table dataSource={dataSource} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
      </div>
    </div>
  );
}

export default Sizeslist;
