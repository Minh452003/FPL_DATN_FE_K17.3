import "swiper/css";
import "swiper/css/navigation";
import { useGetOrderByUserIdQuery } from "@/api/orderApi";
import { getDecodedAccessToken } from "@/decoder";
import { format } from 'date-fns';
import { Skeleton } from "antd";
import { Link } from "react-router-dom";
const Order = () => {
  const decodedToken: any = getDecodedAccessToken();
  const id = decodedToken ? decodedToken.id : null;
  const { data, error, isLoading: isLoadingFetching } = useGetOrderByUserIdQuery<any>(id);
  const orders = data?.order;


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
  if (!data || !orders || orders.length === 0) {
    return <p>Không có đơn hàng nào.</p>;
  }

  return (
    <div className="bg-slate-50 border-solid border-1 rounded">
      <div className="m-3">
        <h3>Đơn hàng</h3>
        <div className="">
          <ul className="font-medium flex flex-col p-3 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="" className=" no-underline text-gray-700">
                Tất cả
              </a>
            </li>
            <li>
              <a href="" className="no-underline text-gray-700">
                Đang giao
              </a>
            </li>
            <li>
              <a href="" className="no-underline text-gray-700">
                Giao thành công
              </a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          {orders?.map((order: any) => {
            return (
              <div className="flex flex-row gap-10 border-solid boder-2 border-slate-400 bg-white shadow-md " key={order._id}>
                <div className="flex justify-start items-center mx-5 ">
                  <img
                    width="100"
                    height="100"
                    src={order.products[0].image}
                    alt="external-free-sales-flaticons-lineal-color-flat-icons"
                  />
                </div>
                <div className="flex flex-col font-medium justify-center items-center px-10 py-4 ">
                  <p>Đơn hàng ngày: <span className="text-[#FF1493]">{format(new Date(order.createdAt), "HH:mm a dd/MM/yyyy")}</span></p>
                  <p className="pl-4">Tổng tiền: <span className="text-[#FF1493]">{order.total}</span></p>
                  <p className="justify-start">Trạng thái: <span className="text-[#FF1493]">{order.status.status_name}</span></p>
                  <button className="bg-green-500 border-solid rounded border-1 py-1 px-3 text-white"><Link to={"orderdetail"} style={{ textDecoration: "none", color: "black" }}>Chi tiết</Link></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};
export default Order;
