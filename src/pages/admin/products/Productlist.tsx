import { Image, Table, Button, } from 'antd';
import { FaTrashCan, FaWrench, FaCirclePlus, FaTrash } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Productlist = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Bàn Ghê Cafe - Ghê Cefe đầu trâu GG01',
      category: 'Ghế gỗ Cafe',
      brand: 'Casa',
      material: 'Gỗ',
      color: 'Nâu',
      price: '2.340.000đ',
      quantity: '1',
    },
    {
      key: '2',
      name: 'Sách Y học',
      category: 'Ghế gỗ Cafe',
      brand: 'Casa',
      material: 'Gỗ',
      color: 'Nâu',
      price: '2.340.000đ',
      quantity: '1',
    },
  ];
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: () => <Image src={"https://faha.vn/wp-content/uploads/2023/07/ban-ghe-cafe-ghe-cafe-dau-trau-gg01-6.jpg"} width={100} />
    },
    {
      title: 'Danh Mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Chất liệu',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Màu',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Chức năng',
      render: () => (
        <div >
          <Button className='mr-5 text-blue-500' ><Link to={'edit/:id'}><FaWrench /></Link></Button>
          <Button className='text-red-500'><Link to={'remove/:id'}><FaTrashCan /></Link></Button>
        </div>
      )
    }

  ];
  return (
    <div className="container">
      <h2 className="text-center text-2xl py-2">Trang Sản phẩm </h2>
      <div className="overflow-x-auto drop-shadow-xl rounded-lg">
        <Button className='m-2 text-3xl text-blue-500'><Link to={'add'}><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link></Button>
        <Button className='m-2  float-right'><Link to={''}><FaTrash style={{ fontSize: '20', display: 'block' }} /></Link></Button>

        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  )
}

export default Productlist