import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useGetProductsQuery } from '@/api/productApi';
import { useGetCategoryQuery } from '@/api/categoryApi';
import { Skeleton } from 'antd';

const ProductList = () => {
    const { data: products, error, isLoading: isLoadingFetching }: any = useGetProductsQuery();
    const { data: categories }: any = useGetCategoryQuery();
    // Chưa làm gì cả, chỉ mới gọi api thôi
    console.log(products);
    console.log(categories);

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
        </div>
    )
}

export default ProductList