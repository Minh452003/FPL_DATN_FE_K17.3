
import { useAddColorMutation } from '@/api/colorApi';
import { IColor } from '@/interfaces/color';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

type FieldType = {
  colors_name?: string;

};
const ColorsAdd = () => {
  const [addColor,resultAdd] = useAddColorMutation();
  const navigate = useNavigate();
  const onFinish = (values: IColor) => {
    addColor(values).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thêm màu thành công!',
        showConfirmButton: true,
        timer: 1500
      });
      navigate("/admin/colors");
    })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return ( 
    <div className="container-fluid">
    <div className="row">
      <div className="card-body">
        <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm màu</h5>
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
              label="Tên màu"
              name="colors_name"
              rules={[{ required: true, message: 'Tên màu không được để trống!' },
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

            <Form.Item wrapperCol={{ span: 16 }}>
              <Button className=" h-10 bg-red-500 text-xs text-white ml-5" htmlType="submit">
                {resultAdd.isLoading ? <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> : " Thêm màu"}
              </Button>
              <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/colors")} htmlType="submit">
                Danh sách màu
              </Button>
            </Form.Item>
  </Form>
  </div>
      </div>
    </div>
  )
}

export default ColorsAdd