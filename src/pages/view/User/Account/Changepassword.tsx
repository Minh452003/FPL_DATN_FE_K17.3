import { useChangePasswordMutation } from "@/api/authApi";
import { Button, Form, Input } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [updatePassword, resultUpdate] = useChangePasswordMutation();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const response: any = await updatePassword(values);
    if (response.error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.error.data.message,
        showConfirmButton: true,
        timer: 1500,
      });
    } else {
      updatePassword(values).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cập nhật mật khẩu thành công!",
          showConfirmButton: true,
          timer: 1500,
        });
      });
      navigate(`/`);
    }
  };

  const onFinishFailed = () => { };

  type FieldType = {
    currentPassword?: string;
    newPassword?: string;
  };
  return (
    <div>
      <div className="mb-5">
        <div className="font-bold text-xl text-gray-700 m-2">Thay đổi mật khẩu</div>
        <div className="text-lg font-normal m-2">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </div>
        <hr className="w-4/5 font-medium" />
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Mật khẩu cũ"
          name="currentPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="bg-green-700 text-white font-semibold" htmlType="submit">
            {resultUpdate.isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin m-auto" />
            ) : ("Thay đổi")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
