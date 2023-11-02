import { useAddCouponMutation } from '@/api/couponsApi';
import { Button, Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


type FieldType = {
    coupon_name?: string,
    coupon_code?: string,
    coupon_content?: string,
    coupon_quantity?: number,
    discount_amount?: number,
    expiration_date?: Date,
    min_purchase_amount?: number

};
const CouponsAdd = () => {
  const [addCoupon, resultAdd] = useAddCouponMutation();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    addCoupon(values).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thêm phiếu giảm giá thành công!',
        showConfirmButton: true,
        timer: 1500
      });
      navigate("/admin/coupon");
    })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const validatePositiveNumber = (_: any, value: any) => {
    if(parseFloat(value) <= 0) {
      return Promise.reject("Phải luôn là số dương");
    }
    return Promise.resolve();
  }
  return ( 
    <div className="container-fluid">
      <div className="row">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm phiếu giảm giá</h5>
          <div className="flex items-center ">
          </div>
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
              {validator: validatePositiveNumber}]}
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
              {validator: validatePositiveNumber}]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <InputNumber style={{ width: '100%' }} />
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
              {validator: validatePositiveNumber}]}
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
                </div> : " Thêm phiếu giảm giá"}
              </Button>
              <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/coupon")} htmlType="submit">
                Danh sách phiếu giảm giá
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CouponsAdd