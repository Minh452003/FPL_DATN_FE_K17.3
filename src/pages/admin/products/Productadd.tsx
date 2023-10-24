import { useGetBrandQuery } from '@/api/brandApi';
import { useGetCategoryQuery } from '@/api/categoryApi';
import { useGetMaterialQuery } from '@/api/materialApi';
import { useAddProductMutation } from '@/api/productApi';
import { useAddImageMutation, useDeleteImageMutation } from '@/api/uploadApi';
import { Button, Form, Input, Upload, Select, message, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { RcFile, UploadProps } from 'antd/es/upload';
import { useState } from 'react';
import { FaUpload } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


type FieldType = {
    product_name?: string;
    product_price?: string;
    image?: any;
    description?: string;
    categoryId?: string;
    brandId?: string;
    materialId?: string;
};

const Productadd = () => {
    const [addProduct, resultAdd] = useAddProductMutation();
    const { data: categories } = useGetCategoryQuery<any>();
    const { data: brands } = useGetBrandQuery<any>();
    const { data: materials } = useGetMaterialQuery<any>();
    const [addImage] = useAddImageMutation();
    const [deleteImage] = useDeleteImageMutation();
    const [fileList, setFileList] = useState<RcFile[]>([]);
    const [imageUrl, setImageUrl] = useState<any>([]);
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        if (imageUrl.length > 0) {
            values.image = imageUrl;
            addProduct(values).then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Thêm sản phẩm thành công!',
                    showConfirmButton: true,
                    timer: 1500
                });
                navigate("/admin/products");
            })
        } else {
            message.error(`Thêm sản phẩm thất bại`);
            return
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const props: UploadProps = {
        name: 'image',
        fileList: fileList, // Sử dụng state fileList
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
                    message.error(`${info.file.name} upload thất bại.`);
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

    return (
        <div className="container-fluid mb-7">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Thêm Sản Phẩm</h5>
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
                            label="Tên"
                            name="product_name"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Tên sản phẩm không được để trống!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <Input placeholder='Tên sản phẩm' />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Giá Niêm Yết"
                            name="product_price"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Trường giá không được để trống!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginLeft: '20px' }}
                            id="images" name="image" label="Ảnh" rules={[{ required: true, message: 'Ảnh không được để trống' }]}>
                            <Upload {...props} listType="picture" multiple
                                fileList={fileList}
                                beforeUpload={file => {
                                    setFileList([...fileList, file]);
                                }}
                            >
                                <Button icon={<FaUpload />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="Danh mục"
                            name="categoryId"
                            rules={[{ required: true, message: 'Danh mục không được để trống!' }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginLeft: '20px' }}
                        >
                            <Select >
                                {categories && categories?.category.docs?.map((category: any) => {
                                    return <Select.Option key={category?._id} value={category._id}>{category.category_name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Thương hiệu"
                            name="brandId"
                            rules={[{ required: true, message: 'Thương hiệu không được để trống!' }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginLeft: '20px' }}
                        >
                            <Select >
                                {brands && brands?.brand?.map((brand: any) => {
                                    return <Select.Option key={brand?._id} value={brand._id}>{brand.brand_name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Chất liệu"
                            name="materialId"
                            rules={[{ required: true, message: 'Chất liệu không được để trống!' }]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginLeft: '20px' }}
                        >
                            <Select >
                                {materials && materials?.material?.map((mate: any) => {
                                    return <Select.Option key={mate?._id} value={mate._id}>{mate.material_name}</Select.Option>
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Mô tả"
                            name="description"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: 'Mô tả không được để trống!' }]}
                            style={{ marginLeft: '20px' }}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 16 }}>
                            <Button className=" h-10 bg-red-500 text-xs text-white ml-5" htmlType="submit">
                                {resultAdd.isLoading ? <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : " Thêm sản phẩm"}
                            </Button>
                            <Button className=" h-10 bg-blue-500 text-xs text-white ml-5" onClick={() => navigate("/admin/products")} htmlType="submit">
                                Danh sách sản phẩm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div >
    )
}

export default Productadd