import { useGetColorsQuery, useRemoveColorMutation } from '@/api/colorApi';
import { IColor } from '@/interfaces/color';
import { Button, Input, Skeleton, Table } from 'antd';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCirclePlus, FaTrashCan, FaWrench } from 'react-icons/fa6';
import { IoSearchSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Colorslist = () => {
    const { data, error, isLoading }: any = useGetColorsQuery();
    const [searchText, setSearchText] = useState('');
    const [removeColor, { isLoading: isRemoveLoading }] = useRemoveColorMutation();
    const [sortedInfo, setSortedInfo] = useState({} as any);
    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setSortedInfo(sorter);
    };
    const color = isLoading ? [] : data?.color;
    const dataSource = color?.map(({ _id, colors_name }: IColor, index: number) => {
        return {
            key: _id,
            STT: index + 1,
            name: colors_name,
        };
    });
    const deleteColor = (id: any) => {
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
                removeColor(id).then(() => {
                    Swal.fire('Xoá thành công!', 'Màu của bạn đã được xoá.', 'success');
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Hiển thị thông báo hủy xóa sản phẩm
                Swal.fire('Thất bại', 'Màu xoá thất bại.', 'error');
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
            title: 'Tên màu',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Chức năng',
            render: ({ key: _id }: any) => {
                return (
                    <div style={{ width: '150px' }}>
                        <Button className="mr-1 text-red-500" onClick={() => deleteColor(_id)}>
                            {isRemoveLoading ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : (
                                <FaTrashCan />
                            )}
                        </Button>
                        <Button className="mr-1 text-blue-500">
                            <Link to={`/admin/colors/edit/${_id}`}>
                                <FaWrench />
                            </Link>
                        </Button>
                    </div>
                );
            },
        },
    ];
    // Xử lý filter..............
    const filteredData = dataSource?.filter((item: any) => {
        const lowerCaseSearchText = searchText.toLowerCase();
        return item.name.toLowerCase().includes(lowerCaseSearchText);
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
            <h3 className="font-semibold">Danh sách màu</h3>
            <div className="flex p-1">
                <Button className="text-blue-500">
                    <Link to="/admin/colors/add">
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

export default Colorslist;
