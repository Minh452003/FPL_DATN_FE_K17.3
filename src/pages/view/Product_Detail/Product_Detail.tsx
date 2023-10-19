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

const Product_Detail = () => {
  const { idProduct } = useParams();
  // console.log(idProduct)

  const { data, isLoading } = useGetProductByIdQuery(idProduct || "");
  // console.log(data?.product)
  const listOneData = data?.product;
  // console.log(listOneData?.image.url)

  const { data: brand } = useGetBrandQuery();
  const brandList = brand?.brand;

  const brandListOne = brandList?.find(
    (brandList: any) => brandList?._id === listOneData?.brandId
  )?.brand_name;
  // console.log(brandListOne)

  const { data: catgory } = useGetCategoryQuery();
  //  console.log(catgory);

  const categoryLish = catgory?.category.docs;
  // console.log(categoryLish);
  const categoryLishOne = categoryLish?.find(
    (categoryLish: any) => categoryLish?._id === listOneData?.categoryId
  )?.category_name;
  // console.log(categoryLishOne);

  const { data: material } = useGetMaterialQuery();
  // console.log(material);
  const materialList = material?.material;
  //  console.log(materialList);
  const materialLishOne = materialList?.find(
    (materialList: any) => materialList?._id === listOneData?.materialId
  )?.material_name;
  //  console.log(materialLishOne);
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
            <p className="price">{listOneData?.product_price}</p>
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
                <div className="text2 pl-8 lp">Còn hàng</div>
              </div>
              <div className="col-span-2 flex">
                <div className="text1">Mã sản phẩm:</div>
                <div className="text2 pl-3 up">Đang cập nhật...</div>
              </div>
              <div className="col-span-2 flex">
                <div className="text1">Hãng sản xuất:</div>
                <div className="text2 pl-1">{brandListOne}</div>
              </div>
              <div className="col-span-2 flex">
                <div className="text1">Loại:</div>
                <div className="text2 pl-20 kj">{categoryLishOne}</div>
              </div>
              <div className="col-span-2 flex">
                <div className="text1">Chất liệu:</div>
                <div className="text2 pl-20 kj">{materialLishOne}</div>
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
              <div className="quantity">
                <p>{listOneData?.sold_quantity}</p>
              </div>
              <div className="flex">
                <button
                  aria-label="Decrease"
                  className="btn3 btn-solid-primary3 btn-c"
                >
                  -
                </button>
                <input
                  className="btn4 btn-solid-primary4 btn-d mn"
                  aria-live="assertive"
                  aria-valuenow={1}
                  value={1}
                />
                <button
                  aria-label="Increase"
                  className="btn5 btn-solid-primary5 btn-e"
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
              <div className="information">
                <p>{listOneData?.description}</p>
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
          <div className="include">
            <input type="radio" id="chi-tiet" name="tab" checked />
            <label
              htmlFor="chi-tiet"
              className="detail tab-link current"
              data-tab="tab-1"
            >
              Thông tin chi tiết
            </label>

            <input type="radio" id="binh-luan" name="tab" />
            <label
              htmlFor="binh-luan"
              className="comment tab-link"
              data-tab="tab-2"
            >
              Bình luận
            </label>

            <hr />

            <div id="chi-tiet-content">
              <ul className="abcd">
                <li>Phòng ngủ có vai trò quan trọng</li>
                <li>đối với mỗi cá nhân để định hình</li>
                <li>cá tính và quan điểm sống của chủ nhân</li>
                <li>khi nghỉ ngơi mỗi ngày để lấy lại năng lượng</li>
                <li>mỗi ngày hứng khởi vừa có không gian</li>
                <li>nghiên cứu và sáng tạo cho học tập...</li>
              </ul>
            </div>

            <div id="binh-luan-content">
              <div className="evaluate">
                <img
                  className="avatar"
                  src="https://haycafe.vn/wp-content/uploads/2022/03/Background-cay-xanh-tren-thao-nguyen.jpg"
                  alt=""
                />
                <p>Lộc</p>
              </div>
              <div className="col-span-2 flex mt-3">
                <div className="text5">2023-01-01 12:00</div>
              </div>
              <div className="col-span-2 flex">
                <div className="text3">Màu sắc:</div>
                <div className="text4 pl-3">Nâu nhạt</div>
              </div>
              <div className="col-span-2 flex">
                <div className="text3">Kích thước:</div>
                <div className="text4 pl-1">S</div>
              </div>
              <div className="col-span-2 flex">
                <div className="text3">Đồ gỗ xịn</div>
              </div>
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
              <hr />
              <div className="evaluate1">
                <img
                  className="avatar"
                  src="https://haycafe.vn/wp-content/uploads/2022/03/Background-cay-xanh-tren-thao-nguyen.jpg"
                  alt=""
                />
                <p>Nhận xét của bạn</p>
              </div>
              <input type="text" className="fill" />
              <button
                type="button"
                aria-disabled="false"
                className="btn7 btn-solid-primary7 btn-g"
              >
                Gửi
              </button>
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
                <h4 className="text-center ml-20 mt-10 cd">
                  SẢN PHẨM LIÊN QUAN
                </h4>

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
