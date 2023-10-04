import { FaArrowRight, FaMoneyBill1,FaChevronLeft } from "react-icons/fa6"
import { Button, Form, Input, Select, Space } from 'antd';
import { Option } from "antd/es/mentions";
import { Link } from "react-router-dom";
const PayPage = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div className="md:container md:mx-auto ">
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
                        name="complex-form"
                        onFinish={onFinish}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item >
                            <Space>
                                <Form.Item
                                    name="Email"
                                    noStyle
                                    rules={[{ required: true, message: 'Email is required' }]}
                                >
                                    <Input style={{ width: 300 }} placeholder="Email" />
                                </Form.Item>
                            </Space>
                        </Form.Item>

                        <Form.Item >
                            <Space>
                                <Form.Item
                                    name="username"
                                    noStyle
                                    rules={[{ required: true, message: 'Username is required' }]}
                                >
                                    <Input style={{ width: 300 }} placeholder="Họ và tên" />
                                </Form.Item>
                            </Space>
                        </Form.Item>

                        <Form.Item >
                            <Space>
                                <Form.Item
                                    name="phone"
                                    noStyle
                                    rules={[{ required: true, message: 'phone is required' }]}
                                >
                                    <Input
                                        style={{ width: 300 }}
                                        placeholder="Số điện thoại"
                                    />


                                </Form.Item>
                            </Space>
                        </Form.Item>

                        <Form.Item >
                            <Space>
                                <Form.Item
                                    name="address"
                                    noStyle
                                    rules={[{ required: true, message: 'address is required' }]}
                                >
                                    <Input style={{ width: 300 }} placeholder="Địa chỉ (tùy chọn)" />
                                </Form.Item>
                            </Space>
                        </Form.Item>

                        <Form.Item >
                            <Select style={{ width: 300 }} placeholder="Tỉnh Thành">
                                <Option value="Hà Nội">Hà Nội</Option>
                                <Option value="HCM">HCM</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['address', 'street']}
                            noStyle
                            rules={[{ required: true, message: 'Street is required' }]}
                        >
                        </Form.Item>

                        <Form.Item >
                            <Select style={{ width: 300 }} placeholder="Quận huyện (Tùy chọn)">
                                <Option value="badinh">Ba đình</Option>
                                <Option value="dongda">Đống Đa</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['address', 'district']}
                            noStyle
                            rules={[{ required: true, message: 'Street is required' }]}
                        >
                        </Form.Item>

                        <Form.Item >
                            <Select style={{ width: 300 }} placeholder="Phường xã (Tùy chọn)">
                                <Option value="Hà Nội">Kim Mã</Option>
                                <Option value="HCM">Trúc Bạch</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['address', 'wards']}
                            noStyle
                            rules={[{ required: true, message: 'Street is required' }]}
                        >
                        </Form.Item>

                        <Form.Item
                            name="intro"

                            rules={[{ required: true, message: 'Please input Intro' }]}
                        >
                            <Input.TextArea showCount maxLength={100} style={{ width: 300 }} placeholder="Ghi chú" />
                        </Form.Item>

                        {/* <Form.Item label=" " colon={false}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item> */}
                    </Form>
                </div>
                {/* --------------------Col 2 --------------------------- */}
                <div className="rounded-lg">
                    <h3 className="pl-4 font-semibold pb-3">Vận Chuyển</h3>
                    <div className="text-green-800 w-80 h-14 pl-2 pt-3 " style={{ background: '#D1ECF1' }} >Vui lòng nhập thông tin giao hàng</div>
                    <h3 className="pl-4 font-semibold pb-3 pt-10">Thanh Toán</h3>
                    <div className="border-solid border-2 rounded w-80 h-11 pl-2 pt-2 mb-10"><input type="radio" /> Thanh Toán Khi giao hàng(COD) <p className="float-right mr-6 mt-1" style={{ color: '#1990C6' }}><FaMoneyBill1 /></p> </div>
                    <div className="border-solid border-2 rounded w-80 h-11 pl-2 pt-2 mb-10"><input type="radio" /> Thanh Toán bằng momo <img className="w-6 h-6 float-right mr-5 " src="data:image/png;base64,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" alt="" /></div>
                    <div className="border-solid border-2 rounded w-80 h-11 pl-2 pt-2 "><input type="radio" /> Thanh Toán bằng ví paypal <img className="w-5 h-5 float-right mr-5 " src="data:image/png;base64,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" alt="" /></div>

                </div>
                {/* --------------------Col 3 --------------------------- */}
                <div className="rounded-lg " style={{ background: '#FAFAFA' }}>
                    <h3 className="pl-4 font-semibold bt-1 ">Đơn hàng (3 sản phẩm)</h3>
                    <hr />
                    {/* --------------- sp1 ------------------- */}
                    <div className="container w-auto h-24">

                        <img className="w-16 h-16 ml-2 mr-2 rounded float-left" src="https://bizweb.dktcdn.net/thumb/large/100/396/362/products/da0045c9e48defd093797dfc83fa2c67-1590389087.jpg?v=1595556715920" alt="" />
                        <div className="container-2">
                            <div className="text-sm float-left w-52 font-semibold">Bộ bàn sofa IGEA Việt Nam phong cách Scanvdian </div>
                            <div className="text-sm float-left mt-2 ml-6 text-gray-500">16.430.000đ</div>
                            <p className="float-right text-xs ml-20 mr-4">x1</p>
                        </div> <br /> <br />
                        <p className="float-left text-xs"> size: xl</p>
                        {/* <p className="float-left text-xs ml-20">x1</p> */}

                    </div>
                    {/* --------------- sp2 ------------------- */}
                    <div className="container w-auto h-24">

                        <img className="w-16 h-16 ml-2 mr-2 rounded float-left" src="https://bizweb.dktcdn.net/thumb/large/100/396/362/products/da0045c9e48defd093797dfc83fa2c67-1590389087.jpg?v=1595556715920" alt="" />
                        <div className="container-2">
                            <div className="text-sm float-left w-52 font-semibold">Bộ bàn sofa IGEA Việt Nam phong cách Scanvdian </div>
                            <div className="text-sm float-left mt-2 ml-6 text-gray-500">16.430.000đ</div>
                            <p className="float-right text-xs ml-20 mr-4">x1</p>
                        </div> <br /> <br />
                        <p className="float-left text-xs"> size: xl</p>
                        {/* <p className="float-left text-xs ml-20">x1</p> */}

                    </div>
                    {/* --------------- sp3 ------------------- */}
                    <div className="container w-auto h-24">

                        <img className="w-16 h-16 ml-2 mr-2 rounded float-left" src="https://bizweb.dktcdn.net/thumb/large/100/396/362/products/da0045c9e48defd093797dfc83fa2c67-1590389087.jpg?v=1595556715920" alt="" />
                        <div className="container-2">
                            <div className="text-sm float-left w-52 font-semibold">Bộ bàn sofa IGEA Việt Nam phong cách Scanvdian </div>
                            <div className="text-sm float-left mt-2 ml-6 text-gray-500">16.430.000đ</div>
                            <p className="float-right text-xs ml-20 mr-4">x1</p>
                        </div> 
                        <p className="float-left text-xs"> size: xl</p>
                      

                    </div>
                    <hr />
                    <div className="Coupons mt-5 mb-5">
                        <input className="border border-x-gray-950 rounded-md float-left ml-2 w-72 h-10" type="text" name="" id="" placeholder="  Nhập mã giảm giá"/>
                        <button className="rounded-md  ml-2 w-28 h-10" style={{background:'#316595', color: 'white'}} >Áp Dụng</button>
                    </div>
                    <hr />
                     <div className="provisional ml-4 mr-6 h-10">
                        <p className="float-left">Tạm tính :</p>  <p className="price float-right text-gray-500">49.290.000đ</p>
                     </div>
                     <div className="shipp ml-4 mr-6 h-16">
                        <p className="float-left">Phí vận chuyển :</p>  <p className="price float-right text-gray-500">10.000đ</p>
                     </div>
                     <hr />
                     <div className="total ml-4 mr-6 h-16">
                        <p className="float-left">Tổng cộng :</p>  <p className="price float-right text-gray-500">49.300.000đ</p>
                     </div>
                     <hr />
                     <div className="submit h-20">
                        <div className="ml-4 mt-2 "><FaChevronLeft className="float-left mt-1" /><a className="text-blue-900 float-left text-sm" style={{textDecoration: 'none'}} href=""><Link to={"/cart"}>Quay về giỏ hàng</Link></a></div>
                        <button className="rounded-md  ml-2 w-36 h-12 mr-2  float-right" style={{background:'#316595', color: 'white'}} >Đặt hàng</button>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default PayPage