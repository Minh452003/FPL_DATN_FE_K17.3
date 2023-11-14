import { useAddBannerMutation } from '@/api/bannerApi';

import { useAddImageMutation, useDeleteImageMutation } from '@/api/uploadApi';
import { IBanner } from '@/interfaces/banner';

import { Button, Form, Upload, UploadProps, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import { FaUpload } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Banneradd = () => {
    const [addBanner, resultAdd] = useAddBannerMutation();
    const [addImage] = useAddImageMutation();
    const [deleteImage] = useDeleteImageMutation();
    const [fileList, setFileList] = useState<RcFile[]>([]); // Khai báo state để lưu danh sách tệp đã chọn
    const [imageUrl, setImageUrl] = useState<any>({});
    const navigate = useNavigate();


    const onFinish = (values: IBanner) => {
        if (Object.keys(imageUrl).length > 0) {
            values.image = imageUrl;
            addBanner(values).then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Thêm Banner thành công!',
                    showConfirmButton: true,
                    timer: 1500
                });
                navigate("/admin/banners");
            })
        } else {
            return
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const props: UploadProps = {
        name: 'image',
        fileList: fileList, // Sử dụng state fileList
        customRequest: async ({ file }: any) => {
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
                    <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm Danh Mục</h5>
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
                         <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginLeft: '20px' }}
                            id="images" name="image" label="Ảnh" rules={[{ required: true, message: 'Trường ảnh không được để trống' }]}
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
                            <Button className=" h-10 bg-red-500 text-xs text-white ml-5" htmlType="submit">
                                {resultAdd.isLoading ? <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : " Thêm banner"}
                            </Button>
                            <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/banners")} htmlType="submit">
                                Danh sách banner
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Banneradd