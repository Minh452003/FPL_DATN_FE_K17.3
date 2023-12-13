import { useNavigate, useParams } from "react-router-dom"
import { Button, Form, Select, Skeleton } from 'antd';
import { useGetStatusQuery } from "@/api/statusApi";
import { useEffect } from "react";
import { useGetOrderByIdQuery, useUpdateOrderStatusMutation } from "@/api/orderApi";
import { useGetMaterialQuery } from "@/api/materialApi";
import { useGetColorsQuery } from "@/api/colorApi";
import { useGetSizeQuery } from "@/api/sizeApi";
import "./OrdersDetail.css";
import { format } from "date-fns";
import { toast } from "react-toastify";

const OrdersDetail = () => {
    const { id }: any = useParams()
    const { data: orderDetail } = useGetOrderByIdQuery<any>(id);
    const { data: status } = useGetStatusQuery<any>()
    const { data: Colors, isLoading: isLoadingColors } = useGetColorsQuery<any>();
    const { data: Sizes, isLoading: isLoadingSizes } = useGetSizeQuery<any>();
    const { data: Materials, isLoading: isLoadingMaterials } = useGetMaterialQuery<any>();
    const [updateOrderStatus] = useUpdateOrderStatusMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (orderDetail) {
            setFields();
        }
    }, [orderDetail]);
    const [form] = Form.useForm();
    const setFields = () => {
        form.setFieldsValue({
            _id: orderDetail?.order?._id,
            status: orderDetail?.order?.status?._id,
        });
    };


    const onFinish = async (values: any) => {
        try {
            const data = await updateOrderStatus({ _id: orderDetail?.order?._id, status: values.status }).unwrap();
            if (data) {
                toast.success(data.messages);
            }
            navigate("/admin/orders");
        } catch (error: any) {
            toast.error(error.data.message);
        }

    };
    const formatCurrency = (number: number) => {
        if (typeof number !== 'number') {
            return '0';
        }
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    if (isLoadingColors) return <Skeleton />;
    if (isLoadingSizes) return <Skeleton />;
    if (isLoadingMaterials) return <Skeleton />;



    return (
        <div className="flex flex-row">
            <div className="basis-1/2 or">
                <div>
                    <h5 className="ttdh">Thông tin đơn hàng <span style={{ color: '#a8729a' }}></span></h5>
                </div>
                <div className="qw">
                    <div>
                        <p>Họ và tên : {orderDetail?.order.userId?.first_name} {orderDetail?.order.userId?.last_name}</p>
                    </div>
                    <div>
                        <p>Phiếu giảm giá: {orderDetail?.order.couponId ? orderDetail?.order.couponId.coupon_name : "không sử dụng phiếu giảm giá"}</p>
                    </div>
                    <div>
                        <p>Số điện thoại : {orderDetail?.order.phone}</p>
                    </div>
                    <div>
                        <p>Địa chỉ : {orderDetail?.order.address}</p>
                    </div>
                    {orderDetail?.order.shipping ? <div>
                        <p>Phí vận chuyển : <strong>{formatCurrency(orderDetail?.order.shipping)}₫</strong></p>
                    </div> : ""}
                    <div>
                        <p>Đã cọc : <strong>{formatCurrency(orderDetail?.order.deposit)}₫</strong></p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Ngày đặt hàng : {orderDetail?.order.createdAt ? format(new Date(orderDetail.order.createdAt), "HH:mm a dd/MM/yyyy") : "Không có thời gian"}</p>
                    </div>
                    <div
                        style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', marginLeft: "-10px" }}>
                        <h6 className="h2 mb-0 ms-2" >Tổng tiền: <span className="h2 mb-0 ms-2">{formatCurrency(orderDetail?.order.total)}₫</span></h6>
                    </div>
                    <Form
                        form={form}
                        layout="vertical"
                        name="basic"
                        labelCol={{ span: 8 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div style={{ display: "flex", marginTop: "30px" }}>
                            <Form.Item
                                className="small text-primary fw-bold mb-0 float-left w-2/5"
                                name="status"
                                rules={[{ required: true, message: 'Trạng thái không được để trống!' }]}
                            >
                                <Select >
                                    {status?.status?.map((stt: any) => {
                                        return (
                                            <Select.Option style={{ width: '150px' }} key={stt?._id} value={stt._id} className="text-primary">
                                                {stt.status_name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item >
                                <Button htmlType="submit" style={{ background: "#000080", color: "#fff", marginTop: "20px", width: "180px", height: "40px" }}>Cập nhật trạng thái</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
            <div className="basis-1/2 or">
                <div style={{ borderRadius: '10px' }}>
                    <div>
                        {orderDetail ? orderDetail?.order?.products.map((order: any) => {
                            const colorname = Colors?.color?.find((colors: any) => colors._id == order.colorId);
                            const sizesname = Sizes?.size?.find((sizes: any) => sizes._id == order.sizeId);
                            const materialsname = Materials?.material?.find((materials: any) => materials._id == order.materialId);
                            return (
                                <div className="" key={order._id}>
                                    <div className="mp">
                                        <div className="row">
                                            <div className="ord-img shadow-lg">
                                                <img
                                                    src={order?.image}
                                                    className="order-image"
                                                />
                                                <div className="ord">
                                                    <div className="order-products"><strong>{order?.product_name}</strong></div>
                                                    <div className="order-products">Giá sản phẩm: {formatCurrency(order?.product_price)}₫</div>
                                                    <div className="order-products">Số lượng: {order?.stock_quantity}</div>
                                                    <div className="order-products">Màu: {colorname?.colors_name}</div>
                                                    <div className="order-products">Kích cỡ: {sizesname?.size_name}</div>
                                                    <div className="order-products">Chất liệu: {materialsname?.material_name}</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <Skeleton />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersDetail









