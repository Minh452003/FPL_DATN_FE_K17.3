import { useGetAllDeleteQuery, useRemoveForceNewMutation, useRestoreNewMutation } from '@/api/newsApi';
import { Table, Button } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import { FaTrashCan, FaWindowRestore } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const NewsTrash = () => {
  const { data }: any = useGetAllDeleteQuery();
  const news = data?.news;
  const [removeNew, { isLoading: isRemoveLoading }] = useRemoveForceNewMutation();
  const [restoreNew, { isLoading: isRestoreLoading }] = useRestoreNewMutation()

  const deleteNew = async (id: any) => {
    try {
      const result = await Swal.fire({
          title: 'Bạn chắc chứ?',
          text: 'Tin tức sẽ bị xoá và không thể khôi phục!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Vâng, tôi chắc chắn!',
          cancelButtonText: 'Huỷ',
      });

      if (result.isConfirmed) {
          const data: any = await removeNew(id).unwrap();
          if (data) {
              toast.success(`${data.message}`);
          }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          toast.info('Hủy xoá Tin tức');
      }
  } catch (error: any) {
      toast.error(error.message);
  }
  }
  const restoreNew1 = async (id: any) => {
    try {
      const result = await Swal.fire({
          title: 'Bạn chắc chứ?',
          text: 'Bạn có muốn khôi phục lại!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Vâng, tôi chắc chắn!',
          cancelButtonText: 'Huỷ',
      });

      if (result.isConfirmed) {
          const data: any = await restoreNew(id).unwrap();
          if (data) {
              toast.success(`${data.message}`);
          }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          toast.info('Hủy Khôi Phục Tin tức');
      }
  } catch (error: any) {
      toast.error(error.message);
  }
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