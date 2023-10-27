import { FaArrowRight, FaMoneyBill1, FaChevronLeft } from "react-icons/fa6"
import { Button, Form, Input, Select, Skeleton, Tooltip } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { getDecodedAccessToken } from "@/decoder";
import { useGetCartsQuery, useRemoveAllCartMutation } from "@/api/cartApi";
import { useGetColorsQuery } from "@/api/colorApi";
import { useGetSizeQuery } from "@/api/sizeApi";
import { useGetMaterialQuery } from "@/api/materialApi";
import { useGetUserByIdQuery } from "@/api/authApi";
import { useEffect, useState } from "react";
import { useGetAvailableMutation, useGetCityQuery, useGetDistrictMutation, useGetShippingMutation, useGetWardMutation } from "@/api/shipApi";
import Swal from "sweetalert2";
import { useAddOrderMutation } from "@/api/orderApi";
const PayPage = () => {
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;
    const navigate = useNavigate()
    const { data: carts, isLoading } = useGetCartsQuery(id);
    const productsInCart = carts?.data.products;
    const { data: Colors, isLoading: isLoadingColors }: any = useGetColorsQuery();
    const { data: Sizes, isLoading: isLoadingSizes }: any = useGetSizeQuery();
    const { data: Materials, isLoading: isLoadingMaterials }: any = useGetMaterialQuery();
    const { data: city }: any = useGetCityQuery();
    const [addDistrict] = useGetDistrictMutation();
    const [addWard] = useGetWardMutation();
    const [addAvailable] = useGetAvailableMutation();
    const [addShipping] = useGetShippingMutation();
    const [addOrder] = useAddOrderMutation();
    const [removeAllCart] = useRemoveAllCartMutation();

    const { data: user } = useGetUserByIdQuery(id);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState<any>([]);
    const [available, setAvailable] = useState<any>([]);
    const [size, setSize] = useState<any>([]);
    const [wardCode, setwardCode] = useState<any>('');
    const [averageWidth, setAverageWidth] = useState(0);
    const [averageHeight, setAverageHeight] = useState(0);
    const [averageLength, setAverageLength] = useState(0);
    const [averageWeight, setAverageWeight] = useState(0);
    const [ship, setShip] = useState<any>({});
    const [pay, setPay] = useState<any>('');

    const sizeTotal = () => {
        if (productsInCart) {
            const sizesArray = productsInCart.map((product: any) => {
                return Sizes?.size?.find((sizes: any) => sizes._id === product.sizeId);
            });
            setSize(sizesArray);
        }
    }
    useEffect(() => {
        if (size && size.length > 0) {
            const totalWidth = size.reduce((sum: any, size: any) => sum + (size.size_width || 0), 0);
            const totalHeight = size.reduce((sum: any, size: any) => sum + (size.size_height || 0), 0);
            const totalLength = size.reduce((sum: any, size: any) => sum + (size.size_length || 0), 0);
            const totalWeight = size.reduce((sum: any, size: any) => sum + (size.size_weight || 0), 0);
            setAverageWidth(Math.floor(totalWidth / size.length));
            setAverageHeight(Math.floor(totalHeight / size.length));
            setAverageLength(Math.floor(totalLength / size.length));
            setAverageWeight(Math.floor(totalWeight / size.length));
        }
    }, [size]);

    const [form] = Form.useForm();
    const setFields = () => {
        form.setFieldsValue({
            _id: user?._id,
            fullname: `${user?.first_name} ${user?.last_name}`,
            phone: user?.phone
        });
    };
    useEffect(() => {
        if (user) {
            setFields();
        }
    }, [user]);

    const handleCityChange = async (value: any, option: any) => {
        const id = Number(option.key); // Lấy id từ option.key
        addDistrict({ province_id: id }).then((response: any) => {
            setDistrict(response.data.data);
            sizeTotal();
        })
    }
    const handleDistrictChange = async (value: any, option: any) => {
        const id = Number(option.key); // Lấy id từ option.key
        addWard({ district_id: id }).then((response: any) => {
            setWard(response.data.data);
        })
    }
    const handleAvailableChange = async (value: any, option: any) => {
        const id = option.key; // Lấy id từ option.key        
        setwardCode(id)
        addAvailable({
            shop_id: 4537750,
            from_district: 3440,
            to_district: ward[0].DistrictID

        }).then((response: any) => {
            setAvailable(response.data.data);
        })
    }

    const handleShippingChange = async (id: string) => {
        const data = {
            service_id: id,
            insurance_value: carts.data.total,
            from_district_id: 3440,
            to_district_id: ward[0].DistrictID,
            to_ward_code: wardCode,
            height: averageHeight,
            length: averageLength,
            weight: averageWeight,
            width: averageWidth
        }
        addShipping(data).then((response: any) => {
            setShip(response.data.data)
        })


    }
    const formatCurrency = (number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const onFinish = ({ address, phone, notes }: any) => {
        const cartDataWithoutId = { ...carts?.data };
        cartDataWithoutId.total = carts.data.total + ship.total;
        delete cartDataWithoutId._id;
        delete cartDataWithoutId.createdAt;
        delete cartDataWithoutId.updatedAt;
        address = `${address.ward}, ${address.district}, ${address.street}`
        if (pay && pay == 'cod') {
            try {
                Swal.fire({
                    title: 'Bạn chắc chứ?',
                    text: "Đơn hàng này sẽ được đặt!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Vâng, tôi chắc chắn!',
                    cancelButtonText: 'Huỷ'
                }).then((result) => {
                    if (result.isConfirmed) {
                        (async () => {
                            await addOrder({ ...cartDataWithoutId, address, phone, notes }).then(() => {
                                Swal.fire(
                                    'Thành công!',
                                    'Đơn hàng của bạn đã được đặt.',
                                    'success'
                                )
                            }).then(() => removeAllCart(id))
                            navigate('/order')
                        })()

                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        // Hiển thị thông báo hủy xóa sản phẩm
                        Swal.fire(
                            'Huỷ',
                            'Đơn hàng chưa được mua :)',
                            'error'
                        )
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }


    };
    if (isLoading) return <Skeleton />;
    if (isLoadingColors) return <Skeleton />;
    if (isLoadingSizes) return <Skeleton />;
    if (isLoadingMaterials) return <Skeleton />;

    return (
        <div className="container mx-auto mt-20">
            <div className="flex items-center pb-10">
                <div className="float-left">Trang Chủ</div>
                <FaArrowRight className="ml-2" />
                <div className="pl-2">Giỏ hàng</div>
                <FaArrowRight className="ml-2" />
                <div className="pl-2">Thanh Toán</div>
            </div>
            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 ml-4">
                {/* --------------------Col 1 --------------------------- */}
                <div className="rounded-lg">
                    <h3 className="pl-16 font-semibold pb-2">Thanh Toán</h3>
                    <h5 className="font-extralight italic pb-2">Thông tin nhận hàng</h5>
                    <Form
                        form={form}
                        name="complex-form"
                        onFinish={onFinish}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                    >
                        <Form.Item label="" name="_id" style={{ display: 'none' }}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="fullname"
                            style={{ marginBottom: 20 }}
                            rules={[{ required: true, message: 'Họ và tên không được để trống' }]}
                        >
                            <Input style={{ width: 330 }} placeholder="Họ và tên" readOnly />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            style={{ marginBottom: 20 }}
                            rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}
                        >
                            <Input
                                style={{ width: 330 }}
                                placeholder="Số điện thoại"
                            />
                        </Form.Item>
                        <Form.Item
                            name={['address', 'street']}
                            style={{ marginBottom: 20 }}
                            rules={[{ required: true, message: 'Thành phố không được để trống' }]}
                        >
                            <Select style={{ width: 330 }}
                                onChange={handleCityChange}
                                placeholder="Tỉnh Thành">
                                {city && city?.data?.map((ct: any) => {
                                    return <Select.Option key={ct?.ProvinceID} value={ct?.ProvinceName}>{ct?.ProvinceName}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['address', 'district']}
                            style={{ marginBottom: 20 }}
                            rules={[{ required: true, message: 'Quận huyện không được để trống' }]}
                        >
                            <Select style={{ width: 330 }}
                                onChange={handleDistrictChange}
                                placeholder="Quận huyện">
                                {district && district.map((dis: any) => {
                                    return <Select.Option key={dis?.DistrictID} value={dis?.DistrictName}>{dis?.DistrictName}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['address', 'ward']}
                            style={{ marginBottom: 20 }}
                            rules={[{ required: true, message: 'Phường xã không được để trống' }]}
                        >
                            <Select style={{ width: 330 }}
                                onChange={handleAvailableChange}
                                placeholder="Phường xã">
                                {ward && ward.map((ward: any) => {
                                    return <Select.Option key={ward?.WardCode} value={ward?.WardName}>{ward?.WardName}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['address', 'ship']}
                            style={{ marginBottom: 20 }}
                            rules={[{ required: true, message: 'Loại vận chuyển không được để trống' }]}
                        >
                            <Select style={{ width: 330 }} onChange={(value) => handleShippingChange(value)} placeholder="Loại vận chuyển">
                                {available && available.length > 0 && (
                                    <Select.Option key={available[0]?.service_id} value={available[0]?.service_id}>{available[0]?.short_name}</Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="notes"
                        >
                            <Input.TextArea showCount maxLength={100} style={{ width: 330 }} placeholder="Ghi chú" />
                        </Form.Item>
                        <div className="ml-4 mt-2 "><FaChevronLeft className="float-left mt-1" /><Link className="text-blue-900 float-left text-sm" style={{ textDecoration: 'none' }} to={"/cart"}>Quay về giỏ hàng</Link></div>
                        <Form.Item >
                            <div className="submit h-20">
                                <Tooltip title={pay ? '' : 'Bạn phải chọn phương thức thanh toán'}>
                                    <Button className="rounded-md  ml-2 w-36 h-12 mr-2  float-right" htmlType="submit" style={{ background: '#316595', color: 'white' }} >Đặt hàng</Button>
                                </Tooltip>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
                {/* --------------------Col 2 --------------------------- */}
                <div className="rounded-lg">
                    {/* <h3 className="pl-4 font-semibold pb-3">Vận Chuyển</h3>
                    <div className="text-green-800 w-80 h-14 pl-2 pt-3 " style={{ background: '#D1ECF1' }} >Vui lòng nhập thông tin giao hàng</div> */}
                    <h3 className="pl-4 font-semibold pb-3 pt-10">Thanh Toán</h3>
                    <div className="border-solid border-2 rounded w-80 h-11 pl-2 pt-2 mb-10">
                        <input type="radio" name="paymentMethod" value={'cod'} onChange={(e: any) => setPay(e.target.value)} />Thanh Toán Khi giao hàng(COD)
                        <p className="float-right mr-6 mt-1" style={{ color: '#1990C6' }}><FaMoneyBill1 /></p>
                    </div>
                    <div className="border-solid border-2 rounded w-80 h-11 pl-2 pt-2 mb-10">
                        <input type="radio" name="paymentMethod" value={'momo'} onChange={(e: any) => setPay(e.target.value)} /> Thanh Toán bằng momo
                        <img className="w-6 h-6 float-right mr-5 " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnV4cUM7jBauINof35Yn_unOz976Iz5okV8A&usqp=CAU" />
                    </div>
                    <div className="border-solid border-2 rounded w-80 h-11 pl-2 pt-2 ">
                        <input type="radio" name="paymentMethod" value={'paypal'} onChange={(e: any) => setPay(e.target.value)} /> Thanh Toán bằng ví paypal
                        <img className="w-5 h-5 float-right mr-5 " src="https://play-lh.googleusercontent.com/bDCkDV64ZPT38q44KBEWgicFt2gDHdYPgCHbA3knlieeYpNqbliEqBI90Wr6Tu8YOw" />
                    </div>

                </div>
                {/* --------------------Col 3 --------------------------- */}
                <div className="rounded-lg " style={{ background: '#FAFAFA' }}>
                    <h3 className="pl-4 font-semibold bt-1">Đơn hàng (3 sản phẩm)</h3>
                    <hr />
                    {productsInCart ? productsInCart?.map((product: any) => {
                        const colorname = Colors?.color?.find((colors: any) => colors._id == product.colorId);
                        const sizesname = Sizes?.size?.find((sizes: any) => sizes._id == product.sizeId);
                        const materialsname = Materials?.material?.find((materials: any) => materials._id == product.materialId);
                        return (
                            <div className="container w-auto h-24" key={product._id}>
                                <img className="w-16 h-16 ml-2 mr-2 rounded float-left" src={product.image} width={50} />
                                <div className="container-2">
                                    <div className="text-xs float-left w-52 font-semibold">{product.product_name}</div>
                                    <div className="text-sm float-left mt-1 ml-6 text-gray-500">{formatCurrency(product.product_price)}đ</div>
                                    <p className="float-right text-xs ml-20 mr-4">x{product.stock_quantity}</p>
                                </div>
                                <div className="col-span-2 flex ef">
                                    <div className="text-xs">màu sắc:  {colorname.colors_name}</div>
                                </div>
                                <div className="col-span-2 flex ef">
                                    <div className="text-xs">kích cỡ: {sizesname.size_name} </div>
                                </div>
                                <div className="col-span-2 flex ef">
                                    <div className="text-xs">chất liệu: {materialsname.material_name} </div>
                                </div>
                            </div>
                        )
                    }) : <p>Chưa có sản phẩm</p>}
                    <hr />
                    <div className="Coupons mt-5 mb-5">
                        <input className="border border-x-gray-950 rounded-md float-left ml-2 w-72 h-10" type="text" name="" id="" placeholder="  Nhập mã giảm giá" />
                        <button className="rounded-md  ml-2 w-28 h-10" style={{ background: '#316595', color: 'white' }} >Áp Dụng</button>
                    </div>
                    <hr />
                    <div className="provisional ml-4 mr-6 h-2">
                        <div >Tạm tính :<p className="price float-right text-gray-500 text-xl">{formatCurrency(carts.data.total)}₫</p></div>
                    </div>
                    <div className="shipp ml-4 mr-6 h-16">
                        <div className="float-left">Phí vận chuyển :<p className="price float-right text-gray-500 text-xl">{ship && ship.total ? formatCurrency(ship.total) + '₫' : ''}</p></div>
                    </div>
                    <hr />
                    <div className="total ml-4 mr-6 h-12">
                        <p className="float-left">Tổng cộng :</p>  <div className="price float-right text-gray-500 text-xl">{ship && ship.total ? formatCurrency(carts.data.total + ship.total) + '₫' : <p className="sp2">Vui lòng chọn địa chỉ</p>}</div>
                        <br />
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default PayPage