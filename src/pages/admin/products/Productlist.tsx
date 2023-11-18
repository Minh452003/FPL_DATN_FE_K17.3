import {
  useGetProductsQuery,
  useRemoveProductMutation,
} from "@/api/productApi";
import { Table, Button, Input } from "antd";
import {
  FaTrashCan,
  FaWrench,
  FaCirclePlus,
  FaTrash,
  FaProductHunt,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetCategoryQuery } from "@/api/categoryApi";
import { useGetBrandQuery } from "@/api/brandApi";
import { useGetMaterialQuery } from "@/api/materialApi";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import "./productAdmin.css";
import { IoSearchSharp } from "react-icons/io5";
const Productlist = () => {
  const { data, isLoading: isLoadingProducts } = useGetProductsQuery();
  const { data: categories } = useGetCategoryQuery<any>();
  const { data: brands } = useGetBrandQuery<any>();
  const { data: materials } = useGetMaterialQuery<any>();
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [removeProduct, { isLoading: isRemoveLoading }] =
    useRemoveProductMutation();
  const products = isLoadingProducts ? [] : data?.product.docs;
  const category = categories?.category?.docs;
  const brand = brands?.brand;
  const material = materials?.material;
  const [sortedInfo, setSortedInfo] = useState({} as any);
  const [searchText, setSearchText] = useState("");
  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
  };
  const filteredProducts = products.filter((product: any) => {
    const categoryMatches =
      selectedCategory === "all" || product.categoryId === selectedCategory;
    const brandMatches =
      selectedBrand === "all" || product.brandId === selectedBrand;

    const priceFilterMatches =
      selectedPriceFilter === "all" ||
      (selectedPriceFilter === "100000-1000000" &&
        product.product_price >= 100000 &&
        product.product_price <= 1000000) ||
      (selectedPriceFilter === "1000000-5000000" &&
        product.product_price >= 1000000 &&
        product.product_price <= 5000000) ||
      (selectedPriceFilter === "5000000-10000000" &&
        product.product_price >= 5000000 &&
        product.product_price <= 10000000) ||
      (selectedPriceFilter === "10000000+" &&
        product.product_price >= 10000000);

    const searchMatches =
      searchText === "" ||
      product.product_name.toLowerCase().includes(searchText.toLowerCase());

    return (
      categoryMatches && brandMatches && priceFilterMatches && searchMatches
    );
  });
  const data1 = filteredProducts?.map((product: any, index: number) => {
    return {
      key: product._id,
      STT: index + 1,
      name: product.product_name,
      price: product.product_price,
      category: product.categoryId,
      brand: product.brandId,
      materials: product.materialId,
      quantity: product.sold_quantity,
      image: <img width={50} src={product.image[0]?.url} alt="" />,
    };
  });
  const formatCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const deleteProduct = (id: any) => {
    Swal.fire({
      title: "Bạn chắc chứ?",
      text: "Khi có thể vào thùng rác để khôi phục lại!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, tôi chắc chắn!",
      cancelButtonText: "Huỷ",
    }).then((result) => {
      if (result.isConfirmed) {
        removeProduct(id)
          .unwrap()
          .then(() => {
            Swal.fire(
              "Xoá thành công!",
              "Sản phẩm của bạn đã được xoá.",
              "success"
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire("Thất bại", "Sản phẩm xoá thất bại.", "error");
      }
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      render: (index: any) => <a>{index}</a>,
      sorter: (a: any, b: any) => a.STT - b.STT, // Sắp xếp theo STT
      sortOrder: sortedInfo.columnKey === "STT" && sortedInfo.order,
      ellipsis: true,
      width: 90, // Điều chỉnh chiều rộng của cột "STT"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <a>{text}</a>,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name), // Sắp xếp theo Name
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
      width: 200, // Điều chỉnh chiều rộng của cột "STT"
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 100, // Điều chỉnh chiều rộng của cột "STT"
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 100, // Điều chỉnh chiều rộng của cột "STT"

      render: (price: any) => (
        <p className="text-red-700">{formatCurrency(price)}₫</p>
      ),
      sorter: (a: any, b: any) => a.price - b.price, // Sắp xếp theo giá
      sortOrder: sortedInfo.columnKey === "price" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Đã bán",
      dataIndex: "quantity",
      key: "quantity",
      width: 100, // Điều chỉnh chiều rộng của cột "STT"

      render: (text: any) => <a>{text}</a>,
      sorter: (a: any, b: any) => a.quantity - b.quantity, // Sắp xếp theo số lượng đã bán
      sortOrder: sortedInfo.columnKey === "quantity" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Danh Mục",
      dataIndex: "category",
      key: "category",
      width: 100, // Điều chỉnh chiều rộng của cột "STT"

      render: (record: any) => {
        const catename = category?.find((cate: any) => cate._id === record);
        return catename?.category_name;
      },
    },
    {
      title: "Chất liệu",
      dataIndex: "materials",
      key: "materials",
      width: 100, // Điều chỉnh chiều rộng của cột "STT"

      render: (record: string) => {
        const materialname = material?.find(
          (materials: any) => materials._id === record
        );
        return materialname?.material_name;
      },
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
      width: 100, // Điều chỉnh chiều rộng của cột "STT"

      render: (record: string) => {
        const brandname = brand?.find((bra: any) => bra._id === record);
        return brandname?.brand_name;
      },
    },
    {
      title: "Chức năng",
      width: 200, // Điều chỉnh chiều rộng của cột "STT"
      render: ({ key: _id }: any) => (
        <div style={{ width: "150px" }}>
          <Button
            className="mr-1 text-red-500"
            onClick={() => deleteProduct(_id)}
          >
            {isRemoveLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <FaTrashCan />
            )}
          </Button>
          <Button className="mr-1 text-blue-500">
            <Link to={`/admin/products/edit/${_id}`}>
              <FaWrench />
            </Link>
          </Button>
          <Button className="mr-1 text-blue-500">
            <Link to={`childProduct/${_id}`}>
              <FaProductHunt />
            </Link>
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="table-container">
      <h3 className="font-semibold">Danh sách sản phẩm </h3>
      <div className="mt-2 p-2 flex ">
        <select
          id="small"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          //...
        >
          <option value="all">Tất cả danh mục</option>
          {categories?.category?.docs.map((category: any) => (
            <option key={category._id} value={category._id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <select
          id="small"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          //...
        >
          <option value="all">Tất cả thương hiệu</option>
          {brands?.brand?.map((brand: any) => (
            <option key={brand._id} value={brand._id}>
              {brand.brand_name}
            </option>
          ))}
        </select>
        <select
          id="small"
          value={selectedPriceFilter}
          onChange={(e) => setSelectedPriceFilter(e.target.value)}
          className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          //...
        >
          <option value="all">Tất cả giá</option>
          <option value="100000-1000000">100.000-1.000.000</option>
          <option value="1000000-5000000">1.000.0000-5.000.000</option>
          <option value="5000000-10000000">5.000.000-10.000.000</option>
          <option value="10000000+">10.000.000+</option>
        </select>
      </div>
      <div className="flex overflow-x-auto drop-shadow-xl rounded-lg items-center">
        <Button className="m-2 text-3xl text-blue-500">
          <Link to={"add"}>
            <FaCirclePlus style={{ fontSize: "24", display: "block" }} />
          </Link>
        </Button>

        <Input
          className="m-2"
          prefix={<IoSearchSharp style={{ opacity: 0.5 }} />}
          placeholder="Tìm kiếm tên sản phẩm..."
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: "16px", borderRadius: "5px", width: "400px" }}
        />
        <Button className="ml-auto">
          <Link to={"trash"}>
            <FaTrash style={{ fontSize: "20", display: "block" }} />
          </Link>
        </Button>
      </div>

      <Table
        onChange={handleChange}
        dataSource={data1}
        columns={columns}
        pagination={{ defaultPageSize: 6 }}
        rowKey="key"
      />
    </div>
  );
};

export default Productlist;
