
import { useGetOrderByIdQuery } from '@/api/orderApi';
import { format } from 'date-fns';

import { getDecodedAccessToken } from '@/decoder';
import { Link, useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '@/api/authApi';
import { Skeleton } from 'antd';

const OrderDetail = () => {
  const decodedToken: any = getDecodedAccessToken();
  const iduser = decodedToken ? decodedToken.id : null;
  const { id }: any = useParams();

  const { data: dataOrder, error, isLoading: isLoadingFetching } = useGetOrderByIdQuery(id || ""); 
    const orders = dataOrder?.order;

    const { data: dataUser } = useGetUserByIdQuery<any>(iduser);
      dataUser?.user;

    if (isLoadingFetching) return <Skeleton />;
  if (error) {
    if ("data" in error && "status" in error) {
      return (
        <div>
          {error.status} - {JSON.stringify(error.data)}
        </div>
      );
    }
  }
  console.log(dataOrder);
  console.log(dataUser);
  
  



    return (
        <div>
            <h3 className='text-gray-500 pt-10'>Thông tin đơn hàng</h3>

                    <div className="grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 ml-4" key={orders._id}>
                        {/* --------------------Col 1 --------------------------- */} 
                        <div className="rounded-lg ml-20">

                            


                            <div className="name font-sans pt-10">Họ và tên : <a href="" style={{ textDecoration: "none", color: "black", }}>{dataUser.first_name} {dataUser.last_name} </a></div>

                            <div className='font-sans mt-1'>Số điện thoại : <a href="" style={{ textDecoration: "none", color: "black", }}>{orders.phone}</a></div>
                            <div className='font-sans mt-1'>Địa chỉ : <a href="" style={{ textDecoration: "none", color: "black", }}>{orders.address}</a></div>
                            <div className='font-sans mt-1'>Ngày đặt hàng : <a href="" style={{ textDecoration: "none", color: "black", }}>{format(new Date(orders.createdAt), "HH:mm a dd/MM/yyyy")}</a></div>
                            <div className='font-semibold mt-1 mb-10'>Tổng đơn hàng: <a href="" style={{ textDecoration: "none", color: "red", }}>{orders.total} ₫</a></div>
                            <button className="bg-green-500 border-solid rounded border-1 py-1 px-3 text-white"><Link to={"/"} style={{ textDecoration: "none", color: "white" }}>Đơn hàng mới</Link></button>
                        </div>
                         {/* --------------------Col 1 --------------------------- */}
                        <div className="rounded-lg ">
                        {orders.products.map((product: any, index: number) => (
          <div key={index} className='mb-3' style={{ background: '#FAFAFA', height: "150px", width: "700px", borderRadius: "10px" }}>
            <div className="container pt-4">
              <img className="ml-2 mr-2 rounded float-left" style={{ width: 150, height: 100 }} src={product.image} alt="" />
              <div className="font-sans">Sản phẩm: <a href="" style={{ textDecoration: "none", color: "black" }}>{product.product_name}</a></div>
              <div className="font-sans">Số lượng: <a href="" style={{ textDecoration: "none", color: "black" }}>{product.stock_quantity}</a></div>
              {/* <div className="font-sans"> Màu sắc: <a href="" style={{textDecoration: "none", color: "black",}}>{order.products[0].stock_quantity}</a> </div>                    
                  <div className="font-sans"> Size: <a href="" style={{textDecoration: "none", color: "black",}}>{order.products[0].product_name}</a> </div>
                  <div className="font-sans"> Chất liệu: <a href="" style={{textDecoration: "none", color: "black",}}>{order.products[0].product_name}</a> </div> */}
            </div>
          </div>
        ))}
                        </div>
                        </div>             
        </div>
    );
};
export default OrderDetail;
