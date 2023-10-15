import "./Homepage.css";
import "./Responsive_homepage.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Homeslides from "@/components/Homeslides";
import Categories from "@/components/Categories";
const HomePage = () => {
  return (
    <div className="main">
      {/* Homeslides */}
      <section className="mx-auto">
        <Homeslides />
      </section>
      <br />
      <Categories />
      <div className="main-col sock_to_day">
        <div className="container">
          <div className="product-sok">
            <div className="new_title text-center">
              <h2 className="mt-6">
                <a
                  className="no-underline"
                  href="san-pham-noi-bat"
                  title="Sản phẩm nổi bật"
                >
                  Sản phẩm nổi bật
                </a>
              </h2>
            </div>

            <div className="sock_slide slider-items slick_margin slick-initialized slick-slider">
              <Swiper

                slidesPerView={4}
                navigation={true}
                modules={[Navigation]}

              >

                <div aria-live="polite" className="slick-list draggable">
                  <div
                    className="slick-track"
                    role="listbox"
                    style={{
                      opacity: 1,
                      width: "2264px",
                      transform: "translate3d(0px, 0px, 0px)",
                    }}
                  >
                    <SwiperSlide>
                      <div
                        className="item slick-slide slick-current slick-active"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide10"
                        style={{ width: "273px" }}
                        data-slick-index="0"
                        aria-hidden="false"
                      >
                        <div className="col-item1 ">
                          <div className="sale-label sale-top-right">
                            <span>- 16%</span>
                          </div>

                          <div className="item-inner">
                            <div className="product-wrapper">
                              <div className="thumb-wrapper">
                                <a
                                  href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                  className="thumb flip"
                                  title="Bàn trà gỗ tự nhiên 5CBT-136"
                                  tabIndex={0}
                                >
                                  <img
                                    className="lazyload loaded"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                                    alt="Bàn trà gỗ tự nhiên 5CBT-136"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-info">
                              <div className="info-inner">
                                <h3 className="item-title">
                                  {" "}
                                  <a
                                    href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                    title="Bàn trà gỗ tự nhiên 5CBT-136"
                                    tabIndex={0}
                                  >
                                    Bàn trà gỗ tự nhiên 5CBT-136{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-content">
                                  <div className="item-price">
                                    <div className="price-box">
                                      <p className="special-price">
                                        <span className="price">6.590.000₫</span>
                                      </p>
                                      <p className="old-price">
                                        <span className="price">7.890.000₫</span>
                                      </p>
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
                                    <a href="/products/ban-tra-go-tu-nhien-5cbt-136">
                                      Chi tiết
                                    </a>
                                  </button>
                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="button btn-cart"
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
                        className="item slick-slide slick-active"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide11"
                        style={{ width: "273px" }}
                        data-slick-index="1"
                        aria-hidden="false"
                      >
                        <div className="col-item2">
                          <div className="item-inner">
                            <div className="product-wrapper">
                              <div className="thumb-wrapper">
                                <a
                                  href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                  className="thumb flip"
                                  title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                  tabIndex={0}
                                >
                                  <img
                                    className="lazyload loaded"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
                                    alt="Kệ tivi phòng khách độc đáo 5CKT-17"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-info">
                              <div className="info-inner">
                                <h3 className="item-title">
                                  {" "}
                                  <a
                                    href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                    title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                    tabIndex={0}
                                  >
                                    Kệ tivi phòng khách độc đáo 5CKT-17{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-content">
                                  <div className="item-price">
                                    <div className="price-box">
                                      <span className="regular-price">
                                        {" "}
                                        <span className="price">
                                          8.250.000₫
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
                                    <a href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17">
                                      Chi tiết
                                    </a>
                                  </button>

                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="button btn-cart add_to_cart"
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
                        className="item slick-slide slick-active"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide12"
                        style={{ width: "273px" }}
                        data-slick-index="2"
                        aria-hidden="false"
                      >
                        <div className="col-item3">
                          <div className="item-inner">
                            <div className="product-wrapper">
                              <div className="thumb-wrapper">
                                <a
                                  href="/products/ke-tivi-phong-khach-dep-5ckt-08"
                                  className="thumb flip"
                                  title="Kệ tivi phòng khách đẹp 5CKT-08"
                                  tabIndex={0}
                                >
                                  <img
                                    className="lazyload loaded"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-phong-khach-kieu-dang-trang-nha-600x600.jpg?v=1577206170977"
                                    alt="Kệ tivi phòng khách đẹp 5CKT-08"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-info">
                              <div className="info-inner">
                                <h3 className="item-title">
                                  {" "}
                                  <a
                                    href="/products/ke-tivi-phong-khach-dep-5ckt-08"
                                    title="Kệ tivi phòng khách đẹp 5CKT-08"
                                    tabIndex={0}
                                  >
                                    Kệ tivi phòng khách đẹp 5CKT-08{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-content">
                                  <div className="item-price">
                                    <div className="price-box">
                                      <span className="regular-price">
                                        {" "}
                                        <span className="price">
                                          9.250.000₫
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
                                    <a href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17">
                                      Chi tiết
                                    </a>
                                  </button>

                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="button btn-cart add_to_cart"
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
                        className="item slick-slide slick-active"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide13"
                        style={{ width: "273px" }}
                        data-slick-index="3"
                        aria-hidden="false"
                      >
                        <div className="col-item4">
                          <div className="sale-label sale-top-right">
                            <span>- 23%</span>
                          </div>

                          <div className="item-inner">
                            <div className="product-wrapper">
                              <div className="thumb-wrapper">
                                <a
                                  href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168"
                                  className="thumb flip"
                                  title="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                  tabIndex={0}
                                >
                                  <img
                                    className="lazyload loaded"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-go-tu-nhien-chan-cao-kt168-600x600.jpg?v=1577206060690"
                                    alt="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-info">
                              <div className="info-inner">
                                <h3 className="item-title">
                                  {" "}
                                  <a
                                    href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168"
                                    title="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                    tabIndex={0}
                                  >
                                    Kệ tivi gỗ tự nhiên chân cao 5CKT-168{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-content">
                                  <div className="item-price">
                                    <div className="price-box">
                                      <p className="special-price">
                                        <span className="price">7.860.000₫</span>
                                      </p>
                                      <p className="old-price">
                                        <span className="price">10.200.000₫</span>
                                      </p>
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
                                    <a href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168">
                                      Chi tiết
                                    </a>
                                  </button>

                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="button btn-cart add_to_cart"
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
                        className="item slick-slide"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide14"
                        style={{ width: "273px" }}
                        data-slick-index="4"
                        aria-hidden="true"
                      >
                        <div className="col-item5">
                          <div className="item-inner">
                            <div className="product-wrapper">
                              <div className="thumb-wrapper">
                                <a
                                  href="/products/ke-tivi-go-tu-nhien-5ckt-64"
                                  className="thumb flip"
                                  title="Kệ tivi Gỗ tự nhiên 5CKT-64"
                                  tabIndex={-1}
                                >
                                  <img
                                    className="lazyload"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                                    alt="Kệ tivi Gỗ tự nhiên 5CKT-64"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-info">
                              <div className="info-inner">
                                <h3 className="item-title">
                                  {" "}
                                  <a
                                    href="/products/ke-tivi-go-tu-nhien-5ckt-64"
                                    title="Kệ tivi Gỗ tự nhiên 5CKT-64"
                                    tabIndex={-1}
                                  >
                                    Kệ tivi Gỗ tự nhiên 5CKT-64{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-content">
                                  <div className="item-price">
                                    <div className="price-box">
                                      <span className="regular-price">
                                        {" "}
                                        <span className="price">
                                          8.500.000₫
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
                                    tabIndex={-1}
                                  >
                                    <a href="/products/ke-tivi-go-tu-nhien-5ckt-64">
                                      Chi tiết
                                    </a>
                                  </button>

                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="button btn-cart"
                                    title="Mua hàng"
                                    type="button"
                                    tabIndex={-1}
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
                        className="item slick-slide"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide15"
                        style={{ width: "273px" }}
                        data-slick-index="5"
                        aria-hidden="true"
                      >
                        <div className="col-item6">
                          <div className="item-inner">
                            <div className="product-wrapper">
                              <div className="thumb-wrapper">
                                <a
                                  href="/products/ban-tra-go-tu-nhien-ngan-keo-son-mau-5cbt-130"
                                  className="thumb flip"
                                  title="Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130"
                                  tabIndex={-1}
                                >
                                  <img
                                    className="lazyload"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
                                    alt="Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-info">
                              <div className="info-inner">
                                <h3 className="item-title">
                                  {" "}
                                  <a
                                    href="/products/ban-tra-go-tu-nhien-ngan-keo-son-mau-5cbt-130"
                                    title="Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130"
                                    tabIndex={-1}
                                  >
                                    Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-content">
                                  <div className="item-price">
                                    <div className="price-box">
                                      <span className="regular-price">
                                        {" "}
                                        <span className="price">
                                          8.600.000₫
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
                                    tabIndex={-1}
                                  >
                                    <a href="/products/ban-tra-go-tu-nhien-ngan-keo-son-mau-5cbt-130">
                                      Chi tiết
                                    </a>
                                  </button>
                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="button btn-cart"
                                    title="Mua hàng"
                                    type="button"
                                    tabIndex={-1}
                                  >
                                    <a href="/cart">
                                      Mua hàng
                                    </a>
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
                        className="item slick-slide"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide16"
                        style={{ width: "273px" }}
                        data-slick-index="6"
                        aria-hidden="true"
                      >
                        <div className="col-item7">
                          <div className="item-inner">
                            <div className="product-wrapper">
                              <div className="thumb-wrapper">
                                <a
                                  href="/products/ban-tra-phong-khach-hien-dai-5cbt-17"
                                  className="thumb flip"
                                  title="Bàn trà phòng khách hiện đại 5CBT-17"
                                  tabIndex={-1}
                                >
                                  <img
                                    className="lazyload"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-phong-khach-kieu-dang-trang-nha-600x600.jpg?v=1577206170977"
                                    alt="Bàn trà phòng khách hiện đại 5CBT-17"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-info">
                              <div className="info-inner">
                                <h3 className="item-title">
                                  {" "}
                                  <a
                                    href="/products/ban-tra-phong-khach-hien-dai-5cbt-17"
                                    title="Bàn trà phòng khách hiện đại 5CBT-17"
                                    tabIndex={-1}
                                  >
                                    Bàn trà phòng khách hiện đại 5CBT-17{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-content">
                                  <div className="item-price">
                                    <div className="price-box">
                                      <span className="regular-price">
                                        {" "}
                                        <span className="price">
                                          4.600.000₫
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
                                    tabIndex={-1}
                                  >
                                    <a href="/products/ban-tra-phong-khach-hien-dai-5cbt-17">
                                      Chi tiết
                                    </a>
                                  </button>

                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="button btn-cart add_to_cart"
                                    title="Mua hàng"
                                    tabIndex={-1}
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
                        className="item slick-slide"
                        tabIndex={-1}
                        role="option"
                        aria-describedby="slick-slide17"
                        style={{ width: "273px" }}
                        data-slick-index="7"
                        aria-hidden="true"
                      >
                        <div className="col-item8">
                          <div className="sale-label sale-top-right">
                            <span>- 10%</span>
                          </div>

                          <div className="item-inner">
                            <div className="product-wrapper">
                              <div className="thumb-wrapper">
                                <a
                                  href="/products/ban-tra-go-cong-nghiep-chan-cao-go-tu-nhien-5cbt-124"
                                  className="thumb flip"
                                  title="Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên 5CBT-124"
                                  tabIndex={-1}
                                >
                                  <img
                                    className="lazyload"
                                    src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-go-tu-nhien-chan-cao-kt168-600x600.jpg?v=1577206060690"
                                    alt="Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên 5CBT-124"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="item-info">
                              <div className="info-inner">
                                <h3 className="item-title">
                                  {" "}
                                  <a
                                    href="/products/ban-tra-go-cong-nghiep-chan-cao-go-tu-nhien-5cbt-124"
                                    title="Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên 5CBT-124"
                                    tabIndex={-1}
                                  >
                                    Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên
                                    5CBT-124{" "}
                                  </a>{" "}
                                </h3>
                                <div className="item-content">
                                  <div className="item-price">
                                    <div className="price-box">
                                      <p className="special-price">
                                        <span className="price">4.589.000₫</span>
                                      </p>
                                      <p className="old-price">
                                        <span className="price">5.120.000₫</span>
                                      </p>
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
                                    tabIndex={-1}
                                  >
                                    <a href="/products/ban-tra-go-cong-nghiep-chan-cao-go-tu-nhien-5cbt-124">
                                      Chi tiết
                                    </a>
                                  </button>

                                  <input type="hidden" tabIndex={0} />
                                  <button
                                    className="button btn-cart add_to_cart"
                                    title="Mua hàng"
                                    tabIndex={-1}
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
      <div className="main-col2 bg_menu lazyload" data-was-processed="true">
        <div className="container">
          <div className="std">
            <div
              className="best-seller-pro menu"
              style={{ visibility: "visible" }}
            >
              <div className="slider-items-products">
                <div className="new_title lt clear_pd">
                  <h4>
                    <a href="/phong-khach" title="Phòng Khách">
                      Phòng Khách
                    </a>
                  </h4>
                </div>
                <div id="best-seller-slider" className="hidden-buttons">
                  <div className="sock_slide slider-items slick_margin slick-initialized slick-slider">
                    <Swiper

                      slidesPerView={4}
                      navigation={true}
                      modules={[Navigation]}

                    >

                      <div aria-live="polite" className="slick-list draggable">
                        <div
                          className="slick-track"
                          role="listbox"
                          style={{
                            opacity: 1,
                            width: "2264px",
                            transform: "translate3d(0px, 0px, 0px)",
                          }}
                        >
                          <SwiperSlide>
                            <div
                              className="item slick-slide slick-current slick-active"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide10"
                              style={{ width: "273px" }}
                              data-slick-index="0"
                              aria-hidden="false"
                            >
                              <div className="col-item1 ">
                                <div className="sale-label sale-top-right">
                                  <span>- 16%</span>
                                </div>

                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                        className="thumb flip"
                                        title="Bàn trà gỗ tự nhiên 5CBT-136"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                                          alt="Bàn trà gỗ tự nhiên 5CBT-136"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                          title="Bàn trà gỗ tự nhiên 5CBT-136"
                                          tabIndex={0}
                                        >
                                          Bàn trà gỗ tự nhiên 5CBT-136{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <p className="special-price">
                                              <span className="price">6.590.000₫</span>
                                            </p>
                                            <p className="old-price">
                                              <span className="price">7.890.000₫</span>
                                            </p>
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
                                          <a href="/products/ban-tra-go-tu-nhien-5cbt-136">
                                            Chi tiết
                                          </a>
                                        </button>
                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart"
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
                              className="item slick-slide slick-active"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide11"
                              style={{ width: "273px" }}
                              data-slick-index="1"
                              aria-hidden="false"
                            >
                              <div className="col-item2">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                        className="thumb flip"
                                        title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
                                          alt="Kệ tivi phòng khách độc đáo 5CKT-17"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                          title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                          tabIndex={0}
                                        >
                                          Kệ tivi phòng khách độc đáo 5CKT-17{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                8.250.000₫
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
                                          <a href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
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
                              className="item slick-slide slick-active"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide12"
                              style={{ width: "273px" }}
                              data-slick-index="2"
                              aria-hidden="false"
                            >
                              <div className="col-item3">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ke-tivi-phong-khach-dep-5ckt-08"
                                        className="thumb flip"
                                        title="Kệ tivi phòng khách đẹp 5CKT-08"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-phong-khach-kieu-dang-trang-nha-600x600.jpg?v=1577206170977"
                                          alt="Kệ tivi phòng khách đẹp 5CKT-08"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-phong-khach-dep-5ckt-08"
                                          title="Kệ tivi phòng khách đẹp 5CKT-08"
                                          tabIndex={0}
                                        >
                                          Kệ tivi phòng khách đẹp 5CKT-08{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                9.250.000₫
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
                                          <a href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
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
                              className="item slick-slide slick-active"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide13"
                              style={{ width: "273px" }}
                              data-slick-index="3"
                              aria-hidden="false"
                            >
                              <div className="col-item4">
                                <div className="sale-label sale-top-right">
                                  <span>- 23%</span>
                                </div>

                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168"
                                        className="thumb flip"
                                        title="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-go-tu-nhien-chan-cao-kt168-600x600.jpg?v=1577206060690"
                                          alt="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168"
                                          title="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                          tabIndex={0}
                                        >
                                          Kệ tivi gỗ tự nhiên chân cao 5CKT-168{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <p className="special-price">
                                              <span className="price">7.860.000₫</span>
                                            </p>
                                            <p className="old-price">
                                              <span className="price">10.200.000₫</span>
                                            </p>
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
                                          <a href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
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
                              className="item slick-slide"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide14"
                              style={{ width: "273px" }}
                              data-slick-index="4"
                              aria-hidden="true"
                            >
                              <div className="col-item5">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ke-tivi-go-tu-nhien-5ckt-64"
                                        className="thumb flip"
                                        title="Kệ tivi Gỗ tự nhiên 5CKT-64"
                                        tabIndex={-1}
                                      >
                                        <img
                                          className="lazyload"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                                          alt="Kệ tivi Gỗ tự nhiên 5CKT-64"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-go-tu-nhien-5ckt-64"
                                          title="Kệ tivi Gỗ tự nhiên 5CKT-64"
                                          tabIndex={-1}
                                        >
                                          Kệ tivi Gỗ tự nhiên 5CKT-64{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                8.500.000₫
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
                                          tabIndex={-1}
                                        >
                                          <a href="/products/ke-tivi-go-tu-nhien-5ckt-64">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart"
                                          title="Mua hàng"
                                          type="button"
                                          tabIndex={-1}
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
                              className="item slick-slide"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide15"
                              style={{ width: "273px" }}
                              data-slick-index="5"
                              aria-hidden="true"
                            >
                              <div className="col-item6">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ban-tra-go-tu-nhien-ngan-keo-son-mau-5cbt-130"
                                        className="thumb flip"
                                        title="Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130"
                                        tabIndex={-1}
                                      >
                                        <img
                                          className="lazyload"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
                                          alt="Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-go-tu-nhien-ngan-keo-son-mau-5cbt-130"
                                          title="Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130"
                                          tabIndex={-1}
                                        >
                                          Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                8.600.000₫
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
                                          tabIndex={-1}
                                        >
                                          <a href="/products/ban-tra-go-tu-nhien-ngan-keo-son-mau-5cbt-130">
                                            Chi tiết
                                          </a>
                                        </button>
                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart"
                                          title="Mua hàng"
                                          type="button"
                                          tabIndex={-1}
                                        >
                                          <a href="/cart">
                                            Mua hàng
                                          </a>
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
                              className="item slick-slide"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide16"
                              style={{ width: "273px" }}
                              data-slick-index="6"
                              aria-hidden="true"
                            >
                              <div className="col-item7">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ban-tra-phong-khach-hien-dai-5cbt-17"
                                        className="thumb flip"
                                        title="Bàn trà phòng khách hiện đại 5CBT-17"
                                        tabIndex={-1}
                                      >
                                        <img
                                          className="lazyload"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-phong-khach-kieu-dang-trang-nha-600x600.jpg?v=1577206170977"
                                          alt="Bàn trà phòng khách hiện đại 5CBT-17"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-phong-khach-hien-dai-5cbt-17"
                                          title="Bàn trà phòng khách hiện đại 5CBT-17"
                                          tabIndex={-1}
                                        >
                                          Bàn trà phòng khách hiện đại 5CBT-17{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                4.600.000₫
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
                                          tabIndex={-1}
                                        >
                                          <a href="/products/ban-tra-phong-khach-hien-dai-5cbt-17">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
                                          title="Mua hàng"
                                          tabIndex={-1}
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
                              className="item slick-slide"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide17"
                              style={{ width: "273px" }}
                              data-slick-index="7"
                              aria-hidden="true"
                            >
                              <div className="col-item8">
                                <div className="sale-label sale-top-right">
                                  <span>- 10%</span>
                                </div>

                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ban-tra-go-cong-nghiep-chan-cao-go-tu-nhien-5cbt-124"
                                        className="thumb flip"
                                        title="Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên 5CBT-124"
                                        tabIndex={-1}
                                      >
                                        <img
                                          className="lazyload"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-go-tu-nhien-chan-cao-kt168-600x600.jpg?v=1577206060690"
                                          alt="Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên 5CBT-124"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-go-cong-nghiep-chan-cao-go-tu-nhien-5cbt-124"
                                          title="Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên 5CBT-124"
                                          tabIndex={-1}
                                        >
                                          Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên
                                          5CBT-124{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <p className="special-price">
                                              <span className="price">4.589.000₫</span>
                                            </p>
                                            <p className="old-price">
                                              <span className="price">5.120.000₫</span>
                                            </p>
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
                                          tabIndex={-1}
                                        >
                                          <a href="/products/ban-tra-go-cong-nghiep-chan-cao-go-tu-nhien-5cbt-124">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
                                          title="Mua hàng"
                                          tabIndex={-1}
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
      <div className="main-col3 bg_menu lazyload" data-was-processed="true">
        <div className="container">
          <div className="std">
            <div
              className="best-seller-pro menu"
              style={{ visibility: "visible" }}
            >
              <div className="slider-items-products">
                <div className="new_title lt clear_pd">
                  <h4>
                    <a href="/phong-ngu" title="Phòng Ngủ">
                      Phòng Ngủ
                    </a>
                  </h4>
                </div>
                <div id="bag-seller-slider" className="hidden-buttons">
                  <div className="sock_slide slider-items slick_margin slick-initialized slick-slider">
                    <Swiper

                      slidesPerView={4}
                      navigation={true}
                      modules={[Navigation]}

                    >

                      <div aria-live="polite" className="slick-list draggable">
                        <div
                          className="slick-track"
                          role="listbox"
                          style={{
                            opacity: 1,
                            width: "2264px",
                            transform: "translate3d(0px, 0px, 0px)",
                          }}
                        >
                          <SwiperSlide>
                            <div
                              className="item slick-slide slick-current slick-active"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide10"
                              style={{ width: "273px" }}
                              data-slick-index="0"
                              aria-hidden="false"
                            >
                              <div className="col-item1 ">
                                <div className="sale-label sale-top-right">
                                  <span>- 16%</span>
                                </div>

                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                        className="thumb flip"
                                        title="Bàn trà gỗ tự nhiên 5CBT-136"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                                          alt="Bàn trà gỗ tự nhiên 5CBT-136"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                          title="Bàn trà gỗ tự nhiên 5CBT-136"
                                          tabIndex={0}
                                        >
                                          Bàn trà gỗ tự nhiên 5CBT-136{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <p className="special-price">
                                              <span className="price">6.590.000₫</span>
                                            </p>
                                            <p className="old-price">
                                              <span className="price">7.890.000₫</span>
                                            </p>
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
                                          <a href="/products/ban-tra-go-tu-nhien-5cbt-136">
                                            Chi tiết
                                          </a>
                                        </button>
                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart"
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
                              className="item slick-slide slick-active"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide11"
                              style={{ width: "273px" }}
                              data-slick-index="1"
                              aria-hidden="false"
                            >
                              <div className="col-item2">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                        className="thumb flip"
                                        title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
                                          alt="Kệ tivi phòng khách độc đáo 5CKT-17"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                          title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                          tabIndex={0}
                                        >
                                          Kệ tivi phòng khách độc đáo 5CKT-17{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                8.250.000₫
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
                                          <a href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
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
                              className="item slick-slide slick-active"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide12"
                              style={{ width: "273px" }}
                              data-slick-index="2"
                              aria-hidden="false"
                            >
                              <div className="col-item3">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ke-tivi-phong-khach-dep-5ckt-08"
                                        className="thumb flip"
                                        title="Kệ tivi phòng khách đẹp 5CKT-08"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-phong-khach-kieu-dang-trang-nha-600x600.jpg?v=1577206170977"
                                          alt="Kệ tivi phòng khách đẹp 5CKT-08"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-phong-khach-dep-5ckt-08"
                                          title="Kệ tivi phòng khách đẹp 5CKT-08"
                                          tabIndex={0}
                                        >
                                          Kệ tivi phòng khách đẹp 5CKT-08{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                9.250.000₫
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
                                          <a href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
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
                              className="item slick-slide slick-active"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide13"
                              style={{ width: "273px" }}
                              data-slick-index="3"
                              aria-hidden="false"
                            >
                              <div className="col-item4">
                                <div className="sale-label sale-top-right">
                                  <span>- 23%</span>
                                </div>

                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168"
                                        className="thumb flip"
                                        title="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-go-tu-nhien-chan-cao-kt168-600x600.jpg?v=1577206060690"
                                          alt="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168"
                                          title="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                          tabIndex={0}
                                        >
                                          Kệ tivi gỗ tự nhiên chân cao 5CKT-168{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <p className="special-price">
                                              <span className="price">7.860.000₫</span>
                                            </p>
                                            <p className="old-price">
                                              <span className="price">10.200.000₫</span>
                                            </p>
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
                                          <a href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
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
                              className="item slick-slide"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide14"
                              style={{ width: "273px" }}
                              data-slick-index="4"
                              aria-hidden="true"
                            >
                              <div className="col-item5">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ke-tivi-go-tu-nhien-5ckt-64"
                                        className="thumb flip"
                                        title="Kệ tivi Gỗ tự nhiên 5CKT-64"
                                        tabIndex={-1}
                                      >
                                        <img
                                          className="lazyload"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                                          alt="Kệ tivi Gỗ tự nhiên 5CKT-64"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-go-tu-nhien-5ckt-64"
                                          title="Kệ tivi Gỗ tự nhiên 5CKT-64"
                                          tabIndex={-1}
                                        >
                                          Kệ tivi Gỗ tự nhiên 5CKT-64{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                8.500.000₫
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
                                          tabIndex={-1}
                                        >
                                          <a href="/products/ke-tivi-go-tu-nhien-5ckt-64">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart"
                                          title="Mua hàng"
                                          type="button"
                                          tabIndex={-1}
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
                              className="item slick-slide"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide15"
                              style={{ width: "273px" }}
                              data-slick-index="5"
                              aria-hidden="true"
                            >
                              <div className="col-item6">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ban-tra-go-tu-nhien-ngan-keo-son-mau-5cbt-130"
                                        className="thumb flip"
                                        title="Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130"
                                        tabIndex={-1}
                                      >
                                        <img
                                          className="lazyload"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
                                          alt="Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-go-tu-nhien-ngan-keo-son-mau-5cbt-130"
                                          title="Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130"
                                          tabIndex={-1}
                                        >
                                          Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                8.600.000₫
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
                                          tabIndex={-1}
                                        >
                                          <a href="/products/ban-tra-go-tu-nhien-ngan-keo-son-mau-5cbt-130">
                                            Chi tiết
                                          </a>
                                        </button>
                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart"
                                          title="Mua hàng"
                                          type="button"
                                          tabIndex={-1}
                                        >
                                          <a href="/cart">
                                            Mua hàng
                                          </a>
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
                              className="item slick-slide"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide16"
                              style={{ width: "273px" }}
                              data-slick-index="6"
                              aria-hidden="true"
                            >
                              <div className="col-item7">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ban-tra-phong-khach-hien-dai-5cbt-17"
                                        className="thumb flip"
                                        title="Bàn trà phòng khách hiện đại 5CBT-17"
                                        tabIndex={-1}
                                      >
                                        <img
                                          className="lazyload"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-phong-khach-kieu-dang-trang-nha-600x600.jpg?v=1577206170977"
                                          alt="Bàn trà phòng khách hiện đại 5CBT-17"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-phong-khach-hien-dai-5cbt-17"
                                          title="Bàn trà phòng khách hiện đại 5CBT-17"
                                          tabIndex={-1}
                                        >
                                          Bàn trà phòng khách hiện đại 5CBT-17{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                4.600.000₫
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
                                          tabIndex={-1}
                                        >
                                          <a href="/products/ban-tra-phong-khach-hien-dai-5cbt-17">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
                                          title="Mua hàng"
                                          tabIndex={-1}
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
                              className="item slick-slide"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide17"
                              style={{ width: "273px" }}
                              data-slick-index="7"
                              aria-hidden="true"
                            >
                              <div className="col-item8">
                                <div className="sale-label sale-top-right">
                                  <span>- 10%</span>
                                </div>

                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ban-tra-go-cong-nghiep-chan-cao-go-tu-nhien-5cbt-124"
                                        className="thumb flip"
                                        title="Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên 5CBT-124"
                                        tabIndex={-1}
                                      >
                                        <img
                                          className="lazyload"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-go-tu-nhien-chan-cao-kt168-600x600.jpg?v=1577206060690"
                                          alt="Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên 5CBT-124"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-go-cong-nghiep-chan-cao-go-tu-nhien-5cbt-124"
                                          title="Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên 5CBT-124"
                                          tabIndex={-1}
                                        >
                                          Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên
                                          5CBT-124{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <p className="special-price">
                                              <span className="price">4.589.000₫</span>
                                            </p>
                                            <p className="old-price">
                                              <span className="price">5.120.000₫</span>
                                            </p>
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
                                          tabIndex={-1}
                                        >
                                          <a href="/products/ban-tra-go-cong-nghiep-chan-cao-go-tu-nhien-5cbt-124">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
                                          title="Mua hàng"
                                          tabIndex={-1}
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
      <div className="main-col4 bg_menu lazyload" data-was-processed="true">
        <div className="container">
          <div className="std">
            <div
              className="best-seller-pro menu"
              style={{ visibility: "visible" }}
            >
              <div className="slider-items-products">
                <div className="new_title lt clear_pd">
                  <h4>
                    <a href="/phong-bep" title="Phòng Bếp">
                      Phòng Bếp
                    </a>
                  </h4>
                </div>
                <div id="featured-slider" className="hidden-buttons">
                  <div className="sock_slide slider-items slick_margin slick-initialized slick-slider">
                    <Swiper

                      slidesPerView={4}
                      navigation={true}
                      modules={[Navigation]}

                    >

                      <div aria-live="polite" className="slick-list draggable">
                        <div
                          className="slick-track"
                          role="listbox"
                          style={{
                            opacity: 1,
                            width: "2264px",
                            transform: "translate3d(0px, 0px, 0px)",
                          }}
                        >
                          <SwiperSlide>
                            <div
                              className="item slick-slide slick-current slick-active"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide10"
                              style={{ width: "273px" }}
                              data-slick-index="0"
                              aria-hidden="false"
                            >
                              <div className="col-item1 ">
                                <div className="sale-label sale-top-right">
                                  <span>- 16%</span>
                                </div>

                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                        className="thumb flip"
                                        title="Bàn trà gỗ tự nhiên 5CBT-136"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                                          alt="Bàn trà gỗ tự nhiên 5CBT-136"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-go-tu-nhien-5cbt-136"
                                          title="Bàn trà gỗ tự nhiên 5CBT-136"
                                          tabIndex={0}
                                        >
                                          Bàn trà gỗ tự nhiên 5CBT-136{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <p className="special-price">
                                              <span className="price">6.590.000₫</span>
                                            </p>
                                            <p className="old-price">
                                              <span className="price">7.890.000₫</span>
                                            </p>
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
                                          <a href="/products/ban-tra-go-tu-nhien-5cbt-136">
                                            Chi tiết
                                          </a>
                                        </button>
                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart"
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
                              className="item slick-slide slick-active"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide11"
                              style={{ width: "273px" }}
                              data-slick-index="1"
                              aria-hidden="false"
                            >
                              <div className="col-item2">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                        className="thumb flip"
                                        title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
                                          alt="Kệ tivi phòng khách độc đáo 5CKT-17"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17"
                                          title="Kệ tivi phòng khách độc đáo 5CKT-17"
                                          tabIndex={0}
                                        >
                                          Kệ tivi phòng khách độc đáo 5CKT-17{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                8.250.000₫
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
                                          <a href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
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
                              className="item slick-slide slick-active"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide12"
                              style={{ width: "273px" }}
                              data-slick-index="2"
                              aria-hidden="false"
                            >
                              <div className="col-item3">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ke-tivi-phong-khach-dep-5ckt-08"
                                        className="thumb flip"
                                        title="Kệ tivi phòng khách đẹp 5CKT-08"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-phong-khach-kieu-dang-trang-nha-600x600.jpg?v=1577206170977"
                                          alt="Kệ tivi phòng khách đẹp 5CKT-08"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-phong-khach-dep-5ckt-08"
                                          title="Kệ tivi phòng khách đẹp 5CKT-08"
                                          tabIndex={0}
                                        >
                                          Kệ tivi phòng khách đẹp 5CKT-08{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                9.250.000₫
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
                                          <a href="/products/ke-tivi-phong-khach-doc-dao-5ckt-17">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
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
                              className="item slick-slide slick-active"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide13"
                              style={{ width: "273px" }}
                              data-slick-index="3"
                              aria-hidden="false"
                            >
                              <div className="col-item4">
                                <div className="sale-label sale-top-right">
                                  <span>- 23%</span>
                                </div>

                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168"
                                        className="thumb flip"
                                        title="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                        tabIndex={0}
                                      >
                                        <img
                                          className="lazyload loaded"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-go-tu-nhien-chan-cao-kt168-600x600.jpg?v=1577206060690"
                                          alt="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168"
                                          title="Kệ tivi gỗ tự nhiên chân cao 5CKT-168"
                                          tabIndex={0}
                                        >
                                          Kệ tivi gỗ tự nhiên chân cao 5CKT-168{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <p className="special-price">
                                              <span className="price">7.860.000₫</span>
                                            </p>
                                            <p className="old-price">
                                              <span className="price">10.200.000₫</span>
                                            </p>
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
                                          <a href="/products/ke-tivi-go-tu-nhien-chan-cao-5ckt-168">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
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
                              className="item slick-slide"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide14"
                              style={{ width: "273px" }}
                              data-slick-index="4"
                              aria-hidden="true"
                            >
                              <div className="col-item5">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ke-tivi-go-tu-nhien-5ckt-64"
                                        className="thumb flip"
                                        title="Kệ tivi Gỗ tự nhiên 5CKT-64"
                                        tabIndex={-1}
                                      >
                                        <img
                                          className="lazyload"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ban-tra-go-tu-nhien-bt136-600x600.jpg?v=1577206353823"
                                          alt="Kệ tivi Gỗ tự nhiên 5CKT-64"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ke-tivi-go-tu-nhien-5ckt-64"
                                          title="Kệ tivi Gỗ tự nhiên 5CKT-64"
                                          tabIndex={-1}
                                        >
                                          Kệ tivi Gỗ tự nhiên 5CKT-64{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                8.500.000₫
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
                                          tabIndex={-1}
                                        >
                                          <a href="/products/ke-tivi-go-tu-nhien-5ckt-64">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart"
                                          title="Mua hàng"
                                          type="button"
                                          tabIndex={-1}
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
                              className="item slick-slide"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide15"
                              style={{ width: "273px" }}
                              data-slick-index="5"
                              aria-hidden="true"
                            >
                              <div className="col-item6">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ban-tra-go-tu-nhien-ngan-keo-son-mau-5cbt-130"
                                        className="thumb flip"
                                        title="Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130"
                                        tabIndex={-1}
                                      >
                                        <img
                                          className="lazyload"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-ti-vi-phong-khach-doc-dao-600x600.jpg?v=1577206265990"
                                          alt="Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-go-tu-nhien-ngan-keo-son-mau-5cbt-130"
                                          title="Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130"
                                          tabIndex={-1}
                                        >
                                          Bàn trà gỗ tự nhiên ngăn kéo sơn màu 5CBT-130{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                8.600.000₫
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
                                          tabIndex={-1}
                                        >
                                          <a href="/products/ban-tra-go-tu-nhien-ngan-keo-son-mau-5cbt-130">
                                            Chi tiết
                                          </a>
                                        </button>
                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart"
                                          title="Mua hàng"
                                          type="button"
                                          tabIndex={-1}
                                        >
                                          <a href="/cart">
                                            Mua hàng
                                          </a>
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
                              className="item slick-slide"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide16"
                              style={{ width: "273px" }}
                              data-slick-index="6"
                              aria-hidden="true"
                            >
                              <div className="col-item7">
                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ban-tra-phong-khach-hien-dai-5cbt-17"
                                        className="thumb flip"
                                        title="Bàn trà phòng khách hiện đại 5CBT-17"
                                        tabIndex={-1}
                                      >
                                        <img
                                          className="lazyload"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-phong-khach-kieu-dang-trang-nha-600x600.jpg?v=1577206170977"
                                          alt="Bàn trà phòng khách hiện đại 5CBT-17"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-phong-khach-hien-dai-5cbt-17"
                                          title="Bàn trà phòng khách hiện đại 5CBT-17"
                                          tabIndex={-1}
                                        >
                                          Bàn trà phòng khách hiện đại 5CBT-17{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <span className="regular-price">
                                              {" "}
                                              <span className="price">
                                                4.600.000₫
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
                                          tabIndex={-1}
                                        >
                                          <a href="/products/ban-tra-phong-khach-hien-dai-5cbt-17">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
                                          title="Mua hàng"
                                          tabIndex={-1}
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
                              className="item slick-slide"
                              tabIndex={-1}
                              role="option"
                              aria-describedby="slick-slide17"
                              style={{ width: "273px" }}
                              data-slick-index="7"
                              aria-hidden="true"
                            >
                              <div className="col-item8">
                                <div className="sale-label sale-top-right">
                                  <span>- 10%</span>
                                </div>

                                <div className="item-inner">
                                  <div className="product-wrapper">
                                    <div className="thumb-wrapper">
                                      <a
                                        href="/products/ban-tra-go-cong-nghiep-chan-cao-go-tu-nhien-5cbt-124"
                                        className="thumb flip"
                                        title="Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên 5CBT-124"
                                        tabIndex={-1}
                                      >
                                        <img
                                          className="lazyload"
                                          src="https://bizweb.dktcdn.net/100/368/970/products/ke-tivi-go-tu-nhien-chan-cao-kt168-600x600.jpg?v=1577206060690"
                                          alt="Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên 5CBT-124"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="item-info">
                                    <div className="info-inner">
                                      <h3 className="item-title">
                                        {" "}
                                        <a
                                          href="/products/ban-tra-go-cong-nghiep-chan-cao-go-tu-nhien-5cbt-124"
                                          title="Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên 5CBT-124"
                                          tabIndex={-1}
                                        >
                                          Bàn trà gỗ công nghiệp chân cao gỗ tự nhiên
                                          5CBT-124{" "}
                                        </a>{" "}
                                      </h3>
                                      <div className="item-content">
                                        <div className="item-price">
                                          <div className="price-box">
                                            <p className="special-price">
                                              <span className="price">4.589.000₫</span>
                                            </p>
                                            <p className="old-price">
                                              <span className="price">5.120.000₫</span>
                                            </p>
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
                                          tabIndex={-1}
                                        >
                                          <a href="/products/ban-tra-go-cong-nghiep-chan-cao-go-tu-nhien-5cbt-124">
                                            Chi tiết
                                          </a>
                                        </button>

                                        <input type="hidden" tabIndex={0} />
                                        <button
                                          className="button btn-cart add_to_cart"
                                          title="Mua hàng"
                                          tabIndex={-1}
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
      <div className="main-col5">
        <section className="latest-blog">
          <div className="container">
            <div className="blog-title new_title lt">
              <h1>
                <a href="tin-tuc" title="Kiến thức Phong Thủy">
                  <span>Kiến thức Phong Thủy</span>
                </a>
              </h1>
            </div>

            <div className="row x">
              <div className="col-xs-12 col-sm-6 col-md-4 item_bl_index">
                <div className="blog_inner">
                  <div className="blog-img blog-l">
                    <a
                      href="/thiet-ke-phong-bep-hien-dai-2020"
                      title="Thiết kế phòng bếp hiện đại 2020"
                    >
                      <img
                        className="lazyload loaded"
                        src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/6-650x339.jpg?v=1574742415567"
                        data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/6-650x339.jpg?v=1574742415567"
                        alt="Thiết kế phòng bếp hiện đại 2020"
                        data-was-processed="true"
                      />
                    </a>
                  </div>
                  <h3>
                    <a
                      href="/thiet-ke-phong-bep-hien-dai-2020"
                      title="Thiết kế phòng bếp hiện đại 2020"
                    >
                      Thiết kế phòng bếp hiện đại 2020
                    </a>{" "}
                  </h3>
                  <p className="justify line-3">
                    Phong thủy phòng bếp có ý nghĩa rất quan trọng đối với sự
                    thăng tiến, tài lộc cũng như sức khỏe của các thành viên
                    trong gia đình. Vì vậy...
                  </p>
                </div>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-4 item_bl_index">
                <div className="blog_inner">
                  <div className="blog-img blog-l">
                    <a
                      href="/noi-that-phong-khach-nhap-khau-duoc-ua-chuong-trong-2019"
                      title="Nội thất phòng khách nhập khẩu được ưa chuộng trong 2019"
                    >
                      <img
                        className="lazyload loaded"
                        src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/noi-that-phong-khach-nhap-khau-dep4-650x339.jpg?v=1574742714653"
                        data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/noi-that-phong-khach-nhap-khau-dep4-650x339.jpg?v=1574742714653"
                        alt="Nội thất phòng khách nhập khẩu được ưa chuộng trong 2019"
                        data-was-processed="true"
                      />
                    </a>
                  </div>
                  <h3>
                    <a
                      href="/noi-that-phong-khach-nhap-khau-duoc-ua-chuong-trong-2019"
                      title="Nội thất phòng khách nhập khẩu được ưa chuộng trong 2019"
                    >
                      Nội thất phòng khách nhập khẩu được ưa chuộng trong 2019
                    </a>{" "}
                  </h3>
                  <p className="justify line-3">
                    Nếu ví ngôi nhà là một cá thể nhất định thì không gian phòng
                    khách chính là vẻ bề ngoài còn nội thất của phòng khách thể
                    hiện phần nào...
                  </p>
                </div>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-4 item_bl_index">
                <div className="blog_inner">
                  <div className="blog-img blog-l">
                    <a
                      href="/thiet-ke-phong-khach-tinh-te-va-sang-trong"
                      title="Thiết kế phòng khách tinh tế và sang trọng"
                    >
                      <img
                        className="lazyload loaded"
                        src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/picture7-650x339.png?v=1574743108017"
                        data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/picture7-650x339.png?v=1574743108017"
                        alt="Thiết kế phòng khách tinh tế và sang trọng"
                        data-was-processed="true"
                      />
                    </a>
                  </div>
                  <h3>
                    <a
                      href="/thiet-ke-phong-khach-tinh-te-va-sang-trong"
                      title="Thiết kế phòng khách tinh tế và sang trọng"
                    >
                      Thiết kế phòng khách tinh tế và sang trọng
                    </a>{" "}
                  </h3>
                  <p className="justify line-3">
                    THIẾT KẾ PHÒNG KHÁCH HƯỚNG TỚI SỰ TINH TẾ VÀ SANG TRỌNG CHO
                    GIA CHỦ &nbsp; Các giải pháp thiết kế phòng khách: Với bề
                    dày kinh nghiệm từ việc thiết kế,...
                  </p>
                </div>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-4 item_bl_index">
                <div className="blog_inner">
                  <div className="blog-img blog-l">
                    <a
                      href="/phong-thay-do-closet-trong-nha-khong-gian-song-nen-co-cua-phu-nu-hien-dai"
                      title="Phòng thay đồ (Closet) trong nhà – Không gian sống nên có của phụ nữ hiện đại"
                    >
                      <img
                        className="lazyload loaded"
                        src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/tin-tuc-650x339.jpg?v=1574743375003"
                        data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/tin-tuc-650x339.jpg?v=1574743375003"
                        alt="Phòng thay đồ (Closet) trong nhà – Không gian sống nên có của phụ nữ hiện đại"
                        data-was-processed="true"
                      />
                    </a>
                  </div>
                  <h3>
                    <a
                      href="/phong-thay-do-closet-trong-nha-khong-gian-song-nen-co-cua-phu-nu-hien-dai"
                      title="Phòng thay đồ (Closet) trong nhà – Không gian sống nên có của phụ nữ hiện đại"
                    >
                      Phòng thay đồ (Closet) trong nhà – Không gian sống nên có
                      của phụ nữ hiện đại
                    </a>{" "}
                  </h3>
                  <p className="justify line-3">
                    “Phụ nữ hiện đại, ra đường phải ăn mặc như công chúa và sống
                    như một nữ thần, là bà hoàng của cuộc đời mình, kiêu hãnh và
                    tỏa hương”. Vì...
                  </p>
                </div>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-4 item_bl_index">
                <div className="blog_inner">
                  <div className="blog-img blog-l">
                    <a
                      href="/tan-trang-phong-ngu-dep-voi-noi-that-cao-cap-dip-cuoi-nam"
                      title="Tân trang phòng ngủ đẹp với nội thất cao cấp dịp cuối năm"
                    >
                      <img
                        className="lazyload loaded"
                        src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/tan-trang-noi-that-phong-ngu-dep-650x339.jpg?v=1574743741250"
                        data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/tan-trang-noi-that-phong-ngu-dep-650x339.jpg?v=1574743741250"
                        alt="Tân trang phòng ngủ đẹp với nội thất cao cấp dịp cuối năm"
                        data-was-processed="true"
                      />
                    </a>
                  </div>
                  <h3>
                    <a
                      href="/tan-trang-phong-ngu-dep-voi-noi-that-cao-cap-dip-cuoi-nam"
                      title="Tân trang phòng ngủ đẹp với nội thất cao cấp dịp cuối năm"
                    >
                      Tân trang phòng ngủ đẹp với nội thất cao cấp dịp cuối năm
                    </a>{" "}
                  </h3>
                  <p className="justify line-3">
                    Chỉ còn vài tháng nữa thôi là một năm nữa kết thúc, đây
                    chính là lúc mọi người quan tâm đến&nbsp;nội thất&nbsp;và
                    mọi đồ vật xung quanh gia đình mình....
                  </p>
                </div>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-4 item_bl_index">
                <div className="blog_inner">
                  <div className="blog-img blog-l">
                    <a
                      href="/khong-gian-noi-that-dep-voi-chat-lieu-go-cao-cap"
                      title="Không gian nội thất đẹp với chất liệu gỗ cao cấp"
                    >
                      <img
                        className="lazyload loaded"
                        src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/noi-that-go-phong-an-nha-bep-650x339.jpg?v=1574743950557"
                        data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/noi-that-go-phong-an-nha-bep-650x339.jpg?v=1574743950557"
                        alt="Không gian nội thất đẹp với chất liệu gỗ cao cấp"
                        data-was-processed="true"
                      />
                    </a>
                  </div>
                  <h3>
                    <a
                      href="/khong-gian-noi-that-dep-voi-chat-lieu-go-cao-cap"
                      title="Không gian nội thất đẹp với chất liệu gỗ cao cấp"
                    >
                      Không gian nội thất đẹp với chất liệu gỗ cao cấp
                    </a>{" "}
                  </h3>
                  <p className="justify line-3">
                    Gỗ là chất liệu quen thuộc và gần gũi với cuộc sống của
                    người Việt từ xưa đến nay. Vì thế, trang trí không gian nội
                    thất đẹp với chất...
                  </p>
                </div>
              </div>
            </div>
            <div className="view_more">
              <a href="tin-tuc" title="Xem tất cả">
                Xem tất cả
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
