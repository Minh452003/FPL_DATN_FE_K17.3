import { useAddCategoryMutation } from '@/api/categoryApi';
import { useAddImageMutation, useDeleteImageMutation } from '@/api/uploadApi';
import { ICategory } from '@/interfaces/category';
import { Button, Form, Input, InputNumber, Upload, UploadProps, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import { FaUpload } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type FieldType = {
    category_name?: string;
    price_increase_percent?: number;
    category_image?: object;
};
const Categoryadd = () => {
    const [addCategory, resultAdd] = useAddCategoryMutation();
    const [addImage, resultImage] = useAddImageMutation();
    const [deleteImage, resultDelete] = useDeleteImageMutation();
    const [fileList, setFileList] = useState<RcFile[]>([]); // Khai báo state để lưu danh sách tệp đã chọn
    const [imageUrl, setImageUrl] = useState<any>({});
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: ICategory) => {
        console.log(values);

        try {
            if (Object.keys(imageUrl).length > 0) {
                values.category_image = imageUrl;
                const data: any = await addCategory(values).unwrap();
                if (data) {
                    toast.success(`${data.message}`);
                } else {
                    console.log(data);
                }
                navigate('/admin/categories');
            } else {
                throw new Error('Ảnh danh mục không được để trống.');
            }
        } catch (error: any) {
            if (Array.isArray(error.data.message)) {
                // Xử lý trường hợp mảng
                const messages = error.data.message;
                messages.forEach((message: any) => {
                    toast.error(message);
                });
            } else {
                // Xử lý trường hợp không phải mảng
                toast.error(error.data.message);
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const props: UploadProps = {
        name: 'category_image',
        fileList: fileList, // Sử dụng state fileList
        customRequest: async ({ file }: any) => {
            // eslint-disable-next-line no-constant-condition
            if (false) {
                console.log(file);
            }
        },
        onChange(info: any) {
            if (info.file) {
                const formData = new FormData();
                formData.append('images', info.file.originFileObj);
                try {
                    (async () => {
                        if (info.file.status === 'uploading') {
                            const response: any = await addImage(formData);
                            if (response.data && response.data.urls) {
                                info.file.status = 'done';
                                setFileList(info.fileList);
                                setImageUrl(response.data.urls[0]);
                                setIsImageUploaded(true); // Đặt state khi ảnh được tải lên
                            }
                        }
                    })();
                } catch (error) {
                    console.error(error);
                }
                if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                } else if (info.file.status === 'removed') {
                    const publicId = imageUrl.publicId;
                    (async () => {
                        await deleteImage(publicId);
                        const removedFile = info.file;
                        const updatedFileList = fileList.filter(
                            (item) => item.uid !== removedFile.uid,
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
    const validatePositiveNumber = (_: any, value: any) => {
        if (parseFloat(value) < 0) {
            return Promise.reject('Giá trị phải là số dương');
        }
        return Promise.resolve();
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm Danh Mục</h5>
                    <div className="flex items-center "></div>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 1000, height: 1000 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="Tên danh mục"
                            name="category_name"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[
                                { required: true, message: 'Tên danh mục bắt buộc nhập!' },
                                { min: 2, message: 'Nhập ít nhất 2 ký tự' },
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.resolve();
                                        }
                                        if (/ {2,}/.test(value)) {
                                            return Promise.reject(
                                                'Không được nhập liên tiếp các khoảng trắng!',
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                            hasFeedback
                            style={{ marginLeft: '20px' }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Giá tăng khi tự thiết kế (%)"
                            name="price_increase_percent"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[
                                { required: true, message: 'Tiền đặt cọc bắt buộc nhập!' },
                                { validator: validatePositiveNumber },
                                { pattern: /^[0-9]+$/, message: 'Không được nhập chữ' },
                                { max: 100, type: 'number', message: 'Không được vượt quá 100%' }
                            ]}
                            hasFeedback
                            style={{ marginLeft: '20px' }}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginLeft: '20px' }}
                            id="images"
                            name="category_image"
                            label="Ảnh"
                            rules={[{ required: true, message: 'Trường ảnh không được để trống' }]}
                            hasFeedback
                        >
                            <Upload
                                {...props}
                                maxCount={1}
                                listType="picture"
                                multiple
                                fileList={fileList}
                                beforeUpload={(file) => {
                                    // Kiểm tra kích thước của tệp
                                    const isLt2M = file.size / 1024 / 1024 < 2;
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
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 16 }}>
                            <Button
                                className=" h-10 bg-red-500 text-xs text-white ml-5"
                                disabled={
                                    !isImageUploaded ||
                                    resultImage.isLoading ||
                                    resultDelete.isLoading
                                }
                                htmlType="submit"
                            >
                                {resultAdd.isLoading ? (
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    ' Thêm danh mục'
                                )}
                            </Button>
                            <Button
                                className=" h-10 bg-blue-500 text-xs text-white ml-5"
                                onClick={() => navigate('/admin/categories')}
                                htmlType="submit"
                            >
                                Danh sách danh mục
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Categoryadd;
