
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOrderByUserIdQuery } from '@/api/orderApi';
import { format } from 'date-fns';

import { getDecodedAccessToken } from '@/decoder';
import { Link } from 'react-router-dom';
import { useGetUserByIdQuery } from '@/api/authApi';
import { useGetSizeQuery } from '@/api/sizeApi';

const OrderDetail = () => {
    const { userID, sizeID } = useParams();
    const { data: dataOrder } = useGetOrderByUserIdQuery<any>(userID);
    const orders = dataOrder?.order;

    const { data: dataUser, error } = useGetUserByIdQuery<any>(userID);
    const users = dataUser?.user;

    const Navigate = useNavigate();
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;
    if (!id || id !== userID) {
        Navigate('/signin');
        return null;
    }
console.log(dataUser);



    return (
        <div>
            <h3 className='text-gray-500 pt-10'>Thông tin đơn hàng</h3>
            {orders?.map((order: any) => {
                return (

                    <div className="grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 ml-4" key={order._id}>
                        {/* --------------------Col 1 --------------------------- */} 
                        <div className="rounded-lg ml-20">

                            


                            <div className="name font-sans pt-10">Họ và tên : <a href="" style={{ textDecoration: "none", color: "black", }}>{dataUser.last_name} {dataUser.first_name} </a></div>

                            <div className='font-sans mt-1'>Số điện thoại : <a href="" style={{ textDecoration: "none", color: "black", }}>{order.phone}</a></div>
                            <div className='font-sans mt-1'>Địa chỉ : <a href="" style={{ textDecoration: "none", color: "black", }}>{order.address}</a></div>
                            <div className='font-sans mt-1'>Ngày đặt hàng : <a href="" style={{ textDecoration: "none", color: "black", }}>{format(new Date(order.createdAt), "HH:mm a dd/MM/yyyy")}</a></div>
                            <div className='font-semibold mt-1 mb-10'>Tổng đơn hàng: <a href="" style={{ textDecoration: "none", color: "red", }}>{order.total} ₫</a></div>
                            <button className="bg-green-500 border-solid rounded border-1 py-1 px-3 text-white"><Link to={"/"} style={{ textDecoration: "none", color: "white" }}>Đơn hàng mới</Link></button>
                        </div>
                         {/* --------------------Col 1 --------------------------- */}
                        <div className="rounded-lg ">
                            <div className='mt-10 ' style={{ background: '#FAFAFA', height: "150px", width: "700px", borderRadius: "10px" }}>
                                <div className="container pt-4 ">

                                    <img className=" ml-2 mr-2 rounded float-left" style={{ width: 150, height: 100 }} src={order.products[0].image} alt="" />
                                    <div className="font-sans"> Sản phẩm: <a href="" style={{ textDecoration: "none", color: "black", }}>{order.products[0].product_name}</a> </div>
                                    <div className="font-sans"> Số lượng: <a href="" style={{ textDecoration: "none", color: "black", }}>{order.products[0].stock_quantity}</a> </div>
                                    {/* <div className="font-sans"> Màu sắc: <a href="" style={{textDecoration: "none", color: "black",}}>{order.products[0].stock_quantity}</a> </div>                    
                            <div className="font-sans"> Size: <a href="" style={{textDecoration: "none", color: "black",}}>{order.products[0].product_name}</a> </div>
                            <div className="font-sans"> Chất liệu: <a href="" style={{textDecoration: "none", color: "black",}}>{order.products[0].product_name}</a> </div> */}

                                </div>
                            </div>
                        </div>

                    </div>
                )
            })}
        </div>
    );
};
export default OrderDetail;
