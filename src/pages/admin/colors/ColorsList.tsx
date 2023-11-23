
import { useGetColorsQuery, useRemoveColorMutation } from '@/api/colorApi';
import { IColor } from '@/interfaces/color';
import { Button, Skeleton, Table } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCirclePlus, FaTrashCan, FaWrench } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Colorslist = () => {
  const { data, error, isLoading }: any = useGetColorsQuery();
  const [removeColor, { isLoading: isRemoveLoading }] = useRemoveColorMutation();
  const color = data?.color
  const dataSource = color?.map(({ _id, colors_name }: IColor) => {
    return {
      key: _id,
      name: colors_name
    }
  })
  const deleteColor = (id: any) => {
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
        removeColor(id).then(() => {
          Swal.fire(
            'Xoá thành công!',
            'Màu của bạn đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Màu xoá thất bại.',
          'error'
        )
      }
    })
  }
  const columns = [
    {
      title: 'Tên màu',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: any) => {
        return (
          <div>
            <Button className='mr-1 text-red-500' onClick={() => deleteColor(_id)}>
              {isRemoveLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <FaTrashCan />
              )}
            </Button>
            <Button className='mr-1 text-blue-500'>
              <Link to={`/admin/colors/edit/${_id}`}><FaWrench /></Link>
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
      <h3 className="font-semibold">Danh sách màu</h3>
      <div className="overflow-x-auto drop-shadow-xl rounded-lg">
        <Button className='text-blue-500'>
          <Link to="/admin/colors/add"><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link>
        </Button>
        <Table dataSource={dataSource} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
      </div>
    </div>
  );
}

export default Colorslist;


