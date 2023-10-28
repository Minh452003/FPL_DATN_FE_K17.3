import { useGetCustomizedproductsByUserIdQuery } from "@/api/CustomizedProductAPI";
import { getDecodedAccessToken } from "@/decoder";

import { Pagination } from "@mui/material";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";
const ListCustomizedProduct = () => {
  const decodedToken: any = getDecodedAccessToken();
  const id = decodedToken ? decodedToken.id : null;
  const {
    data: customProduct,
    error,
    isLoading: isLoadingFetching,
  } = useGetCustomizedproductsByUserIdQuery<any>(id);
  const CustomizedProduct = customProduct?.products;
  console.log("haha",CustomizedProduct);
  
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
      <div>
        {error.status}-{JSON.stringify(error.data)}
      </div>;
    }
  }
  const formatCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="px-6 lg:px-0 m-28 pt-20">
      <div>
        <div className="new_title lt clear_pd " style={{ width: "1255px" }}>
          <h4>
            <a href="/">Sản phẩm thiết kế </a>
          </h4>
        </div>
        {/* --------------------------- List data products -------------------------- */}
        <div className="sock_slide slider-items slick_margin slick-initialized slick-slider">
          {CustomizedProduct.length > 0 ? (
            CustomizedProduct.map((product: any, index: any) => (
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
      <div className="flex w-full py-4 justify-center ">
        <Pagination count={4} variant="outlined" shape="rounded" />
      </div>
    </div>
  );
};

export default ListCustomizedProduct;
