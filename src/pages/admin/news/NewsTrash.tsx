import { useGetAllDeleteQuery, useRemoveForceNewMutation, useRestoreNewMutation } from '@/api/newsApi';
import { Table, Button } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import { FaTrashCan, FaWindowRestore } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const NewsTrash = () => {
  const { data }: any = useGetAllDeleteQuery();
  const news = data?.news;
  const [removeNew, { isLoading: isRemoveLoading }] = useRemoveForceNewMutation();
  const [restoreNew, { isLoading: isRestoreLoading }] = useRestoreNewMutation()

  const deleteNew = (id: any) => {
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
        removeNew(id).unwrap().then(() => {
          Swal.fire(
            'Xoá thành công!',
            'Tin tức của bạn đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Tin tức xoá thất bại.',
          'error'
        )
      }
    })
  }
  const restoreNew1 = (id: any) => {
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
        restoreNew(id).unwrap().then(() => {
          Swal.fire(
            'Khôi phục thành công!',
            'Tin tức của bạn đã được khôi phục.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Tin tức của bạn khôi phục thất bại.',
          'error'
        )
      }
    })
  }

  const data1 = news?.map((news: any) => {
    return {
      key: news._id,
      name: news.new_name,
      stake: news.new_description,
      image: <img width={50} src={news.new_image?.url} alt="" />
    }
  });

  const columns = [
    {
      title: 'Ảnh ',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: { key: number | string }) => (

        <div>
          <Button className='mr-1 text-red-500' onClick={() => deleteNew(_id)}>
            {isRemoveLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FaTrashCan />
            )}
          </Button>
          <Button className='mr-1 text-blue-500' onClick={() => restoreNew1(_id)} >
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
      <h3 className="font-semibold">Danh sách tin tức</h3>
      <Button className='text-blue-500'>
        <Link to="/admin/news"><BiFoodMenu style={{ fontSize: '24', display: 'block' }} /></Link>
      </Button>
      <Table dataSource={data1} columns={columns} />
    </div>
  )
}

export default NewsTrash