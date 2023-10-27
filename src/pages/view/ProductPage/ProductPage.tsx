import "../Home/Homepage.css";
import "../Home/Responsive_homepage.css";
import { useGetProductSellQuery } from '@/api/productApi';
import { Pagination } from '@mui/material';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6"
import { useState } from "react";
const ProductPage = () => {
  const { data: products, error, isLoading: isLoadingFetching }: any = useGetProductSellQuery();
  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");
  const formatCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  if (isLoadingFetching) return <Skeleton />;
  if (error) {
    if ("data" in error && "status" in error) {
      return (
        <div>
          {error.status} - {JSON.stringify(error.data)}
        </div>
      );
    }
  }
  const filteredProducts = products.filter((product: any) => {
    if (selectedPriceFilter === "all") {
      return true; // Hiển thị tất cả sản phẩm khi "Tất cả giá" được chọn
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

  return (
    <div className="px-6 lg:px-0 m-28">
      <div className="flex items-center pb-10">
        <div className="float-left"><a href="/" className="font-bold" style={{ textDecoration: 'none', color: "orange" }}>Trang Chủ</a></div>
        <FaArrowRight className="ml-2" />
        <div className="pl-2">Sản Phẩm</div>

      </div>
      <div className="mt-2 p-2 text-sm">Bộ lọc sản phẩm</div>
      <div className="mt-2 p-2 text-xs font-bold">giúp bạn tìm sản phẩm nhanh hơn</div>
      <div className="mt-2 p-2 flex ">
        <select id="small" className="block mr-4 p-2 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Nhà Sản Xuất</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <select id="small"
          value={selectedPriceFilter}
          onChange={(e) => setSelectedPriceFilter(e.target.value)}
          className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="all">Tất cả giá</option>
          <option value="100000-1000000">100.000-1.000.000</option>
          <option value="1000000-5000000">1.000.0000-5.000.000</option>
          <option value="5000000-10000000">5.000.000-10.000.000</option>
          <option value="10000000+">10.000.000+</option>
        </select>
        <select id="small" className="block p-2 mb-6 text-sm  text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Loại</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div>
        <div className="new_title lt clear_pd " style={{ width: "1255px" }}><h4><a href="/">Tất cả sản phẩm</a></h4></div>
        {/* --------------------------- List data products -------------------------- */}
        <div className="sock_slide slider-items slick_margin slick-initialized slick-slider">
          {/* filter theo giá sản phẩm  */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any, index: any) => (

              <div
                key={product._id}
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
                          to={''}
                          className="thumb flip"
                          title={product?.product_name}
                          tabIndex={0}
                        >
                          <img
                            className="lazyload loaded"
                            src={product.image?.url}
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
                            to={''}
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
                                  {formatCurrency(product.product_price)}₫
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
                            <Link to={''}>
                              Chi tiết
                            </Link>
                          </button>
                          <input type="hidden" tabIndex={0} />
                          <button
                            className="button btn-cart"
                            title="Mua hàng"
                            type="button"
                            tabIndex={0}
                          >
                            <Link to={''}>Mua hàng</Link>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>..................không có sản phẩm nào.</p>
          )}
        </div>


        {/* --------------------------- List data products -------------------------- */}


      </div>
      <div className='flex w-full py-4 justify-center '>
        <Pagination count={4} variant="outlined" shape="rounded" />
      </div>
    </div>

  );
};

export default ProductPage;
