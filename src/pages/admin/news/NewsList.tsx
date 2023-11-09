
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Table, Button } from 'antd';
import { FaCirclePlus, FaTrash, FaTrashCan, FaWrench } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useGetNewsQuery, useRemoveNewMutation } from '@/api/newsApi';


const Newslist = () => {
  const { data }: any = useGetNewsQuery();
  console.log(data);
  
  const news = data?.news.docs;
  console.log(news);
  
  const [removeNews, { isLoading: isRemoveLoading }] = useRemoveNewMutation()
  const [sortedInfo, setSortedInfo] = useState({} as any);
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };


  const data1 = news?.map((news: any,index: number) => {
    return {
      key: news._id,
      STT: index + 1,
      new_name: news.new_name,
      new_description: news.new_description,
      new_image: <img width={50} src={news.new_image?.url} alt="" />
    }
  });
  const deleteNew = (_id: any) => {
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
        removeNews(_id).unwrap().then(() => {
          Swal.fire(
            'Xoá thành công!',
            'Tin tức của bạn đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Đã huỷ',
          'Tin tức xoá thất bại.',
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
      sorter: (a:any, b:any) => a.STT - b.STT, // Sắp xếp theo STT
      sortOrder: sortedInfo.columnKey === 'STT' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Ảnh ',
      dataIndex: 'new_image',
      key: 'new_image',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'new_name',
      key: 'new_name',
      sorter: (a:any, b:any) => a.new_name.localeCompare(b.new_name), 
      sortOrder: sortedInfo.columnKey === 'new_name' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Mô tả',
      dataIndex: 'new_description',
      key: 'new_description',
      sorter: (a:any, b:any) => a.new_description - b.new_description, // Sắp xếp theo giá
      sortOrder: sortedInfo.columnKey === "new_description" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: { key: number | string }) => (
        <div style={{ width: '150px' }}>
          <Button className='mr-1 text-red-500' onClick={() => deleteNew(_id)}>
            {isRemoveLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FaTrashCan />
            )}
          </Button>
          <Button className='mr-1 text-blue-500'>
            <Link to={`/admin/news/${_id}/edit`}><FaWrench /></Link>
          </Button>
        </div>
      ),

    }

  ];
  return (
    <div className="container">
      <h3 className="font-semibold">Danh sách tin tức</h3>
      <Button className='text-blue-500'>
        <Link to="/admin/news/add"><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link>
      </Button>
      <Button className='m-2  float-right'><Link to={'trash'}><FaTrash style={{ fontSize: '20', display: 'block' }} /></Link></Button>
      <Table onChange={handleChange} dataSource={data1} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
    </div>

  )
}

export default Newslist