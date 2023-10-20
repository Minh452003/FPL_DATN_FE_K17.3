import { useGetProductsQuery, useRemoveForceProductMutation } from '@/api/productApi';
import { Image, Table, Button, Popconfirm } from 'antd';
import { FaTrashCan, FaWrench, FaCirclePlus, FaTrash, FaProductHunt } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useGetCategoryQuery } from '@/api/categoryApi';
import { useGetColorsQuery } from '@/api/colorApi';
import { useGetBrandQuery } from '@/api/brandApi';
import { useGetMaterialQuery } from '@/api/materialApi';

const Productlist = () => {

  const { data } = useGetProductsQuery();
  const { data: categories } = useGetCategoryQuery<any>();
  const { data: colors } = useGetColorsQuery<any>();
  const { data: brands } = useGetBrandQuery<any>();
  const { data: materials } = useGetMaterialQuery<any>();
  const [removeForceProduct] = useRemoveForceProductMutation();





  const products = data?.product.docs;
  const category = categories?.category?.docs;
  const color = colors?.color;
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
      colors: product.colorsId,
      materials: product.materialId,
      quantity: product.sold_quantity,


      image: <img width={50} src={product.product?.url} alt="" />
    }
  });




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
      render: () => <Image src={"https://faha.vn/wp-content/uploads/2023/07/ban-ghe-cafe-ghe-cafe-dau-trau-gg01-6.jpg"} width={100} />
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
      title: 'Chất liệu',
      dataIndex: 'materials',
      key: 'materials',
      render: (record: string) => {
        const materialname = material?.find((materials: any) => materials._id === record);
        return materialname?.material_name

          ;
      }
    },

    {
      title: 'Màu Sắc',
      dataIndex: 'colors',
      key: 'colors',
      render: (record: string) => {
        const colorname = color?.find((corlors: any) => colors._id === record);
        return colorname?.colors_name
          ;
      }
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: any) => (
        <div >
          <Button className='mr-5 text-blue-500' ><Link to={`chill/${_id}`}><FaProductHunt /></Link></Button>
          <Button className='mr-5 text-blue-500' ><Link to={'edit/:id'}><FaWrench /></Link></Button>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Mày có chắc cmn chắn muốn xóa không??"
            onConfirm={() => removeForceProduct(_id)

            }
            okText="Có"
            cancelText="Không"
          >
            <Button className='text-red-500'><FaTrashCan /></Button>

          </Popconfirm>

        </div>
      )
    }

  ];
  return (
    <div className="container">
      <h3 className="font-semibold">Danh sách sản phẩm </h3>
      <div className="overflow-x-auto drop-shadow-xl rounded-lg">
        <Button className='m-2 text-3xl text-blue-500'><Link to={'add'}><FaCirclePlus style={{ fontSize: '24', display: 'block' }} /></Link></Button>
        <Button className='m-2  float-right'><Link to={''}><FaTrash style={{ fontSize: '20', display: 'block' }} /></Link></Button>
        <Table dataSource={data1} columns={columns} />
      </div>
    </div>
  )
}

export default Productlist