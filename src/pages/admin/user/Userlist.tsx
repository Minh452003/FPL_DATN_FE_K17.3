
import { Table,Image} from 'antd';
import { useGetUsersQuery } from '@/api/authApi';


const Userlist = () => {
  const { data} = useGetUsersQuery();
  console.log(data);
  const user = data?.data;
  const data1 = user?.map((user: any,index :number) => {
    return {
        key: user._id,
        STT: index + 1,
        name: user.first_name,
        email: user.email,
        phone:user.phone,
        address:user.address,
        image :  <Image
        width={100}
        height={100}
        src={user.avatar.url}
      />
    }
  });
  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT',
      render: (index:any) => <a>{index}</a> ,
       
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text:any) => <a>{text}</a>,
    },
    {
      title: 'Ảnh ',
      dataIndex: 'image',
      key: 'image',
      reder :(record:any) => {
        return (
           <Image
        width={100}
        height={100}
        src={record.url}
           />
        )
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email:any) => <a>{email}</a>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render:(phone:any) => <a>{phone}</a>,
    },    
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render:(address:any) => <a>{address}</a>,
    }, 
  ];

  return (
    <div className="container">
    <h2 className="text-center text-2xl py-2">Trang Quản lý Khách hàng </h2>
    <Table dataSource={data1} columns={columns}  />
    </div>
  );
}

export default Userlist;
