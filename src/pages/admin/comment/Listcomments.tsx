import { useGetCommentsQuery } from '@/api/commentApi';

import { Table, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { BiDetail } from 'react-icons/bi';
// import { useGetProductsQuery } from '@/api/productApi';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

const Listcomments = () => {
    const { data: comment, isloading: isLoadingComment, error } = useGetCommentsQuery<any>();
    // const { data: product } = useGetProductsQuery<any>();
    const comments = comment?.products;
    const [searchText, setSearchText] = useState('');
    const [sortedInfo, setSortedInfo] = useState({} as any);
    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setSortedInfo(sorter);
    };
    // const products = product?.product.docs;

    const dataComment = isLoadingComment
        ? []
        : comments?.map((comment: any, index: number) => {
              return {
                  key: comment._id,
                  STT: index + 1,
                  product: comment.product_name,
                  comments_count: comment.comments_count,
              };
          });

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
            title: 'Sản Phẩm',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Số lượng đánh giá',
            dataIndex: 'comments_count',
            key: 'comments_count',
            sorter: (a: any, b: any) => a.comments_count - b.comments_count,
            sortOrder: sortedInfo.columnKey === 'comments_count' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Chức năng',
            render: ({ key: _id }: any) => (
                <div>
                    <Button className="mr-5 text-blue-500">
                        <Link to={`/admin/comments/${_id}`}>
                            <BiDetail />
                        </Link>
                    </Button>
                </div>
            ),
        },
    ];
    const filteredData = dataComment?.filter((item: any) => {
        return item.product.toLowerCase().includes(searchText.toLowerCase());
    });
    if (error) return;
    return (
        <div>
            <div className="container">
                <h3 className="font-semibold py-3">Danh sách sản phẩm có đánh giá </h3>
                <Input
                    prefix={<IoSearchSharp style={{ opacity: 0.5 }} />}
                    placeholder="Tìm kiếm theo tên sản phẩm..."
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ marginBottom: '16px', borderRadius: '5px', width: '400px' }}
                />
                <br />
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

export default Listcomments;
