import { useGetUserByIdQuery, useUpdateUserByAdminMutation } from "@/api/authApi";
import { Button, Form, Input, Skeleton } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
import { toast } from "react-toastify";

type FieldType = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: number;
  address?: string | null;
  avatar?: object;
  role?: string;
};

const UserUpdate = () => {
  const { id } = useParams<{ id: any }>();
  const { Option } = Select;
  const { data: user, isLoading, isError } = useGetUserByIdQuery(id || "");
  const [updateUser, resultUpdate] = useUpdateUserByAdminMutation<any>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      setFields();
    }
  }, [user]);


  const setFields = () => {
    form.setFieldsValue({
      _id: user?._id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      avatar: user?.avatar ? user?.avatar : {},
      role: user?.role,
    });
  };

  const onFinish = async (values: any) => {
    try {
      const data = await updateUser(values).unwrap();
      if (data) {
        toast.success(data.message);
      }
      navigate('/admin/users');
    }
    catch (error: any) {
      toast.error(error.data.message)
    }
  };



  if (isLoading) return <Skeleton />;
  if (isError || !user) {
    return <div>Error: Unable to fetch users data.</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="card-body">
          <h5 className="card-title mt-4 fw-semibold mb-4 pl-5">
            Cập Nhật Hồ Sơ
          </h5>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 1000 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item label="" name="_id" style={{ display: "none" }}>
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="First Name"
              name="first_name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: "20px" }}
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item<FieldType>
              label="Last Name"
              name="last_name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: "20px" }}
              rules={[
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: "20px" }}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: "20px" }}

            >
              <Input disabled />
            </Form.Item>

            <Form.Item<FieldType>
              label="Address"
              name="address"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: "20px" }}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Vai trò"
              name="role"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: "20px" }}
              rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
            >
              <Select placeholder="Chọn vai trò">
                <Option value="admin">admin</Option>
                <Option value="member">member</Option>
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 16 }}>
              <Button
                className=" h-10 bg-red-500 text-xs text-white ml-5"
                htmlType="submit"
              >
                {resultUpdate.isLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  " Cập nhật hồ sơ"
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
