import { Button, Skeleton, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useGetOrderQuery } from "@/api/orderApi";
import { useGetUsersQuery } from "@/api/authApi";
import { IUser } from "@/interfaces/auth";

const OrdersUnconfirmed = () => {
    const { data: orders, isLoading: loadingSucces }: any = useGetOrderQuery()
    const { data: users }: any = useGetUsersQuery();

    
    const data = (orders?.order || []).map((order: any) => {
      const number = order.total;
      const formattedNumber = number.toFixed(2);
      const user = users?.user?.find((user: IUser) => user._id === order.userId);
      console.log('User:', user);
     
      
      return {
          key: order._id,
          address: order.address,
          phone: order.phone,
          total: <span className="fw-bold">${formattedNumber}</span>,
          createAt: format(new Date(order.createdAt), "HH:mm a dd/MM/yyyy"),
          image: <img width={50} src={order.products[0]?.image} alt="" />,
          userId: `${order.userId?.first_name} ${order.userId?.last_name}`
      };
      
  });
  console.log(orders?.userId);

    console.log('Orders data:', orders);
    console.log('Users data:', users);

    const columns: ColumnsType<any> = [
        {
            title: 'Order Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Order User',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Order Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Order Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Order Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Order Time',
            dataIndex: 'createAt',
            key: 'createAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
                <Space size="middle">
                    <Button danger style={{ border: '1px solid blue' }}><Link to={`/admin/order/${record.key}/detail`}><button style={{textDecoration: "none"}}>Chi tiết</button></Link></Button>
                </Space>
            ),
        },

    ];
    if (loadingSucces) return <Skeleton />;

    return (
        <div>
            <br />
            <header className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-2xl">Đơn hàng của bạn</h2>
            </header>
            <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 6 }} rowKey="key" />

        </div>
    )
}

export default OrdersUnconfirmed