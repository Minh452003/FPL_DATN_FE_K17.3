import { useGetSizeByIdQuery, useUpdateSizeMutation } from '@/api/sizeApi';
import { pause } from '@/utils/pause';
import { Alert, Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';


type FieldType = {
    size_name?: string;
    size_price?: number;
    size_height?: number;
    size_length?: number;
    size_weight?: number;
    size_width?: number

};
const SizesUpdate = () => {
    const { idSize }: any = useParams();
    const { data: sizes, isLoading }: any = useGetSizeByIdQuery(idSize || "");
    const [updateSize, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess}] = useUpdateSizeMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();

  useEffect(() => {
    if (sizes) {
        setFields();
    }
}, [sizes]);
const setFields = () => {
    form.setFieldsValue({
        _id: sizes.size?._id,
        size_name: sizes.size?.size_name,
        size_price: sizes.size?.size_price,
        size_height: sizes.size?.size_height,
        size_length: sizes.size?.size_length,
        size_weight: sizes.size?.size_weight,
        size_width: sizes.size?.size_width
    });
};
  const onFinish = (values: any) => {
    updateSize({...values, _id: idSize})
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
      {isUpdateSuccess && <Alert message="Sua thanh cong" type="success" />}
    <Form
    form={form}
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
        <Button type="primary" danger htmlType="submit">
          {isUpdateLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ): (
            "Cập nhật kích cỡ"
          )}
        </Button>
        <Button type='primary' danger className='ml-2' onClick={() => navigate("/admin/size")}>
        Danh sách kích cỡ
        </Button>
      </Form.Item>

  </Form>
       </div>
  )
}

export default SizesUpdate

