import './Product_detail.css';
import 'swiper/css';
import 'swiper/css/navigation';
import './Responsive_Product_Detail.css';
import { FaArrowRight } from 'react-icons/fa';
import { useParams, } from 'react-router-dom';
import { getDecodedAccessToken } from '@/decoder';
import { useGetCustomizedproductsByIdQuery } from '@/api/CustomizedProductAPI';
import { useGetCategoryQuery } from '@/api/categoryApi';
import { useState } from 'react';
import { useGetMaterialQuery } from '@/api/materialApi';
import { useGetColorsQuery } from '@/api/colorApi';
import { useGetSizeQuery } from '@/api/sizeApi';
import { useAddCartMutation } from '@/api/cartApi';
import Swal from 'sweetalert2';
import { Button } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


const CustomProductDetail = () => {
  const { id } = useParams();
  const decodedToken: any = getDecodedAccessToken();
  const idUser = decodedToken ? decodedToken.id : null;
  const { data }: any = useGetCustomizedproductsByIdQuery(id || "");
  const customProducts = data?.product;
  const [selectedIndex] = useState(false);
  const { data: category }: any = useGetCategoryQuery();
  const categoryLish = category?.category.docs;
  const categoryLishOne = categoryLish?.find(
    (categoryLish: any) => categoryLish?._id === customProducts?.categoryId
  )?.category_name;

  const { data: material }: any = useGetMaterialQuery();
  const materialList = material?.material;
  const materialLishOne = materialList?.find(
    (materialList: any) => materialList?._id === customProducts?.materialId
  )?.material_name;

  const { data: color }: any = useGetColorsQuery();
  const colorList = color?.color;
  const colorLishOne = colorList?.find(
    (colorList: any) => colorList?._id === customProducts?.colorId
  )?.colors_name;

  const { data: size }: any = useGetSizeQuery();
  const sizeLish = size?.size;
  const sizeLishOne = sizeLish?.find(
    (sizeLish: any) => sizeLish?._id === customProducts?.sizeId
  )?.size_name;
  const formatCurrency = (number: { toString: () => string; }) => {
    if (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return "0"; // Giá trị mặc định hoặc xử lý khác
    }
  }


  const [addCart, resultAdd] = useAddCartMutation();

  // ADD to cart custom-Product
  const handleAddToCart = () => {
    if (customProducts && idUser) {
      const sizeId = customProducts.sizeId;
      const colorId = customProducts.colorId;
      const materialId = customProducts.materialId;
      const cartData: any = {
        productId: customProducts._id,
        product_name: customProducts.product_name,
        product_price: customProducts?.product_price,
        image: customProducts.image[0]?.url,
        stock_quantity: customProducts.stock_quantity,
        colorId: colorId,
        sizeId: sizeId,
        materialId: materialId,
      };
      Swal.fire({
        title: "Bạn chắc chứ?",
        text: "Sản phẩm sẽ được thêm vào giỏ hàng!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng, tôi chắc chắn!",
        cancelButtonText: "Huỷ",
      }).then((result) => {
        if (result.isConfirmed) {
          // Xóa sản phẩm
          addCart({ data: cartData, userId: idUser }).then((response: any) => {
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
          Swal.fire("Huỷ", "Sản phẩm không được thêm vào giỏ hàng", "error");
        }
      });
    }
  };

  return (
    <div className="">
      <div className="container">
        <div className="flex items-center my-4 px-3">
          <div className="float-left font-bold">Trang Chủ</div>
          <FaArrowRight className="ml-2" />
          <div className="pl-2">Sản phẩm tự thiết kế</div>
          <FaArrowRight className="ml-2" />
          <div className="pl-2">{customProducts?.product_name}</div>
        </div>
        <div className="">
          <div className="md:grid md:grid-cols-2 bg-white p-4 gap-2 justify-between px-3">
            <div className=" md:w-43% md:ml-53px md:h-106px">
              <div className="mb-6">
                {customProducts?.image?.map((img: any, index: any) => {
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
                        <img
                          src={img?.url}
                          className={`object-cover object-cover md:w-[250] md:h-[180]  `}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="md:w-287px md:h-200px md:ml-215px  ">
              <div className="mb-3">
                <h3 className="font-bold iklm ">{customProducts?.product_name}</h3>
              </div>
              <div className="space-y-3">
                <div className="mt-3">
                  <p className="text-red-700 text-2xl font-bold">
                    {formatCurrency(customProducts?.product_price)}
                    <span>₫</span>
                  </p>
                </div>
                <div className="col-span-2 flex  space-x-4 ">
                  <div className="font-bold text-[16px]">Loại:</div>
                  <div >{categoryLishOne}</div>
                </div>
                <div className="col-span-2  flex space-x-4 ">
                  <div className="font-bold text-[16px]">Màu:</div>
                  <div >{colorLishOne}</div>
                </div>
                <div className="col-span-2 flex  space-x-4 ">
                  <div className=" font-bold text-[16px]">Kích thước:</div>
                  <div>{sizeLishOne}</div>
                </div>
                <div className="col-span-2 flex  space-x-4 ">
                  <div className=" font-bold text-[16px]">Chất liệu:</div>
                  <div >{materialLishOne}</div>
                </div>
              </div>
              <div className="md:flex button">
                <div className="flex items-center mt-2">
                  <input
                    className="btn4 btn-solid-primary4 w-[150px] h-[10px] btn-d mn"
                    aria-live="assertive"
                    aria-valuenow={1}
                    value={customProducts?.stock_quantity}
                  />
                </div>
                <div className=" pl-0 flex md:mt-0 items-center mt-2 ml-2">
                  {resultAdd.isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin m-auto " />
                  ) : (
                    <Button
                      className=" ml-2 md:w-200px bg-blue-600 bg-red-600 border-0 text-white  text-m font-bold py-1  "
                      onClick={handleAddToCart}
                    >
                      MUA NGAY
                    </Button>
                  )}
                </div>
              </div>
              <hr className="my-4" />
              <div className="md:flex space-x-2 ">
                <div className=" flex items-center pl-2 ">
                  <img
                    className="w-5"
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/6c502a2641457578b0d5f5153b53dd5d.png"
                  />
                  <div className="mnQqkL">7 ngày miễn phí trả hàng</div>
                </div>
                <div className=" flex items-center ">
                  <img
                    className="w-5"
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/511aca04cc3ba9234ab0e4fcf20768a2.png"
                  />
                  <div className="mnQqkL">Hàng chính hãng 100%</div>
                </div>
                <div className="flex items-center">
                  <img
                    className="w-5"
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/511aca04cc3ba9234ab0e4fcf20768a2.png"
                  />
                  <div className="mnQqkL">Giao hàng cực nhanh</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomProductDetail
