import "swiper/css";
import "swiper/css/navigation";
import { useGetOrderByUserIdQuery } from "@/api/orderApi";
import { getDecodedAccessToken } from "@/decoder";
import { format } from "date-fns";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetStatusQuery } from "@/api/statusApi";
const Order = () => {
  const [currentStatus, setCurrentStatus] = useState("all"); // Mặc định hiển thị tất cả
  const [filteredOrders, setFilteredOrders] = useState([]);
  const decodedToken: any = getDecodedAccessToken();
  const id = decodedToken ? decodedToken.id : null;
  const {
    data,
    error,
    isLoading: isLoadingFetching,
  } = useGetOrderByUserIdQuery<any>(id);
  const orders = data?.order;
  const { data: status, isLoading: isLoadingStatus }: any = useGetStatusQuery();
  const Status = isLoadingStatus ? [] : status?.status;

  const handleFilterOrders = (status: string) => {
    setCurrentStatus(status);

    if (status === "all") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order: any) => order.status._id === status
      );
      setFilteredOrders(filtered);
    }
  };

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
    <div className="bg-slate-50 border-solid border-1 rounded">
      <div className="m-3">
        <h3>Đơn hàng</h3>
        <div className="">
          <ul className="font-medium flex flex-col p-3 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href=""
                className={`no-underline text-gray-700 ${currentStatus === "all" ? "font-medium" : ""
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleFilterOrders("all");
                  setCurrentStatus("all"); // Thay đổi trạng thái hiện tại
                }}
              >
                Tất cả
              </a>
            </li>
            {Status.map((statusItem: any) => (
              <li key={statusItem._id}>
                <a
                  href=""
                  className={`no-underline text-gray-700 ${currentStatus === statusItem._id ? "font-medium" : ""
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleFilterOrders(statusItem._id);
                  }}
                >
                  {statusItem.status_name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
          {filteredOrders.map((order: any) => {
            return (
              <div
                className="flex flex-row gap-10 border-solid boder-2 border-slate-400 bg-white shadow-lg "
                key={order._id}
              >
                <div className="flex justify-start items-center mx-5">
                  <img
                    width="100"
                    height="100"
                    src={order.products[0].image}
                    alt="external-free-sales-flaticons-lineal-color-flat-icons"
                  />
                </div>
                <div className="flex flex-col font-medium justify-center px-10 py-4 ">
                  <p>
                    Ngày mua:{" "}
                    <span className="text-[#FF1493]">
                      {format(new Date(order.createdAt), "HH:mm a dd/MM/yyyy")}
                    </span>
                  </p>
                  <p className="total1">
                    Tổng tiền:{" "}
                    <span className="text-[#FF1493]">
                      {formatCurrency(order.total)}₫
                    </span>
                  </p>
                  <p className="justify-start">
                    Trạng thái:{" "}
                    <span className="text-[#FF1493]">
                      {order.status.status_name}
                    </span>
                  </p>
                  <button className="bg-green-500 border-solid rounded border-1 py-1 px-3 text-white">
                    <Link
                      className="ctorder"
                      to={`/user/orders/${order._id}/orderdetail`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Chi tiết
                    </Link>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Order;