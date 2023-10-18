
import { useGetBrandByIdQuery, useUpdateBrandMutation } from '@/api/brandApi';
import { pause } from '@/utils/pause';
import { Button, Form, Input, Skeleton } from 'antd';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


type FieldType = {
  brand_name?: string;

};
const BrandUpdate = () => {
  const { idBrand } = useParams<{ idBrand: string }>();
  const { data: brandData, isLoading } = useGetBrandByIdQuery(idBrand || "");
  const [updateBrand, resultAdd] = useUpdateBrandMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (brandData) {
      setFields();
    }
  }, [brandData]);
  const [form] = Form.useForm();
  const setFields = () => {
    form.setFieldsValue({
      _id: brandData?._id,
      brand_name: brandData?.brand_name,
    });
  };
  const onFinish = async (values: any) => {
    try {
      updateBrand(values).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cập nhật thương hiệu thành công!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/admin/brand");
      })
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  if (isLoading) return <Skeleton />;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="card-body">
          <h3 className="font-semibold">Cập nhật thương hiệu </h3>
          <br />
          <div className="flex items-center ">
          </div>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 1000, height: 1000 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="" name="_id" style={{ display: 'none' }}>
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Tên thương hiệu"
              name="brand_name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Thương hiệu bắt buộc nhập!' }]}
              style={{ marginLeft: '20px' }}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 16 }}>
              <Button className=" h-10 bg-red-500 text-xs text-white ml-5" htmlType="submit">
                {resultAdd.isLoading ? <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden"><AiOutlineLoading3Quarters /></span>
                </div> : "Cập nhật thương hiệu"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default BrandUpdate