import { useGetCustomizedproductsByIdQuery, useGetCustomizedproductsByUserIdQuery, useRemoveCustomProductMutation } from "@/api/CustomizedProductAPI";
import { getDecodedAccessToken } from "@/decoder";
import Swal from 'sweetalert2';
import { Pagination } from "@mui/material";
import { Button, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import "./ListCustomizedProduct.css"
import { useAddCartMutation } from "@/api/cartApi";
const ListCustomizedProduct = () => {
  const decodedToken: any = getDecodedAccessToken();
  const id = decodedToken ? decodedToken.id : null;
  const {
    data: customProduct,
    error,
    isLoading: isLoadingFetching,
  } = useGetCustomizedproductsByUserIdQuery<any>(id);
  const [removeCustomizedProduct] = useRemoveCustomProductMutation();
  const CustomizedProduct = customProduct?.products || [];
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");
  const { data }: any = useGetCustomizedproductsByIdQuery(id || "");
  const customProducts = data?.product;
  const idUser = decodedToken ? decodedToken.id : null;
  const [addCart, resultAdd] = useAddCartMutation();

  // ADD to cart custom-Product
  const handleAddToCart = () => {
    if (customProducts && idUser) {
      const sizeId = customProducts.sizeId;
      const colorId = customProducts.colorId;
      const materialId = customProducts.materialId;
      const cartData: any = {
        productId: customProducts._id,
        product_name: customProducts.product_name,
        product_price: customProducts?.product_price,
        image: customProducts.image[0]?.url,
        stock_quantity: customProducts.stock_quantity,
        colorId: colorId,
        sizeId: sizeId,
        materialId: materialId,
      };
      Swal.fire({
        title: "Bạn chắc chứ?",
        text: "Sản phẩm sẽ được thêm vào giỏ hàng!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng, tôi chắc chắn!",
        cancelButtonText: "Huỷ",
      }).then((result) => {
        if (result.isConfirmed) {
          // Xóa sản phẩm
          addCart({ data: cartData, userId: idUser }).then((response: any) => {
            if (response.error) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: response.error.data.message,
                showConfirmButton: true,
                timer: 1500,
              });
            } else {
              Swal.fire(
                "Sản phẩm đã được thêm vào giỏ hàng",
                "Bạn có thể vào giỏ hàng để xem.",
                "success"
              );
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Hiển thị thông báo hủy xóa sản phẩm
          Swal.fire("Huỷ", "Sản phẩm không được thêm vào giỏ hàng", "error");
        }
      });
    }
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
        // Assuming your delete mutation is asynchronous and successful
        removeCustomizedProduct(id).unwrap().then(() => {
          // Remove the deleted product from the cache and refetch data
          Swal.fire(
            'Xoá thành công!',
            'Sản phẩm của bạn đã được xoá.',
            'success'
          );
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Thất bại',
          'Sản phẩm xoá thất bại.',
          'error'
        );
      }
    });
  };
  const filteredProducts = CustomizedProduct.filter((product: any) => {
    if (selectedPriceFilter === "all") {
      return true; // Trả về tất cả sản phẩm nếu không có bộ lọc giá được chọn
    } else if (selectedPriceFilter === "100000-1000000") {
      return product.product_price >= 100000 && product.product_price <= 1000000;
    } else if (selectedPriceFilter === "1000000-5000000") {
      return product.product_price >= 1000000 && product.product_price <= 5000000;
    } else if (selectedPriceFilter === "5000000-10000000") {
      return product.product_price >= 5000000 && product.product_price <= 10000000;
    } else if (selectedPriceFilter === "10000000+") {
      return product.product_price >= 10000000;
    }
  });
  console.log(CustomizedProduct);
  console.log(selectedPriceFilter);

  //  Phân trang........................
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);
  const handlePageChange = (event: any, page: any) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    // if (false) {
    //   console.log(event);
    // }
  };

  const formatCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if (!id) {
    return (
      <div>
        <p>Bạn chưa đăng nhập</p>
      </div>
    );
  }
  if (!customProduct) {
    return <p>Không có sản phẩm </p>;
  }
  if (isLoadingFetching) return <Skeleton />;
  if (error) {
    if ("customProduct" in error && "status" in error) {
      return (
        <div>
          {error.status}-{JSON.stringify(error.data)}
        </div>
      );
    }
  }

  return (
    <div className="px-6 lg:px-0 ml-28 ">
      <div className="flex items-center my-4 px-3">
        <div className="float-left font-bold">Trang Chủ</div>
        <FaArrowRight className="ml-2" />
        <div className="pl-2">Sản phẩm tự thiết kế</div>
      </div>
      <div>
        <select
          id="small"
          value={selectedPriceFilter}
          onChange={(e) => setSelectedPriceFilter(e.target.value)}
          className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //...
        >
          <option value="all">Tất cả giá</option>
          <option value="100000-1000000">100.000đ - 1.000.000đ</option>
          <option value="1000000-5000000">1.000.0000đ - 5.000.000đ</option>
          <option value="5000000-10000000">5.000.000đ - 10.000.000đ</option>
          <option value="10000000+">10.000.000đ </option>
        </select>
        <div className="new_title lt clear_pd " style={{ width: "1255px" }}>
          <h4>
            <a href="/">Sản phẩm thiết kế </a>
          </h4>
          <Button className='m-2 ml-10  float-right'><Link to={'trash'}><FaTrash style={{ fontSize: '20', display: 'block' }} /></Link></Button>
        </div>

        <div className="sock_slide slider-items slick_margin slick-initialized slick-slider">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product: any, index: any) => (
              <div
                key={product?._id}
                className="item slick-slide slick-current slick-active mt-10"
                tabIndex={-1}
                role="option"
                aria-describedby={`slick-slide${index + 10}`}
                style={{ width: "273px" }}
                data-slick-index={`${index}`}
                aria-hidden="false"
              >
                <div className="col-item1 ">
                  <div className="sale-label sale-top-right">
                    <span>Hot</span>
                  </div>
                  <div className="item-inner">
                    <div className="product-wrapper">
                      <div className="thumb-wrapper">
                        <Link
                          to={""}
                          className="thumb flip"
                          title={product?.product_name}
                          tabIndex={0}
                        >
                          <img
                            className="lazyload "
                            src={product.image[0]?.url}
                            alt={product?.product_name}
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <h3 className="item-title">
                          {" "}
                          <Link
                            to={""}
                            title={product?.product_name}
                            tabIndex={0}
                          >
                            {product?.product_name}
                          </Link>{" "}
                        </h3>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box">
                              <span className="regular-price">
                                {" "}
                                <span className="price">
                                  {formatCurrency(product?.product_price)}₫
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="actions hidden-xs hidden-sm remove_html">
                        <form>
                          <button
                            className="button btn-cart btn-more"
                            title="Chi tiết sản phẩm"
                            type="button"
                            tabIndex={0}
                          >
                            <Link to={`/customized-products/${product?._id}`}>Chi tiết</Link>
                          </button>
                          <input type="hidden" tabIndex={0} />
                          <button
                            className="button btn-cart"
                            title="Mua hàng"
                            type="button"
                            tabIndex={0}
                            onClick={handleAddToCart}
                          >
                            <Link to={`customized/${product?._id}/add`}>Mua hàng</Link>
                          </button>
                          <button
                            className="button btn-cart"
                            title="Xóa sản phẩm"
                            type="button"
                            tabIndex={0}
                            onClick={() => deleteProduct(product._id)}
                          >
                            <Link to={"/customizedProducts/trash"}>Xóa sản phẩm</Link>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
        </div>
      </div>
      <div className="flex w-full py-4 justify-center ">
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default ListCustomizedProduct;
