import { useGetMaterialQuery, useRemoveMaterialMutation } from '@/api/materialApi';
import { IMaterials } from '@/interfaces/materials';
import { Table, Button, Skeleton } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCirclePlus, FaTrashCan, FaWrench } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

interface TableColumn {
  key: string;
  STT: number;
  name: string;
}

const MaterialList = () => {
  const { data, isLoading }: { data: { material: IMaterials[] }, isLoading: boolean } = useGetMaterialQuery();
  const [removeMaterial, { isLoading: isRemoveLoading }] = useRemoveMaterialMutation();
  const material: IMaterial[] | undefined = data?.material;
  const dataSource :TableColumn[]= isLoading
    ? []
    : material?.map(({ _id, material_name }: IMaterials, index: number) => {
      return {
        key: _id,
        STT: index + 1,
        name: material_name,
      };
    });

  const deleteMaterial = (id: string) => {
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
        removeMaterial(id).then(() => {
          Swal.fire(
            'Xoá thành công!',
            'Vật liệu của bạn đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Đã huỷ',
          'Vật liệu xoá thất bại.',
          'error'
        )
      }
    })
  }
  const columns = [
    {
      title: 'Tên vật liệu',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: { key: string }) => (
        <div style={{ width: '150px' }}>
          <Button className='mr-1 text-red-500' onClick={() => deleteMaterial(_id)}>
            {isRemoveLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FaTrashCan />
            )}
          </Button>
          <Button className='mr-1 text-blue-500'>
            <Link to={`/admin/materials/edit/${_id}`}><FaWrench /></Link>
          </Button>
        </div>
      ),
    }
  ];
  if (isLoading) return <Skeleton />
  return (
    <div className="container">
      <h3 className="font-semibold">Danh sách vật liệu</h3>
      <div className="overflow-x-auto drop-shadow-xl rounded-lg">
        <Button className='text-blue-500'>
          <Link to="/admin/materials/add"><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link>
        </Button>
        <Table dataSource={dataSource} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
      </div>
    </div>
  )
}

export default MaterialList;
