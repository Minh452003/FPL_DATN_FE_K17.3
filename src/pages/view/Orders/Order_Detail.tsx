
import { useGetOrderByIdQuery } from '@/api/orderApi';
import { format } from 'date-fns';

import { getDecodedAccessToken } from '@/decoder';
import { Link, useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '@/api/authApi';
import { Skeleton } from 'antd';
import { useGetMaterialQuery } from '@/api/materialApi';
import { useGetColorsQuery } from '@/api/colorApi';
import { useGetSizeQuery } from '@/api/sizeApi';

const OrderDetail = () => {
  const decodedToken: any = getDecodedAccessToken();
  const iduser = decodedToken ? decodedToken.id : null;
  const { id }: any = useParams();
  const { data: dataOrder, error, isLoading: isLoadingFetching }: any = useGetOrderByIdQuery(id || "");
  const orders = dataOrder?.order;
  const { data: dataUser } = useGetUserByIdQuery<any>(iduser);
  dataUser?.user;
  const { data: colors } = useGetColorsQuery<any>();
  const { data: sizes } = useGetSizeQuery<any>();
  const { data: materials } = useGetMaterialQuery<any>();
  const color = colors?.color;
  const size = sizes?.size;
  const material = materials?.material


  const formatCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };



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
  return (
    <div>
      <h3 className='text-gray-500 pt-10 pl-20'>Thông tin đơn hàng</h3>
      <div className="grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 ml-4" key={orders._id}>
        {/* --------------------Col 1 --------------------------- */}
        <div className="rounded-lg ml-20">
          <div className="name font-sans pt-10">Họ và tên : <a href="" style={{ textDecoration: "none", color: "black", }}>{dataUser?.first_name} {dataUser?.last_name} </a></div>
          <div className='font-sans mt-1'>Số điện thoại : <a href="" style={{ textDecoration: "none", color: "black", }}>{orders?.phone}</a></div>
          <div className='font-sans mt-1'>Địa chỉ : <a href="" style={{ textDecoration: "none", color: "black", }}>{orders?.address}</a></div>
          <div className='font-sans mt-1'>Ngày đặt hàng : <a href="" style={{ textDecoration: "none", color: "black", }}>{format(new Date(orders?.createdAt), "HH:mm a dd/MM/yyyy")}</a></div>
          <div className='font-sans mt-1'>Ghi chú : <a href="" style={{ textDecoration: "none", color: "black", }}>{orders?.notes}</a></div>
          <div className='font-sans mt-3'>Phí vận chuyển: <a href="" style={{ textDecoration: "none", color: "red", }}>{formatCurrency(orders?.shipping)}₫</a></div>
          {orders.deposit ? <div className='font-semibold'>Đã cọc: <a href="" style={{ textDecoration: "none", color: "red", }}>{formatCurrency(orders?.deposit)}₫</a></div> : ''}
          <div className='font-semibold mt-1 mb-10'>{orders.deposit ? 'Tổng tiền còn lại: ' : 'Tổng đơn hàng: '} <a href="" style={{ textDecoration: "none", color: "red", }}>{formatCurrency(orders?.total)}₫</a></div>
          <button className="bg-green-500 border-solid rounded border-1 py-1 px-3 text-white"><Link to={"/"} style={{ textDecoration: "none", color: "white" }}>{orders.status.status_name}</Link></button>
        </div>
        {/* --------------------Col 1 --------------------------- */}
        <div className="rounded-lg ">
          {orders ? orders.products.map((product: any, index: number) => {
            const colorname = color?.find((color: any) => color._id === product.colorId);
            const sizename = size?.find((size: any) => size._id === product.sizeId);
            const materialname = material?.find((material: any) => material._id === product.materialId);

            return (
              <div key={index} className='mb-3' style={{ background: '#FAFAFA', height: "150px", width: "700px", borderRadius: "10px" }}>
                <div className="container pt-4">
                  <img className="ml-2 mr-2 rounded float-left" style={{ width: 150, height: 100 }} src={product?.image} alt="" />
                  <div className="font-sans"><strong style={{ textDecoration: "none", color: "black" }}>{product?.product_name}</strong></div>
                  <div className="font-sans" style={{ fontSize: '14px' }}>Số lượng: <a href='' style={{ textDecoration: "none", color: "black" }}>{product?.stock_quantity}</a> </div>
                  <div className="font-sans" style={{ fontSize: '14px' }}>Màu sắc: <a href="" style={{ textDecoration: "none", color: "black" }}>{colorname?.colors_name}</a> </div>
                  <div className="font-sans" style={{ fontSize: '14px' }}>Size: <a href="" style={{ textDecoration: "none", color: "black", }}>{sizename?.size_name}</a> </div>
                  <div className="font-sans" style={{ fontSize: '14px' }}>Chất liệu: <a href="" style={{ textDecoration: "none", color: "black", }}>{materialname?.material_name}</a> </div>
                </div>
              </div>
            )
          }) : "Lỗi"}
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
