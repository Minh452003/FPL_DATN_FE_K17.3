import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useGetProductsQuery } from '@/api/productApi';
import { useGetCategoryQuery } from '@/api/categoryApi';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductList = () => {
    const { data: categories }: any = useGetCategoryQuery();
    const { data: products, error, isLoading: isLoadingFetching }: any = useGetProductsQuery();
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


    const formatCurrency = (number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
        <div>
            {categories && categories.category.docs.map((category: any) => {
                if (products && products.product && products.product.docs) {
                    const categoryProducts = products.product.docs.filter((product: any) => product.categoryId === category._id);
                    return (
                        <div key={category._id} className="main-col2 bg_menu lazyload" data-was-processed="true">
                            <div className="container">
                                <div className="std">
                                    <div
                                        className="best-seller-pro menu"
                                        style={{ visibility: "visible" }}
                                    >
                                        <div className="slider-items-products">
                                            <div className="new_title lt clear_pd">
                                                <h4>
                                                    <Link to={''} title={category.category_name}>
                                                        {category.category_name}
                                                    </Link>
                                                </h4>
                                            </div>
                                            <div id="best-seller-slider" className="hidden-buttons">
                                                <div className="sock_slide slider-items slick_margin slick-initialized slick-slider">
                                                    <Swiper
                                                        slidesPerView={slidesPerView}
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
                                                                {categoryProducts && categoryProducts.map((product: any, index: number) => (
                                                                    <SwiperSlide key={product._id}>
                                                                        <div
                                                                            className="item slick-slide slick-current slick-active"
                                                                            tabIndex={-1}
                                                                            role="option"
                                                                            aria-describedby={`slick-slide${index + 10}`}
                                                                            style={{ width: "273px" }}
                                                                            data-slick-index={`${index}`}
                                                                            aria-hidden="false"
                                                                        >
                                                                            <div className="col-item1 ">
                                                                                <div className="item-inner">
                                                                                    <div className="product-wrapper">
                                                                                        <div className="thumb-wrapper">
                                                                                            <Link
                                                                                                to={''}
                                                                                                className="thumb flip"
                                                                                                title={product.product_name}
                                                                                                tabIndex={0}
                                                                                            >
                                                                                                <img
                                                                                                    className="lazyload loaded"
                                                                                                    src={product.image.url}
                                                                                                    alt={product.product_name}
                                                                                                />
                                                                                            </Link>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="item-info">
                                                                                        <div className="info-inner">
                                                                                            <h3 className="item-title">
                                                                                                {" "}
                                                                                                <Link
                                                                                                    to={''}
                                                                                                    title={product.product_name}
                                                                                                    tabIndex={0}
                                                                                                >
                                                                                                    {product.product_name}
                                                                                                </Link>{" "}
                                                                                            </h3>
                                                                                            <div className="item-content">
                                                                                                <div className="item-price">
                                                                                                    <div className="price-box">
                                                                                                        <span className="regular-price">
                                                                                                            {" "}
                                                                                                            <span className="price">
                                                                                                                {formatCurrency(product.product_price)}₫
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
                                                                                                    <Link to={''}>
                                                                                                        Chi tiết
                                                                                                    </Link>
                                                                                                </button>
                                                                                                <input type="hidden" tabIndex={0} />
                                                                                                <button
                                                                                                    className="button btn-cart"
                                                                                                    title="Mua hàng"
                                                                                                    type="button"
                                                                                                    tabIndex={0}
                                                                                                >
                                                                                                    <Link to={''}>Mua hàng</Link>
                                                                                                </button>
                                                                                            </form>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </SwiperSlide>
                                                                ))}
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
                    )
                } else {
                    <p>..................không có sản phẩm nào.</p>
                }
            })}
        </div>
    )
}

export default ProductList