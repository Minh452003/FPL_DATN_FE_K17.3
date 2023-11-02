import { useGetUserByIdQuery, useUpdateUserMutation } from "@/api/authApi";
import {
  useDeleteImageMutation,
  useUpdateImageMutation,
} from "@/api/uploadApi";
import { getDecodedAccessToken } from "@/decoder";
import { Button, Form, Input, Skeleton, Upload, message } from "antd";
import { RcFile, UploadProps } from "antd/es/upload";
import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type FieldType = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: number;
  address?: string | null;
  avatar?: object;
};

const ProfileUpdate = () => {
  const decodedToken: any = getDecodedAccessToken();
  const id = decodedToken ? decodedToken.id : null;

  const { data: user, isLoading, isError }: any = useGetUserByIdQuery(id);
  console.log(user);

  const [updateUser, resultUpdate] = useUpdateUserMutation();
  const [updateImage] = useUpdateImageMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [fileList, setFileList] = useState<RcFile[]>([]); // Khai báo state để lưu danh sách tệp đã chọn
  const [imageUrl, setImageUrl] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFields();
    }
  }, [user]);

  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      _id: user?._id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      avatar: user?.avatar ? user?.avatar : {},
    });
  };

  const onFinish = (values: any) => {
    try {
      if (Object.keys(imageUrl).length > 0) {
        values.avatar = imageUrl;
        updateUser(values).then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cập nhật hồ sơ thành công!",
            showConfirmButton: true,
            timer: 1500,
          });
          navigate('/user/profile');
        });
      } else {
        updateUser(values).then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cập nhật hồ sơ thành công!",
            showConfirmButton: true,
            timer: 1500,
          });
          navigate('/user/profile');
        });
        console.log(values);
      }
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const props: UploadProps = {
    name: "category_image",
    fileList: fileList, // Sử dụng state fileList
    customRequest: async ({ file }: any) => {},
    onChange(info: any) {
      if (info.file) {
        const formData = new FormData();
        formData.append("images", info.file.originFileObj);
        try {
          (async () => {
            if (info.file.status === "uploading") {
              const response: any = await updateImage({
                publicId: user?.publicId,
                files: formData,
              } as any);
              if (response.data && response.data.publicId) {
                info.file.status = "done";
                setFileList(info.fileList);
                const publicId = response.data.publicId;
                const url = response.data.url;
                setImageUrl({ url: url, publicId: publicId });
              }
            }
          })();
        } catch (error) {
          console.error(error);
        }
        if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        } else if (info.file.status === "removed") {
          const publicId = imageUrl.publicId;
          (async () => {
            await deleteImage(publicId);
            const removedFile = info.file;
            const updatedFileList = fileList.filter(
              (item) => item.uid !== removedFile.uid
            );
            setFileList(updatedFileList);
            setImageUrl({});
          })();
        }
        if (info.fileList.length > 1) {
          const updatedFileList: any = [info.fileList[0]];
          setFileList(updatedFileList);
        }
      }
    },
  };

  if (isLoading) return <Skeleton />;
  if (isError || !user) {
    return <div>Error: Unable to fetch category data.</div>;
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
            onFinishFailed={onFinishFailed}
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
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Last Name"
              name="last_name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: "20px" }}
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: "20px" }}
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: "20px" }}
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
                {
                  pattern: /^[0-9]{10,11}$/, // Sử dụng biểu thức chính quy để kiểm tra số điện thoại
                  message:
                    "Please enter a valid phone number with 10 to 11 digits!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Address"
              name="address"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ marginLeft: "20px" }}
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }} // Đặt chiều rộng của label
              wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
              style={{ marginLeft: "20px" }}
              id="avatar"
              name="avatar"
              label="Ảnh"
              rules={[
                { required: true, message: "Trường ảnh không được để trống" },
              ]}
            >
              <Upload
                {...props}
                maxCount={1}
                listType="picture"
                multiple
                fileList={fileList}
                beforeUpload={(file) => {
                  setFileList([file]);
                }}
              >
                <Button icon={<FaUpload />}>Chọn ảnh</Button>
              </Upload>
              {Object.keys(imageUrl).length <= 0 &&
                user.avatar &&
                user.avatar.url && (
                  <div className="mt-3">
                    <img
                      src={user.avatar.url}
                      alt="Ảnh danh mục hiện tại"
                      style={{ maxWidth: "100px" }}
                    />
                  </div>
                )}
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

export default ProfileUpdate;
