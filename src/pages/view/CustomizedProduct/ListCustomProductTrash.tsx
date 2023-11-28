import { useGetAllCustomProductDeleteQuery, useRemoveForceCustomProductMutation, useRestoreCustomProductMutation } from "@/api/CustomizedProductAPI";
import { getDecodedAccessToken } from "@/decoder";
import Swal from 'sweetalert2';
import { Pagination } from "@mui/material";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";

const ListCustomizedProductTrash = () => {
  const decodedToken: any = getDecodedAccessToken();
  const id = decodedToken ? decodedToken.id : null;
  const {
    data: customProduct,
    error,
    isLoading: isLoadingFetching,
  } = useGetAllCustomProductDeleteQuery<any>(id);
  const [removeCustomizedProduct] = useRemoveForceCustomProductMutation();
  const [restoreCustomizedProduct] = useRestoreCustomProductMutation();
  const CustomizedProduct = customProduct?.product || [];
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");

  const restoreProduct = (id: any) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: 'Bạn có chắc muốn khôi phục lại!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi chắc chắn!',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        restoreCustomizedProduct(id).unwrap().then(() => {
          Swal.fire(
            'khôi phục thành công!',
            'Sản phẩm của bạn đã được khôi phục.',
            'success'
          );
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Thất bại',
          'Sản phẩm khôi phục thất bại.',
          'error'
        );
      }
    });
  };
  const deleteProduct = (id: any) => {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: 'Khi xóa bạn không thể khôi phục lại!',
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
    if (false) {
      console.log(event);
    }
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
      <div className="flex items-center mb-20">
        <div className="float-left py-2">
          <Link
            to="/"
            className="font-bold text-black no-underline"

          >
            Trang Chủ
          </Link>
        </div>
        <div className="px-2">
          <FaArrowRight className="" />
        </div>
        <div className="py-3 font-semibold"><Link className="no-underline text-black" to={"/customizedProducts"}>Sản phẩm tự thiết kế</Link></div>
        <div className="px-2">
          <FaArrowRight className="" />
        </div>
        <div className="py-3 font-semibold ">Kho lưu trữ</div>
      </div>

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
      <div>
        <div className="new_title lt clear_pd " style={{ width: "1255px" }}>
          <h4>
            <a href="/">Kho lữu trữ</a>
          </h4>
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
                                </span>{" "}
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
                          >
                            <Link to={""}>Mua hàng</Link>
                          </button>
                          <button
                            className="button btn-cart"
                            title="xóa sản phẩm"
                            type="button"
                            tabIndex={0}
                            onClick={() => deleteProduct(product._id)}
                          >
                            <Link to={""}>xóa sản phẩm</Link>
                          </button>
                          <button
                            className="button btn-cart"
                            title="khôi phục sản phẩm"
                            type="button"
                            tabIndex={0}
                            onClick={() => restoreProduct(product._id)}
                          >
                            <Link to={"/customizedProducts"}>khôi phục</Link>
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

export default ListCustomizedProductTrash;
