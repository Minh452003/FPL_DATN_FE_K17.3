import { Button, Form, Input, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMaterialByIdQuery, useUpdateMaterialMutation } from '@/api/materialApi';
import { toast } from 'react-toastify';


interface FieldType {
  _id?: string;
  material_name?: string;
}

const MaterialUpdate = () => {
  const { id }: any = useParams();
  const { data: materialData, isLoading } = useGetMaterialByIdQuery<FieldType>(id);
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
      material_name: materialData?.material?.material_name
    });
  };

  const onFinish = async (values: any) => {
    try {
      const data = await  updateMaterial(values).unwrap();
      if (data){
        toast.success(data.message);
      }
      navigate('/admin/colors');
    } catch (error:any) {
      toast.success(error.data.message);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  if (isLoading) return <Skeleton />;

  // const validatePositiveNumber = (_: any, value: any) => {
  //   if (parseFloat(value) < 0) {
  //     return Promise.reject("Giá trị phải là số dương");
  //   }
  //   return Promise.resolve();
  // }
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
                </div> : " Cập nhật vật liệu"}
              </Button>
              <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/materials")} htmlType="submit">
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