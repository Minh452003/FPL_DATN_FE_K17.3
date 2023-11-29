

import { useAddSizeMutation } from '@/api/sizeApi';
import { Button, Form, Input, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FieldType  {
  size_name?: string;
  size_height?: number;
  size_length?: number;
  size_weight?: number;
  size_width?: number
}
const SizesAdd = () => {
  const [addSize, resultAdd] = useAddSizeMutation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const data = await addSize(values).unwrap();
      if(data){
        toast.success(data.message);
      }
      navigate("/admin/sizes");
    } catch (error:any) {
      toast.error(error.data.message);
    }
  
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const validatePositiveNumber = (_: any, value: any) => {
    if (parseFloat(value) <= 0) {
      return Promise.reject("Giá trị phải là số dương");
    }
    return Promise.resolve();
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm kích cỡ</h5>
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
              label="Chiều cao kích cỡ"
              name="size_height"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Chiều cao kích cỡ không được để trống!' },
              { validator: validatePositiveNumber },
              { pattern: /^[0-9]+$/, message: 'Không được nhập chữ' }]}
              hasFeedback
              style={{ marginLeft: '20px' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>


            <Form.Item<FieldType>
              label="Độ dài kích cỡ"
              name="size_length"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Độ dài kích cỡ không được để trống!' },
              { validator: validatePositiveNumber },
              { pattern: /^[0-9]+$/, message: 'Không được nhập chữ' }]}
              hasFeedback
              style={{ marginLeft: '20px' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Cân nặng kích cỡ"
              name="size_weight"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Cân nặng kích cỡ không được để trống!' },
              { validator: validatePositiveNumber },
              { pattern: /^[0-9]+$/, message: 'Không được nhập chữ' }]}
              hasFeedback
              style={{ marginLeft: '20px' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item<FieldType>
              label="Chiều dài kích cỡ"
              name="size_width"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: 'Chiều dài kích cỡ không được để trống!' },
              { validator: validatePositiveNumber },
              { pattern: /^[0-9]+$/, message: 'Không được nhập chữ' }]}
              hasFeedback
              style={{ marginLeft: '20px' }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 16 }}>

              <Button className=" h-10 bg-red-500 text-xs text-white ml-5" htmlType="submit">
                {resultAdd.isLoading ? <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> : " Thêm kích cỡ"}
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

export default SizesAdd