import { Button, Skeleton, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useGetOrderQuery } from "@/api/orderApi";
import { BiDetail } from "react-icons/bi";
// import { useGetUsersQuery } from "@/api/authApi";
// import { IUser } from "@/interfaces/auth";

const OrdersManager = () => {
    const { data: orders, isLoading: loadingSucces }: any = useGetOrderQuery()
    // const { data: users }: any = useGetUsersQuery();
    const filteredOrders = loadingSucces ? [] : orders?.order?.filter((order: any) => order.status._id === '64e8a93da63d2db5e8d8562a');
    const formatCurrency = (number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const data = filteredOrders.map((order: any) => {
        return {
            key: order._id,
            address: order.address,
            phone: order.phone,
            total: <span className="fw-bold text-red-800">{formatCurrency(order.total)}₫</span>,
            createAt: format(new Date(order.createdAt), "HH:mm a dd/MM/yyyy"),
            image: <img width={50} src={order.products[0]?.image} alt="" />,
            userId: `${order.userId?.first_name} ${order.userId?.last_name}`
        };

    });


    const columns: ColumnsType<any> = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Người mua',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tổng đơn hàng',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Thời gian mua',
            dataIndex: 'createAt',
            key: 'createAt',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record: any) => (
                <Space size="middle">
                    <Button danger style={{ border: '1px solid blue' }}><Link to={`/admin/orders/${record.key}/detail`}><BiDetail /></Link></Button>
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

export default OrdersManager