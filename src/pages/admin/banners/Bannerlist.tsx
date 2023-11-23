import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Table, Button } from 'antd';
import { FaCirclePlus, FaTrashCan, FaWrench } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useGetBannerQuery, useRemoveBannerMutation } from '@/api/bannerApi';
import { useState } from 'react';

const Bannerlist = () => {
    const { data } = useGetBannerQuery<any>();
    const banners = data?.banner?.docs;
    const [removeBanner, { isLoading: isRemoveLoading }] = useRemoveBannerMutation();
    const [sortedInfo, setSortedInfo] = useState({} as any);
    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setSortedInfo(sorter);
    };

    const data1 = banners?.map((banner: any, index: number) => {
        return {
            key: banner._id,
            STT: index + 1,
            image: <img width={200} src={banner.image?.url} alt="" />,
        };
    });
    const deleteBanner = (id: any) => {
        Swal.fire({
            title: 'Bạn chắc chứ?',
            text: 'Khi xóa bạn không thể khôi phục lại!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, tôi chắc chắn!',
            cancelButtonText: 'Huỷ',
        }).then((result) => {
            if (result.isConfirmed) {
                removeBanner(id)
                    .unwrap()
                    .then(() => {
                        Swal.fire('Xoá thành công!', 'Banner của bạn đã được xoá.', 'success');
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                //Hiển thị thông báo hủy xóa sản phẩm
                Swal.fire('Thất bại', 'Banner xoá thất bại.', 'error');
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
            title: 'Ảnh ',
            dataIndex: 'image',
            key: 'image',
        },

        {
            title: 'Chức năng',
            render: ({ key: _id }: { key: number | string }) => (
                <div style={{ width: '150px' }}>
                    <Button className="mr-1 text-red-500" onClick={() => deleteBanner(_id)}>
                        {isRemoveLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            <FaTrashCan />
                        )}
                    </Button>
                    <Button className="mr-1 text-blue-500">
                        <Link to={`/admin/banners/${_id}/edit`}>
                            <FaWrench />
                        </Link>
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <div className="container">
            <h3 className="font-semibold">Danh sách Banner</h3>
            <Button className="text-blue-500">
                <Link to="/admin/banners/add">
                    <FaCirclePlus style={{ fontSize: '24', display: 'block' }} />
                </Link>
            </Button>
            <Table
                onChange={handleChange}
                dataSource={data1}
                columns={columns}
                pagination={{ defaultPageSize: 6 }}
                rowKey="key"
            />
        </div>
    );
};

export default Bannerlist;
