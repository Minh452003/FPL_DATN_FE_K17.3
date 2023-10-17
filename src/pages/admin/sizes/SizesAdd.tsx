

import { useAddSizeMutation } from '@/api/sizeApi';
import { pause } from '@/utils/pause';
import { Alert, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  size_name?: string;
  size_price?: number;
  size_height?: number;
  size_length?: number;
  size_weight?: number;
  size_width?: number

};
const SizesAdd = () => {
  const [addSize, {isLoading, isSuccess: isAddSuccess}] = useAddSizeMutation();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    addSize(values)
    .unwrap()
    .then(async () => {
      await pause(1000);
      navigate("/admin/size");
    })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const validatePositiveNumber = (_: any, value: any) => {
    if(parseFloat(value) <= 0) {
      return Promise.reject("phai luon la so duong");
    }
    return Promise.resolve();
  }
  return ( 
    <div className='max-w-4xl mx-auto'>
      <h2 className='font-bold text-2xl mb-4'>Thêm mới kích cỡ</h2>
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
      label="Tên"
      name="size_name"
      rules={[{ required: true, message: 'Please input your size name!' }]}
    >
      <Input />
  </Form.Item>

  <Form.Item<FieldType>
      label="Giá"
      name="size_price"
      rules={[{ required: true, message: 'Please input your size price!' }, {validator: validatePositiveNumber}]}
    >
      <Input type='number' />
  </Form.Item>

  <Form.Item<FieldType>
      label="Chiều cao"
      name="size_height"
      rules={[{ required: true, message: 'Please input your size height!' }, {validator: validatePositiveNumber}]}
    >
      <Input  type='number' />
  </Form.Item>

  <Form.Item<FieldType>
      label="Độ dài"
      name="size_length"
      rules={[{ required: true, message: 'Please input your size length!' }, {validator: validatePositiveNumber}]}
    >
      <Input  type='number' />
  </Form.Item>


  <Form.Item<FieldType>
      label="Cân nặng"
      name="size_weight"
      rules={[{ required: true, message: 'Please input your size weight!' }, {validator: validatePositiveNumber}]}
    >
      <Input  type='number' />
  </Form.Item>

  <Form.Item<FieldType>
      label="Chiều dài"
      name="size_width"
      rules={[{ required: true, message: 'Please input your size width!' }, {validator: validatePositiveNumber}]}
    >
      <Input  type='number' />
  </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" danger>
      Thêm mới
    </Button>
  
    <Button type='primary' onClick={() => navigate("/admin/size")} className='ml-2' htmlType="submit" danger>
      Danh sách size
    </Button>
    </Form.Item>
  </Form>
       </div>
  )
}

export default SizesAdd