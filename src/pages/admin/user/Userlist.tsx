
import { Table, Image, Input } from 'antd';
import { useGetUsersQuery } from '@/api/authApi';
import { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";

const Userlist = () => {
  const { data }: any = useGetUsersQuery();
  const user = data?.data;
  const [searchText, setSearchText] = useState('');
  const data1 = user?.map((user: any, index: number) => {
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
        : "Chưa có ảnh"
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
  ];

  // Xử lý filter..............
  const filteredData = data1?.filter((item: any) => {
    return item.email.toLowerCase().includes(searchText.toLowerCase());
  });
  return (
    <div className="container">
      <h3 className="font-semibold">Danh sách khách hàng </h3>
      <Input
        prefix={<IoSearchSharp style={{ opacity: 0.5 }} /> }
        placeholder="Tìm kiếm email người dùng..."
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: '16px', borderRadius: "5px", width:"400px" }}
        
      />
      <br />
      <Table dataSource={filteredData} columns={columns} pagination={{ defaultPageSize: 6 }} rowKey="key" />
    </div>
  );
}

export default Userlist;
