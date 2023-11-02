import { useGetCouponByIdQuery, useUpdateCouponMutation } from '@/api/couponsApi';
import { Button, Form, Input, InputNumber, Skeleton } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

type FieldType = {
    _id?: string;
    coupon_name?: string,
    coupon_code?: string,
    coupon_content?: string,
    coupon_quantity?: number,
    discount_amount?: number,
    expiration_date?: Date,
    min_purchase_amount?: number
};
const CouponsUpdate = () => {
  const { idCoupon }: any = useParams();
  const { data: coupons, isLoading }: any = useGetCouponByIdQuery(idCoupon || "");
  const [updateCoupon,resultAdd] = useUpdateCouponMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
useEffect(() => {
  if (coupons) {
      setFields();
  }
}, [coupons]);

const setFields = () => {
  form.setFieldsValue({
      _id: coupons.coupon?._id,
      coupon_name: coupons.coupon?.coupon_name,
      coupon_code: coupons.coupon?.coupon_code,
      coupon_content: coupons.coupon?.coupon_content,
      coupon_quantity: coupons.coupon?.coupon_quantity,
      discount_amount: coupons.coupon?.discount_amount,
      expiration_date: coupons.coupon?.expiration_date,
      min_purchase_amount: coupons.coupon?.min_purchase_amount
  });
};

  const onFinish = (values: any) => {
    updateCoupon(values).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cập nhật phiếu giảm giá thành công!',
        showConfirmButton: true,
        timer: 1500,
      });
      navigate('/admin/coupon');
    });
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  if (isLoading) return <Skeleton />;
  const validatePositiveNumber = (_: any, value: any) => {
    if(parseFloat(value) <= 0) {
      return Promise.reject("Phải luôn là số dương");
    }
    return Promise.resolve();
  }
  return (
    <div className='max-w-4xl mx-auto'>
      
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
            <Form.Item label="" name="_id" style={{ display: 'none' }}>
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Tên phiếu giảm giá"
              name="coupon_name"
              rules={[{ required: true, message: 'Tên phiếu giảm giá không được để trống!' },
              { min: 2, message: "Nhập ít nhất 2 ký tự" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Mã phiếu giảm giá"
              name="coupon_code"
              rules={[{ required: true, message: 'Mã phiếu giảm giá không được để trống!' },
              { min: 2, message: "Nhập ít nhất 2 ký tự" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Nội dung phiếu giảm giá"
              name="coupon_content"
              rules={[{ required: true, message: 'Nội dung phiếu giảm giá không được để trống!' },
              { min: 2, message: "Nhập ít nhất 2 ký tự" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
             <TextArea />
            </Form.Item>

            <Form.Item<FieldType>
              label="Số lượng phiếu giảm giá"
              name="coupon_quantity"
              rules={[{ required: true, message: 'Số lượng phiếu giảm giá không được để trống!' },
              {validator: validatePositiveNumber}
            ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Số tiền chiết khấu"
              name="discount_amount"
              rules={[{ required: true, message: 'Số tiền chiết khấu không được để trống!' },
              {validator: validatePositiveNumber}
            ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <InputNumber style={{ width: '100%' }}  />
            </Form.Item>


            <Form.Item<FieldType>
              label="Ngày hết hạn"
              name="expiration_date"
              rules={[{ required: true, message: 'Ngày hết hạn không được để trống!' }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <Input type='Date' />
            </Form.Item>

            <Form.Item<FieldType>
              label="Số tiền mua tối thiểu"
              name="min_purchase_amount"
              rules={[{ required: true, message: 'Số tiền mua tối thiểu không được để trống!' },
              {validator: validatePositiveNumber}
            ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 16 }}>
              <Button className=" h-10 bg-red-500 text-xs text-white ml-5" htmlType="submit">
                {resultAdd.isLoading ? <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> : " Cập nhật phiếu giảm giá"}
              </Button>
              <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/coupon")} htmlType="submit">
                Danh sách phiếu giảm giá
              </Button>
            </Form.Item>

  </Form>
       </div>
  )
}

export default CouponsUpdate






