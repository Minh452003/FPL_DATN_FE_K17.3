import { useAddMaterialMutation } from '@/api/materialApi';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


type FieldType = {
    material_name?: string;

};
const MaterialAdd = () => {
    const [addMaterials, resultAdd] = useAddMaterialMutation();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            const data = await addMaterials(values).unwrap();
            if (data) {
                toast.success(data.message)
            }
            navigate("/admin/materials");
        } catch (error: any) {
            if (Array.isArray(error.data.message)) {
                const messages = error.data.message;
                messages.forEach((message: any) => {
                    toast.error(message);
                });
            } else {
                toast.error(error.data.message);
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    // const validatePositiveNumber = (_: any, value: any) => {
    //     if(parseFloat(value) < 0) {
    //       return Promise.reject("Giá trị phải là số dương");
    //     }
    //     return Promise.resolve();
    //   }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm vật liệu</h5>
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
                            rules={[{ required: true, message: 'Tên vật liệu không được để trống!' },
                            {
                                validator: (_, value) => {
                                    if (!value) {
                                        return Promise.resolve();
                                    }
                                    if (/ {2,}/.test(value)) {
                                        return Promise.reject('Không được nhập liên tiếp các khoảng trắng!');
                                    }
                                    return Promise.resolve();
                                },
                            },
                            { min: 2, message: "Nhập ít nhất 2 ký tự" }
                            ]}
                            hasFeedback
                            style={{ marginLeft: '20px' }}
                        >
                            <Input />
                        </Form.Item>



                        <Form.Item wrapperCol={{ span: 16 }}>

                            <Button className=" h-10 bg-red-500 text-xs text-white ml-5" htmlType="submit">
                                {resultAdd.isLoading ? <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : " Thêm vật liệu"}
                            </Button>
                            <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/materials")} htmlType="submit">
                                Danh sách vật liệu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default MaterialAdd