
import { useGetBrandByIdQuery, useUpdateBrandMutation } from '@/api/brandApi';
import { pause } from '@/utils/pause';
import { Alert, Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';


type FieldType = {
  brand_name?: string;

};
const BrandUpdate = () => {
  const {idBrand} = useParams<{idBrand: string}>();
  const {data: brandData, isLoading} = useGetBrandByIdQuery(idBrand || "");
  const [updateBrand, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess}] = useUpdateBrandMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    form.setFieldsValue({
      brand_name: brandData?.brand_name,
    })
  }, [brandData])
  const onFinish = (values: any) => {
    updateBrand({...values, _id: idBrand})
    .unwrap()
    .then(async () => {
      await pause(1000);
      navigate("/admin/brand");
    })
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='font-bold text-2xl mb-4'>Thêm mới</h2>
      {isUpdateSuccess && <Alert message="Sua thanh cong" type="success" />}
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
    <Form.Item<FieldType>
      label="Tên Thương hiệu"
      name="brand_name"
      rules={[{ required: true, message: 'Please input your brand!' },
      {min: 3, message: "It nhat 3 ky tu"}]}
    >
      <Input />
  </Form.Item>

  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" danger htmlType="submit">
          {isUpdateLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ): (
            "Cập nhật thương hiệu"
          )}
        </Button>
        <Button type='primary' danger className='ml-2' onClick={() => navigate("/admin/brand")}>
        Danh sách Thương hiệu
        </Button>
      </Form.Item>

  </Form>
       </div>
  )
}

export default BrandUpdate



{/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" danger>
      Thêm mới
    </Button>
  
    <Button type='primary' onClick={() => navigate("/admin/product")}  className='ml-2 bg-blue' htmlType="submit" danger>
      Danh sách Thương hiệu
    </Button>
    </Form.Item> */}
