import { Table, Button, Skeleton } from 'antd';
import { FaTrashCan } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai"

import './CartPage.css'
import { useGetCartsQuery, useRemoveProductInCartMutation } from '@/api/cartApi';
import Swal from 'sweetalert2';
import { useGetColorsQuery } from '@/api/colorApi';
import { useGetSizeQuery } from '@/api/sizeApi';
import { useGetMaterialQuery } from '@/api/materialApi';
const CartPage = () => {
    const { data: colors } = useGetColorsQuery<any>();
    const { data: sizes } = useGetSizeQuery<any>();
    const { data: materials } = useGetMaterialQuery<any>();
    const { data: carts, isLoading, error } = useGetCartsQuery("652f6d639bafb1d45da182e7");

    const [removeProductInCart, resultRemove] = useRemoveProductInCartMutation();

    const color = colors?.color;
    const size = sizes?.size;
    const material = materials?.material



    if (isLoading) return <Skeleton />;
    if (error) {
        if ("data" in error && 'status' in error) {
            <div>
                {error.status}-{JSON.stringify(error.data)}
            </div>
        }
    }
    const productsInCart = carts?.data.products;



    const deleteCart = (productId: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Xóa sản phẩm
                removeProductInCart({ userId: "652f6d639bafb1d45da182e7", productId: productId }).then(() => {                    
                    Swal.fire(
                        'Deleted!',
                        'Your cart has been deleted.',
                        'success'
                    )
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Hiển thị thông báo hủy xóa sản phẩm
                Swal.fire(
                    'Cancelled',
                    'Your cart is safe :)',
                    'error'
                )
            }
        })
        
    }


    const columns = [
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'image',
            key: 'image',
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
                // console.log('Size Data:', size); // Log dữ liệu size
                // console.log('SizeId:', record); // Log giá trị sizeId
                return sizename ? sizename.size_name : '';
            }
        },
        {
            title: 'Màu sắc',
            dataIndex: 'colorId',
            key: 'colorId',
            render: (record: any) => {
                const colorname = color?.find((color: any) => color._id === record);
                // console.log('Color Data:', color); // Log dữ liệu size
                // console.log('ColorId:', record); // Log giá trị sizeId
                return colorname ? colorname.colors_name : '';
            }
        },
        {
            title: 'Vật liệu',
            dataIndex: 'materialId',
            key: 'materialId',
            render: (record: any) => {
                const materialname = material?.find((material: any) => material._id === record);
                // console.log('material Data:', color); // Log dữ liệu size
                // console.log('materialId:', record); // Log giá trị sizeId
                return materialname ? materialname.material_name : '';
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'stock_quantity',
            key: 'stock_quantity',
        },
        {
            title: 'Giá Gốc',
            dataIndex: 'originalPrice',
            key: 'originalPrice',
            className: 'custom-total',
        },
        {
            title: 'Giá Sản phẩm',
            dataIndex: 'product_price',
            key: 'product_price',
            className: 'custom-total',
        },
        {
            title: 'Chức năng',
            render: (record: any) => (
                <div >
                    <Button onClick={() => deleteCart(record.productId)} className='text-red-500'>
                        
                        {resultRemove.isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin m-auto" />
                        ) : (
                            <FaTrashCan />
                        )}
                    </Button>
                    
                </div>
            )
        }
        
    ];

    return (

        <div className='bg-gray-100 container mx-auto'>
            {/* <div className="flex items-center ">
                <div className="float-left">Trang Chủ</div>
                <FaArrowRight className="ml-2" />
                <div className="pl-2">Giỏ hàng</div>
            </div> */}
            <h1 className='pt-10 pb-10'>Giỏ hàng của bạn</h1>
            <Table dataSource={productsInCart} columns={columns} className='custom-table' />
            <div className='pt-20 pb-10'>
                <button className="w-60 h-12  bg-slate-600 text-white font-bold ">TIẾP TỤC MUA HÀNG</button>
                <span className='float-right font-bold'>Tổng tiền : <Link to={'/'} className='pl-4  ' style={{ textDecoration: 'none', color: '#FF0606' }}>${carts.data.total}</Link></span>
            </div>
            <div className='pb-20'>
                <button className="w-60 h-12   bg-slate-600 text-white font-bold float-right "><Link style={{ textDecoration: "none", color: "white" }} to={'/pay'}>TIẾN HÀNH THANH TOÁN</Link></button>
            </div>

        </div>


    )

}


export default CartPage