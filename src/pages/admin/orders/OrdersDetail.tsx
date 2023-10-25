import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import { Button, Form, Input, Select, Image } from 'antd';
import { useGetStatusQuery, useUpdateStatusMutation } from "@/api/statusApi";
import { useEffect } from "react";
import { useGetOrderByIdQuery } from "@/api/orderApi";
import { useGetMaterialQuery } from "@/api/materialApi";
import { useGetColorsQuery } from "@/api/colorApi";
import { useGetSizeQuery } from "@/api/sizeApi";
import "./OrdersDetail.css"
const OrdersDetail = () => {
    const { id }: any = useParams()
    const { data: orderDetail }: any = useGetOrderByIdQuery(id);
    console.log(orderDetail);

    const navigate = useNavigate();
    const [updateStatus, { isLoading: isAddingStatus }] = useUpdateStatusMutation();
    const { data: status } = useGetStatusQuery()
    const { productId }: any = useParams<string>();
    console.log(productId);


    const { data: Colors, isLoading: isLoadingColors }: any = useGetColorsQuery();
    const { data: Sizes, isLoading: isLoadingSizes }: any = useGetSizeQuery();
    const { data: Materials, isLoading: isLoadingMaterials }: any = useGetMaterialQuery();



    const colors = isLoadingColors ? [] : Colors?.color;
    const sizes = isLoadingSizes ? [] : Sizes?.size;
    const materials = isLoadingMaterials ? [] : Materials?.material;


    useEffect(() => {
        if (orderDetail) {
            setFields();
        }
    }, [orderDetail]);
    const [form] = Form.useForm();
    const setFields = () => {
        form.setFieldsValue({
            id: orderDetail?._id,
        });
    };
    console.log(orderDetail);


    const onFinish = async (values: any) => {
        try {
            updateStatus(values).then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Status has been added successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/admin/order/unconfirmed");
            })

        } catch (error) {
            console.error('Error uploading image:', error);
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };



    return (

        <div className="container order1">
            <div style={{ borderRadius: '10px' }}>
                <div>
                    <h5 style={{ marginLeft: "76px", marginTop: "20px", fontSize: "30px" }}>Thông tin đơn hàng <span style={{ color: '#a8729a' }}></span></h5>
                </div>
                <div>

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


                    </Form>

                    {orderDetail?.order?.products.map((order: any) => {
                        const colorname = Colors?.color?.find((colors: any) => colors._id == order.colorId);
                        console.log(colorname);
                        const sizesname = Sizes?.size?.find((sizes: any) => sizes._id == order.sizeId);
                        console.log(sizesname);
                        const materialsname = Materials?.material?.find((materials: any) => materials._id == order.materialId);
                        console.log(materialsname);


                        return (
                            <div className="" key={order._id}>
                                <div className="mp">
                                    <div className="row">
                                        <div className="">
                                            <Image
                                                src={order?.image}
                                                style={{ width: "285px", height: "235px", marginLeft: "19px", marginTop: "10px" }} alt="image"
                                            />
                                        </div>

                                        <div style={{ marginLeft: "360px", marginTop: "-239px" }}>
                                            <p>Tên sản phẩm: {order?.product_name}</p>
                                        </div>
                                        <div style={{ marginLeft: "360px", marginTop: "-207px" }}>
                                            <p>Giá sản phẩm: {order?.product_price}</p>
                                        </div>

                                        <div style={{ marginLeft: "360px", marginTop: "-175px" }}>
                                            <p>Số lượng: {order?.stock_quantity}</p>
                                        </div>
                                        <div style={{ marginLeft: "360px", marginTop: "-140px" }}>
                                            <p>Màu: {colorname?.colors_name}</p>
                                        </div>
                                        <div style={{ marginLeft: "360px", marginTop: "-102px" }}>
                                            <p>Kích cỡ: {sizesname?.size_name}</p>
                                        </div>
                                        <div style={{ marginLeft: "360px", marginTop: "-65px" }}>
                                            <p>Nguyên vật liệu: {materialsname?.material_name}</p>
                                        </div>
                                        <div style={{ marginLeft: "360px", marginTop: "-27px" }}>
                                            <p>Total: ${order?.product_price * order?.stock_quantity}</p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        )
                    })}


                </div>
            </div>


            <div className="qw">
                <div>
                    <p>Họ và tên: {orderDetail?.order.userId?.first_name} {orderDetail?.order.userId?.last_name}</p>
                </div>
                <div>
                    <p>Phiếu giảm giá: {orderDetail?.order.couponId?.coupon_name}</p>
                </div>

                <div>
                    <p>Số điện thoại : {orderDetail?.order.phone}</p>
                </div>

                <div>
                    <p>Địa chỉ : {orderDetail?.order.address}</p>
                </div>

                <div className="d-flex justify-content-between">
                    <p>Ngày đặt hàng : {orderDetail?.order.createdAt}</p>

                </div>

                <div
                    style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', marginLeft: "-10px" }}>
                    <h5 className="h2 mb-0 ms-2" >Total paid: <span className="h2 mb-0 ms-2">$ {orderDetail?.order.total}</span></h5>
                </div>
                <div style={{ display: "flex", marginTop: "30px" }}>
                    <div>
                        <Button style={{ background: "#008000", color: "#fff", width: "140px", height: "40px" }}>{orderDetail?.order.status?.status_name}</Button>
                    </div>
                    <div>
                        <Button style={{ border: "1px solid green", color: "#008000", marginLeft: "20px", width: "140px", height: "40px" }}>Xác nhận đơn</Button>
                    </div>
                </div>
                <div>
                    <Button style={{ background: "#000080", color: "#fff", marginTop: "20px", width: "180px", height: "40px" }}>Cập nhật trạng thái</Button>
                </div>
            </div>


        </div >
    )
}

export default OrdersDetail









