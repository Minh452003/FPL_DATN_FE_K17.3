import { useGetCommentByProductIdQuery } from '@/api/commentApi';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';

const Commentdetail = () => {
  const { id }: any = useParams();
  const { data }: any = useGetCommentByProductIdQuery(id);
  const comments = data?.comments;

  const data1 = comments?.map((comment: any) => {
    return {
      key: comment._id,
      name: comment.userId,
      email: comment.userId,
      description: comment.description,
      rating:comment.rating,
      formattedCreatedAt:comment.formattedCreatedAt
    };
  });

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
      render: (record: any) => <div>{record?.first_name}</div>
    },
    {
      title: 'Gmail',
      dataIndex: 'email',
      render: (record: any) => <div>{record?.email}</div>
    },
    {
      title: 'Bình luận',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Sao',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Thời gian ',
      dataIndex: 'formattedCreatedAt',
      key: 'formattedCreatedAt',
    }
  ];

  return (
    <div>
      <div className="container">
      <h3 className="font-semibold py-3">Danh sách đánh giá của sản phẩm</h3>
      <Table dataSource={data1} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
    </div>
    </div>
  );
};

export default Commentdetail;
