
import { useGetChildProductByProductIdQuery, useRemovecChildProductMutation } from '@/api/chilProductApi';
import { useGetColorsQuery } from '@/api/colorApi';
import { useGetProductByIdQuery } from '@/api/productApi';
import { useGetSizeQuery } from '@/api/sizeApi';
import { IChildProduct } from '@/interfaces/childProduct';
import { Image, Table, Button } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaTrashCan, FaWrench, FaCirclePlus, FaTrash } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
const ListproductChill = () => {
  const { productId }: any = useParams<string>();
  const { data }: any = useGetChildProductByProductIdQuery<IChildProduct>(productId);
  const { data: colors } = useGetColorsQuery<any>();
  const { data: sizes } = useGetSizeQuery<any>()
  const [RemoveChillproduct, { isLoading: isRemoveLoading }] = useRemovecChildProductMutation();
  const { data: productData }: any = useGetProductByIdQuery(productId);
  const products = data?.products
  const color = colors?.color;
  const size = sizes?.size

  const data1 = products?.map((product: any, index: number) => {
    return {
      key: product._id,
      STT: index + 1,
      price: product.product_price,
      colors: product.colorId,
      sizes: product.sizeId,
      materials: product.materialId,
      quantity: product.stock_quantity,
      image: <img width={50} src={product.product?.url} alt="" />
    }
  });

  const deleteChillProduct = async (id: any) => {
    try {
      const result = await Swal.fire({
        title: 'Bạn chắc chứ?',
        text: 'bạn có chắc chắn muốn xóa',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vâng, tôi chắc chắn!',
        cancelButtonText: 'Huỷ',
      });
  
      if (result.isConfirmed) {
        const data: any = await RemoveChillproduct(id).unwrap();
        if (data) {
          toast.success(`${data.message}`);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.info('Sản phẩm thiết kế xoá thất bại');
      }
    } catch (error:any) {
      toast.error(error.message);
    }
   
  }
  const formatCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT',
      render: (index: any) => <a>{index}</a>,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: () => <Image src={productData?.product?.image[0]?.url} width={100} />
    },
    {
      title: 'Kích cỡ',
      dataIndex: 'sizes',
      key: 'sizes',
      render: (record: any) => {
        const sizesname = size?.find((s: any) => s._id == record);
        return sizesname?.size_name
          ;
      }
    }
    ,
    {
      title: 'Màu Sắc',
      dataIndex: 'colors',
      key: 'colors',
      render: (record: string) => {
        const colorname = color?.find((colors: any) => colors._id === record);
        return colorname?.colors_name
          ;
      }
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: any) => <p className="text-red-700">{formatCurrency(price)}₫</p>
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: { key: number | string }) => (
        <div style={{ width: '150px' }}>
          <Button className='mr-1 text-red-500' onClick={() => deleteChillProduct(_id)}>
            {isRemoveLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FaTrashCan />
            )}
          </Button>
          <Button className='mr-1 text-blue-500'>
            <Link to={`/admin/products/childProduct/${_id}/edit`}><FaWrench /></Link>
          </Button>
        </div>
      ),

    }

  ];
  return (
    <div className="container">
      <h3 className="font-semibold">{productData?.product?.product_name}</h3>
      <div className="overflow-x-auto drop-shadow-xl rounded-lg">
        <Button className='mr-5 text-blue-500'><Link to={`/admin/products/childProduct/add/${productId}`}><FaCirclePlus /></Link></Button>
        <Button className='m-2  float-right'><Link to={''}><FaTrash style={{ fontSize: '20', display: 'block' }} /></Link></Button>
        {data1 && data1.length > 0 ? (
          <Table dataSource={data1} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
        ) : (
          <p className='text-red-500 text-center py-4'>Không có sản phẩm thiết kế nào.</p>
        )}
      </div>
    </div>
  )
}

export default ListproductChill
