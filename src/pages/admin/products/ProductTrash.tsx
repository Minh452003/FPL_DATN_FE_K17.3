import { useGetBrandQuery } from '@/api/brandApi';
import { useGetCategoryQuery } from '@/api/categoryApi';
import { useGetMaterialQuery } from '@/api/materialApi';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/api/productApi';
import { useDeleteImageMutation, useUpdateImageMutation } from '@/api/uploadApi';
import { Button, Form, Input, Upload, Select, InputNumber, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { RcFile, UploadProps } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const Productupdate = () => {
    const { id }: any = useParams();
    const { data: productData }: any = useGetProductByIdQuery(id);
    const [updateProduct, resultUpdate] = useUpdateProductMutation();
    const { data: categories } = useGetCategoryQuery<any>();
    const { data: brands } = useGetBrandQuery<any>();
    const { data: materials } = useGetMaterialQuery<any>();
    const [updateImage] = useUpdateImageMutation();
    const [deleteImage] = useDeleteImageMutation();
    const [fileList, setFileList] = useState<RcFile[]>([]);
    const [imageUrl, setImageUrl] = useState<any>([]);
    const [publicId, setpublicId] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        if (productData) {
            setFields();
            setImageUrl(productData?.product?.image)
        }
    }, [productData]);
    const [form] = Form.useForm();
    const setFields = () => {
        form.setFieldsValue({
            _id: productData?.product?._id,
            product_name: productData?.product?.product_name,
            product_price: productData?.product?.product_price,
            image: productData?.product?.image ? productData?.product.image : [], // Nếu có ảnh, thêm vào mảng để hiển thị
            description: productData?.product?.description,
            categoryId: productData?.product?.categoryId,
            brandId: productData?.product?.brandId,
            materialId: productData?.product?.materialId,
        });
    };


    const onFinish = (values: any) => {
        try {
            values.image = imageUrl
            updateProduct(values).then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cập nhật sản phẩm thành công!',
                    showConfirmButton: true,
                    timer: 1500,
                });
                navigate('/admin/products');
            });
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
                                publicId: publicId,
                                files: formData,
                            } as any));
                            if (response.data && response.data.publicId) {
                                info.file.status = 'done'
                                info.file.uid = response.data.publicId
                                const publicId1 = response.data.publicId;
                                const url = response.data.url;
                                const updatedImage = { url: url, publicId: publicId1 };
                                setFileList(info.fileList);
                                setImageUrl((prevUrls: any) => prevUrls.map((item: any) => {
                                    if (item.publicId === publicId) {
                                        return updatedImage; // Thay thế ảnh có publicId tương ứng
                                    }
                                    return item;
                                }));
                            }
                        }
                    })()
                } catch (error) {
                    console.error(error);
                }
                if (info.file.status === 'error') {
                    message.error(` upload thất bại.`);
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

    const uploadButton = (
        <div>
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const handleImageUpdate = (index: number) => {
        const selectedImage = imageUrl[index];
        setpublicId(selectedImage.publicId);
    }

    return (
        <div className="container-fluid mb-7">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">Cập nhật Sản Phẩm</h5>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 1000, height: 1000 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item<FieldType> name="_id" style={{ display: 'none' }}>
                            <Input />
                        </Form.Item>
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
                        <Form.Item<FieldType>
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginLeft: '20px' }}
                            label="Ảnh" rules={[{ required: true, message: 'Trường ảnh không được để trống' }]}>
                            {imageUrl && imageUrl?.map((img: any, index: any) => (
                                <Upload
                                    {...props}
                                    key={img?.publicId}
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={() => handleImageUpdate(index)}
                                >
                                    {img ? <img src={img?.url} alt="avatar" style={{ width: '100px', height: "100px" }} /> :
                                        uploadButton
                                    }
                                </Upload>
                            ))}
                        </Form.Item>
                        <Form.Item<FieldType>
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
                        <Form.Item<FieldType>
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
                        <Form.Item<FieldType>
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
                                {resultUpdate.isLoading ? <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : " Cập nhật sản phẩm"}
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

export default Productupdate