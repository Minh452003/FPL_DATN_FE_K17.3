import { useState } from "react";
import { Button, Modal } from "antd";
import { getDecodedAccessToken } from "@/decoder";
import { useGetCategoryQuery } from "@/api/categoryApi";
import { useGetMaterialQuery } from "@/api/materialApi";
import { useGetColorsQuery } from "@/api/colorApi";
import { useGetSizeQuery } from "@/api/sizeApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAddCartMutation } from "@/api/cartApi";
import Swal from "sweetalert2";

const ProductCustom = ({ products }: any) => {
    const decodedToken: any = getDecodedAccessToken();
    const idUser = decodedToken ? decodedToken.id : null;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: category }: any = useGetCategoryQuery();
    const categoryLish = category?.category.docs;
    const categoryLishOne = categoryLish?.find(
        (categoryLish: any) => categoryLish?._id === products?.categoryId
    )?.category_name;
    const { data: material }: any = useGetMaterialQuery();
    const materialList = material?.material;
    const materialLishOne = materialList?.find(
        (materialList: any) => materialList?._id === products?.materialId
    )?.material_name;

    const { data: color }: any = useGetColorsQuery();
    const colorList = color?.color;
    const colorLishOne = colorList?.find(
        (colorList: any) => colorList?._id === products?.colorId
    )?.colors_name;

    const { data: size }: any = useGetSizeQuery();
    const sizeLish = size?.size;
    const sizeLishOne = sizeLish?.find(
        (sizeLish: any) => sizeLish?._id === products?.sizeId
    )?.size_name;


    const [addCart, resultAdd] = useAddCartMutation();

    // ADD to cart custom-Product
    const handleAddToCart = () => {
        if (products && idUser) {
            const sizeId = products.sizeId;
            const colorId = products.colorId;
            const materialId = products.materialId;
            const cartData: any = {
                productId: products._id,
                product_name: products.product_name,
                product_price: products?.product_price,
                image: products.image[0]?.url,
                stock_quantity: products.stock_quantity,
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
            }).then((result: any) => {
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
                            setIsModalOpen(false);
                        }
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // Hiển thị thông báo hủy xóa sản phẩm
                    Swal.fire("Huỷ", "Sản phẩm không được thêm vào giỏ hàng", "error");
                }
            });
        }
    };


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const formatCurrency = (number: number) => {
        if (typeof number !== 'number') {
            // Xử lý khi number không phải là số
            return '0'; // Hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
        }
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <>
            <Button onClick={showModal} className="button btn-cart rounded-none">
                Thêm hàng
            </Button>
            <Modal
                title="Mua ngay"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%' }}>
                        <img
                            src={products?.image[0]?.url}
                            width={300}
                            alt="Product"
                        />
                    </div>
                    <div style={{ width: '50%', marginLeft: '20px' }}>
                        <h6 className="font-bold">{products?.product_name}</h6>
                        <div className="text-red-700 text-sm font-bold">
                            {formatCurrency(products?.product_price)}
                            <span>₫</span>
                        </div>
                        <div className="text-[14px] mt-2">
                            <div className="flex space-x-4">
                                <div className="font-bold">Loại:</div>
                                <div>{categoryLishOne}</div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="font-bold">Màu:</div>
                                <div>{colorLishOne}</div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="font-bold">Kích thước:</div>
                                <div>{sizeLishOne}</div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="font-bold">Chất liệu:</div>
                                <div>{materialLishOne}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <input
                                className="btn4 btn-solid-primary4 w-[100px] h-[10px] btn-d mn"
                                aria-live="assertive"
                                aria-valuenow={1}
                                value={products?.stock_quantity}
                                readOnly
                            />
                            <div style={{ marginLeft: '10px' }}>
                                {resultAdd.isLoading ? (
                                    <AiOutlineLoading3Quarters className="animate-spin m-auto " />
                                ) : (
                                    <Button
                                        className="ml-2 w-100px bg-blue-600 bg-red-600 border-0 text-white text-m font-bold py-1"
                                        onClick={handleAddToCart}
                                    >
                                        Thêm ngay
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ProductCustom;
