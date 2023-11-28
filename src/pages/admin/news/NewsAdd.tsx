
import { useAddNewMutation } from '@/api/newsApi';
import { useAddImageMutation, useDeleteImageMutation } from '@/api/uploadApi';
import { INew } from '@/interfaces/new';
import { Button, Form, Input, Upload, UploadProps, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaUpload } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

type FieldType = {
    new_name?: string;
    new_description?: String;
    new_image?: object;
};
const NewsAdd = () => {
    const [addNew, resultAdd] = useAddNewMutation();
    const [addImage, resultImage] = useAddImageMutation();
    const [deleteImage, resultDelete] = useDeleteImageMutation();
    const [fileList, setFileList] = useState<RcFile[]>([]); // Khai báo state để lưu danh sách tệp đã chọn
    const [imageUrl, setImageUrl] = useState<any>({});
    const navigate = useNavigate();


    const onFinish = (values: INew) => {
        if (Object.keys(imageUrl).length > 0) {
            values.new_image = imageUrl;
            addNew(values).then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Thêm tin tức thành công!',
                    showConfirmButton: true,
                    timer: 1500
                });
                navigate("/admin/news");
            })
        } else {
            return
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const props: UploadProps = {
        name: 'new_image',
        fileList: fileList, // Sử dụng state fileList
        customRequest: async ({ file }: any) => {
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
                                info.file.status = 'done'
                                setFileList(info.fileList);
                                setImageUrl(response.data.urls[0])
                            }
                        }
                    })()
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
                        const updatedFileList = fileList.filter(item => item.uid !== removedFile.uid);
                        setFileList(updatedFileList);
                        setImageUrl({});
                    })();
                } if (info.fileList.length > 1) {
                    const updatedFileList: any = [info.fileList[0]];
                    setFileList(updatedFileList);
                }
            }
        },
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm tin tức</h5>
                    <div className="flex items-center ">
                    </div>
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
                            label="Tiêu đề"
                            name="new_name"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[{ required: true, message: 'Tiêu đề bắt buộc nhập!' },
                            { min: 2, message: "Nhập ít nhất 2 ký tự" },
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

                            ]}

                            hasFeedback
                            style={{ marginLeft: '20px' }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Mô tả"
                            name="new_description"
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            rules={[{ required: true, message: 'Mô tả bắt buộc nhập!' },
                            { min: 10, message: "Nhập ít nhất 10 ký tự" },
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

                            ]}

                            hasFeedback
                            style={{ marginLeft: '20px' }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginLeft: '20px' }}
                            id="images" name="new_image" label="Ảnh" rules={[{ required: true, message: 'Trường ảnh không được để trống' }]}
                            hasFeedback
                        >
                            <Upload {...props} maxCount={1} listType="picture" multiple
                                fileList={fileList}
                                beforeUpload={file => {
                                    setFileList([file]);
                                }}
                            >
                                <Button icon={<FaUpload />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 16 }}>
                            <Button className=" h-10 bg-red-500 text-xs text-white ml-5"
                                disabled={resultImage.isLoading || resultDelete.isLoading}
                                htmlType="submit">
                                {resultAdd.isLoading ? <AiOutlineLoading3Quarters className="animate-spin m-auto" />
                                    : " Thêm tin tức"}
                            </Button>
                            <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/news")} htmlType="submit">
                                Danh sách tin tức
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default NewsAdd