import { useAddMaterialMutation } from '@/api/materialApi';
import { pause } from '@/utils/pause';
import { Alert, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  material_name?: string;
  material_price? : number;

};
const MaterialAdd = () => {
  const [addMaterials, {isLoading, isSuccess: isAddSuccess}] = useAddMaterialMutation();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    addMaterials(values)
    .unwrap()
    .then( async () => {
      await pause(1000);
      navigate("/admin/material");
    })
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
  return (
    <div className="container-fluid">
    <div className="row">
        <div className="card-body">
            <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm Vật liệu</h5>
            {isAddSuccess  && <Alert message="Them thanh cong" type="success" />}
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
                    labelCol={{ span: 24 }} // Đặt chiều rộng của label
                    wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                    rules={[{ required: true, message: 'Please input your category!' }]}
                    style={{marginLeft: '20px'}}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Giá vật liệu"
                    name="material_price"
                    labelCol={{ span: 24 }} // Đặt chiều rộng của label
                    wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                    rules={[{ required: true, message: 'Please input your price!' }]}
                    style={{marginLeft: '20px'}}
                >
                    <Input />
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

export default MaterialAdd