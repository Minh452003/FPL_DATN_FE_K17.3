
import { useAddBrandMutation } from '@/api/brandApi';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

type FieldType = {
  brand_name?: string;
};

const BrandAdd = () => {
  const [addBrand, resultAdd] = useAddBrandMutation();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      addBrand(values).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thêm thương hiệu thành công!',
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
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="card-body">
          <h3 className="font-semibold">Thêm thương hiệu </h3>
          <br />
          <div className="flex items-center ">
          </div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 1000, height: 1000 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
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
                  <span className="visually-hidden">Loading...</span>
                </div> : "Thêm thương hiệu"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default BrandAdd