
import { useAddColorMutation } from '@/api/colorApi';
import { pause } from '@/utils/pause';
import { Alert, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  colors_name?: string;

};
const ColorsAdd = () => {
  const [addColor, {isLoading, isSuccess: isAddSuccess}] = useAddColorMutation();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    addColor(values)
    .unwrap()
    .then(async () => {
      await pause(1000);
      navigate("/admin/color");
    })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return ( 
    <div className='max-w-4xl mx-auto'>
      <h2 className='font-bold text-2xl mb-4'>Thêm mới màu</h2>
      {isAddSuccess && <Alert message="Them thanh cong" type="success" />}
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 1000 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Tên màu"
      name="colors_name"
      rules={[{ required: true, message: 'Please input your color!' }]}
    >
      <Input />
  </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" danger>
      Thêm mới
    </Button>
  
    <Button type='primary' onClick={() => navigate("/admin/color")} className='ml-2' htmlType="submit" danger>
      Danh sách màu
    </Button>
    </Form.Item>
  </Form>
       </div>
  )
}

export default ColorsAdd