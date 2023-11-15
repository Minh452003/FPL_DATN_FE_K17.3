
import { Table, Image, Button } from 'antd';
import { useGetUsersQuery } from '@/api/authApi';
import { Link } from 'react-router-dom';
import { FaWrench } from 'react-icons/fa';


const Userlist = () => {
  const { data,isloading }: any = useGetUsersQuery();
  const user = data?.data;
  const data1 =isloading ? []: user?.map((user: any, index: number) => {
    return {
      key: user._id,
      STT: index + 1,
      name: user.first_name,
      email: user.email,
      phone: user.phone ? user.phone : "Chưa có số điện thoại",
      address: user.address ? user.address : "Chưa có địa chỉ",
      image: user.avatar
        ? <Image
          width={80}
          height={80}
          src={user.avatar.url}
        />
        : "Chưa có ảnh",
      role:user.role
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Ảnh ',
      dataIndex: 'image',
      key: 'image',
      reder: (record: any) => {
        return (
          <Image
            width={80}
            height={80}
            src={record.url}
          />
        )
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: any) => <a>{email}</a>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: any) => <a>{phone}</a>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (address: any) => <a>{address}</a>,
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Chức năng',
      render: ({ key: _id }: any) => {
        return (
          <div style={{ width: '150px' }}>
            <Button className='mr-1 text-blue-500'>
              <Link to={`/admin/users/edit/${_id}`}><FaWrench /></Link>
            </Button>
          </div>
        )
      }
    },
  ];

  return (
    <div className="container">
      <h3 className="font-semibold">Danh sách khách hàng </h3>
      <br />
      <Table dataSource={data1} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
    </div>
  );
}

export default Userlist;
