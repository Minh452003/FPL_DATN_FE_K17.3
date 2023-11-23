

import { useGetCustomProductsQuery, useRemoveCustomProductMutation } from '@/api/CustomizedProductAPI';
import { useGetUsersQuery } from '@/api/authApi';
import { useGetCategoryQuery } from '@/api/categoryApi';
import { useGetColorsQuery } from '@/api/colorApi';
import { useGetMaterialQuery } from '@/api/materialApi';
import { useGetSizeQuery } from '@/api/sizeApi';
import { Table, Button } from 'antd';
import { FaTrashCan, FaCirclePlus, FaTrash } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Swal from 'sweetalert2';
const CustomProductslist = () => {
  const { data: listcustomProducts } = useGetCustomProductsQuery<any>()
  const { data: colors } = useGetColorsQuery<any>()
  const { data: materials } = useGetMaterialQuery<any>()
  const { data: users } = useGetUsersQuery<any>()
  const { data: categories } = useGetCategoryQuery<any>()
  const { data: size } = useGetSizeQuery<any>()
  const [removeProduct, resultAdd] = useRemoveCustomProductMutation();
  const productscustomproducts = listcustomProducts?.customProduct
  const color = colors?.color
  const material = materials?.material
  const user = users?.data
  const categorie = categories?.category?.docs
  const sizes = size?.size


  const data1 = productscustomproducts?.map((product: any, index: number) => {
    return {
      key: product._id,
      STT: index + 1,
      name: product.product_name,
      price: product.product_price,
      category: product.categoryId,
      materials: product.materialId,
      color: product.colorId,
      user: product.userId,
      sizes: product.sizeId,
      quantity: product.stock_quantity,
      image: <img width={50} src={product.image[0]?.url} alt="" />
    }
  });
  const formatCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const deleteProduct = (id: any) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Khi có thể vào thùng rác để khôi phục lại!",
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
            'Sản phẩm tự thiết kế đã được xoá.',
            'success'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Đã huỷ',
          'Sản phẩm tự thiết kế chưa được xoá.',
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
      title: 'Tên khách hàng ',
      dataIndex: 'user',
      key: 'user',
      render: (record: any) => {
        const username = user?.find((cate: any) => cate._id === record);
        return username?.first_name
          ;
      }
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
      render: (text: any) => <p className='text-red-700'>{formatCurrency(text)}₫</p>

    },
    {
      title: 'Số lượng mua',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Danh Mục',
      dataIndex: 'category',
      key: 'category',
      render: (record: any) => {
        const catename = categorie?.find((cate: any) => cate._id === record);
        return catename?.category_name;
      }
    },
    {
      title: 'Chất liệu',
      dataIndex: 'materials',
      key: 'materials',
      render: (record: any) => {
        const materialsname = material?.find((cate: any) => cate._id === record);
        return materialsname?.material_name;
      }
    },
    {
      title: 'Kích cỡ ',
      dataIndex: 'sizes',
      key: 'sizes',
      render: (record: any) => {
        const sizesrname = sizes?.find((cate: any) => cate._id === record);
        return sizesrname?.size_name;
      }
    },
    {
      title: 'Màu ',
      dataIndex: 'color',
      key: 'color',
      render: (record: any) => {
        const colorname = color?.find((cate: any) => cate._id === record);
        return colorname?.colors_name;
      }
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: any) => (
        <div style={{ width: '80px' }}>
          <Button className='mr-1 text-red-500' onClick={() => deleteProduct(_id)}>
            {resultAdd.isLoading ? (
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
    <div className="container">
      <h3 className="font-semibold">Danh sách sản phẩm thiết kế</h3>
      <div className="overflow-x-auto drop-shadow-xl rounded-lg">
        <Button className='m-2 text-3xl text-blue-500'><Link to={'add'}><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link></Button>
        <Button className='m-2  float-right'><Link to={'trash'}><FaTrash style={{ fontSize: '20', display: 'block' }} /></Link></Button>
        <Table dataSource={data1} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
      </div>
    </div>
  )
}

export default CustomProductslist