import { FaArrowRight } from 'react-icons/fa';
import './Product_detail.css';
import './Responsive_Product_Detail.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link, useParams } from 'react-router-dom';
import {
    useGetProductByIdQuery,
    useGetProductViewsQuery,
    useGetProductsQuery,
} from '@/api/productApi';
import { useGetBrandQuery } from '@/api/brandApi';
import { useGetCategoryQuery } from '@/api/categoryApi';
import { useGetMaterialQuery } from '@/api/materialApi';
import { Button, Skeleton, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import {
    useGetChildProductByProductIdQuery,
    useGetChildProductPriceQuery,
} from '@/api/chilProductApi';
import { useGetColorsQuery } from '@/api/colorApi';
import { useGetSizeQuery } from '@/api/sizeApi';
import { Tab, initTE } from 'tw-elements';
import { useGetCommentByProductIdQuery, useRemoveCommentMutation } from '@/api/commentApi';
import { useAddCartMutation } from '@/api/cartApi';
import { getDecodedAccessToken } from '@/decoder';
import Swal from 'sweetalert2';
import { AiFillStar, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaTrashCan } from 'react-icons/fa6';
import Model from '@/components/Model';
import { Pagination } from 'antd';

const PAGE_SIZE = 5;

const Product_Detail = () => {
    const { idProduct }: any = useParams();
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;
    const {
        data,
        isLoading: isLoadingFetching,
        error,
    }: any = useGetProductByIdQuery(idProduct || '');
    const { data: colors, isLoading: isLoadingColor } = useGetColorsQuery<any>();
    const { data: sizes, isLoading: isLoadingSize } = useGetSizeQuery<any>();
    const { data: products, isLoading: isLoadingProduct }: any = useGetProductsQuery();
    const { data: comment, isLoading: isLoadingComment }: any = useGetCommentByProductIdQuery(
        idProduct || '',
    );
    const [addCart, resultAdd] = useAddCartMutation();
    const [quantity, setQuantity] = useState(1);
    const [activeColor, setActiveColor] = useState(null);
    const [activeSize, setActiveSize] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [selectedRating, setSelectedRating] = useState('Tất cả');
    const [activeTab, setActiveTab] = useState('tab-1');
    const handleTabClick = (tab: any) => {
        setActiveTab(tab);
    };
    const handleRatingFilter = (rating: any) => {
        setSelectedRating(rating);
    };

    //comment
    const [removeComment, { isLoading: isRemoveLoading }] = useRemoveCommentMutation();
    const commentProductDetail = isLoadingComment ? [] : comment?.comments;
    const totalRating =
        commentProductDetail?.reduce((total: number, item: any) => total + item.rating, 0) || 0;
    let averageRating = 0;
    if (commentProductDetail && commentProductDetail.length > 0) {
        // Kiểm tra xem commentProductDetail tồn tại và có ít nhất một phần tử
        averageRating = totalRating / commentProductDetail?.length;
    }
    const [page, setPage] = useState(1);

    const filteredComments = commentProductDetail
        ?.filter((comment: any) => {
            if (selectedRating === 'Tất cả') {
                return true; // Show all comments
            } else {
                return comment.rating === selectedRating; // Show comments with the selected rating
            }
        })
        .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const roundedAverageRating: number = Number(averageRating.toFixed(1));
    const deleteComment = ({ id, userId }: any): any => {
        Swal.fire({
            title: 'Bạn chắc chứ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, tôi chắc chắn!',
            cancelButtonText: 'Huỷ',
        }).then((result) => {
            if (result.isConfirmed) {
                removeComment({ id, userId })
                    .unwrap()
                    .then(() => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Đánh giá thành công thành công!',
                            showConfirmButton: true,
                            timer: 700,
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Hiển thị thông báo hủy xóa sản phẩm
                Swal.fire('Thất bại', 'Bình luận xoá thất bại :)', 'error');
            }
        });
    };

    //
    const listOneData = data?.product;
    const similarProducts = products?.product?.docs.filter(
        (siproduct: any) => siproduct.categoryId === listOneData?.categoryId,
    );
    useEffect(() => {
        initTE({ Tab });
    }, [selectedIndex]);
    // --------------------------
    const { data: brand }: any = useGetBrandQuery();
    const brandList = brand?.brand;
    const brandListOne = brandList?.find(
        (brandList: any) => brandList?._id === listOneData?.brandId,
    )?.brand_name;
    // -------------------------
    const { data: catgory }: any = useGetCategoryQuery();
    const categoryLish = catgory?.category.docs;
    const categoryLishOne = categoryLish?.find(
        (categoryLish: any) => categoryLish?._id === listOneData?.categoryId,
    )?.category_name;
    // --------------------------
    const { data: material }: any = useGetMaterialQuery();
    const materialList = material?.material;
    const materialLishOne = materialList?.find(
        (materialList: any) => materialList?._id === listOneData?.materialId,
    )?.material_name;
    // --------------------------
    const { data: childProducts }: any =
        useGetChildProductByProductIdQuery(idProduct || '');
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
    if (false) {
        console.log(productView);
        console.log(uniqueColors);
        console.log(uniqueSizes);
    }
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
                title: 'Bạn chắc chứ?',
                text: 'Sản phẩm sẽ được thêm vào giỏ hàng!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Vâng,tôi chắc chắn!',
                cancelButtonText: 'Huỷ',
            }).then((result) => {
                if (result.isConfirmed) {
                    // Xóa sản phẩm
                    addCart({ data, userId }).then((response: any) => {
                        if (response.error) {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: response.error.data.message,
                                showConfirmButton: true,
                                timer: 1500,
                            });
                        } else {
                            Swal.fire(
                                'Sản phẩm đã được thêm vào giỏ hàng',
                                'Bạn có thể vào giỏ hàng để xem.',
                                'success',
                            );
                        }
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // Hiển thị thông báo hủy xóa sản phẩm
                    Swal.fire('Huỷ', 'Sản phẩm không được thêm vào giỏ hàng:)', 'error');
                }
            });
        }
    };

    const formatCurrency = (number: number) => {
        if (typeof number !== 'number') {
            // Xử lý khi number không phải là số
            return '0'; // Hoặc giá trị mặc định khác tùy vào yêu cầu của bạn
        }
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
        window.addEventListener('resize', handleResize);
        handleResize(); // Gọi lần đầu khi tải trang

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Cuộn mượt
        });
    };
    const formatTimeAgo = (timestamp: any) => {
        const now: any = new Date();
        const commentTime: any = new Date(timestamp);

        const timeDiff = now - commentTime;
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} ngày trước`;
        } else if (hours > 0) {
            return `${hours} giờ trước`;
        } else if (minutes > 0) {
            return `${minutes} phút trước`;
        } else {
            return 'Vừa xong';
        }
    };
    if (isLoadingFetching) return <Skeleton />;
    // if (isLoadingChild) return <Skeleton />;
    if (isLoadingColor) return <Skeleton />;
    if (isLoadingSize) return <Skeleton />;
    if (isLoadingProduct) return <Skeleton />;
    if (isLoadingComment) return <Skeleton />;
    if (error) {
        if ('data' in error && 'status' in error) {
            return (
                <div>
                    {error.status} - {JSON.stringify(error.data)}
                </div>
            );
        }
    }
    return (
        <div className="">
            <div className="container">
                <div className="flex items-center my-4 px-3">
                    <div className="float-left font-bold">Trang Chủ</div>
                    <FaArrowRight className="ml-2" />
                    <div className="pl-2">{categoryLishOne}</div>
                    <FaArrowRight className="ml-2" />
                    <div className="pl-2">{listOneData?.product_name}</div>
                </div>
                <div className="">
                    <div className="md:grid md:grid-cols-2 bg-white p-4 gap-2 justify-between px-3">
                        <div className=" md:w-43% md:ml-53px md:h-106px">
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
                                                <img
                                                    src={img?.url}
                                                    className={`object-cover object-cover md:w-[250] md:h-[180]  `}
                                                />
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
                                                <img
                                                    src={img?.url}
                                                    className={`object-cover object-cover md:w-[250] md:h-[180]  `}
                                                />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            <ul
                                className="mb-5 flex list-none flex-wrap pl-0 md:flex-row"
                                id="pills-tab"
                                role="tablist"
                                data-te-nav-ref
                            >
                                {listOneData?.image?.map((img: any, index: any) => (
                                    <li className="ima" role="presentation" key={index}>
                                        <Link
                                            to={`#image-tab-${index}`}
                                            className={`test my-2 block rounded bg-neutral-100 text-xs font-medium uppercase leading-tight text-neutral-500 ${selectedIndex === index
                                                ? 'bg-primary-100 text-primary-700'
                                                : 'bg-neutral-700 text-white'
                                                } md:mr-4 `}
                                            id={`image-tab-${index}`}
                                            data-te-toggle="tab"
                                            key={`tab-${index}`}
                                            data-te-tab-active={index === 0 ? 'true' : 'false'}
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
                        <div className="md:w-287px md:h-200px md:ml-215px  ">
                            <div className="mb-3">
                                <h3 className="font-bold iklm ">{listOneData?.product_name}</h3>
                                <div className=" max-w-4xl mx-auto flex">
                                    <div className="flex items-center">
                                        <span>{roundedAverageRating} /5</span>

                                        <div className=" mx-auto flex items-center">
                                            {Array.from(
                                                { length: Math.round(roundedAverageRating) },
                                                (_, index) => (
                                                    <AiFillStar
                                                        key={index}
                                                        style={{ color: 'orange' }}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-gray-300 px-2 h-[30px] text-xl flex items-center">
                                        |
                                    </div>
                                    <div className="flex items-center">
                                        {commentProductDetail
                                            ? `${commentProductDetail?.length} đánh giá`
                                            : '0 đánh giá'}
                                    </div>
                                    <div className="text-gray-300 px-2 h-[30px] text-xl flex items-center">
                                        |
                                    </div>
                                    <div className="col-span-2 space-x-4 flex items-center">
                                        <div className="  text-[16px]">
                                            Đã bán: {listOneData?.sold_quantity} chiếc
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="mt-3">
                                    {childProduct ? (
                                        <p className="text-red-700 text-2xl font-bold">
                                            {formatCurrency(childProduct?.product?.product_price)}
                                            <span>₫</span>
                                        </p>
                                    ) : (
                                        <p className="text-red-700 text-2xl font-bold">
                                            {formatCurrency(listOneData?.product_price)}
                                            <span>₫</span>
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-2  flex space-x-4 ">
                                    <div className="font-bold text-[16px]">Thương hiệu:</div>
                                    <div className=" ">{brandListOne}</div>
                                </div>
                                <div className="col-span-2 flex  space-x-4 ">
                                    <div className="font-bold text-[16px]">Loại:</div>
                                    <div className="">{categoryLishOne}</div>
                                </div>
                                <div className="col-span-2 flex  space-x-4 ">
                                    <div className=" font-bold text-[16px]">Chất liệu:</div>
                                    <div className="">{materialLishOne}</div>
                                </div>
                            </div>
                            <div className="py-3">
                                <p className="text-[16px] font-bold">Màu sắc</p>
                                <div className="flex space-x-2">
                                    {childProducts ? (
                                        filteredColors.map((color: any) => {
                                            const colorname = colors?.color?.find(
                                                (colors: any) => colors._id === color.colorId,
                                            );
                                            const isActive = color.colorId === activeColor;
                                            return (
                                                <button
                                                    key={color.colorId}
                                                    aria-label="M"
                                                    aria-disabled="false"
                                                    className={` border boder-1 text-sm font-bold rounded-lg py-1 px-2 ${isActive ? 'active1' : ''
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
                            <div className="text-[16px] font-bold">
                                <p>Kích thước</p>
                                <div className="flex space-x-2">
                                    {childProducts ? (
                                        filteredSizes.map((size: any) => {
                                            const sizesname = sizes?.size?.find(
                                                (s: any) => s._id == size.sizeId,
                                            );
                                            const isActive = size.sizeId === activeSize;
                                            return (
                                                <button
                                                    key={size.sizeId}
                                                    aria-label="M"
                                                    aria-disabled="false"
                                                    className={`text-sm border boder-1 rounded-lg px-2 py-1 ${isActive ? 'active1' : ''
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
                                ''
                            )}
                            <div className="md:flex button">
                                <div className="flex items-center mt-2">
                                    <button
                                        aria-label="Decrease"
                                        className="btn3 btn-solid-primary3 btn-c"
                                        onClick={decreaseQuantity}
                                    >
                                        -
                                    </button>
                                    <input
                                        className="btn4 btn-solid-primary4 w-[150px] h-[10px] btn-d mn"
                                        aria-live="assertive"
                                        aria-valuenow={1}
                                        value={quantity}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value);
                                            if (isNaN(value)) {
                                                setQuantity(1);
                                            } else {
                                                setQuantity(value);
                                            }
                                        }}
                                    />
                                    <button
                                        aria-label="Increase"
                                        className="btn5 btn-solid-primary5 btn-e"
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className=" pl-0 flex md:mt-0 items-center mt-2">
                                    <Tooltip
                                        title={
                                            id && activeColor && activeSize
                                                ? ''
                                                : 'Bạn phải đăng nhập, chọn màu và kích thước'
                                        }
                                    >
                                        {resultAdd.isLoading ? (
                                            <AiOutlineLoading3Quarters className="animate-spin m-auto" />
                                        ) : (
                                            <Button
                                                aria-disabled={!id || !activeColor || !activeSize}
                                                className=" ml-2 md:w-200px bg-blue-600 bg-red-600 border-0 text-white  text-m font-bold py-1  "
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
                                        style={{ textDecoration: 'none', color: '#fff' }}
                                    >
                                        <button
                                            type="button"
                                            aria-disabled="false"
                                            className=" ml-2 md:w-200px bg-blue-600 text-white  border rounded-md text-m font-bold py-1  px-2 "
                                        >
                                            TỰ THIẾT KẾ
                                        </button>
                                    </Link>
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
                                <div className=" flex items-center ">
                                    <img
                                        className="w-5"
                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/511aca04cc3ba9234ab0e4fcf20768a2.png"
                                    />
                                    <div className="mnQqkL">Giao hàng cực nhanh</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="flex justify-center ">
                            <div className="flex space-x-4  ">
                                <div>
                                    <input
                                        type="radio"
                                        id="chi-tiet"
                                        name="tab"
                                        checked={activeTab === 'tab-1'}
                                        onChange={() => handleTabClick('tab-1')}
                                    />
                                    <label
                                        htmlFor="chi-tiet"
                                        className={` md:text-xl font-bold tab-link ${activeTab === 'tab-1' ? 'active-tab' : ''
                                            }`}
                                        data-tab="tab-1"
                                    >
                                        Thông tin chi tiết
                                        <hr />
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="binh-luan"
                                        name="tab"
                                        checked={activeTab === 'tab-2'}
                                        onChange={() => handleTabClick('tab-2')}
                                    />
                                    <label
                                        htmlFor="binh-luan"
                                        className={`md:text-xl font-bold tab-link ${activeTab === 'tab-2' ? 'active-tab' : ''
                                            }`}
                                        data-tab="tab-2"
                                    >
                                        Đánh giá
                                        <hr />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="md:px-4">
                            {activeTab === 'tab-1' ? (
                                <div
                                    className="text-gray-500 dark:text-gray-400 py-3 px-5"
                                    dangerouslySetInnerHTML={{ __html: listOneData?.description }}
                                >
                                    {/* Content for Thông tin chi tiết */}
                                </div>
                            ) : (
                                <section className=" bg-white md:py-3 md:px-5  antialiased">
                                    <div>
                                        <div className="font-semibold pl-2 md:text-2xl mb-4">
                                            Đánh giá sản phẩm
                                        </div>
                                        <div className="md:flex ">
                                            <div className="mr-2 pl-2 ">
                                                <span style={{ fontSize: '1.5em' }}>
                                                    {roundedAverageRating}{' '}
                                                </span>
                                                trên 5
                                                {commentProductDetail
                                                    ? ` (${commentProductDetail?.length} đánh giá)`
                                                    : ' (0)'}
                                                <div className="mx-auto flex">
                                                    {Array.from(
                                                        {
                                                            length: Math.round(
                                                                roundedAverageRating,
                                                            ),
                                                        },
                                                        (_, index) => (
                                                            <AiFillStar
                                                                key={index}
                                                                style={{ color: 'orange' }}
                                                            />
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                            <div className="rating-buttons space-x-2  md:mt-0 mt-3">
                                                {['Tất cả', 1, 2, 3, 4, 5].map((rating) => (
                                                    <button
                                                        key={rating}
                                                        onClick={() => handleRatingFilter(rating)}
                                                        className={`rating-button py-1 px-2 ${selectedRating === rating
                                                            ? 'selected'
                                                            : ''
                                                            }`}
                                                    >
                                                        {rating === 'Tất cả'
                                                            ? 'Tất cả'
                                                            : `${rating} sao`}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="" />
                                    <div className=" md:py-3 md:px-5">
                                        {filteredComments && filteredComments?.length > 0 ? (
                                            filteredComments.map((comment: any) => (
                                                <article
                                                    key={comment._id}
                                                    className="p-6 text-base rounded-lg "
                                                >
                                                    <footer className="flex items-center footer1">
                                                        <div className="evaluate">
                                                            <div className="inline-flex items-center mr-3 text-xs text-gray-900 dark:text-white font-semibold">
                                                                {comment &&
                                                                    comment?.userId?.avatar ? (
                                                                    <img
                                                                        src={
                                                                            comment?.userId?.avatar
                                                                                ?.url
                                                                        }
                                                                        className="mr-2 w-8 h-8 rounded-full avatar"
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src="https://static.thenounproject.com/png/363640-200.png"
                                                                        className="mr-2 w-8 h-8 rounded-full avatar"
                                                                    />
                                                                )}
                                                                <a className="cm-name">
                                                                    {comment.userId?.first_name}{' '}
                                                                    {comment.userId?.last_name}
                                                                </a>
                                                                <a className="cm-name1 font-normal ">
                                                                    {formatTimeAgo(
                                                                        comment.createdAt,
                                                                    )}
                                                                </a>
                                                                {comment &&
                                                                    comment?.userId?._id == id ? (
                                                                    <div className="button-wrapper float-right">
                                                                        <Button
                                                                            className="text-red-500 "
                                                                            size="small"
                                                                            onClick={() =>
                                                                                deleteComment({
                                                                                    id: comment._id,
                                                                                    userId: comment
                                                                                        .userId._id,
                                                                                })
                                                                            }
                                                                        >
                                                                            {isRemoveLoading ? (
                                                                                <AiOutlineLoading3Quarters className="animate-spin" />
                                                                            ) : (
                                                                                <FaTrashCan
                                                                                    style={{
                                                                                        width: '10px',
                                                                                    }}
                                                                                />
                                                                            )}
                                                                        </Button>
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </footer>

                                                    <div className="stars ml-16 flex">
                                                        <div className="star-rating">
                                                            {comment.rating &&
                                                                Array.from(
                                                                    { length: comment.rating },
                                                                    (_, index) => (
                                                                        <AiFillStar
                                                                            key={index}
                                                                            style={{
                                                                                color: 'orange',
                                                                            }}
                                                                        />
                                                                    ),
                                                                )}
                                                        </div>
                                                    </div>

                                                    <p className="ml-16 text-gray-500 dark:text-gray-400">
                                                        {comment.description}
                                                    </p>
                                                    <div className="product-small">
                                                        {comment &&
                                                            comment?.image.map((img: any) => {
                                                                return (
                                                                    <img
                                                                        key={img?.publicId}
                                                                        className="image5"
                                                                        src={img?.url}
                                                                    />
                                                                );
                                                            })}
                                                    </div>
                                                </article>
                                            ))
                                        ) : (
                                            <p className="sp2 ">Không có bình luận</p>
                                        )}
                                        <Pagination
                                            pageSize={PAGE_SIZE}
                                            defaultCurrent={1}
                                            total={commentProductDetail?.length}
                                            onChange={(page, pageSize) => {
                                                setPage(page);
                                                if (false) {
                                                    console.log(pageSize);
                                                }
                                            }}
                                        />
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>

                    <div className="main-col2s sock_to_days">
                        <div className="">
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
                                                        width: '2264px',
                                                        transform: 'translate3d(0px, 0px, 0px)',
                                                    }}
                                                >
                                                    {similarProducts
                                                        ? similarProducts.map(
                                                            (similar: any, index: any) => (
                                                                <SwiperSlide
                                                                    style={{
                                                                        width: '285px',
                                                                        marginLeft: '27px',
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
                                                                            width: '235px',
                                                                            marginLeft: '-18px',
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
                                                                                            to={
                                                                                                ''
                                                                                            }
                                                                                            className="thumbs flips"
                                                                                            title="Bàn trà gỗ tự nhiên 5CBT-136"
                                                                                            tabIndex={
                                                                                                0
                                                                                            }
                                                                                        >
                                                                                            <img
                                                                                                className="lazyloads loadeds"
                                                                                                src={
                                                                                                    similar
                                                                                                        .image[0]
                                                                                                        .url
                                                                                                }
                                                                                            />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="item-infos">
                                                                                    <div className="info-inners">
                                                                                        <h3 className="item-titles">
                                                                                            {' '}
                                                                                            <Link
                                                                                                to={
                                                                                                    ''
                                                                                                }
                                                                                                tabIndex={
                                                                                                    0
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    similar.product_name
                                                                                                }{' '}
                                                                                            </Link>{' '}
                                                                                        </h3>
                                                                                        <div className="item-contents">
                                                                                            <div className="item-prices">
                                                                                                <div className="price-boxs">
                                                                                                    <p className="special-prices">
                                                                                                        <span className="prices">
                                                                                                            {formatCurrency(
                                                                                                                similar?.product_price,
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
                                                                                                tabIndex={
                                                                                                    0
                                                                                                }
                                                                                            />
                                                                                            <button
                                                                                                className="buttons btn-carts"
                                                                                                title="Mua hàng"
                                                                                                type="button"
                                                                                                tabIndex={
                                                                                                    0
                                                                                                }
                                                                                            >
                                                                                                <Link
                                                                                                    onClick={
                                                                                                        scrollToTop
                                                                                                    }
                                                                                                    to={`/products/${similar._id}`}
                                                                                                >
                                                                                                    Chi
                                                                                                    tiết
                                                                                                </Link>
                                                                                            </button>
                                                                                            <Model
                                                                                                products={
                                                                                                    similar
                                                                                                }
                                                                                            />
                                                                                        </form>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </SwiperSlide>
                                                            ),
                                                        )
                                                        : 'Không có sản phẩm liên quan'}
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
