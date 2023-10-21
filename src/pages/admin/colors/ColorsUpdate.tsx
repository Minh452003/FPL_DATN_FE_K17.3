

import { useGetColorByIdQuery, useUpdateColorMutation } from '@/api/colorApi';
import { pause } from '@/utils/pause';
import { Alert, Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';


type FieldType = {
  colors_name?: string;

};
const ColorsUpdate = () => {
    const { idColor }: any = useParams();
    const { data: colors, isLoading }: any = useGetColorByIdQuery(idColor || "");
    const [updateColor, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess}] = useUpdateColorMutation();
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
  updateColor({...values, _id: idColor})
  .unwrap()
  .then(async () => {
    await pause(1000);
    navigate("/admin/color");
  })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
  return (
    <div className='max-w-4xl mx-auto'>
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
      label="Tên màu"
      name="colors_name"
      rules={[{ required: true, message: 'Please input your color!' },
      {min: 3, message: "It nhat 3 ky tu"}]}
    >
      <Input />
  </Form.Item>

  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" danger htmlType="submit">
        {isUpdateLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ): (
            "Cập nhật màu"
          )}
        </Button>
        <Button type='primary' danger className='ml-2' onClick={() => navigate("/admin/color")}>
        Danh sách màu
        </Button>
      </Form.Item>

  </Form>
       </div>
  )
}

export default ColorsUpdate
