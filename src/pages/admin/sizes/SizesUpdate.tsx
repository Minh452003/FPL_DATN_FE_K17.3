import { useGetSizeByIdQuery, useUpdateSizeMutation } from '@/api/sizeApi';
import { Button, Form, Input, InputNumber, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


type FieldType = {
    _id?: string;
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
    const [updateSize, resultAdd] = useUpdateSizeMutation();
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
    updateSize(values).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cập nhật kích cỡ thành công!',
        showConfirmButton: true,
        timer: 1500,
      });
      navigate('/admin/sizes');
    });
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (isLoading) return <Skeleton />;

  const validatePositiveNumber = (_: any, value: any) => {
    if(parseFloat(value) < 0) {
      return Promise.reject("Giá trị phải là số dương");
    }
    return Promise.resolve();
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Cập nhật kích cỡ</h5>
          <div className="flex items-center ">
          </div>
      
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

        <Form.Item<FieldType> label="" name="_id" style={{ display: 'none' }}>
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Tên kích cỡ"
              name="size_name"
              rules={[{ required: true, message: 'Tên kích cỡ không được để trống!' },
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
              { min: 2, message: "Nhập ít nhất 2 ký tự" }]}
              hasFeedback
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Giá kích cỡ"
              name="size_price"
              rules={[{ required: true, message: 'Giá kích cỡ không được để trống!' },
              {validator: validatePositiveNumber},
              { pattern: /^[0-9]+$/, message: 'Không được nhập chữ' }]}
              hasFeedback
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Chiều cao kích cỡ"
              name="size_height"
              rules={[{ required: true, message: 'Chiều cao kích cỡ không được để trống!' },
              {validator: validatePositiveNumber},
              { pattern: /^[0-9]+$/, message: 'Không được nhập chữ' }]}
              hasFeedback
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Độ dài kích cỡ"
              name="size_length"
              rules={[{ required: true, message: 'Độ dài kích cỡ không được để trống!' },
              {validator: validatePositiveNumber},
              { pattern: /^[0-9]+$/, message: 'Không được nhập chữ' }]}
              hasFeedback
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Cân nặng kích cỡ"
              name="size_weight"
              rules={[{ required: true, message: 'Cân nặng kích cỡ không được để trống!' },
              {validator: validatePositiveNumber},
              { pattern: /^[0-9]+$/, message: 'Không được nhập chữ' }]}
              hasFeedback
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Chiều dài kích cỡ"
              name="size_width"
              rules={[{ required: true, message: 'Chiều dài kích cỡ không được để trống!' },
              {validator: validatePositiveNumber},
              { pattern: /^[0-9]+$/, message: 'Không được nhập chữ' }]}
              hasFeedback
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
                </div> : " Cập nhật kích cỡ"}
              </Button>
              <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/sizes")} htmlType="submit">
                Danh sách kích cỡ
              </Button>
            </Form.Item>

  </Form>
  </div>
      </div>
    </div>
  )
}

export default SizesUpdate

