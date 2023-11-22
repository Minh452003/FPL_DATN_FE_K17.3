import { useEffect, useState } from "react";
import { Button, Modal, Skeleton, Tooltip } from "antd";
import { useGetSizeQuery } from "@/api/sizeApi";
import { useGetColorsQuery } from "@/api/colorApi";
import { useGetChildProductByProductIdQuery, useGetChildProductPriceQuery } from "@/api/chilProductApi";
import { getDecodedAccessToken } from "@/decoder";
import Swal from "sweetalert2";
import { useAddCartMutation } from "@/api/cartApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Model = ({ products }: any) => {
  const decodedToken: any = getDecodedAccessToken();
  const id = decodedToken ? decodedToken.id : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: colors, isLoading: isLoadingColor } = useGetColorsQuery<any>();
  const { data: sizes, isLoading: isLoadingSize } = useGetSizeQuery<any>();
  const [addCart, resultAdd] = useAddCartMutation();
  const [quantity, setQuantity] = useState(1); // Sử dụng useState để quản lý số lượng
  const [activeColor, setActiveColor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const { data: childProducts, isLoading: isLoadingChild }: any =
    useGetChildProductByProductIdQuery(products._id || "");
  const { data: childProduct }: any = useGetChildProductPriceQuery({
    productId: products._id,
    sizeId: activeSize,
    colorId: activeColor,
  });
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

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Cập nhật số lượng
    }
  };
  const increaseQuantity = () => {
    // Tăng số lượng lên 1 nếu chưa đạt tới giới hạn của stock_quantity    
    if (activeColor && activeSize && quantity < childProduct?.product?.stock_quantity) {
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

  const userId: string = id;

  const handleAddToCart = () => {
    if (products && userId) {
      const data: any = {
        productId: products._id,
        product_name: products.product_name,
        product_price: childProduct?.product?.product_price,
        image: products.image[0]?.url,
        stock_quantity: quantity,
        colorId: activeColor,
        sizeId: activeSize,
        materialId: products.materialId,
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



  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setActiveColor(null);
    setActiveSize(null);
    setQuantity(1);
    setIsModalOpen(false);
  };
  const formatCurrency = (number: number) => {
    if (typeof number !== 'number') {
      // Xử lý khi number không phải là số
      return '0'; // Hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  if (isLoadingChild) return <Skeleton />;
  if (isLoadingColor) return <Skeleton />;
  if (isLoadingSize) return <Skeleton />;

  return (
    <>
      <Button onClick={showModal} className="button btn-cart rounded-none">
        Mua hàng
      </Button>
      <Modal
        title="Mua ngay"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Remove the footer entirely
      >
        <div className="flex">
          <div className="w-[250px]">
            <div>
              <img
                src={products?.image[0]?.url}
                width={300}
              />
            </div>
          </div>
          <div className="ml-2">
            <div>
              <h3 className="text-[16px]">{products?.product_name}</h3>
              {childProduct && activeColor && activeSize ? (
                <span className="text-red-600 font-bold">{formatCurrency(childProduct?.product?.product_price)}đ</span>
              ) : (
                <span className="text-red-600 font-bold">{formatCurrency(products?.product_price)}đ</span>
              )}

            </div>
            <div>
              <h3 className="text-[13px] mt-3">Màu sắc</h3>
              {childProducts ? (
                filteredColors.map((color: any) => {
                  const colorname = colors?.color?.find(
                    (colors: any) => colors._id === color.colorId
                  );
                  const isActive = color.colorId === activeColor;
                  return (
                    <button
                      key={color.colorId}
                      className={`hover:bg-red-500 bg-gray-300 p-1 mr-2 mt-2 text-[12px] ${isActive ? "active1" : ""}`}
                      aria-label="M"
                      aria-disabled="false"
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
            <div className="mt-3">
              <h3 className="text-[13px]">Kích Thước</h3>
              {childProducts ? (
                filteredSizes.map((size: any) => {
                  const sizesname = sizes?.size?.find(
                    (s: any) => s._id == size.sizeId
                  );
                  const isActive = size.sizeId === activeSize;
                  return (
                    <button
                      key={size.sizeId}
                      className={`hover:bg-red-500 bg-gray-300 p-1 mr-2 mt-2 text-[12px] ${isActive ? "active1" : ""
                        }`}
                      aria-label="M"
                      aria-disabled="false"
                      onClick={() => handleClickSize(size.sizeId)}
                    >
                      {sizesname.size_name}
                    </button>
                  );
                })
              ) : (
                <p className="sp2">Không có kích thước</p>
              )}
            </div>
            {childProduct && activeColor && activeSize ? (
              <p className="sp1">
                Còn {childProduct.product.stock_quantity} sản phẩm
              </p>
            ) : (
              ""
            )}
            <div className="flex mt-4">
              <div className="items-center">
                <h3 className="text-[13px] ">Số Lượng</h3>
              </div>
              <div className="flex ml-2">
                <button
                  aria-label="Decrease"
                  className="btn3 btn-solid-primary3  w-5 h-6"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  className="btn4 btn-solid-primary4 outline-none mn w-12 h-6"
                  aria-live="assertive"
                  aria-valuenow={1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <button
                  aria-label="Increase"
                  className="btn5 btn-solid-primary5 w-5 h-6"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
            <Tooltip
              title={
                id && activeColor && activeSize
                  ? ""
                  : "Bạn phải đăng nhập, chọn màu và kích thước."
              }
            >
              {resultAdd.isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin m-auto" />
              ) : (
                <Button
                  disabled={childProduct?.product.stock_quantity <= 0}
                  className="btn6 btn-solid-primary6 btn-x hl mt-4 ml-16"
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
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Model;
