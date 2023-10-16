import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useGetProductSellQuery } from '@/api/productApi';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductSell = () => {
    const [slidesPerView, setSlidesPerView] = useState(1); // Mặc định là 1
    const { data: products, error, isLoading: isLoadingFetching }: any = useGetProductSellQuery();

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
                                    {products.length > 0 ? (
                                        products.map((product: any, index: any) => (
                                            <SwiperSlide key={product._id}>
                                                <div
                                                    className="item slick-slide slick-current slick-active"
                                                    tabIndex={-1}
                                                    role="option"
                                                    aria-describedby={`slick-slide${index + 10}`} // Cập nhật aria-describedby
                                                    style={{ width: "273px" }}
                                                    data-slick-index={`${index}`}
                                                    aria-hidden="false"
                                                >
                                                    <div className="col-item1 ">
                                                        <div className="item-inner">
                                                            <div className="product-wrapper">
                                                                <div className="thumb-wrapper">
                                                                    <Link
                                                                        to="/products/ban-tra-go-tu-nhien-5cbt-136"
                                                                        className="thumb flip"
                                                                        title={product?.product_name}
                                                                        tabIndex={0}
                                                                    >
                                                                        <img
                                                                            className="lazyload loaded"
                                                                            src={product.image?.url}
                                                                            alt="Bàn trà gỗ tự nhiên 5CBT-136"
                                                                        />
                                                                    </Link>
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
                                                                            {product?.product_name}
                                                                        </a>{" "}
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
                                        ))
                                    ) : (
                                        <p>..................không có sản phẩm nào.</p>
                                    )}

                                </div>
                            </div>
                        </Swiper>

                    </div>
                </div>
            </div >
        </div >
    )
}

export default ProductSell