import { useGetCouponByIdQuery, useUpdateCouponMutation } from '@/api/couponsApi';
import { pause } from '@/utils/pause';
import { Alert, Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';


type FieldType = {
    coupon_name?: string,
    coupon_code?: string,
    coupon_content?: string,
    coupon_quantity?: number,
    discount_amount?: number,
    expiration_date?: Date,
    min_purchase_amount?: number
};
const CouponsUpdate = () => {
  const {idCoupon} = useParams<{idCoupon: string}>();
  const {data: couponData, isLoading} = useGetCouponByIdQuery(idCoupon || "");
  const [updateCoupon, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess}] = useUpdateCouponMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    form.setFieldsValue({
      coupon_name: couponData?.coupon_name,
      coupon_code: couponData?.coupon_code,
      coupon_content: couponData?.coupon_content,
      coupon_quantity: couponData?.coupon_quantity,
      discount_amount: couponData?.discount_amount,
      expiration_date: couponData?.expiration_date,
      min_purchase_amount: couponData?.min_purchase_amount
    })
  }, [couponData])
  const onFinish = (values: any) => {
    updateCoupon({...values, _id: idCoupon})
    .unwrap()
    .then(async () => {
      await pause(1000);
      navigate("/admin/coupon");
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
      label="Tên phiếu giảm giá"
      name="coupon_name"
      rules={[{ required: true, message: 'Please input your coupon_name!' },
      {min: 3, message: "It nhat 3 ky tu"}]}
      
    >
      <Input />
  </Form.Item>

  <Form.Item<FieldType>
      label="Mã phiếu giảm giá"
      name="coupon_code"
      rules={[{ required: true, message: 'Please input your coupon_code!' },
      {min: 3, message: "It nhat 3 ky tu"}]}
      
    >
      <Input />
  </Form.Item>

  <Form.Item<FieldType>
      label="Nội dung phiếu giảm giá"
      name="coupon_content"
      rules={[{ required: true, message: 'Please input your coupon_content!' },
      {min: 3, message: "It nhat 3 ky tu"}]}
      
    >
      <TextArea />
  </Form.Item>

  <Form.Item<FieldType>
      label="Số lượng phiếu giảm giá"
      name="coupon_quantity"
      rules={[{ required: true, message: 'Please input your coupon_quantity!' },
      {validator: validatePositiveNumber}]}
      
    >
      <Input type='number' />
  </Form.Item>

  <Form.Item<FieldType>
      label="Số tiền chiết khấu"
      name="discount_amount"
      rules={[{ required: true, message: 'Please input your discount_amount!' },
      {validator: validatePositiveNumber}]}
      
    >
      <Input type='number' />
  </Form.Item>

  <Form.Item<FieldType>
      label="Ngày hết hạn"
      name="expiration_date"
      rules={[{ required: true, message: 'Please input your expiration_date!' },
      ]}
      
    >
      <Input type='Date' />
  </Form.Item>

    
  <Form.Item<FieldType>
      label="Số tiền mua tối thiểu"
      name="min_purchase_amount"
      rules={[{ required: true, message: 'Please input your min_purchase_amount!' },
      {validator: validatePositiveNumber}]}
      
    >
      <Input type='number' />
  </Form.Item>

  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" danger htmlType="submit">
          {isUpdateLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ): (
            "Cập nhật phiếu giảm giá"
          )}
        </Button>
        <Button type='primary' danger className='ml-2' onClick={() => navigate("/admin/coupon")}>
        Danh sách Phiếu giảm giá
        </Button>
      </Form.Item>

  </Form>
       </div>
  )
}

export default CouponsUpdate