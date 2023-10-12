
import { Button, Form, Input } from 'antd';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  brand_name?: string;

};
const ColorsAdd = () => {
  return (
   
    <div className='text-center'>
     <h2 className="text-center text-2xl py-2">Thêm mới màu</h2>
  <div >
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
      label="Màu"
      className="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
  </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" danger>
      Thêm mới
    </Button>
  
    <Button href="/admin/color" className='ml-2' htmlType="submit" danger>
      Bảng màu   </Button>
    </Form.Item>
  </Form>
       </div>
    </div>
  )
}

export default ColorsAdd