import { FaArrowRight, FaCompress, FaExpand } from "react-icons/fa";
import "./CustomizedProductAdd.css";
import "./Responsive_CustomizedProductAdd.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/api/productApi";
import { useGetMaterialQuery } from "@/api/materialApi";
import { Button, Skeleton, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useGetColorsQuery } from "@/api/colorApi";
import { useGetSizeQuery } from "@/api/sizeApi";
import { Tab, initTE } from "tw-elements";
import { getDecodedAccessToken } from "@/decoder";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGetCategoryQuery } from "@/api/categoryApi";
import { useAddCustomProductMutation } from "@/api/CustomizedProductAPI";
import Swal from "sweetalert2";

const CustomizedProductAdd = () => {
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
  const { data: materials, isLoading: isLoadingMaterial } =
    useGetMaterialQuery<any>();
  const [quantity, setQuantity] = useState(1); // Sử dụng useState để quản lý số lượng
  const [activeColor, setActiveColor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [activeMaterial, setActiveMaterial] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(false);
  const listOneData = data?.product;
  const navigate = useNavigate();

  const [showAllColors, setShowAllColors] = useState(false);
  const [showAllSizes, setShowAllSizes] = useState(false);
  const [showAllMaterials, setShowAllMaterials] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { data: catgory }: any = useGetCategoryQuery();
  const categoryLish = catgory?.category.docs;
  const categoryLishOne = categoryLish?.find(
    (categoryLish: any) => categoryLish?._id === listOneData?.categoryId
  )?.category_name;
  useEffect(() => {
    initTE({ Tab });
  }, [selectedIndex]);
  const handleToggleColors = () => {
    setShowAllColors(!showAllColors);
    setExpanded(!expanded);
  };

  const handleToggleMaterials = () => {
    setShowAllMaterials(!showAllMaterials);
  };

  const [addCustom, resultAdd]: any = useAddCustomProductMutation();
  const handleAddToCart = () => {
    if (data && id) {
      const data: any = {
        userId: id,
        productId: idProduct,
        categoryId: listOneData.categoryId,
        product_name: listOneData.product_name,
      product_price:  Number(listOneData.product_price),
        image: listOneData.image,
        stock_quantity: quantity,
        colorId: activeColor,
        sizeId: activeSize,
        materialId: activeMaterial,
      };

      Swal.fire({
        title: "Bạn chắc chứ?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng,tôi chắc chắn!",
        cancelButtonText: "Huỷ",
      }).then((result) => {
        if (result.isConfirmed) {
          // Xóa sản phẩm
          addCustom(data).then((response: any) => {
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
                "Thành công!",
                "Thêm sản phẩm tự thiết kế thành công.",
                "success"
              );
              navigate("/customizedProducts");
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Hiển thị thông báo hủy xóa sản phẩm
          Swal.fire("Huỷ", "Thêm sản phẩm tự thiết kế thất bại", "error");
        }
      });
    }
  };

  const formatCurrency = (number: { toString: () => string }) => {
    if (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return "0"; // Giá trị mặc định hoặc xử lý khác
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Cập nhật số lượng
    }
  };
  const increaseQuantity = () => {
    // Tăng số lượng lên 1 nếu chưa đạt tới giới hạn của stock_quantity

    setQuantity(quantity + 1);
  };

  const handleClickSize = (sizeId: any) => {
    setActiveSize(sizeId);
  };
  const handleClickColor = (colorId: any) => {
    setActiveColor(colorId);
  };
  const handleClickMaterial = (materialId: any) => {
    setActiveMaterial(materialId);
  };

  if (isLoadingColor) return <Skeleton />;
  if (isLoadingSize) return <Skeleton />;
  if (isLoadingMaterial) return <Skeleton />;

  if (error) {
    if ("data" in error && "status" in error) {
      return (
        <div>
          {error.status} - {JSON.stringify(error.data)}
        </div>
      );
    }
  }

  const content1Element = document.querySelector(".content1") as HTMLElement;

  if (content1Element) {
    content1Element.style.height = `${expanded ? 1380 : 1062}px`;
  } else {
    console.error('Không tìm thấy phần tử có lớp là "content1"');
  }

  return (
    <div className={`container_swap ${expanded ? "expanded" : ""}`}>
      <div className="container">
        <div className="flex items-center my-4 px-3">
          <div className="float-left font-bold">Trang Chủ</div>
          <FaArrowRight className="ml-2" />
          <div className="pl-2">{categoryLishOne}</div>
          <FaArrowRight className="ml-2" />
          <div className="pl-2">{listOneData?.product_name}</div>
        </div>
        <div className="content1 py-3 ">
         
          
          <div className="grid grid-cols-2 gap-2 ">
            <div className="px-3">
              <div className="mb-6s">
                
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
                className="mb-5s flex list-none flex-col flex-wrap pl-0 md:flex-row"
                id="pills-tab"
                role="tablist"
                data-te-nav-ref
              >
                {listOneData?.image?.map((img: any, index: any) => (
                  <li role="presentation">
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
                      <img src={img?.url} className="pill-img1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
            <div className=" flex  items-center justify-between ">
            <h3 className="font-bold iklm   ">{listOneData?.product_name}</h3>    
             </div>
            <p className=" text-red-700 font-bold text-2xl py-3"> {formatCurrency(listOneData?.product_price)}₫</p>
           
              <div
                className="text-l font-bold py-2"
                style={{ height: showAllColors ? "auto" : "" }}
              >
                <p>Màu sắc</p>
                <div className="flex flex-wrap">
                  {colors ? (
                    colors.color
                      .slice(0, showAllColors ? colors.color.length : 3)
                      .map((color: any, index: number) => {
                        const isActive = color._id === activeColor;
                        return (
                          <div key={color._id} className="flex-row mb-2 mr-2">
                            <button
                              aria-label="M"
                              aria-disabled="false"
                              className={` ${isActive ? "active1" : ""} text-[12px] py-1  min-w-32 border border-gray-500 rounded-md px-3 ${isActive ? "bg-blue-500 text-white" : "bg-white text-black"
                                }`}
                              onClick={() => handleClickColor(color._id)}
                            >
                              {color.colors_name}
                            </button>
                          </div>
                        );
                      })
                  ) : (
                    <p className="sp2s">Không có màu</p>
                  )}
                </div>
                {colors && colors.color.length > 3 && (
                  <button
                    onClick={handleToggleColors}
                    className={`btn-show-more ${showAllColors ? "collapses" : "expand"
                      }`}
                  >

                    {showAllColors ? "-- Thu gọn --" : "Xem thêm ++"}
                  </button>
                )}
              </div>

              <div className="text-l font-bold py-2">
                <p>Kích thước</p>
                <div className="flex flex-wrap">
                  {sizes ? (
                    sizes.size
                      .slice(0, showAllSizes ? sizes.size.length : 3)
                      .map((size: any, index: number) => {
                        const isActive = size._id === activeSize;
                        return (
                          <div key={size._id} className="flex-row mb-2 mr-2">
                            <button
                              aria-label="M"
                              aria-disabled="false"
                              className={` ${isActive ? "active1" : ""}  text-[12px] py-1 border border-gray-500 rounded-md px-3 ${isActive ? "bg-blue-500 text-white" : "bg-white text-black"
                                }`}
                              onClick={() => handleClickSize(size._id)}
                            >
                              {size.size_name}
                            </button>
                          </div>
                        );
                      })
                  ) : (
                    <p className="sp2s">Không có kích thước</p>
                  )}
                  {sizes && sizes.size.length > 3 && (
                    <button
                      onClick={() => setShowAllSizes(!showAllSizes)}
                      className="btn-show-more"
                    >
                      {showAllSizes ? "-- Thu gọn --" : "Xem thêm ++"}
                    </button>
                  )}
                </div>
              </div>

              <div
                className="text-l font-bold py-2"
                style={{ height: showAllMaterials ? "auto" : "" }}
              >
                <p>Nguyên vật liệu</p>
                <div className="flex flex-wrap">
                  {materials ? (
                    materials.material
                      .slice(
                        0,
                        showAllMaterials ? materials.material.length : 3
                      )
                      .map((material: any, index: number) => {
                        const isActive = material._id === activeMaterial;
                        return (
                          <div key={material._id} className="flex-row mb-2 mr-2">
                            <button
                              aria-label="M"
                              aria-disabled="false"
                              className={` ${isActive ? "active1" : ""} text-[12px] py-1  border border-gray-500 rounded-md px-3 ${isActive ? "bg-blue-500 text-white" : "bg-white text-black"
                                }`}
                              onClick={() => handleClickMaterial(material._id)}
                            >
                              {material.material_name}
                            </button>
                          </div>
                        );
                      })
                  ) : (
                    <p className="sp2s">Không có nguyên vật liệu</p>
                  )}
                </div>
                {materials && materials.material.length > 3 && (
                  <button
                    onClick={handleToggleMaterials}
                    className={`btn-show-more ${showAllMaterials ? "collapses" : "expand"
                      }`}
                  >
                    {showAllMaterials ? "-- Thu gọn --" : "Xem thêm ++"}
                  </button>
                )}
              </div>

              <div className="flex button1">
                <button
                  aria-label="Decrease"
                  className="btn3s btn-solid-primary3s btn-cs"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  className="btn4s btn-solid-primary4s btn-ds mn1"
                  aria-live="assertive"
                  aria-valuenow={1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <button
                  aria-label="Increase"
                  className="btn5s btn-solid-primary5s btn-es"
                  onClick={increaseQuantity}
                >
                  +
                </button>

                <Tooltip
                  title={
                    id && activeColor && activeSize && activeMaterial
                      ? ""
                      : "Bạn phải chọn màu, kích thước và nguyên vật liệu"
                  }
                >
                  {resultAdd.isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin m-auto" />
                  ) : (
                    <Button
                      aria-disabled={
                        !id || !activeColor || !activeSize || !activeMaterial
                      }
                      className="btn6s btn-solid-primary6s btn-fs hls"
                      onClick={() => {
                        if (id && activeColor && activeSize && activeMaterial) {
                          handleAddToCart();
                        }
                      }}
                    >
                      Thêm sản phẩm
                    </Button>
                  )}
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomizedProductAdd;
