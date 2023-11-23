import {
    useGetCustomProductsQuery,
    useRemoveCustomProductMutation,
} from '@/api/CustomizedProductAPI';
import { useGetUsersQuery } from '@/api/authApi';
import { useGetCategoryQuery } from '@/api/categoryApi';
import { useGetColorsQuery } from '@/api/colorApi';
import { useGetMaterialQuery } from '@/api/materialApi';
import { useGetSizeQuery } from '@/api/sizeApi';
import { Table, Button, Input } from 'antd';
import { FaTrashCan, FaWrench, FaCirclePlus, FaTrash, FaProductHunt } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { useGetBrandQuery } from '@/api/brandApi';
const CustomProductslist = () => {
    const { data: listcustomProducts, isloading: isLoadingCustomProducts } =
        useGetCustomProductsQuery<any>();
    const [searchText, setSearchText] = useState('');
    const { data: colors } = useGetColorsQuery<any>();
    const { data: brands } = useGetBrandQuery<any>();
    const { data: materials } = useGetMaterialQuery<any>();
    const { data: users } = useGetUsersQuery<any>();
    const { data: categories } = useGetCategoryQuery<any>();
    const { data: size } = useGetSizeQuery<any>();
    const [removeProduct, { isLoading: isRemoveLoading }] = useRemoveCustomProductMutation();
    const [sortedInfo, setSortedInfo] = useState({} as any);
    const productsCustomProducts = isLoadingCustomProducts ? [] : listcustomProducts?.customProduct;
    const color = colors?.color;
    const brand = brands?.brand;
    const material = materials?.material;
    const user = users?.data;
    const categorie = categories?.category?.docs;
    const sizes = size?.size;
    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setSortedInfo(sorter);
    };
    const dataProductCustom = productsCustomProducts?.map((product: any, index: number) => {
        return {
            key: product._id,
            STT: index + 1,
            name: product.product_name,
            price: product.product_price,
            category: product.categoryId,
            brand: product.brandId,
            materials: product.materialId,
            color: product.colorId,
            user: product.userId,
            sizes: product.sizeId,
            quantity: product.stock_quantity,
            image: <img width={50} src={product.image[0]?.url} alt="" />,
        };
    });
    const formatCurrency = (number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const deleteProduct = (id: any) => {
        Swal.fire({
            title: 'Bạn chắc chứ?',
            text: 'Khi có thể vào thùng rác để khôi phục lại!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, tôi chắc chắn!',
            cancelButtonText: 'Huỷ',
        }).then((result) => {
            if (result.isConfirmed) {
                removeProduct(id)
                    .unwrap()
                    .then(() => {
                        Swal.fire('Xoá thành công!', 'Danh mục của bạn đã được xoá.', 'success');
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Hiển thị thông báo hủy xóa sản phẩm
                Swal.fire('Đã huỷ', 'Danh mục xoá thất bại.', 'error');
            }
        });
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render: (index: number) => <a>{index}</a>,
            sorter: (a: any, b: any) => a.STT - b.STT, // Sắp xếp theo STT
            sortOrder: sortedInfo.columnKey === 'STT' && sortedInfo.order,
            ellipsis: true,
            width: 80,
        },
        {
            title: 'Tên khách hàng ',
            dataIndex: 'user',
            key: 'user',
            render: (record: any) => {
                const username = user?.find((cate: any) => cate._id === record);
                return username?.first_name;
            },
        },
        {
            title: 'Tên sản phẩm ',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (text: any) => <p className="text-red-700">{formatCurrency(text)}₫</p>,
            sorter: (a: any, b: any) => a.price - b.price, // Sắp xếp theo giá
            sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
            ellipsis: true
        },
        {
            title: 'Đã bán',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text: any) => <a>{text}</a>,
            sorter: (a: any, b: any) => a.price - b.price, // Sắp xếp theo giá
            sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
            ellipsis: true
        },
        {
            title: 'Danh Mục',
            dataIndex: 'category',
            key: 'category',
            render: (record: any) => {
                const catename = categorie?.find((cate: any) => cate._id === record);
                return catename?.category_name;
            },
        },
        {
            title: 'Chất liệu',
            dataIndex: 'materials',
            key: 'materials',
            render: (record: any) => {
                const materialsname = material?.find((cate: any) => cate._id === record);
                return materialsname?.material_name;
            },
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'brand',
            key: 'brand',
            render: (record: any) => {
                const brandname = brand?.find((cate: any) => cate._id === record);
                return brandname?.brand_name;
            },
        },
        {
            title: 'Kích cỡ ',
            dataIndex: 'sizes',
            key: 'sizes',
            render: (record: any) => {
                const sizesrname = sizes?.find((cate: any) => cate._id === record);
                return sizesrname?.size_name;
            },
        },
        {
            title: 'Màu ',
            dataIndex: 'color',
            key: 'color',
            render: (record: any) => {
                const colorname = color?.find((cate: any) => cate._id === record);
                return colorname?.colors_name;
            },
        },
        {
            title: 'Chức năng',
            render: ({ key: _id }: any) => (
                <div style={{ width: '150px' }}>
                    <Button className="mr-1 text-red-500" onClick={() => deleteProduct(_id)}>
                        {isRemoveLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            <FaTrashCan />
                        )}
                    </Button>
                </div>
            ),
        },
    ];
    const filteredData = dataProductCustom?.filter((item: any) => {
        const username = item.user
            ? user?.find((cate: any) => cate._id === item.user)?.first_name
            : null;

        const lowerCaseSearchText = searchText.toLowerCase();
        return (
            item.name.toLowerCase().includes(lowerCaseSearchText) ||
            (username && username.toLowerCase().includes(lowerCaseSearchText))
        );
    });
    return (
        <div className="container">
            <h3 className="font-semibold">Danh sách sản phẩm Thiết kế</h3>
            <div className="flex p-1">
                <Button className="text-3xl text-blue-500">
                    <Link to={'add'}>
                        <FaCirclePlus style={{ fontSize: '24', display: 'block' }} />
                    </Link>
                </Button>
                <Input
                    className="ml-4"
                    prefix={<IoSearchSharp style={{ opacity: 0.5 }} />}
                    placeholder="Tìm kiếm ..."
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ marginBottom: '16px', borderRadius: '5px', width: '400px' }}
                />
                <Button className="ml-auto">
                    <Link to={'trash'}>
                        <FaTrash style={{ fontSize: '20', display: 'block' }} />
                    </Link>
                </Button>
            </div>
            <div className="overflow-x-auto drop-shadow-xl rounded-lg">
                <Table
                    onChange={handleChange}
                    dataSource={filteredData}
                    columns={columns}
                    pagination={{ defaultPageSize: 6 }}
                    rowKey="key"
                />
            </div>
        </div>
    );
};

export default CustomProductslist;
