

import { useGetCommentsQuery } from '@/api/commentApi';

import { Table, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { BiDetail} from "react-icons/bi";
import { useGetProductsQuery } from '@/api/productApi';


const Listcomments = () => {
    const {data : comment} = useGetCommentsQuery()
    const {data:product}:any = useGetProductsQuery()
   
    
   
    const comments = comment?.products
    const products = product?.product.docs;
    console.log(comments);
    

    const data1 = comments?.map((comment: any, index: number) => {
      return {
        key:comment._id,
        STT: index + 1,
        product: comment.product_name,
        comments_count:comment.comments_count
      }
    });

    const columns = [
        {
          title: 'STT',
          dataIndex: 'STT',
          key: 'STT',
          render: (index: any) => <a>{index}</a>,
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
        },
        {
            title: 'Chức năng',
            render: ({ key: _id }: any) => (
              <div>
                <Button className='mr-5 text-blue-500' ><Link to={`/admin/comments/${_id}`}><BiDetail /></Link></Button>
              </div>
            ),
      
          }
      ];
  return (
    <div>
      <div className="container">
      <h3 className="font-semibold py-3">Danh sách sản phẩm có đánh giá </h3>
      <Table dataSource={data1} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
    </div>
    </div>
  )
}

export default Listcomments