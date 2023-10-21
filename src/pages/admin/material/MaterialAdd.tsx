import { useAddMaterialMutation } from '@/api/materialApi';
import { Button, Form, Input, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

type FieldType = {
    material_name?: string;
    material_price?: number;

};
const MaterialAdd = () => {
    const [addMaterials, resultAdd] = useAddMaterialMutation();
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        addMaterials(values).then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thêm chất liệu thành công!',
                showConfirmButton: true,
                timer: 1500
            });
            navigate("/admin/material");
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm chất liệu</h5>
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
                            label="Tên vật liệu"
                            name="material_name"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Tên vật liệu bắt buộc nhập!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Giá vật liệu"
                            name="material_price"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Giá vật liệu bắt buộc nhập!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 16 }}>

                            <Button className=" h-10 bg-red-500 text-xs text-white ml-5" htmlType="submit">
                                {resultAdd.isLoading ? <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : " Thêm chất liệu"}
                            </Button>
                            <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/material")} htmlType="submit">
                                Danh sách chất liệu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default MaterialAdd