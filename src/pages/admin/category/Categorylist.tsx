import { Image, Table, Button, } from 'antd';
import { FaTrashCan, FaWrench, FaCirclePlus, FaTrash } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Categorylist = () => {
  const dataSource = [
    {
        key: '1',
        name: 'Sách giáo khoa',
        stake: '20%'
    },
    {
        key: '2',
        name: 'Sách Y học',
        stake: '30%'
    },
];
const columns = [
    {
        title: 'Ảnh ',
        dataIndex: 'image',
        key: 'image',
        render: () => <Image src={"https://picsum.photos/200"} width={100} />
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
        render: () => (
            <div >
                <Button  className='mr-5 text-blue-500' ><Link to={'edit/:id'}><FaWrench/></Link></Button>
                <Button className='text-red-500'><Link to={'remove/:id'}><FaTrashCan/></Link></Button> 
            </div>
        )
    }

];
  return (
    <div className="container">
    <h2 className="text-center text-2xl py-2">Trang Danh mục </h2>
    <Button className='m-2 text-3xl text-blue-500'><Link to={'add'}><FaCirclePlus style={{ fontSize: '24', display: 'block' }}/></Link></Button>
    <Button className='m-2  float-right'><Link to={''}><FaTrash style={{ fontSize: '20', display: 'block' }}/></Link></Button>
    
    <Table dataSource={dataSource} columns={columns}  />
    </div>
  )
}

export default Categorylist