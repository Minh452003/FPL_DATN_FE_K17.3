import { useGetProductsDeleteQuery, useRemoveForceProductMutation, useRestoreProductMutation } from '@/api/productApi';
import { Image, Table, Button } from 'antd';
import { FaTrashCan, FaWrench, FaCirclePlus, FaTrash, FaProductHunt, FaWindowRestore } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useGetCategoryQuery } from '@/api/categoryApi';
import { useGetBrandQuery } from '@/api/brandApi';
import { useGetMaterialQuery } from '@/api/materialApi';
import Swal from 'sweetalert2';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';

const ProductTrash = () => {

  const { data }:any = useGetProductsDeleteQuery();
  const { data: categories } = useGetCategoryQuery<any>();
  const { data: brands } = useGetBrandQuery<any>();
  const { data: materials } = useGetMaterialQuery<any>();
  const [removeProduct, { isLoading: isRemoveLoading }] = useRemoveForceProductMutation();
  const [restoreProduct,{ isLoading: isRestoreLoading }] = useRestoreProductMutation()

  console.log(data);
  
  const products = data?.product;
  
  const category = categories?.category?.docs;
  const brand = brands?.brand;
  const material = materials?.material;
  const data1 = products?.map((product: any, index: number) => {
    return {
      key: product._id,
      STT: index + 1,
      name: product.product_name,
      price: product.product_price,
      category: product.categoryId,
      brand: product.brandId,
      materials: product.materialId,
      quantity: product.sold_quantity,
      image: <img width={50} src={product.image?.url} alt="" />
    }
  });
  const formatCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const deleteProduct = (id: any) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Khi xóa bạn không thể khôi phục lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        removeProduct(id).unwrap().then(() => {
          Swal.fire(
            'Xoá thành công!',
            'Sản phẩm của bạn đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Sản phẩm xoá thất bại :)',
          'error'
        )
      }
    })
  }
  const restoreProduct1 = (id: any) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "bạn có muốn khôi phục lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        restoreProduct(id).unwrap().then(() => {
          Swal.fire(
            'khôi phục thành công!',
            'Sản phẩm của bạn đã được khôi phục.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Sản phẩm xoá thất bại :)',
          'error'
        )
      }
    })
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT',
      render: (index: any) => <a>{index}</a>,
    },
    {
      title: 'Name',
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
      render: (price: any) => <p className='text-red-700'>{formatCurrency(price)}₫</p>,
    },
    {
      title: 'Đã bán',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Danh Mục',
      dataIndex: 'category',
      key: 'category',
      render: (record: any) => {
        const catename = category?.find((cate: any) => cate._id === record);
        return catename?.category_name
          ;
      }
    },
    {
      title: 'Chất liệu',
      dataIndex: 'materials',
      key: 'materials',
      render: (record: string) => {
        const materialname = material?.find((materials: any) => materials._id === record);
        return materialname?.material_name;
      }
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      key: 'brand',
      render: (record: string) => {
        const brandname = brand?.find((bra: any) => bra._id === record);
        return brandname?.brand_name
          ;
      }
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: any) => (
        <div style={{ width: '150px' }}>
          <Button className='mr-1 text-red-500' onClick={() => deleteProduct(_id)}>
            {isRemoveLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FaTrashCan />
            )}
          </Button>

          <Button className='mr-1 text-blue-500' onClick={() => restoreProduct1(_id)} >
            {isRestoreLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FaWindowRestore />
            )}
          </Button>

        </div>
      )
    }
  ];
  return (
    <div className="container">
      <h3 className="font-semibold">Danh sách sản phẩm đã xóa </h3>
      <div className="overflow-x-auto drop-shadow-xl rounded-lg">
        <Button className='m-2  float-right'><Link to={'trash'}><BiFoodMenu style={{ fontSize: '20', display: 'block' }} /></Link></Button>
        <Table dataSource={data1} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
      </div>
    </div>
  )
}

export default ProductTrash