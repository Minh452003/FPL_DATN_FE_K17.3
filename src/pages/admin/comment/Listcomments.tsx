
import { useGetUsersQuery } from '@/api/authApi';
import { useGetCommentsQuery } from '@/api/commentApi';
import { useGetProductsQuery } from '@/api/productApi';
import { Table, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { BiDetail} from "react-icons/bi";


const Listcomments = () => {
    const {data : comment} = useGetCommentsQuery()
    const { data:user }: any = useGetUsersQuery()
    const {data:product}:any = useGetProductsQuery()
    const comments = comment?.comments
    const users = user?.data
    const products = product?.product.docs;
     

    const data1 = comments?.map((comment:any,index:number)=>{
            return{
                STT: index+1,
                user :comment.userId,
                product: comment.productId,
                description:comment.description,
                rating:comment.rating

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
            title: 'Tên khách hàng',
            dataIndex: 'user',
            key: 'user',
            render: (record: any) => {
              const name = users?.find((use: any) => use._id == record._id);
              return name?.last_name;
            }
          }
          ,
        {
          title: 'Sản Phẩm',
          dataIndex: 'product',
          key: 'product',
          render: (record: any) => {
            const name = products?.find((product: any) => product._id == record._id );
            return name?.product_name;
          }
        }
      
        
        ,
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
            title: 'Chức năng',
            render: ({ key: _id }: any) => (
              <div>
                <Button className='mr-5 text-blue-500' ><Link to={`/`}><BiDetail /></Link></Button>
              </div>
            ),
      
          }
      
        
        
    
      ];
  return (
    <div>
        <Table dataSource={data1}  columns={columns} />
    </div>
  )
}

export default Listcomments