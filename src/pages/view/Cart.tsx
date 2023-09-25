import { Image, Table, Button } from 'antd';
import { FaArrowRight } from "react-icons/fa6"
const Cart = () => {
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
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: () => <Image src={"https://picsum.photos/200"} width={100} />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Kích Thước',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Màu sắc',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Giá ',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Tổng',
            dataIndex: 'total',
            key: 'total',
        },
        {
            render: () => (
                <div>
                    <Button >Xóa</Button>
                </div>
            )
        }

    ];
    return (
        <div>
            <div className="flex items-center">
                <div className="float-left">Trang Chủ</div>
                <FaArrowRight className="ml-2" />
                <div className="pl-2">Giỏ hàng</div>
            </div>
            <h1 className='pt-10 pb-10'>Giỏ hàng của bạn</h1>
            <Table dataSource={dataSource} columns={columns} />
            <div className='pt-20 pb-10'>
                <button className="w-60 h-10  bg-slate-600 text-white font-bold pt-2"><h6>TIẾP TỤC MUA HÀNG</h6></button>
                <span className='float-right font-bold'>Tổng tiền : <a href="" className='pl-20 ' style={{ textDecoration: 'none', color: '#FF0606' }}>5.400.000đ</a></span>
            </div>
            <div className='pb-20'>
                <button className="w-60 h-10  bg-slate-600 text-white font-bold pt-2 float-right" style={{ background: "#FF7600" }}><h6>TIẾP TỤC MUA HÀNG</h6></button>
            </div>

        </div>

        // <div className="container">
        //     <div className=""><a href="">Trang Chủ</a></div>
        //     <h2 className="pt-10 pb-10" >Giỏ hàng của bạn</h2>
        //     <div className="overflow-x-auto">
        //         <table className="table">
        //             {/* head */}
        //             <thead >
        //                 <tr >
        //                     <th className="text-orange-700">Ảnh sản phẩm</th>
        //                     <th>Tên sản phẩm</th>
        //                     <th>Kích thước</th>
        //                     <th>Màu sắc</th>
        //                     <th>Số lượng</th>
        //                     <th>Tạm tính</th>
        //                     <th>Xóa</th>
        //                     <th></th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {/* row 1 */}
        //                 <tr>

        //                     <td>
        //                         <div className="flex items-center space-x-3 text-center">
        //                             <div className="avatar">
        //                                 <div className="mask mask-squircle w-20 h-20">
        //                                     <img src="https://picsum.photos/200" />
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </td>
        //                     <td>
        //                         Giường gỗ công nghiệp
        //                     </td>
        //                     <td>XL</td>
        //                     <td>
        //                         <button className="btn btn-ghost btn-xs">Đen xám</button>
        //                     </td>
        //                     <td>1</td>
        //                     <td>2.999.650₫</td>
        //                     <td>icon xóa</td>
        //                 </tr>

        //             </tbody>

        //         </table>
        //     </div>
        // </div>

    )
}

export default Cart