
import { useGetBannerByIdQuery, useUpdateBannerMutation } from '@/api/bannerApi';

import { useDeleteImageMutation, useUpdateImageMutation } from '@/api/uploadApi';
import { Button, Form, Input, Skeleton, Upload, message } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { FaUpload } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';




const Bannerupdate = () => {
    const { id }: any = useParams();
    const { data: banners, isLoading, isError }: any = useGetBannerByIdQuery(id);
   
    
    const [updateBanner, resultUpdate] = useUpdateBannerMutation();
    const [updateImage] = useUpdateImageMutation();
    const [deleteImage] = useDeleteImageMutation();
    const [fileList, setFileList] = useState<RcFile[]>([]); // Khai báo state để lưu danh sách tệp đã chọn
    const [imageUrl, setImageUrl] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (banners) {
            setFields();
        }
    }, [banners]);

    const [form] = Form.useForm();

    const setFields = () => {
        form.setFieldsValue({
            _id: banners.banner?._id,
            
            image: banners.banner?.image ? banners.banner.image : {}, // Nếu có ảnh, thêm vào mảng để hiển thị
        });
    };

    const onFinish = (values: any) => {
        try {
            if (Object.keys(imageUrl).length > 0) {
                values.image = imageUrl;
                updateBanner(values).then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Cập nhật banner thành công!',
                        showConfirmButton: true,
                        timer: 1500,
                    });
                    navigate('/admin/banners');
                });
            } else {
                updateBanner(values).then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Cập nhật banner thành công!',
                        showConfirmButton: true,
                        timer: 1500,
                    });
                    navigate('/admin/banners');
                });
            }

        } catch (error) {

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
                            const response: any = await updateImage(({
                                publicId: banners.banner?.image?.publicId,
                                files: formData,
                            } as any));
                            if (response.data && response.data.publicId) {
                                info.file.status = 'done'
                                setFileList(info.fileList);
                                const publicId = response.data.publicId;
                                const url = response.data.url;
                                setImageUrl({ url: url, publicId: publicId })
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

    if (isLoading) return <Skeleton />;
    if (isError || !banners || !banners.banner) {

        return <div>Error: Unable to fetch banner data.</div>;
    }
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4 pl-5">Cập Nhật Banner</h5>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 1000, }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item label="" name="_id" style={{ display: 'none' }}>
                            <Input />
                        </Form.Item>
                
                        <Form.Item
                            labelCol={{ span: 24 }} // Đặt chiều rộng của label
                            wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                            style={{ marginLeft: '20px' }}
                            id="images" name="image" label="Ảnh" rules={[{ required: true, message: 'Trường ảnh không được để trống' }]}
                            hasFeedback
                            >
                            <Upload {...props} maxCount={1} listType="picture" multiple
                                fileList={fileList}
                                beforeUpload={file => {
                                    setFileList([file]);
                                }}>
                                <Button icon={<FaUpload />}>Chọn ảnh</Button>
                            </Upload>
                            {Object.keys(imageUrl).length <= 0 && banners.banner.image && banners.banner.image.url && (
                                <div className="mt-3">
                                    <img src={banners.banner.image.url} alt="Ảnh danh mục hiện tại" style={{ maxWidth: '100px' }} />
                                </div>
                            )}
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 16 }}>

                            <Button className=" h-10 bg-red-500 text-xs text-white ml-5" htmlType="submit">
                                {resultUpdate.isLoading ? <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : " Cập nhật danh mục"}
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

export default Bannerupdate