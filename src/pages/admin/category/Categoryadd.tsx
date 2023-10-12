import { Button, Form, Input, Upload } from 'antd';
import { FaUpload } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { BsArrowReturnLeft } from "react-icons/bs";
const Categoryadd = () => {
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
        <div className="container-fluid">
            <div className="row">
                {/* <div>
                <div className="float-left"><Link style={{textDecoration: 'none'}} to={'/admin/categories'}>Trở về danh sách</Link> </div>
                <BsArrowReturnLeft className=" text-blue-500" />
                </div> */}
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm Danh Mục</h5>
                    <div className="flex items-center ">
               
</div>
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
                            label="Danh mục"
                            name="category"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[{ required: true, message: 'Please input your category!' }]}
                            style={{marginLeft: '20px'}}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Tiền đặt cọc (%)"
                            name="stake"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[{ required: true, message: 'Please input your stake!' }]}
                            style={{marginLeft: '20px'}}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item 
                        labelCol={{ span: 24 }} // Đặt chiều rộng của label
                        wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                        style={{marginLeft: '20px'}}
                        id="images" name="product_images" label="Ảnh" rules={[{ required: true, message: 'Trường ảnh không được để trống' }]}>
                            <Upload action="https://tclq6w-8080.csb.app/api/images/upload" listType="picture" name='images' multiple>
                                <Button icon={<FaUpload />}>Choose images</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item wrapperCol={{span: 16 }}>

                            <Button className=" h-10 bg-red-500 text-xs text-white ml-5" htmlType="submit">
                                Thêm Danh Mục
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Categoryadd