

import { useGetColorByIdQuery, useUpdateColorMutation } from '@/api/colorApi';
import {  Button, Form, Input, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


type FieldType = {
  _id?: string;
  colors_name?: string;

};
const ColorsUpdate = () => {
    const { idColor }: any = useParams();
    const { data: colors, isLoading }: any = useGetColorByIdQuery(idColor || "");
    const [updateColor, resultAdd] = useUpdateColorMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();

  useEffect(() => {
    if (colors) {
        setFields();
    }
}, [colors]);
const setFields = () => {
    form.setFieldsValue({
        _id: colors.color?._id,
        colors_name: colors.color?.colors_name,
    });
};

const onFinish = (values: any) => {
  updateColor(values).then(() => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cập nhật màu thành công!',
      showConfirmButton: true,
      timer: 1500,
    });
    navigate('/admin/color');
  });
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
if (isLoading) return <Skeleton />;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Cập nhật màu</h5>
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
            <Form.Item label="" name="_id" style={{ display: 'none' }}>
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Tên màu"
              name="colors_name"
              rules={[{ required: true, message: 'Tên màu không được để trống!' },
              { min: 2, message: "Nhập ít nhất 2 ký tự" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 16 }}>
              <Button className=" h-10 bg-red-500 text-xs text-white ml-5" htmlType="submit">
                {resultAdd.isLoading ? <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> : " Cập nhật màu"}
              </Button>
              <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/color")} htmlType="submit">
                Danh sách màu
              </Button>
            </Form.Item>
          </Form>
  </div>
      </div>
    </div>
  )
}

export default ColorsUpdate
