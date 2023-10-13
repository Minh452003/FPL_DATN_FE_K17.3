import { Button, Form, Input, Upload,Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FaUpload } from "react-icons/fa6";
const Productadd = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };
    return (
        <div className="container-fluid mb-7">
            <div className="row">
                <div className="card-body">
                <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm Sản Phẩm</h5>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 1000, height: 1000 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"

                    >
                        <Form.Item<FieldType>
                            label="Tên"
                            name="name"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[{ required: true, message: 'Please input your name!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <Input placeholder='Tên sản phẩm' />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            style={{ marginLeft: '20px' }}
                            id="images" name="product_images" label="Ảnh" rules={[{ required: true, message: 'Trường ảnh không được để trống' }]}>
                            <Upload action="https://tclq6w-8080.csb.app/api/images/upload" listType="picture" name='images' multiple>
                                <Button icon={<FaUpload />}>Choose images</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Giá Niêm Yết"
                            name="price"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[{ required: true, message: 'Please input your name!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <Input  />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Giá Khuyến mại"
                            name="price"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[{ required: true, message: 'Please input your name!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <Input  />
                        </Form.Item>

                        <Form.Item 
                            label="Danh Mục"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[{ required: true, message: 'Please input your select!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <Select>
                                <Select.Option value="demo">Giường</Select.Option>
                                <Select value="1">Ghế</Select>
                                <Select value="2">Tủ</Select>
                            </Select>
                        </Form.Item>

                        <Form.Item 
                            label="Thương hiệu"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[{ required: true, message: 'Please input your select!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <Select>
                                <Select.Option value="demo">Casa</Select.Option>
                                <Select value="1">Casa</Select>
                                <Select value="2">Casa</Select>
                            </Select>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Số lượng"
                            name="quantity"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[{ required: true, message: 'Please input your quantity!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <Input  />
                        </Form.Item>

                        <Form.Item 
                            label="Màu Sắc"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[{ required: true, message: 'Please input your select!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <Select>
                                <Select.Option value="demo">Nâu</Select.Option>
                                <Select value="1">Đỏ</Select>
                                <Select value="2">Vàng</Select>
                            </Select>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Mô tả"
                            name="price"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[{ required: true, message: 'Please input your name!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <TextArea rows={4} />
                        </Form.Item>


                        

                        <Form.Item wrapperCol={{ span: 16 }}>

                            <Button className=" h-10 bg-red-500 text-xs text-white ml-5" htmlType="submit">
                                Thêm Danh Mục
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div >
    )
}

export default Productadd