import { useGetCouponQuery, useRemoveCouponMutation } from '@/api/couponsApi';
import { ICoupon } from '@/interfaces/coupon';
import { Button, Skeleton, Table, Alert, Input } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCirclePlus, FaTrashCan, FaWrench } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { IoSearchSharp } from 'react-icons/io5';
import { useState } from 'react';

const CouponsList = () => {
    const { data, error, isLoading }: any = useGetCouponQuery();
    const [searchText, setSearchText] = useState('');
    const [sortedInfo, setSortedInfo] = useState({} as any);
    const [removeCoupon, { isLoading: isRemoveLoading }] = useRemoveCouponMutation();
    const coupon = isLoading ? [] : data?.coupon;

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setSortedInfo(sorter);
    };
    const dataSource = coupon?.map(
        (
            {
                _id,
                coupon_name,
                coupon_code,
                coupon_content,
                coupon_quantity,
                discount_amount,
                expiration_date,
                min_purchase_amount,
            }: ICoupon,
            index: number,
        ) => {
            const formattedExpirationDate = expiration_date
                ? format(new Date(expiration_date), 'dd/MM/yyyy')
                : '';
            return {
                key: _id,
                STT: index + 1,
                coupon_name,
                coupon_code,
                coupon_content,
                coupon_quantity,
                discount_amount,
                expiration_date: formattedExpirationDate,
                min_purchase_amount,
            };
        },
    );
    const formatCurrency = (number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    const deleteCoupon = (id: any) => {
        Swal.fire({
            title: 'Bạn chắc chứ?',
            text: 'Khi xoá không thể phục hồi lại!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, tôi chắc chắn!',
            cancelButtonText: 'Huỷ',
        }).then((result) => {
            if (result.isConfirmed) {
                // Xóa sản phẩm
                removeCoupon(id).then(() => {
                    Swal.fire('Xoá thành công!', 'Phiếu giảm giá của bạn đã được xoá.', 'success');
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Hiển thị thông báo hủy xóa sản phẩm
                Swal.fire('Thất bại', 'Phiếu giảm giá xoá thất bại.', 'error');
            }
        });
    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render: (index: any) => <a>{index}</a>,
            sorter: (a: any, b: any) => a.STT - b.STT, // Sắp xếp theo STT
            sortOrder: sortedInfo.columnKey === 'STT' && sortedInfo.order,
            ellipsis: true,
            width: 90,
        },
        {
            title: 'Phiếu giảm giá',
            dataIndex: 'coupon_name',
            key: 'coupon_name',
            width: 150,
        },
        {
            title: 'Mã giảm giá',
            dataIndex: 'coupon_code',
            key: 'coupon_code',
            width: 120,
        },
        {
            title: 'Nội dung',
            dataIndex: 'coupon_content',
            key: 'coupon_content',
            width: 200,
        },
        {
            title: 'Số lượng',
            width: 120,
            dataIndex: 'coupon_quantity',
            key: 'coupon_quantity',
            sorter: (a: any, b: any) => a.coupon_quantity - b.coupon_quantity, // Sắp xếp theo coupon_quantity
            sortOrder: sortedInfo.columnKey === 'coupon_quantity' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Chiết khấu',
            width: 120,
            dataIndex: 'discount_amount',
            key: 'discount_amount',
            render: (index: any) => <a>{index}%</a>,
            sorter: (a: any, b: any) => a.discount_amount - b.discount_amount, // Sắp xếp theo discount_amount
            sortOrder: sortedInfo.columnKey === 'discount_amount' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Ngày hết hạn',
            width: 120,
            dataIndex: 'expiration_date',
            key: 'expiration_date',
            sorter: (a: any, b: any) => a.expiration_date.localeCompare(b.expiration_date),
            sortOrder: sortedInfo.columnKey === 'expiration_date' && sortedInfo.order,
        },
        {
            title: 'Số tiền mua tối thiểu',
            width: 200,
            dataIndex: 'min_purchase_amount',
            key: 'min_purchase_amount',
            render: (index: any) => <a>{formatCurrency(index)}đ</a>,
            sorter: (a: any, b: any) => a.min_purchase_amount - b.min_purchase_amount, // Sắp xếp theo min_purchase_amount
            sortOrder: sortedInfo.columnKey === 'min_purchase_amount' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Chức năng',
            width: 170,
            render: ({ key: _id }: any) => {
                return (
                    <div style={{ width: '150px' }}>
                        <Button className="mr-1 text-red-500" onClick={() => deleteCoupon(_id)}>
                            {isRemoveLoading ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : (
                                <FaTrashCan />
                            )}
                        </Button>
                        <Button className="mr-1 text-blue-500">
                            <Link to={`/admin/coupons/edit/${_id}`}>
                                <FaWrench />
                            </Link>
                        </Button>
                    </div>
                );
            },
        },
    ];
    const filteredData = dataSource?.filter((item: any) => {
        const lowerCaseSearchText = searchText.toLowerCase();
        const numericSearchText = parseFloat(lowerCaseSearchText);
        return (
            item.coupon_name.toLowerCase().includes(lowerCaseSearchText) ||
            item.coupon_code.toLowerCase().includes(lowerCaseSearchText) ||
            item.coupon_content.toLowerCase().includes(lowerCaseSearchText) ||
            item.coupon_quantity === numericSearchText ||
            item.discount_amount === numericSearchText
        );
    });
    if (isLoading) return <Skeleton />;
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
        <div className="container">
            <h3 className="font-semibold">Danh sách phiếu giảm giá</h3>
            <div className="flex p-1">
                <Button className="text-blue-500">
                    <Link to="/admin/coupons/add">
                        <FaCirclePlus style={{ fontSize: '24', display: 'block' }} />
                    </Link>
                </Button>
                <Input
                    className="ml-4"
                    prefix={<IoSearchSharp style={{ opacity: 0.5 }} />}
                    placeholder="Tìm kiếm ..."
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ marginBottom: '16px', borderRadius: '5px', width: '400px' }}
                />
            </div>
            <div className="overflow-x-auto drop-shadow-xl rounded-lg">
                <Table
                    onChange={handleChange}
                    dataSource={filteredData}
                    columns={columns}
                    pagination={{ defaultPageSize: 6 }}
                    rowKey="key"
                />
            </div>
        </div>
    );
};

export default CouponsList;
