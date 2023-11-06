import React, { useState } from "react";
import { Button, Pagination, Skeleton } from "antd";
import { Link, useParams } from "react-router-dom";
import { useGetCategoryQuery } from "@/api/categoryApi";
import { useGetProductsQuery } from "@/api/productApi";
import { IProduct } from "@/interfaces/product";
import Model from "@/components/Model";
import "../Home/Homepage.css";
import "../Home/Responsive_homepage.css";

const Category_Detail = () => {
    const { id } = useParams();
  const { data: products, error, isLoading: isLoadingFetching } = useGetProductsQuery();
  const { data: categories } = useGetCategoryQuery();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(id);

  const handleCategoryClick = (categoryId: any) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const filteredProducts = products?.product?.docs.filter(
    (item: IProduct) => selectedCategory === null || item.categoryId === selectedCategory
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const formatCurrency = (number: any) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const hasProducts = filteredProducts && filteredProducts.length > 0;

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

  return (
    <div
      style={{ height: hasProducts ? "800px" : "400px", marginTop: "-152px", marginLeft: "16px" }}
      className={`category-detail-container ${hasProducts ? "" : "no-products"}`}
    >
      <div className="px-6 lg:px-0 m-28">
        <div className="flex items-center pb-10">
          <div className="float-left">
            <div className="sock_slide slider-items slick_margin slick-initialized slick-slider">
              {hasProducts && filteredProducts?.slice(startIndex, endIndex).map((product: IProduct) => (
                <div
                  key={product._id}
                  className="item slick-slide slick-current slick-active mt-10"
                  tabIndex={-1}
                  role="option"
                  aria-describedby={`slick-slide`}
                  style={{ width: "273px" }}
                  data-slick-index={``}
                  aria-hidden="false"
                >
                  <div className="col-item1">
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
                              <Link to={`/products/${product._id}`}>
                                Chi tiết
                              </Link>
                            </button>
                            <input type="hidden" tabIndex={0} />
                            <Model products={product} />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
              <p style={{marginTop: "280px"}}>Không có sản phẩm nào.</p>
            )}
            </div>
          </div>
          {hasProducts && (
            <div style={{ marginLeft: "-718px", marginTop: "700px" }}>
              <Pagination
                className="float-right"
                current={currentPage}
                total={filteredProducts?.length || 0}
                pageSize={itemsPerPage}
                onChange={handleChangePage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category_Detail