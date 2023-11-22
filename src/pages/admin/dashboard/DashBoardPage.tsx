import { useGetCommentStatiscalQuery, useGetCountOrderQuery, useGetCountUserQuery, useGetOrderAccomplishedQuery, useGetOrderConfirmedQuery, useGetOrderUnconfirmedQuery, useGetProductSellQuery, useSellingProductsQuery, useStatisticalOrdersQuery, useTotalCreatedProductsQuery, useTotalSoldQuantityQuery, useViewedProductsQuery } from "@/api/statisticalApi";
import { useEffect, useState } from "react";
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js';
import 'chart.js/auto';
import { useGetBrandQuery } from "@/api/brandApi";
import { useGetMaterialQuery } from "@/api/materialApi";
import { useGetCategoryQuery } from "@/api/categoryApi";
import { Skeleton, Table } from "antd";
import { format } from "date-fns";
import { AiFillStar, AiOutlineComment } from "react-icons/ai";

const DashBoardPage = () => {
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthSell, setMonthSell] = useState(null);
    const [yearSell, setYearSell] = useState(new Date().getFullYear());
    const [monthView, setMonthView] = useState(null);
    const [yearView, setYearView] = useState(new Date().getFullYear());
    const [monthSta, setMonthSta] = useState(null);
    const [yearSta, setYearSta] = useState(new Date().getFullYear());
    const { data: brands } = useGetBrandQuery<any>();
    const { data: materials } = useGetMaterialQuery<any>();
    const { data: categories } = useGetCategoryQuery<any>();
    const category = categories?.category?.docs;
    const brand = brands?.brand;
    const material = materials?.material;
    const { data, isLoading } = useStatisticalOrdersQuery({
        month: month,
        year: year
    });
    const { data: sellProducts, isLoading: isLoadingProducts } = useSellingProductsQuery<any>({
        month: monthSell,
        year: yearSell
    });
    const { data: viewProducts, isLoading: isLoadingView } = useViewedProductsQuery<any>({
        month: monthView,
        year: yearView
    });
    const { data: soldProducts, isLoading: isLoadingSold } = useTotalSoldQuantityQuery<any>({
        month: month,
        year: year
    });
    const { data: countProducts, isLoading: isLoadingCount } = useTotalCreatedProductsQuery<any>({
        month: month,
        year: year
    });
    const { data: countOrders, isLoading: isLoadingOrder } = useGetCountOrderQuery<any>({
        month: month,
        year: year
    });
    const { data: countUsers, isLoading: isLoadingUser } = useGetCountUserQuery<any>({
        month: month,
        year: year
    });
    const { data: productSell, isLoading: isLoadingSell } = useGetProductSellQuery<any>({
        month: monthSta,
        year: yearSta
    });
    const { data: commentSta, isLoading: isLoadingComment } = useGetCommentStatiscalQuery<any>({
        month: monthSta,
        year: yearSta
    });
    const { data: orderUnconfirmed } = useGetOrderUnconfirmedQuery<any>({
        month: month,
        year: year
    });
    const { data: orderConfirmed } = useGetOrderConfirmedQuery<any>({
        month: month,
        year: year
    });
    const { data: orderAccomplished } = useGetOrderAccomplishedQuery<any>({
        month: month,
        year: year
    });
    const { data: comment, error } = useGetCommentStatiscalQuery<any>({
        month: month,
        year: year
    });
    // ----------------------------------------------
    useEffect(() => {
        if (month == 0) {
            setMonth(null);
            setYear(year);
        } else if (monthSell == 0) {
            setMonthSell(null);
            setYearSell(yearSell);
        } else if (monthView == 0) {
            setMonthView(null);
            setYearView(yearView);
        } else if (monthSta == 0) {
            setMonthSta(null);
            setYearSta(yearSta);
        }
    }, [month, monthSell, monthView, monthSta])
    const onHandleMonth = (e: any) => {
        setMonth(e);
    }
    const onHandleYear = (e: any) => {
        setYear(e);
    }
    // 
    const onHandleMonthSell = (e: any) => {
        setMonthSell(e);

    }
    const onHandleYearSell = (e: any) => {
        setYearSell(e);
    }
    // 
    const onHandleMonthView = (e: any) => {
        setMonthView(e);

    }
    const onHandleYearView = (e: any) => {
        setYearView(e);
    }
    // 
    const onHandleMonthSta = (e: any) => {
        setMonthSta(e);

    }
    const onHandleYearSta = (e: any) => {
        setYearSta(e);
    }
    // -------------------------------------------
    const chartData = {
        labels: data ? data?.map((item: any) => `Tháng ${item.month}`) : [],
        datasets: [
            {
                label: 'Doanh thu',
                data: data?.map((item: any) => item.total,),
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Màu nền của cột doanh thu (màu xanh lam)
                borderColor: 'rgba(54, 162, 235, 1)', // Màu viền của cột doanh thu (màu xanh lam)
                borderWidth: 1,
            },
            {
                label: 'Lợi nhuận',
                data: data?.map((item: any) => item.profit),
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Màu nền của cột lợi nhuận (màu đỏ)
                borderColor: 'rgba(255, 99, 132, 1)', // Màu viền của cột lợi nhuận (màu đỏ)
                borderWidth: 1,
            },
        ],
    };

    const options: any = {
        scales: {
            x: {
                barThickness: 10, // Điều chỉnh chiều rộng của cột
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: any) {
                        return value.toLocaleString() + 'đ'; // Thêm "đ" vào giá trị trục y
                    },
                },

            },
        },
        plugins: {
            legend: {
                display: true, // Hiển thị chú thích
                position: 'top', // Vị trí của chú thích
            },
            title: {
                display: true, // Hiển thị tiêu đề
                text: 'Doanh thu và lợi nhuận',
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.parsed.y.toLocaleString() + 'đ'; // Thêm "đ" vào giá trị dữ liệu
                        return label;
                    },
                },
            },
        },
    };
    // 
    const productNames = productSell?.map((product: any) => product?._id);
    const totalSold = productSell?.map((product: any) => product?.totalSold);

    const chartData1 = {
        labels: productNames,
        datasets: [
            {
                data: totalSold,
                backgroundColor: [
                    'rgba(255, 99, 71, 0.6)', // Màu đỏ đậm
                    'rgba(46, 139, 87, 0.6)', // Màu xanh lá cây đậm
                    'rgba(218, 165, 32, 0.6)', // Màu vàng đậm
                    'rgba(139, 69, 19, 0.6)', // Màu nâu đậm
                    'rgba(0, 0, 128, 0.6)', // Màu xanh dương đậm
                ]

            },
        ],
    };
    const options1: any = {
        plugins: {
            legend: {
                display: true, // Hiển thị chú thích
                position: 'right', // Vị trí của chú thích
            },
            title: {
                display: true, // Hiển thị tiêu đề
                text: 'Sản phẩm đã bán',
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const label = context.label || '';
                        const value = context.formattedValue || '';
                        return ` ${value} đã bán`;
                    },
                },
            },
        },
    };
    // --------------------------------------------------
    const [sortedInfo, setSortedInfo] = useState({} as any);
    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setSortedInfo(sorter);
    };
    const data1 = sellProducts?.map((product: any, index: number) => {
        return {
            key: product._id,
            STT: index + 1,
            name: product.product_name,
            price: product.product_price,
            category: product.categoryId,
            brand: product.brandId,
            materials: product.materialId,
            quantity: product.sold_quantity,
            image: <img width={50} src={product.image[0]?.url} alt="" />,
        };
    });
    const formatCurrency = (number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const columns = [
        {
            title: "STT",
            dataIndex: "STT",
            key: "STT",
            render: (index: any) => <a>{index}</a>,
            sorter: (a: any, b: any) => a.STT - b.STT, // Sắp xếp theo STT
            sortOrder: sortedInfo.columnKey === 'STT' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text: any) => <a>{text}</a>,
            sorter: (a: any, b: any) => a.name.localeCompare(b.name), // Sắp xếp theo Name
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (price: any) => (
                <p className="text-red-700">{formatCurrency(price)}₫</p>
            ),
            sorter: (a: any, b: any) => a.price - b.price, // Sắp xếp theo giá
            sortOrder: sortedInfo.columnKey === "price" && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: "Đã bán",
            dataIndex: "quantity",
            key: "quantity",
            render: (text: any) => <a>{text}</a>,
            sorter: (a: any, b: any) => a.quantity - b.quantity, // Sắp xếp theo số lượng đã bán
            sortOrder: sortedInfo.columnKey === "quantity" && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: "Danh Mục",
            dataIndex: "category",
            key: "category",
            render: (record: any) => {
                const catename = category?.find((cate: any) => cate._id === record);
                return catename?.category_name;
            },
        },
        {
            title: "Chất liệu",
            dataIndex: "materials",
            key: "materials",
            render: (record: string) => {
                const materialname = material?.find(
                    (materials: any) => materials._id === record
                );
                return materialname?.material_name;
            },
        },
        {
            title: "Thương hiệu",
            dataIndex: "brand",
            key: "brand",
            render: (record: string) => {
                const brandname = brand?.find((bra: any) => bra._id === record);
                return brandname?.brand_name;
            },
        }
    ];
    // -----------------------------------------------
    const shouldRenderChart = data && data.length > 0;
    const shouldSellProducts = sellProducts && sellProducts.length > 0;
    const shouldViewProducts = viewProducts && viewProducts.length > 0;
    const shouldSoldProducts = soldProducts && soldProducts.length > 0;
    const shouldCountProducts = countProducts && countProducts.length > 0;
    const shouldCountOrders = countOrders && countOrders.length > 0;
    const shouldCountUsers = countUsers && countUsers.length > 0;
    const shouldOrderUnconfirmed = orderUnconfirmed && orderUnconfirmed.length > 0;
    const shouldOrderConfirmed = orderConfirmed && orderConfirmed.length > 0;
    const shouldOrderAccomplished = orderAccomplished && orderAccomplished.length > 0;

    if (isLoading) return <Skeleton />;
    if (isLoadingProducts) return <Skeleton />;
    if (isLoadingView) return <Skeleton />;
    if (isLoadingSold) return <Skeleton />;
    if (isLoadingCount) return <Skeleton />;
    if (isLoadingOrder) return <Skeleton />;
    if (isLoadingUser) return <Skeleton />;
    if (isLoadingSell) return <Skeleton />;
    if (isLoadingComment) return <Skeleton />;

    return (
        <div>
            <h3 className="font-semibold">Bảng điều khiển</h3>
            <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="p-6 bg-purple-500 text-white rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Số Lượng Sản Phẩm</h3>
                            <p className="text-3xl font-bold">{shouldCountProducts ? countProducts[0]?.count : 0}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            className="h-8 w-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>


                    <div className="p-6 bg-blue-500 text-white rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Số Lượng Sản Phẩm Đã Bán</h3>
                            <p className="text-3xl font-bold">{shouldSoldProducts ? soldProducts[0]?.totalSoldQuantity : 0}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            className="h-8 w-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>


                    <div className="p-6 bg-green-500 text-white rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Số Lượng Đánh Giá Mới</h3>
                            <p className="text-3xl font-bold">{error?.status == 400 ? 0 : comment?.tongdanhgia}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            className="h-8 w-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>

                    <div className="p-6 bg-yellow-500 text-white rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Số Lượng Khách Hàng</h3>
                            <p className="text-3xl font-bold">{shouldCountUsers ? countUsers[0]?.count : 0}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            className="h-8 w-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>
                </div>
                <br />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="p-6 bg-cyan-500 text-white rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Số Lượng Đơn Hàng</h3>
                            <p className="text-3xl font-bold">{shouldCountOrders ? countOrders[0]?.count : 0}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            className="h-8 w-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>
                    <div className="p-6 bg-pink-700 text-white rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Đơn Hàng Chưa Xác Nhận</h3>
                            <p className="text-3xl font-bold">{shouldOrderUnconfirmed ? orderUnconfirmed[0]?.count : 0}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            className="h-8 w-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>
                    <div className="p-6 bg-indigo-800 text-white rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Đơn Hàng Đã Xác Nhận</h3>
                            <p className="text-3xl font-bold">{shouldOrderConfirmed ? orderConfirmed[0]?.count : 0}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            className="h-8 w-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>
                    <div className="p-6 bg-cyan-600 text-white rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Đơn Hàng Đã Hoàn Thành</h3>
                            <p className="text-3xl font-bold">{shouldOrderAccomplished ? orderAccomplished[0]?.count : 0}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            className="h-8 w-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>
                </div>
                <br />
                <div className="mt-2 p-2 flex ">
                    <select
                        onChange={(e) => onHandleMonth(e.target.value)}
                        className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value={0}>Không chọn</option>
                        <option value={1}>Tháng 1</option>
                        <option value={2}>Tháng 2</option>
                        <option value={3}>Tháng 3</option>
                        <option value={4}>Tháng 4</option>
                        <option value={5}>Tháng 5</option>
                        <option value={6}>Tháng 6</option>
                        <option value={7}>Tháng 7</option>
                        <option value={8}>Tháng 8</option>
                        <option value={9}>Tháng 9</option>
                        <option value={10}>Tháng 10</option>
                        <option value={11}>Tháng 11</option>
                        <option value={12}>Tháng 12</option>
                    </select>
                    <select
                        onChange={(e) => onHandleYear(e.target.value)}
                        className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={''}
                    >
                        <option value="" disabled>Năm {new Date().getFullYear()}</option>
                        <option value={2021}>Năm 2021</option>
                        <option value={2022}>Năm 2022</option>
                        <option value={2023}>Năm 2023</option>
                        <option value={2024}>Năm 2024</option>
                    </select>
                </div>
                <div className="flex flex-row">
                    {shouldRenderChart ? <Bar data={chartData} options={options} /> : ''}
                </div>

                <div className="mt-8">
                    <h3 className="text-3xl font-semibold mb-6">Top 5 sản phẩm bán chạy</h3>
                    <div className="mt-2 p-2 flex ">
                        <select
                            onChange={(e) => onHandleMonthSell(e.target.value)}
                            className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value={0}>Không chọn</option>
                            <option value={1}>Tháng 1</option>
                            <option value={2}>Tháng 2</option>
                            <option value={3}>Tháng 3</option>
                            <option value={4}>Tháng 4</option>
                            <option value={5}>Tháng 5</option>
                            <option value={6}>Tháng 6</option>
                            <option value={7}>Tháng 7</option>
                            <option value={8}>Tháng 8</option>
                            <option value={9}>Tháng 9</option>
                            <option value={10}>Tháng 10</option>
                            <option value={11}>Tháng 11</option>
                            <option value={12}>Tháng 12</option>
                        </select>
                        <select
                            onChange={(e) => onHandleYearSell(e.target.value)}
                            className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue={''}
                        >
                            <option value="" disabled>Năm {new Date().getFullYear()}</option>
                            <option value={2021}>Năm 2021</option>
                            <option value={2022}>Năm 2022</option>
                            <option value={2023}>Năm 2023</option>
                            <option value={2024}>Năm 2024</option>
                        </select>
                    </div>
                    {shouldSellProducts ? <Table
                        onChange={handleChange}
                        dataSource={data1}
                        columns={columns}
                        pagination={{ defaultPageSize: 6 }}
                        rowKey="key"
                    /> : ''}
                    {/*  */}
                    <div className="mt-2 p-2 flex ">
                        <select
                            onChange={(e) => onHandleMonthSta(e.target.value)}
                            className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value={0}>Không chọn</option>
                            <option value={1}>Tháng 1</option>
                            <option value={2}>Tháng 2</option>
                            <option value={3}>Tháng 3</option>
                            <option value={4}>Tháng 4</option>
                            <option value={5}>Tháng 5</option>
                            <option value={6}>Tháng 6</option>
                            <option value={7}>Tháng 7</option>
                            <option value={8}>Tháng 8</option>
                            <option value={9}>Tháng 9</option>
                            <option value={10}>Tháng 10</option>
                            <option value={11}>Tháng 11</option>
                            <option value={12}>Tháng 12</option>
                        </select>
                        <select
                            onChange={(e) => onHandleYearSta(e.target.value)}
                            className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue={''}
                        >
                            <option value="" disabled>Năm {new Date().getFullYear()}</option>
                            <option value={2021}>Năm 2021</option>
                            <option value={2022}>Năm 2022</option>
                            <option value={2023}>Năm 2023</option>
                            <option value={2024}>Năm 2024</option>
                        </select>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="basis-1/2">
                            <Doughnut data={chartData1} options={options1} style={{ height: '150px' }} />
                        </div>
                        <div className="basis-1/2">
                            <div className="p-6 bg-orange-500 text-white rounded-lg shadow-md flex items-center justify-between mt-28 ml-20">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Tổng đánh giá:</h3>
                                    <p className="text-3xl font-bold">{commentSta ? <span>
                                        <span className="mr-1 text-xl">{commentSta?.tongdanhgia} đánh giá</span>
                                    </span> : 0}</p>
                                    <h3 className="text-lg font-semibold mb-2">Trung bình:</h3>
                                    <p className="text-xl font-bold">{commentSta ? <span>
                                        <span className="mr-1">{commentSta.trungbinh}</span>
                                        {Array.from(
                                            { length: commentSta?.trungbinh },
                                            (_, index) => (
                                                <AiFillStar
                                                    key={index}
                                                    style={{ color: "white" }}
                                                    className="inline"
                                                />
                                            )
                                        )}
                                    </span> : 0}</p>
                                    <h3 className="text-base font-semibold mb-2">Đánh giá tích cực:</h3>
                                    <p className="text-base font-bold">{commentSta ? <span>
                                        <span className="mr-1">{commentSta.tichcuc} đánh giá</span>
                                    </span> : 0}</p>
                                    <h3 className="text-base font-semibold mb-2">Đánh giá tiêu cực:</h3>
                                    <p className="text-base font-bold">{commentSta ? <span>
                                        <span className="mr-1">{commentSta.tieucuc} đánh giá</span>
                                    </span> : 0}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" stroke="currentColor"
                                    className="h-28 w-28 text-white text-4xl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <AiOutlineComment />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h3 className="text-3xl font-semibold mb-6">Top 5 sản phẩm được xem nhiều nhất</h3>
                    <div className="mt-2 p-2 flex ">
                        <select
                            onChange={(e) => onHandleMonthView(e.target.value)}
                            className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value={0}>Không chọn</option>
                            <option value={1}>Tháng 1</option>
                            <option value={2}>Tháng 2</option>
                            <option value={3}>Tháng 3</option>
                            <option value={4}>Tháng 4</option>
                            <option value={5}>Tháng 5</option>
                            <option value={6}>Tháng 6</option>
                            <option value={7}>Tháng 7</option>
                            <option value={8}>Tháng 8</option>
                            <option value={9}>Tháng 9</option>
                            <option value={10}>Tháng 10</option>
                            <option value={11}>Tháng 11</option>
                            <option value={12}>Tháng 12</option>
                        </select>
                        <select
                            onChange={(e) => onHandleYearView(e.target.value)}
                            className="block mr-4 p-2.5 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue={''}
                        >
                            <option value="" disabled>Năm {new Date().getFullYear()}</option>
                            <option value={2021}>Năm 2021</option>
                            <option value={2022}>Năm 2022</option>
                            <option value={2023}>Năm 2023</option>
                            <option value={2024}>Năm 2024</option>
                        </select>
                    </div>
                    {shouldViewProducts ? <ul>
                        {viewProducts?.map((product: any) => (
                            <li className="bg-gray-200 p-6 rounded-lg shadow-md mb-4 max-w-screen-sm" key={product?._id}>
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{product?.views} lượt xem</h3>
                                        <p>Sản Phẩm: {product?.product_name}</p>
                                        <p style={{ color: 'red' }}>Giá: {formatCurrency(product?.product_price)}đ</p>
                                        <p>Ngày bán: {format(new Date(product?.createdAt), "dd/MM/yyyy")} </p>
                                    </div>
                                    <div>
                                        <img src={product?.image[0]?.url} width={100} height={100} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul> : ''}
                </div>
            </div>
        </div>
    )
}

export default DashBoardPage