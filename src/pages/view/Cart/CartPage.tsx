import { Image, Table, Button, } from 'antd';
import { FaTrashCan } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './CartPage.css'
const CartPage = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            size: "XL",
            color: 'Nâu nhạt',
            price: '2.500.200đ',
            quantity: '1',
            total: '2.500.200đ',
        },
        {
            key: '2',
            name: 'John',
            size: "XS",
            color: 'Xanh đen',
            price: '2.500.200đ',
            quantity: '1',
            total: '2.500.200đ',
        },
    ];
    const columns = [
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'image',
            key: 'image',
            render: () => <Image src={"https://picsum.photos/200"} width={100} />
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            className: 'custom-name',



        },
        {
            title: 'Kích thước',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Màu sắc',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Giá bán lẻ',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Tạm tính',
            dataIndex: 'total',
            key: 'total',
            className: 'custom-total',
        },
        {
            title: 'Xóa',
            render: () => (
                <div >
                    <Button ><FaTrashCan /></Button>
                </div>
            )
        }

    ];
    return (

        <div className='bg-gray-100 container mx-auto'>
            {/* <div className="flex items-center ">
                <div className="float-left">Trang Chủ</div>
                <FaArrowRight className="ml-2" />
                <div className="pl-2">Giỏ hàng</div>
            </div> */}
            <h1 className='pt-10 pb-10'>Giỏ hàng của bạn</h1>
            <Table dataSource={dataSource} columns={columns} className='custom-table' />
            <div className='pt-20 pb-10'>
                <button className="w-60 h-12  bg-slate-600 text-white font-bold ">TIẾP TỤC MUA HÀNG</button>
                <span className='float-right font-bold'>Tổng tiền : <Link to={'/'} className='pl-4  ' style={{ textDecoration: 'none', color: '#FF0606' }}>5.400.000đ</Link></span>
            </div>
            <div className='pb-20'>
                <button className="w-60 h-12   bg-slate-600 text-white font-bold float-right "><Link style={{ textDecoration: "none", color: "white" }} to={'/pay'}>TIẾN HÀNH THANH TOÁN</Link></button>
            </div>

        </div>


    )

}


export default CartPage