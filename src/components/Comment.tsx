import { useState } from "react";
import { Button, Form, Upload, Modal, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import "../pages/view/Orders/order.css"
import { FaUpload } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import { useAddCommentMutation } from "@/api/commentApi";
import { getDecodedAccessToken } from "@/decoder";
import { useAddImageMutation, useDeleteImageMutation } from "@/api/uploadApi";
import { RcFile, UploadProps } from "antd/es/upload";


const Comment = ({ order }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;
    const [addComment, resultAdd] = useAddCommentMutation();
    const [addImage, resultImage] = useAddImageMutation();
    const [deleteImage, resultDelete] = useDeleteImageMutation();
    const [fileList, setFileList] = useState<RcFile[]>([]);
    const [imageUrl, setImageUrl] = useState<any>([]);
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        values.image = imageUrl;
        order?.products.map((product: any) => {
            addComment({
                productId: product.productId,
                description: values.description,
                userId: id,
                rating: parseInt(values.rating),
                image: values.image,
                orderId: order._id
            }).then(() => {
                // Swal.fire({
                //     position: 'center',
                //     icon: 'success',
                //     title: 'Đánh giá thành công thành công!',
                //     showConfirmButton: true,
                //     timer: 1500
                // });
                navigate('/user/orders?commentAdded=true')
            })
        })
    };

    const props: UploadProps = {
        name: 'image',
        fileList: fileList, // Sử dụng state fileList
        customRequest: async ({ file }: any) => {
            console.log(file);
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
                                info.file.uid = response.data.urls[0].publicId
                                setFileList(info.fileList);
                                setImageUrl((prevUrls: any) => [...prevUrls, response.data.urls[0]]);
                            }
                        }
                    })()
                } catch (error) {
                    console.error(error);
                }
                if (info.file.status === 'error') {
                    message.error(`${info.file.name} upload ảnh thất bại.`);
                } else if (info.file.status === 'removed') {
                    const publicId = info.file.uid;
                    (async () => {
                        await deleteImage(publicId);
                        const removedFile = info.file;
                        const updatedFileList = fileList.filter(item => item.uid !== removedFile.uid);
                        setFileList(updatedFileList);
                        const updateImage = imageUrl.filter((item: any) => item.publicId !== removedFile.uid);
                        setImageUrl(updateImage);
                    })();
                }
            }
        },
    };




    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={showModal} className="bg-orange-500 border-solid rounded border-1 py-1 px-3 text-white mt-2">
                <Link
                    className="ctorder text-white"
                    to={``}
                    style={{ textDecoration: "none", color: "black" }}
                >
                    Phản hồi
                </Link>
            </button>
            <Modal
                title="Đánh giá sản phẩm"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null} // Remove the footer entirely
            >
                <div>
                    <div className="comment-box">
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 800 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<any>
                                name="rating"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Phải chọn số sao đánh giá!' }]}
                            >
                                <div className="rating">
                                    <input type="radio" name="rating" value="5" id="inp5" /><label htmlFor="inp5">☆</label>
                                    <input type="radio" name="rating" value="4" id="inp4" /><label htmlFor="inp4">☆</label>
                                    <input type="radio" name="rating" value="3" id="inp3" /><label htmlFor="inp3">☆</label>
                                    <input type="radio" name="rating" value="2" id="inp2" /><label htmlFor="inp2">☆</label>
                                    <input type="radio" name="rating" value="1" id="inp1" /><label htmlFor="inp1">☆</label>
                                </div>
                            </Form.Item>
                            <Form.Item<any>
                                label="Nội dung"
                                name="description"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: 'Mô tả không được để trống!' }]}
                                hasFeedback
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item
                                id="images" name="image"
                            >
                                <Upload {...props} listType="picture" multiple
                                    fileList={fileList}
                                    beforeUpload={file => {
                                        setFileList([...fileList, file]);
                                    }}
                                >
                                    <Button icon={<FaUpload />}>Thêm ảnh</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 16 }}>
                                <Button className="h-10 bg-red-500 text-xs text-white"
                                    disabled={resultImage.isLoading || resultDelete.isLoading}
                                    htmlType="submit">
                                    {resultAdd.isLoading ? <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : "Đánh giá"}
                                </Button>
                                <Button className="h-10 bg-red-500 text-xs text-white" htmlType="submit">
                                    Đánh giá
                                </Button>
                            </Form.Item>
                        </Form>

                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Comment;
