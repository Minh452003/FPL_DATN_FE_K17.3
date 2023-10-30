import { Button, Form, Input, InputNumber, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMaterialByIdQuery, useUpdateMaterialMutation } from '@/api/materialApi';
import Swal from 'sweetalert2';


type FieldType = {
  _id?: string
  material_name?: string;
  material_price?: number;

};
const MaterialUpdate = () => {
  const { id }: any = useParams();
  const { data: materialData, isLoading } = useGetMaterialByIdQuery<any>(id);
  const [updateMaterial, resultAdd] = useUpdateMaterialMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (materialData) {
      setFields();
    }
  }, [materialData]);

  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      _id: materialData?.material?._id,
      material_name: materialData?.material?.material_name,
      material_price: materialData?.material?.material_price
    });
  };
  const onFinish = (values: any) => {
    updateMaterial(values).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cập nhật vật liệu thành công!',
        showConfirmButton: true,
        timer: 1500,
      });
      navigate('/admin/material');
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
    <div className="container-fluid">
      <div className="row">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Cập nhật vật liệu</h5>
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
              label="Tên vật liệu"
              name="material_name"
              rules={[{ required: true, message: 'Tên vật liệu không được để trống!' },
              { min: 2, message: "Nhập ít nhất 2 ký tự" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: '20px' }}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Giá vật liệu"
              name="material_price"
              rules={[{ required: true, message: 'Giá vật liệu không được để trống!' },
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
                </div> : " Cập nhật vật liệu"}
              </Button>
              <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/material")} htmlType="submit">
                Danh sách vật liệu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default MaterialUpdate