import { FaArrowRight } from "react-icons/fa";
import "./Product_detail.css";
import "./Responsive_Product_Detail.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetProductViewsQuery,
  useGetProductsQuery,
} from "@/api/productApi";
import { useGetBrandQuery } from "@/api/brandApi";
import { useGetCategoryQuery } from "@/api/categoryApi";
import { useGetMaterialQuery } from "@/api/materialApi";
import { Button, Image, Skeleton, Tooltip } from "antd";
import { useEffect, useState } from "react";
import {
  useGetChildProductByProductIdQuery,
  useGetChildProductPriceQuery,
} from "@/api/chilProductApi";
import { useGetColorsQuery } from "@/api/colorApi";
import { useGetSizeQuery } from "@/api/sizeApi";
import { Tab, initTE } from "tw-elements";
import {
  useGetCommentByProductIdQuery,
  useRemoveCommentMutation,
} from "@/api/commentApi";
import { useAddCartMutation } from "@/api/cartApi";
import { getDecodedAccessToken } from "@/decoder";
import Swal from "sweetalert2";
import { AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";

const Product_Detail = () => {
  const { idProduct }: any = useParams();
  const decodedToken: any = getDecodedAccessToken();
  const id = decodedToken ? decodedToken.id : null;
  const {
    data,
    isLoading: isLoadingFetching,
    error,
  }: any = useGetProductByIdQuery(idProduct || "");
  const { data: colors, isLoading: isLoadingColor } = useGetColorsQuery<any>();
  const { data: sizes, isLoading: isLoadingSize } = useGetSizeQuery<any>();
  const { data: products, isLoading: isLoadingProduct }: any =
    useGetProductsQuery();
  const { data: comment, isLoading: isLoadingComment }: any =
    useGetCommentByProductIdQuery(idProduct || "");
  const [addCart, resultAdd] = useAddCartMutation();
  const [quantity, setQuantity] = useState(1); // Sử dụng useState để quản lý số lượng
  const [activeColor, setActiveColor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(false);

  //comment
  const [removeComment, { isLoading: isRemoveLoading }] =
    useRemoveCommentMutation();
  const commentProductDetail = isLoadingComment ? [] : comment?.comments;
  const totalRating =
    commentProductDetail?.reduce(
      (total: number, item: any) => total + item.rating,
      0
    ) || 0;
  let averageRating = 0;
  if (commentProductDetail && commentProductDetail.length > 0) {
    // Kiểm tra xem commentProductDetail tồn tại và có ít nhất một phần tử
    averageRating = totalRating / commentProductDetail.length;
  }
  const roundedAverageRating: number = Number(averageRating.toFixed(1));
  const deleteComment = ({ id, userId }: any): any => {
    Swal.fire({
      title: "Bạn chắc chứ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, tôi chắc chắn!",
      cancelButtonText: "Huỷ",
    }).then((result) => {
      if (result.isConfirmed) {
        removeComment({ id, userId })
          .unwrap()
          .then(() => {
            Swal.fire("Xoá thành công!", "success");
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire("Thất bại", "Bình luận xoá thất bại :)", "error");
      }
    });
  };

  //
  const listOneData = data?.product;
  const similarProducts = products?.product?.docs.filter(
    (siproduct: any) => siproduct.categoryId === listOneData?.categoryId
  );
  useEffect(() => {
    initTE({ Tab });
  }, [selectedIndex]);
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
  // --------------------------
  const { data: childProducts, isLoading: isLoadingChild }: any =
    useGetChildProductByProductIdQuery(idProduct || "");
  const { data: childProduct }: any = useGetChildProductPriceQuery({
    productId: idProduct,
    sizeId: activeSize,
    colorId: activeColor,
  });
  const { data: productView }: any = useGetProductViewsQuery(idProduct);
  const [uniqueColors, setUniqueColors] = useState(new Set());
  const [filteredColors, setFilteredColors] = useState([]);
  const [uniqueSizes, setUniqueSizes] = useState(new Set());
  const [filteredSizes, setFilteredSizes] = useState([]);
  // Sử dụng useEffect để cập nhật danh sách màu duy nhất từ danh sách childProducts
  useEffect(() => {
    const uniqueColorsSet = new Set();
    const filteredProducts: any = [];
    childProducts?.products.forEach((product: any) => {
      const colorId = product.colorId;
      if (!uniqueColorsSet.has(colorId)) {
        uniqueColorsSet.add(colorId);
        filteredProducts.push(product);
      }
    });
    setUniqueColors(uniqueColorsSet);
    setFilteredColors(filteredProducts);
  }, [childProducts]);
  // Sử dụng useEffect để cập nhật danh sách kích cỡ duy nhất từ danh sách sizes
  useEffect(() => {
    const uniqueSizesSet = new Set();
    const filteredSizesList: any = [];

    childProducts?.products.forEach((product: any) => {
      const sizeId = product.sizeId;
      if (!uniqueSizesSet.has(sizeId)) {
        uniqueSizesSet.add(sizeId);
        filteredSizesList.push(product);
      }
    });

    setUniqueSizes(uniqueSizesSet);
    setFilteredSizes(filteredSizesList);
  }, [childProducts]);
  // --------------------------
  const userId: string = id;

  const handleAddToCart = () => {
    if (data && userId) {
      const data: any = {
        productId: listOneData._id,
        product_name: listOneData.product_name,
        product_price: childProduct?.product?.product_price,
        image: listOneData.image[0]?.url,
        stock_quantity: quantity,
        colorId: activeColor,
        sizeId: activeSize,
        materialId: listOneData.materialId,
      };

      Swal.fire({
        title: "Bạn chắc chứ?",
        text: "Sản phẩm sẽ được thêm vào giỏ hàng!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng,tôi chắc chắn!",
        cancelButtonText: "Huỷ",
      }).then((result) => {
        if (result.isConfirmed) {
          // Xóa sản phẩm
          addCart({ data, userId }).then((response: any) => {
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
          Swal.fire("Huỷ", "Sản phẩm không được thêm vào giỏ hàng:)", "error");
        }
      });
    }
  };

  const formatCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Cập nhật số lượng
    }
  };
  const increaseQuantity = () => {
    // Tăng số lượng lên 1 nếu chưa đạt tới giới hạn của stock_quantity
    if (quantity < childProduct?.product?.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };
  useEffect(() => {
    setQuantity(1);
  }, [childProduct]);
  const handleClickSize = (sizeId: any) => {
    setActiveSize(sizeId);
  };
  const handleClickColor = (colorId: any) => {
    setActiveColor(colorId);
  };
  const [slidesPerView, setSlidesPerView] = useState(1); // Mặc định là 1
  useEffect(() => {
    // Xác định kích thước màn hình và cài đặt slidesPerView dựa trên kích thước
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(4); // Đối với laptop và màn hình lớn hơn
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2); // Đối với iPad
      } else {
        setSlidesPerView(1); // Đối với màn hình nhỏ hơn, ví dụ điện thoại
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Gọi lần đầu khi tải trang

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt
    });
  };
  if (isLoadingFetching) return <Skeleton />;
  if (isLoadingChild) return <Skeleton />;
  if (isLoadingColor) return <Skeleton />;
  if (isLoadingSize) return <Skeleton />;
  if (isLoadingProduct) return <Skeleton />;
  if (isLoadingComment) return <Skeleton />;
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
            {childProduct ? (
              <p className="price">
                {formatCurrency(childProduct?.product?.product_price)}₫
              </p>
            ) : (
              <p className="price">
                {formatCurrency(listOneData?.product_price)}₫
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 np">
            <div className="product-image">
              <div className="mb-6">
                {listOneData?.image?.map((img: any, index: any) => {
                  if (!selectedIndex && index === 0) {
                    return (
                      <div
                        className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                        id={`image-tab-${index}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${index}`}
                        key={`image-content-${index}`}
                        data-te-tab-active
                      >
                        <img src={img?.url} className={`object-cover img1`} />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                        id={`image-tab-${index}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${index}`}
                        key={`image-content-${index}`}
                      >
                        <img src={img?.url} className={`object-cover img1`} />
                      </div>
                    );
                  }
                })}
              </div>
              <ul
                className="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row"
                id="pills-tab"
                role="tablist"
                data-te-nav-ref
              >
                {listOneData?.image?.map((img: any, index: any) => (
                  <li role="presentation" key={img.publicId}>
                    <Link
                      to={`#image-tab-${index}`}
                      className={`test my-2 block rounded bg-neutral-100 text-xs font-medium uppercase leading-tight text-neutral-500 ${selectedIndex === index
                          ? "bg-primary-100 text-primary-700"
                          : "bg-neutral-700 text-white"
                        } md:mr-4 `}
                      id={`image-tab-${index}`}
                      data-te-toggle="tab"
                      key={`tab-${index}`}
                      data-te-tab-active={index === 0 ? "true" : "false"}
                      role="tab"
                      aria-controls={`image-tab-${index}`}
                      aria-selected="false"
                      onClick={() => setSelectedIndex(true)}
                    >
                      <img src={img?.url} className="pill-img" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="product-text">
              <div className="col-span-2 flex mt-4 ef">
                <div className="text1">Tình trạng:</div>
                <div className="text2 pl-10 lp">Còn hàng</div>
              </div>
              <div className="col-span-2 flex ef">
                <div className="text1">Đã bán: </div>
                <div className="text2 pl-16 lp">
                  {listOneData?.sold_quantity} chiếc
                </div>
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
                <div className="flex">
                  {childProducts ? (
                    filteredColors.map((color: any) => {
                      const colorname = colors?.color?.find(
                        (colors: any) => colors._id === color.colorId
                      );
                      const isActive = color.colorId === activeColor;
                      return (
                        <button
                          key={color.colorId}
                          aria-label="M"
                          aria-disabled="false"
                          className={`btn2 btn-solid-primary2 btn-b ${isActive ? "active1" : ""
                            }`}
                          onClick={() => handleClickColor(color.colorId)}
                        >
                          {colorname.colors_name}
                        </button>
                      );
                    })
                  ) : (
                    <p className="sp2">Không có màu</p>
                  )}
                </div>
              </div>
              <div className="size">
                <p>Kích thước</p>
                <div className="flex">
                  {childProducts ? (
                    filteredSizes.map((size: any) => {
                      const sizesname = sizes?.size?.find(
                        (s: any) => s._id == size.sizeId
                      );
                      const isActive = size.sizeId === activeSize;
                      return (
                        <button
                          key={size.sizeId}
                          aria-label="M"
                          aria-disabled="false"
                          className={`btn2 btn-solid-primary2 btn-b ${isActive ? "active1" : ""
                            }`}
                          onClick={() => handleClickSize(size.sizeId)}
                          type="submit"
                        >
                          {sizesname.size_name}
                        </button>
                      );
                    })
                  ) : (
                    <p className="sp2">Không có kích thước</p>
                  )}
                </div>
              </div>
              {childProduct ? (
                <p className="sp1">
                  Còn {childProduct.product.stock_quantity} sản phẩm
                </p>
              ) : (
                ""
              )}
              <div className="flex button">
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
                <Tooltip
                  title={
                    id && activeColor && activeSize
                      ? ""
                      : "Bạn phải chọn màu và kích thước"
                  }
                >
                  {resultAdd.isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin m-auto" />
                  ) : (
                    <Button
                      aria-disabled={!id || !activeColor || !activeSize}
                      className="btn6 btn-solid-primary6 btn-f hl"
                      onClick={() => {
                        if (id && activeColor && activeSize) {
                          handleAddToCart();
                        }
                      }}
                    >
                      MUA HÀNG
                    </Button>
                  )}
                </Tooltip>
                <Link
                  to={`/customized/${idProduct}/add`}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <button
                    type="button"
                    aria-disabled="false"
                    className="btn10 btn-solid-primary10 btn-p hq"
                  >
                    TỰ THIẾT KẾ
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="include">
            <input type="radio" id="chi-tiet" name="tab" defaultChecked />
            <label
              htmlFor="chi-tiet"
              className="detail tab-link"
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
              <div className="flex">
                <span>Bình Luận</span>
                <div className="text-sm">
                  {commentProductDetail
                    ? ` (${commentProductDetail.length})`
                    : " (0)"}
                </div>
              </div>
              <hr className="w-50" />
            </label>
            <div id="chi-tiet-content">
              <br />
              <div className="max-w-4xl mx-auto px-4">
                <div className="text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: listOneData?.description }}></div>
              </div>
            </div>
            <div id="binh-luan-content">
              <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <div>
                  <div className="font-semibold text-2xl mb-4">
                    Đánh giá sản phẩm{" "}
                  </div>
                  <div className="max-w-4xl mx-auto px-4">
                    <span style={{ fontSize: "1.5em" }}>
                      {roundedAverageRating}
                    </span>
                    trên 5
                    {commentProductDetail
                      ? ` (${commentProductDetail.length} lượt đánh giá)`
                      : " (0)"}
                  </div>
                  <div className="max-w-4xl mx-auto px-4 flex mb-6">
                    {Array.from(
                      { length: Math.round(roundedAverageRating) },
                      (_, index) => (
                        <AiFillStar key={index} style={{ color: "orange" }} />
                      )
                    )}
                  </div>
                </div>
                <hr className="w-72" />
                <div className="max-w-4xl mx-auto px-4">
                  {comment ? (
                    commentProductDetail.map((comment: any) => (
                      <article
                        key={comment._id}
                        className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
                      >
                        <footer className="flex items-center footer1">
                          <div className="evaluate">
                            <div className="inline-flex items-center mr-3 text-xs text-gray-900 dark:text-white font-semibold">
                              <Image
                                className="mr-2 w-8 h-8 rounded-full avatar"
                              // src={comment?.userId.avatar?.url}
                              />
                              <a className="cm-name">
                                {comment.userId?.last_name}
                              </a>
                              <a className="cm-name1 font-normal ">
                                {comment.formattedCreatedAt}
                              </a>
                            </div>
                          </div>
                        </footer>

                        <div className="stars ml-16 flex">
                          <div className="star-rating">
                            {Array.from(
                              { length: comment.rating },
                              (_, index) => (
                                <AiFillStar
                                  key={index}
                                  style={{ color: "orange" }}
                                />
                              )
                            )}
                          </div>

                          {comment.userId ? (
                            <div className="button-wrapper">
                              <Button
                                className="text-red-500"
                                size="small"
                                onClick={() =>
                                  deleteComment({
                                    id: comment._id,
                                    userId: comment.userId._id,
                                  })
                                }
                              >
                                {isRemoveLoading ? (
                                  <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                  <FaTrashCan style={{ width: "10px" }} />
                                )}
                              </Button>
                            </div>
                          ) : null}
                        </div>

                        <p className="ml-16 text-gray-500 dark:text-gray-400">
                          {comment.description}
                        </p>
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
                    ))
                  ) : (
                    <p className="sp2 ">Không có binh luận</p>
                  )}
                </div>
              </section>
            </div>
          </div>
          {/*  */}
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
                      slidesPerView={slidesPerView}
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
                          {similarProducts
                            ? similarProducts.map(
                              (similar: any, index: any) => (
                                <SwiperSlide
                                  style={{
                                    width: "285px",
                                    marginLeft: "27px",
                                  }}
                                  key={similar._id}
                                >
                                  <div
                                    className="items slick-slides slick-currents slick-actives"
                                    tabIndex={-1}
                                    role="option"
                                    aria-describedby={`slick-slide${index + 10
                                      }`}
                                    style={{
                                      width: "235px",
                                      marginLeft: "-18px",
                                      // marginRight: "37px",
                                    }}
                                    data-slick-index={`${index}`}
                                    aria-hidden="false"
                                  >
                                    <div className="col-item5s">
                                      <div className="item-inners">
                                        <div className="product-wrappers">
                                          <div className="thumb-wrappers">
                                            <Link
                                              to={""}
                                              className="thumbs flips"
                                              title="Bàn trà gỗ tự nhiên 5CBT-136"
                                              tabIndex={0}
                                            >
                                              <img
                                                className="lazyloads loadeds"
                                                src={similar.image[0].url}
                                              />
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="item-infos">
                                          <div className="info-inners">
                                            <h3 className="item-titles">
                                              {" "}
                                              <Link to={""} tabIndex={0}>
                                                {similar.product_name}{" "}
                                              </Link>{" "}
                                            </h3>
                                            <div className="item-contents">
                                              <div className="item-prices">
                                                <div className="price-boxs">
                                                  <p className="special-prices">
                                                    <span className="prices">
                                                      {formatCurrency(
                                                        similar?.product_price
                                                      )}
                                                      ₫
                                                    </span>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="actionss hidden-xs hidden-sm remove_html">
                                            <form>
                                              <input
                                                type="hidden"
                                                tabIndex={0}
                                              />
                                              <button
                                                className="buttons btn-carts"
                                                title="Mua hàng"
                                                type="button"
                                                tabIndex={0}
                                              >
                                                <Link
                                                  onClick={scrollToTop}
                                                  to={`/products/${similar._id}`}
                                                >
                                                  Chi tiết
                                                </Link>
                                              </button>
                                              <button
                                                className="buttons btn-carts"
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
                                </SwiperSlide>
                              )
                            )
                            : "Không có sản phẩm liên quan"}
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
