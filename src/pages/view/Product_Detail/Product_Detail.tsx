import { FaArrowRight, FaChevronRight } from "react-icons/fa";
import "./Product_detail.css";
import "./Responsive_Product_Detail.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/api/productApi";
import { useGetBrandQuery } from "@/api/brandApi";
import { useGetCategoryQuery } from "@/api/categoryApi";
import { useGetMaterialQuery } from "@/api/materialApi";
import { Skeleton } from "antd";
import { useState } from "react";

const Product_Detail = () => {
  const { idProduct }: any = useParams();
  const { data, isLoading: isLoadingFetching, error }: any = useGetProductByIdQuery(idProduct || "");
  const [quantity, setQuantity] = useState(1); // Sử dụng useState để quản lý số lượng
  const listOneData = data?.product;
  // --------------------------
  const { data: brand }: any = useGetBrandQuery();
  const brandList = brand?.brand;
  const brandListOne = brandList?.find(
    (brandList: any) => brandList?._id === listOneData?.brandId
  )?.brand_name;
  // -------------------------
  const { data: catgory }: any = useGetCategoryQuery();
  const categoryLish = catgory?.category.docs;
  const categoryLishOne = categoryLish?.find(
    (categoryLish: any) => categoryLish?._id === listOneData?.categoryId
  )?.category_name;
  // --------------------------
  const { data: material }: any = useGetMaterialQuery();
  const materialList = material?.material;
  const materialLishOne = materialList?.find(
    (materialList: any) => materialList?._id === listOneData?.materialId
  )?.material_name;
  const formatCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Cập nhật số lượng
    }
  }
  const increaseQuantity = () => {
    setQuantity(quantity + 1); // Cập nhật số lượng
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
  return (
    <div className="container_swap">
      <div className="container">
        <div className="flex items-center ml-16">
          <div className="float-left font-bold">Trang Chủ</div>
          <FaArrowRight className="ml-2" />
          <div className="pl-2 font-bold">{categoryLishOne}</div>
          <FaArrowRight className="ml-2" />
          <div className="pl-2 font-bold">{listOneData?.product_name}</div>
        </div>
        <div className="content">
          <div className="flex">
            <h3 className="font-bold pt-10 pl-52 iklm">
              {listOneData?.product_name}
            </h3>
            <p className="price">{formatCurrency(listOneData?.product_price)}₫</p>
          </div>
          <div className="grid grid-cols-2 gap-2 np">
            <img
              className="product-image"
              src={listOneData?.image.url}
              alt=""
            />
            <div className="product-text">
              <div className="col-span-2 flex mt-4 ef">
                <div className="text1">Tình trạng:</div>
                <div className="text2 pl-10 lp">Còn hàng</div>
              </div>
              <div className="col-span-2 flex ef">
                <div className="text1">Đã bán:  </div>
                <div className="text2 pl-16 lp">{listOneData?.sold_quantity} chiếc</div>
              </div>
              <div className="col-span-2 flex ef">
                <div className="text1">Thương hiệu:</div>
                <div className="text2 pl-4 lp">{brandListOne}</div>
              </div>
              <div className="col-span-2 flex ef">
                <div className="text1">Loại:</div>
                <div className="text2 kj lp">{categoryLishOne}</div>
              </div>
              <div className="col-span-2 flex ef">
                <div className="text1">Chất liệu:</div>
                <div className="text2 pl-14 lp">{materialLishOne}</div>
              </div>
              <div className="color">
                <p>Màu sắc</p>
              </div>
              <div className="flex">
                <img className="image1" src={listOneData?.image.url} alt="" />
                <img className="image2" src={listOneData?.image.url} alt="" />
              </div>
              <div className="size">
                <p>Kích thước</p>
              </div>
              <div className="flex">
                <button
                  aria-label="M"
                  aria-disabled="false"
                  className="btn1 btn-solid-primary1 btn-a"
                >
                  M
                </button>
                <button
                  aria-label="X"
                  aria-disabled="false"
                  className="btn2 btn-solid-primary2 btn-b"
                >
                  X
                </button>
              </div>
              <br />
              <div className="flex">
                <button
                  aria-label="Decrease"
                  className="btn3 btn-solid-primary3 btn-c"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  className="btn4 btn-solid-primary4 btn-d mn"
                  aria-live="assertive"
                  aria-valuenow={1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <button
                  aria-label="Increase"
                  className="btn5 btn-solid-primary5 btn-e"
                  onClick={increaseQuantity}
                >
                  +
                </button>
                <button
                  type="button"
                  aria-disabled="false"
                  className="btn6 btn-solid-primary6 btn-f hl"
                >
                  MUA HÀNG
                </button>
                <button
                  type="button"
                  aria-disabled="false"
                  className="btn10 btn-solid-primary10 btn-p hq"
                >
                  TỰ THIẾT KẾ
                </button>
              </div>
            </div>
          </div>
          <div className="product-medium">
            <img
              className="image3"
              src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
              alt=""
            />
            <img
              className="image4"
              src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
              alt=""
            />
          </div>
          <div className="include ">
            <input type="radio" id="chi-tiet" name="tab" checked />
            <label
              htmlFor="chi-tiet"
              className="detail tab-link active"
              data-tab="tab-1"
            >
              Thông tin chi tiết
              <hr className="w-52" />
            </label>
            <input type="radio" id="binh-luan" name="tab" />
            <label
              htmlFor="binh-luan"
              className="comment tab-link"
              data-tab="tab-2"
            >
              Bình luận
              <hr className="w-50" />
            </label>
            <div id="chi-tiet-content">
              <br />
              <div className="max-w-4xl mx-auto px-4">
                <p className="text-gray-500 dark:text-gray-400">{listOneData?.description}</p>
              </div>
            </div>
            <div id="binh-luan-content">
              <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div className="max-w-4xl mx-auto px-4">
                  <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center evaluate">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                          className="mr-2 w-8 h-8 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="Michael Gough" />Phùng Quang Minh</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><time
                          title="February 8th, 2022">Feb. 8, 2022</time></p>
                      </div>
                      <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                      </button>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">Bài viết rất thẳng thắn. Thực sự đáng thời gian đọc. Cảm ơn! Nhưng các công cụ chỉ là công cụ dành cho các nhà thiết kế UX. Kiến thức về các công cụ thiết kế cũng quan trọng như việc tạo ra chiến lược thiết kế.</p>
                    <div className="product-small">
                      <img
                        className="image5"
                        src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                        alt=""
                      />
                      <img
                        className="image6"
                        src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
                        alt=""
                      />
                    </div>
                  </article>
                </div>
              </section>
            </div>
          </div>

          <div className="main-cols sock_to_days">
            <div className="containers">
              <div className="product-soks">
                <div className="new_titles text-center">
                  <h2 className="mt-6 kg zd">
                    <a
                      className="no-underline"
                      href="san-pham-cung-loai"
                      title="Sản phẩm cùng loại"
                    >
                      Sản phẩm cùng loại
                    </a>
                  </h2>
                </div>

                <div className="sock_slides slider-itemss slick_margins slick-initializeds slick-sliders">
                  <div aria-live="polite" className="slick-lists draggables">
                    <div
                      className="slick-tracks"
                      role="listbox"
                      style={{
                        opacity: 1,
                        width: "2264px",
                        transform: "translate3d(0px, 0px, 0px)",
                      }}
                    >
                      <div
                        className="items slick-slides slick-currents slick-actives"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide10s"
                        style={{ width: "240px" }}
                        data-slick-index="0"
                        aria-hidden="false"
                      >
                        <div className="col-item1s">
                          <div className="sale-labels sale-top-rights">
                            <span>- 16%</span>
                          </div>

                          <div className="item-inners">
                            <div className="product-wrappers">
                              <div className="thumb-wrappers">
                                <a
                                  href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                  className="thumbs flips"
                                  title="Bàn trà gỗ tự nhiên 5CBT-136"
                                  tabIndex={0}
                                >
                                  <img
                                    className="lazyloads loadeds"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                                    alt="Bàn trà gỗ tự nhiên 5CBT-136"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-infos">
                              <div className="info-inners">
                                <h3 className="item-titles">
                                  {" "}
                                  <a
                                    href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                    title="Bàn trà gỗ tự nhiên 5CBT-136"
                                    tabIndex={0}
                                  >
                                    Bàn trà gỗ tự nhiên 5CBT-136{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-contents">
                                  <div className="item-prices">
                                    <div className="price-boxs">
                                      <p className="special-prices">
                                        <span className="prices">
                                          6.590.000₫
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="actionss hidden-xs hidden-sm remove_html">
                                <form>
                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="buttons btn-carts"
                                    title="Mua hàng"
                                    type="button"
                                    tabIndex={0}
                                  >
                                    <a href="/cart">Mua hàng</a>
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="items slick-slides slick-actives"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide11s"
                        style={{ width: "240px" }}
                        data-slick-index="1"
                        aria-hidden="false"
                      >
                        <div className="col-item2s">
                          <div className="item-inners">
                            <div className="product-wrappers">
                              <div className="thumb-wrappers">
                                <a
                                  href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                  className="thumbs flips"
                                  title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                  tabIndex={0}
                                >
                                  <img
                                    className="lazyloads loadeds"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
                                    alt="Kệ tivi phòng khách độc đáo 5CKT-17"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-infos">
                              <div className="info-inners">
                                <h3 className="item-titles">
                                  {" "}
                                  <a
                                    href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                    title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                    tabIndex={0}
                                  >
                                    Kệ tivi phòng khách độc đáo 5CKT-17{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-contents">
                                  <div className="item-prices">
                                    <div className="price-boxs">
                                      <span className="regular-prices">
                                        {" "}
                                        <span className="prices">
                                          8.250.000₫
                                        </span>{" "}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="actionss hidden-xs hidden-sm remove_html">
                                <form>
                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="buttons btn-carts add_to_carts"
                                    title="Mua hàng"
                                    tabIndex={0}
                                  >
                                    <a href="/cart">Mua hàng</a>
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="items slick-slides slick-actives"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide12s"
                        style={{ width: "240px" }}
                        data-slick-index="2"
                        aria-hidden="false"
                      >
                        <div className="col-item3s">
                          <div className="item-inners">
                            <div className="product-wrappers">
                              <div className="thumb-wrappers">
                                <a
                                  href="/products/ke-tivi-phong-khach-dep-5ckt-08"
                                  className="thumbs flips"
                                  title="Kệ tivi phòng khách đẹp 5CKT-08"
                                  tabIndex={0}
                                >
                                  <img
                                    className="lazyloads loadeds"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-phong-khach-kieu-dang-trang-nha-600x600.jpg?v=1577206170977"
                                    alt="Kệ tivi phòng khách đẹp 5CKT-08"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-infos">
                              <div className="info-inners">
                                <h3 className="item-titles">
                                  {" "}
                                  <a
                                    href="/products/ke-tivi-phong-khach-dep-5ckt-08"
                                    title="Kệ tivi phòng khách đẹp 5CKT-08"
                                    tabIndex={0}
                                  >
                                    Kệ tivi phòng khách đẹp 5CKT-08{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-contents">
                                  <div className="item-prices">
                                    <div className="price-boxs">
                                      <span className="regular-prices">
                                        {" "}
                                        <span className="prices">
                                          9.250.000₫
                                        </span>{" "}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="actionss hidden-xs hidden-sm remove_html">
                                <form>
                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="buttons btn-carts add_to_carts"
                                    title="Mua hàng"
                                    tabIndex={0}
                                  >
                                    <a href="/cart">Mua hàng</a>
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="items slick-slides slick-actives"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide13s"
                        style={{ width: "240px" }}
                        data-slick-index="3"
                        aria-hidden="false"
                      >
                        <div className="col-item4s">
                          <div className="sale-labels sale-top-rights">
                            <span>- 23%</span>
                          </div>

                          <div className="item-inners">
                            <div className="product-wrappers">
                              <div className="thumb-wrappers">
                                <a
                                  href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168"
                                  className="thumbs flips"
                                  title="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                  tabIndex={0}
                                >
                                  <img
                                    className="lazyloads loadeds"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-go-tu-nhien-chan-cao-kt168-600x600.jpg?v=1577206060690"
                                    alt="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-infos">
                              <div className="info-inners">
                                <h3 className="item-titles">
                                  {" "}
                                  <a
                                    href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168"
                                    title="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                    tabIndex={0}
                                  >
                                    Kệ tivi gỗ tự nhiên chân cao 5CKT-168{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-contents">
                                  <div className="item-prices">
                                    <div className="price-boxs">
                                      <p className="special-prices">
                                        <span className="prices">
                                          7.860.000₫
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="actionss hidden-xs hidden-sm remove_html">
                                <form>
                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="buttons btn-carts add_to_carts"
                                    title="Mua hàng"
                                    tabIndex={0}
                                  >
                                    <a href="/cart">Mua hàng</a>
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="items slick-slides slick-currents slick-actives"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide10"
                        style={{ width: "240px" }}
                        data-slick-index="0"
                        aria-hidden="false"
                      >
                        <div className="col-item1s">
                          <div className="sale-labels sale-top-rights">
                            <span>- 16%</span>
                          </div>

                          <div className="item-inners">
                            <div className="product-wrappers">
                              <div className="thumb-wrappers">
                                <a
                                  href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                  className="thumbs flips"
                                  title="Bàn trà gỗ tự nhiên 5CBT-136"
                                  tabIndex={0}
                                >
                                  <img
                                    className="lazyloads loadeds"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                                    alt="Bàn trà gỗ tự nhiên 5CBT-136"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-infos">
                              <div className="info-inners">
                                <h3 className="item-titles">
                                  {" "}
                                  <a
                                    href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                    title="Bàn trà gỗ tự nhiên 5CBT-136"
                                    tabIndex={0}
                                  >
                                    Bàn trà gỗ tự nhiên 5CBT-136{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-contents">
                                  <div className="item-prices">
                                    <div className="price-boxs">
                                      <p className="special-prices">
                                        <span className="prices">
                                          6.590.000₫
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="actionss hidden-xs hidden-sm remove_html">
                                <form>
                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="buttons btn-carts"
                                    title="Mua hàng"
                                    type="button"
                                    tabIndex={0}
                                  >
                                    <a href="/cart">Mua hàng</a>
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="seemore">
            <div className="float-left font-bold op">Xem thêm</div>
            <FaChevronRight className="text-xs" />
            <FaChevronRight className="text-xs" />
          </div>
          <div className="main-col2s sock_to_days">
            <div className="containers">
              <div className="product-sokss">
                <div className="new_titles text-center">
                  <h2 className="mt-6 kg zd">
                    <a
                      className="no-underline"
                      href="san-pham-cung-loai"
                      title="Sản phẩm cùng loại"
                    >
                      Sản phẩm liên quan
                    </a>
                  </h2>
                </div>


                <div className="sock_slidess slider-itemss slick_margins slick-initializeds slick-sliderss kh">
                  <div className="swiper-contaner">
                    <Swiper
                      slidesPerView={4}
                      navigation={true}
                      modules={[Navigation]}
                    >
                      <div
                        aria-live="polite"
                        className="slick-lists draggables"
                      >
                        <div
                          className="slick-tracks"
                          role="listbox"
                          style={{
                            opacity: 1,
                            width: "2264px",
                            transform: "translate3d(0px, 0px, 0px)",
                          }}
                        >
                          <SwiperSlide
                            style={{ width: "285px", marginLeft: "27px" }}
                          >
                            <div
                              className="items slick-slides slick-currents slick-actives"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide10s"
                              style={{
                                width: "235px",
                                marginLeft: "-18px",
                                marginRight: "37px",
                              }}
                              data-slick-index="0"
                              aria-hidden="false"
                            >
                              <div className="col-item5s">
                                <div className="sale-labels sale-top-rights">
                                  <span>- 16%</span>
                                </div>

                                <div className="item-inners">
                                  <div className="product-wrappers">
                                    <div className="thumb-wrappers">
                                      <a
                                        href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                        className="thumbs flips"
                                        title="Bàn trà gỗ tự nhiên 5CBT-136"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyloads loadeds"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                                          alt="Bàn trà gỗ tự nhiên 5CBT-136"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-infos">
                                    <div className="info-inners">
                                      <h3 className="item-titles">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                          title="Bàn trà gỗ tự nhiên 5CBT-136"
                                          tabIndex={0}
                                        >
                                          Bàn trà gỗ tự nhiên 5CBT-136{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-contents">
                                        <div className="item-prices">
                                          <div className="price-boxs">
                                            <p className="special-prices">
                                              <span className="prices">
                                                6.590.000₫
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="actionss hidden-xs hidden-sm remove_html">
                                      <form>
                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="buttons btn-carts"
                                          title="Mua hàng"
                                          type="button"
                                          tabIndex={0}
                                        >
                                          <a href="/cart">Mua hàng</a>
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>

                          <SwiperSlide>
                            <div
                              className="items slick-slides slick-actives"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide11"
                              style={{
                                width: "268px",
                                marginLeft: "-65px",
                                marginRight: "18px",
                              }}
                              data-slick-index="1"
                              aria-hidden="false"
                            >
                              <div className="col-item6s jk">
                                <div className="item-inners">
                                  <div className="product-wrappers">
                                    <div className="thumb-wrappers">
                                      <a
                                        href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                        className="thumbs flips"
                                        title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyloads loadeds"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
                                          alt="Kệ tivi phòng khách độc đáo 5CKT-17"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-infos">
                                    <div className="info-inners">
                                      <h3 className="item-titles">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                          title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                          tabIndex={0}
                                        >
                                          Kệ tivi phòng khách độc đáo 5CKT-17{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-contents">
                                        <div className="item-prices">
                                          <div className="price-boxs">
                                            <span className="regular-prices">
                                              {" "}
                                              <span className="prices">
                                                8.250.000₫
                                              </span>{" "}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="actionss hidden-xs hidden-sm remove_html">
                                      <form>
                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="buttons btn-carts add_to_carts"
                                          title="Mua hàng"
                                          tabIndex={0}
                                        >
                                          <a href="/cart">Mua hàng</a>
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>

                          <SwiperSlide>
                            <div
                              className="items slick-slides slick-actives"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide12s"
                              style={{
                                width: "273px",
                                marginLeft: "-64px",
                                marginRight: "42px",
                              }}
                              data-slick-index="2"
                              aria-hidden="false"
                            >
                              <div className="col-item7s ap">
                                <div className="item-inners">
                                  <div className="product-wrappers">
                                    <div className="thumb-wrappers">
                                      <a
                                        href="/products/ke-tivi-phong-khach-dep-5ckt-08"
                                        className="thumbs flips"
                                        title="Kệ tivi phòng khách đẹp 5CKT-08"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyloads loadeds"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-phong-khach-kieu-dang-trang-nha-600x600.jpg?v=1577206170977"
                                          alt="Kệ tivi phòng khách đẹp 5CKT-08"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-infos">
                                    <div className="info-inners">
                                      <h3 className="item-titles">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-phong-khach-dep-5ckt-08"
                                          title="Kệ tivi phòng khách đẹp 5CKT-08"
                                          tabIndex={0}
                                        >
                                          Kệ tivi phòng khách đẹp 5CKT-08{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-contents">
                                        <div className="item-prices">
                                          <div className="price-boxs">
                                            <span className="regular-prices">
                                              {" "}
                                              <span className="prices">
                                                9.250.000₫
                                              </span>{" "}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="actionss hidden-xs hidden-sm remove_html">
                                      <form>
                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="buttons btn-carts add_to_carts"
                                          title="Mua hàng"
                                          tabIndex={0}
                                        >
                                          <a href="/cart">Mua hàng</a>
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>

                          <SwiperSlide>
                            <div
                              className="items slick-slides slick-actives"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide13s"
                              style={{
                                width: "267px",
                                marginLeft: "-56px",
                                marginRight: "57px",
                              }}
                              data-slick-index="3"
                              aria-hidden="false"
                            >
                              <div className="col-item8s kp">
                                <div className="sale-labels sale-top-rights">
                                  <span>- 23%</span>
                                </div>

                                <div className="item-inners">
                                  <div className="product-wrappers">
                                    <div className="thumb-wrappers">
                                      <a
                                        href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168"
                                        className="thumbs flips"
                                        title="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyloads loadeds"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-go-tu-nhien-chan-cao-kt168-600x600.jpg?v=1577206060690"
                                          alt="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-infos">
                                    <div className="info-inners">
                                      <h3 className="item-titles">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168"
                                          title="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                          tabIndex={0}
                                        >
                                          Kệ tivi gỗ tự nhiên chân cao 5CKT-168{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-contents">
                                        <div className="item-prices">
                                          <div className="price-boxs">
                                            <p className="special-prices">
                                              <span className="prices">
                                                7.860.000₫
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="actionss hidden-xs hidden-sm remove_html">
                                      <form>
                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="buttons btn-carts add_to_carts"
                                          title="Mua hàng"
                                          tabIndex={0}
                                        >
                                          <a href="/cart">Mua hàng</a>
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>

                          <SwiperSlide>
                            <div
                              className="items slick-slides slick-currents slick-actives"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide10s"
                              style={{
                                width: "264px",
                                marginLeft: "-57px" /* ,marginRight: "37px" */,
                              }}
                              data-slick-index="0"
                              aria-hidden="false"
                            >
                              <div className="col-item9s kp">
                                <div className="sale-labels sale-top-rights">
                                  <span>- 16%</span>
                                </div>

                                <div className="item-inners">
                                  <div className="product-wrappers">
                                    <div className="thumb-wrappers">
                                      <a
                                        href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                        className="thumbs flips"
                                        title="Bàn trà gỗ tự nhiên 5CBT-136"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyloads loadeds"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                                          alt="Bàn trà gỗ tự nhiên 5CBT-136"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-infos">
                                    <div className="info-inners">
                                      <h3 className="item-titles">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                          title="Bàn trà gỗ tự nhiên 5CBT-136"
                                          tabIndex={0}
                                        >
                                          Bàn trà gỗ tự nhiên 5CBT-136{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-contents">
                                        <div className="item-prices">
                                          <div className="price-boxs">
                                            <p className="special-prices">
                                              <span className="prices">
                                                6.590.000₫
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="actionss hidden-xs hidden-sm remove_html">
                                      <form>
                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="buttons btn-carts"
                                          title="Mua hàng"
                                          type="button"
                                          tabIndex={0}
                                        >
                                          <a href="/cart">Mua hàng</a>
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>

                          <SwiperSlide>
                            <div
                              className="items slick-slides slick-actives"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide11s"
                              style={{ width: "259px", marginLeft: "-50px" }}
                              data-slick-index="2"
                              aria-hidden="false"
                            >
                              <div className="col-item10s kp">
                                <div className="item-inners">
                                  <div className="product-wrappers">
                                    <div className="thumb-wrappers">
                                      <a
                                        href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                        className="thumbs flips"
                                        title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyloads loadeds"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
                                          alt="Kệ tivi phòng khách độc đáo 5CKT-17"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-infos">
                                    <div className="info-inners">
                                      <h3 className="item-titles">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                          title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                          tabIndex={0}
                                        >
                                          Kệ tivi phòng khách độc đáo 5CKT-17{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-contents">
                                        <div className="item-prices">
                                          <div className="price-boxs">
                                            <span className="regular-prices">
                                              {" "}
                                              <span className="prices">
                                                8.250.000₫
                                              </span>{" "}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="actionss hidden-xs hidden-sm remove_html">
                                      <form>
                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="buttons btn-carts add_to_carts"
                                          title="Mua hàng"
                                          tabIndex={0}
                                        >
                                          <a href="/cart">Mua hàng</a>
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        </div>
                      </div>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product_Detail;
