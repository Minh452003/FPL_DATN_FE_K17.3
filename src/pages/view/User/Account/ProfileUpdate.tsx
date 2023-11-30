import { useGetUserByIdQuery, useUpdateUserMutation } from "@/api/authApi";
import {
  useGetAvailableMutation,
  useGetCityQuery,
  useGetDistrictMutation,
  useGetWardMutation,
} from "@/api/shipApi";
import {
  useDeleteImageMutation,
  useUpdateImageMutation,
} from "@/api/uploadApi";
import { getDecodedAccessToken } from "@/decoder";
import { Button, Form, Input, Skeleton, Upload, message, Select } from "antd";
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

  const { data: user, isLoading, isError } : any = useGetUserByIdQuery(id);
  const { data: city } = useGetCityQuery();

  const [updateUser, resultUpdate] = useUpdateUserMutation();
  const [updateImage] = useUpdateImageMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [setwardCode] = useState<any>("");
  const [addAvailable] = useGetAvailableMutation();
  const [setAvailable] = useState<any>([]);
  const [fileList, setFileList] = useState<RcFile[]>([]); // Khai báo state để lưu danh sách tệp đã chọn
  const [imageUrl, setImageUrl] = useState<any>({});
  const navigate = useNavigate();
  const [addDistrict] = useGetDistrictMutation<any>();
  const [addWard] = useGetWardMutation<any>();
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState<any>([]);
  useEffect(() => {
    if (user) {
      setFields();
      const { address } = user;
      if (address) {
        const [street, district, ward] = address.split(', ').reverse();
        form.setFieldsValue({
          address: {
            street,
            ward,
            district,
          },
        });
      }
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
  const handleCityChange = async (option: any) => {
    const id = Number(option.key); // Lấy id từ option.key
    addDistrict({ province_id: id }).then((response: any) => {
      setDistrict(response.data.data);
    });
  };
  const handleDistrictChange = async (option: any) => {
    const id = Number(option.key); // Lấy id từ option.key
    addWard({ district_id: id }).then((response: any) => {
      setWard(response.data.data);
    });
  };
  const handleAvailableChange = async (option: any) => {
    const id = Number(option.key); // Lấy id từ option.key
    setwardCode(id);
    addAvailable({
      shop_id: 4537750,
      from_district: 3440,
      to_district: ward[0].DistrictID,
    }).then((response: any) => {
      setAvailable(response.data.data);
    });
  };
  const onFinish = (values: any) => {
    try {
      const formattedAddress = `${values.address?.ward}, ${values.address?.district}, ${values.address?.street}`;
      values.address = formattedAddress;
      if (Object.keys(imageUrl).length > 0) {
        values.avatar = imageUrl;
      }
      updateUser(values).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cập nhật hồ sơ thành công!",
          showConfirmButton: true,
          timer: 1500,
        });
        navigate("/user/profile");
      });
    } catch (error) {
      message.error("An error occurred while updating the profile");
    }
  };


  const props: UploadProps = {
    name: "category_image",
    fileList: fileList, // Sử dụng state fileList
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
              });
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
          const updatedFileList = [info.fileList[0]];
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
                { whitespace: true, message: "Cannot be only whitespace!" },
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
                { whitespace: true, message: "Cannot be only whitespace!" }
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

            <Form.Item
              name={["address", "street"]}
              style={{ marginBottom: 20, marginLeft: "20px" }}

              rules={[
                { required: true, message: "Thành phố không được để trống" },
              ]}
            >
              <Select
                style={{ width: 330 }}
                onChange={handleCityChange}
                placeholder="Tỉnh Thành"
              >
                {city &&
                  city?.data?.map((ct: any) => {
                    return (
                      <Select.Option
                        key={ct?.ProvinceID}
                        value={ct?.ProvinceName}
                      >
                        {ct?.ProvinceName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              name={["address", "district"]}
              style={{ marginBottom: 20, marginLeft: "20px" }}

              rules={[
                { required: true, message: "Quận huyện không được để trống" },
              ]}
            >
              <Select
                style={{ width: 330 }}
                onChange={handleDistrictChange}
                placeholder="Quận huyện"
              >
                {district &&
                  district.map((dis: any) => {
                    return (
                      <Select.Option
                        key={dis?.DistrictID}
                        value={dis?.DistrictName}
                      >
                        {dis?.DistrictName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              name={["address", "ward"]}
              style={{ marginBottom: 20, marginLeft: "20px" }}
              rules={[
                { required: true, message: "Phường xã không được để trống" },
              ]}
            >
              <Select
                style={{ width: 330 }}
                onChange={handleAvailableChange}
                placeholder="Phường xã"
              >
                {ward &&
                  ward.map((ward: any) => {
                    return (
                      <Select.Option
                        key={ward?.WardCode}
                        value={ward?.WardName}
                      >
                        {ward?.WardName}
                      </Select.Option>
                    );
                  })}
              </Select>
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
                beforeUpload={file => {
                  // Kiểm tra kích thước của tệp
                  const isLt2M = file.size / 1024 / 1024 < 2;
                  // Kiểm tra loại tệp
                  const isImage = file.type.startsWith('image/');
                  if (!isLt2M) {
                      message.error('Ảnh phải nhỏ hơn 2MB!');
                  } else if (!isImage) {
                      message.error('Chỉ được tải lên các tệp ảnh!');
                  } else {
                      setFileList([file]);
                  }
                  return isLt2M && isImage;
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
                  "Xác nhận cập nhật hồ sơ"
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


