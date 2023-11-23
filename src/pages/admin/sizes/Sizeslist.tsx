import { useGetSizeQuery, useRemoveSizeMutation } from '@/api/sizeApi';
import { ISize } from '@/interfaces/size';
import { Button, Skeleton, Table, Alert, Input } from 'antd';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCirclePlus, FaTrashCan, FaWrench } from 'react-icons/fa6';
import { IoSearchSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Sizeslist = () => {
    const { data, error, isLoading }: any = useGetSizeQuery();
    const [searchText, setSearchText] = useState('');
    const [removeSize, { isLoading: isRemoveLoading }] = useRemoveSizeMutation();
    const size = isLoading ? [] : data?.size;
    const [sortedInfo, setSortedInfo] = useState({} as any);
    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setSortedInfo(sorter);
    };
    const dataSource = size?.map(
        (
            { _id, size_name, size_height, size_length, size_weight, size_width }: ISize,
            index: number,
        ) => {
            return {
                key: _id,
                STT: index + 1,
                size_name,
                size_height,
                size_length,
                size_weight,
                size_width,
            };
        },
    );
    const deleteSize = (id: any) => {
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
                removeSize(id).then(() => {
                    Swal.fire('Xoá thành công!', 'Kích cỡ của bạn đã được xoá.', 'success');
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Hiển thị thông báo hủy xóa sản phẩm
                Swal.fire('Thất bại', 'Kích cỡ xoá thất bại.', 'error');
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
            sortSize: sortedInfo.columnKey === 'STT' && sortedInfo.size,
            ellipsis: true,
            width: 90,
        },
        {
            title: 'Tên',
            dataIndex: 'size_name',
            key: 'size_name',
        },
        {
            title: 'Chiều cao',
            dataIndex: 'size_height',
            key: 'size_height',
            sorter: (a: any, b: any) => a.size_height - b.size_height,
            sortOrder: sortedInfo.columnKey === 'size_height' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Độ dài',
            dataIndex: 'size_length',
            key: 'size_length',
            sorter: (a: any, b: any) => a.size_length - b.size_length,
            sortOrder: sortedInfo.columnKey === 'size_length' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Cân nặng',
            dataIndex: 'size_weight',
            key: 'size_weight',
            sorter: (a: any, b: any) => a.size_weight - b.size_weight,
            sortOrder: sortedInfo.columnKey === 'size_weight' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Chiều dài',
            dataIndex: 'size_width',
            key: 'size_width',
            sorter: (a: any, b: any) => a.size_width - b.size_width,
            sortOrder: sortedInfo.columnKey === 'size_width' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Chức năng',
            render: ({ key: _id }: any) => {
                return (
                    <div style={{ width: '150px' }}>
                        <Button className="mr-1 text-red-500" onClick={() => deleteSize(_id)}>
                            {isRemoveLoading ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : (
                                <FaTrashCan />
                            )}
                        </Button>
                        <Button className="mr-1 text-blue-500">
                            <Link to={`/admin/sizes/edit/${_id}`}>
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
            item.size_name.toLowerCase().includes(lowerCaseSearchText) ||
            item.size_height === numericSearchText ||
            item.size_length === numericSearchText ||
            item.size_weight === numericSearchText ||
            item.size_width === numericSearchText
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
            <h3 className="font-semibold">Danh sách Kích cỡ</h3>
            <div className="flex p-1">
                <Button className="text-blue-500">
                    <Link to="/admin/sizes/add">
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

export default Sizeslist;
