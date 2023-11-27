import { useChangePasswordMutation } from "@/api/authApi";
import { IChangPassword, IUser } from "@/interfaces/auth";
import { Button, Form, Input } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [updatePassword, resultUpdate] = useChangePasswordMutation();
  const navigate = useNavigate();
  const onFinish = async (values: IUser) => {
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
  return (
    <div>
      <div className="mb-5">
        <div className="font-bold text-xl text-gray-700 m-3">Thay đổi mật khẩu</div>
        <div className="text-2sm font-normal m-3">
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
        autoComplete="off"
      >
        <Form.Item<IChangPassword>
          label="Mật khẩu cũ"
          name="currentPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" },
          {
            validator: (_, value) => {
              if (/\s/.test(value)) {
                return Promise.reject("Mật khẩu cũ không được chứa dấu cách!");
              }
              return Promise.resolve();
            },
          },]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<IChangPassword>
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" },
          {
            validator: (_, value) => {
              if (/\s/.test(value)) {
                return Promise.reject("Mật khẩu mới không được chứa dấu cách!");
              }
              return Promise.resolve();
            },
          },]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="bg-green-700 text-white font-semibold" htmlType="submit">
            {resultUpdate.isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin m-auto" />
            ) : ("Thay đổi mật khẩu")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
