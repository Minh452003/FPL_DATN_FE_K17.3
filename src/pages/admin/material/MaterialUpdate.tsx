import { pause } from '@/utils/pause';
import { Alert, Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useGetMaterialByIdQuery, useUpdateMaterialMutation } from '@/api/materialApi';


type FieldType = {
  material_name?: string;
  material_price? : number;

};
const MaterialUpdate = () => {
  const {idMaterial} = useParams<{idMaterial: string}>();
  const {data: materialData} = useGetMaterialByIdQuery(idMaterial || "");
  const [updateMaterial, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess}] = useUpdateMaterialMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    form.setFieldsValue({
      material_name: materialData?.material_name,
      material_price: materialData?.material_price
    })
  }, [materialData]);
  const onFinish = (values: any) => {
    updateMaterial({...values, _id: idMaterial})
    .unwrap()
    .then( async () => {
      await pause(1000);
      navigate("/admin/material");
    })
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
  return (
    <div className="container-fluid">
    <div className="row">
        <div className="card-body">
            <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm Vật liệu</h5>
            <div className="flex items-center ">
            {isUpdateSuccess  && <Alert message="Them thanh cong" type="success" />}

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
    <Form.Item<FieldType>
      label="Tên Vật liệu"
      name="material_name"
      rules={[{ required: true, message: 'Please input your brand!' },
      {min: 3, message: "It nhat 3 ky tu"}]}
    >
      <Input />
  </Form.Item>

  <Form.Item<FieldType>
      label="Giá Vật liệu"
      name="material_price"
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
      </Form.Item>

  </Form>
        </div>
    </div>
</div>
  )
}

export default MaterialUpdate