
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
  const onFinish = (values: any) => {
    addBrand(values).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thêm danh mục thành công!',
        showConfirmButton: true,
        timer: 1500
      });
      navigate("/admin/brand");
    })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm thương hiệu</h5>
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
              label="Tên thương hiệu"
              name="brand_name"
              rules={[{ required: true, message: 'Tên thương hiệu không được để trống!' },
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
                </div> : " Thêm thương hiệu"}
              </Button>
              <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/brand")} htmlType="submit">
                Danh sách thương hiệu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default BrandAdd