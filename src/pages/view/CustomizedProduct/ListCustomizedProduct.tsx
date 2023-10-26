

import { useGetCustomizedproductsByUserIdQuery } from '@/api/CustomizedProductAPI';
import { getDecodedAccessToken } from '@/decoder';
import { Table,Skeleton, Image } from 'antd';

import { useGetColorsQuery } from '@/api/colorApi';
import { useGetSizeQuery } from '@/api/sizeApi';
import { useGetMaterialQuery } from '@/api/materialApi';



const ListCustomizedProduct = () => {
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;
    const { data:customProduct, error, isLoading: isLoadingFetching }= useGetCustomizedproductsByUserIdQuery<any>(id);
    const { data: colors } = useGetColorsQuery<any>();
    const { data: sizes } = useGetSizeQuery<any>();
    const { data: materials } = useGetMaterialQuery<any>();
    const color = colors?.color;
    const size = sizes?.size;
    const material = materials?.material
    const CustomizedProduct = customProduct?.products
    if (!id) {
        return (
            <div>
                <p>Bạn chưa đăng nhập</p>
            </div>
        );
    }
    if (!customProduct ) {
        return <p>Không có sản phẩm  </p>;
    }
    if (isLoadingFetching) return <Skeleton />;
    if (error) {
        if ("customProduct" in error && 'status' in error) {
            <div>
                {error.status}-{JSON.stringify(error.data)}
            </div>
        }
    }
    const formatCurrency = (number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    const columns = [
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'image',
            key: 'image',
            render: (image: any) => <Image width={130} src={image?.url} />
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
            key: 'product_name',
            className: 'custom-name',
        },
        {
            title: 'Kích thước',
            dataIndex: 'sizeId',
            key: 'sizeId',
            render: (record: any) => {
                const sizename = size?.find((size: any) => size._id === record);
                return sizename ? sizename.size_name : '';
            }
        },
        {
            title: 'Màu sắc',
            dataIndex: 'colorId',
            key: 'colorId',
            render: (record: any) => {
                const colorname = color?.find((color: any) => color._id === record);
                return colorname ? colorname.colors_name : '';
            }
        },
        {
            title: 'Vật liệu',
            dataIndex: 'materialId',
            key: 'materialId',
            render: (record: any) => {
                const materialname = material?.find((material: any) => material._id === record);
                return materialname ? materialname.material_name : '';
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'stock_quantity',
            key: 'stock_quantity',
        },
        {
            title: 'Giá Sản phẩm',
            dataIndex: 'product_price',
            key: 'product_price',
            className: 'custom-total',
            render: (price: any) => <p>{formatCurrency(price)}₫</p>
        },
    

    ];


  return (
    <div className='bg-gray-100 container mx-auto'>
   
    <h1 className='pt-10 pb-10'>Sản phẩm tự thiết kế của bạn</h1>
    <Table dataSource={CustomizedProduct} columns={columns} className='custom-table' rowKey={(record) => record.productId} />
</div>
  )
}

export default ListCustomizedProduct