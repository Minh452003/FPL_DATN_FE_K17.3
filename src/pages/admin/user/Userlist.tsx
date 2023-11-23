import { Table, Image, Input, Button } from 'antd';
import { useGetUsersQuery } from '@/api/authApi';
import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FaWrench } from 'react-icons/fa';

const Userlist = () => {
    const { data, isloading }: any = useGetUsersQuery();
    const user = data?.data;

    const [searchText, setSearchText] = useState('');
    const [sortedInfo, setSortedInfo] = useState({} as any);

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setSortedInfo(sorter);
    };
    const data1 = isloading
        ? []
        : user?.map((user: any, index: number) => {
              return {
                  key: user._id,
                  STT: index + 1,
                  name: user.first_name,
                  email: user.email,
                  phone: user.phone ? user.phone : 'Chưa có số điện thoại',
                  address: user.address ? user.address : 'Chưa có địa chỉ',
                  image: user.avatar ? (
                      <Image width={80} height={80} src={user.avatar.url} />
                  ) : (
                      'Chưa có ảnh'
                  ),
                  role: user.role,
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
                return <Image width={80} height={80} src={record.url} />;
            },
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
                        <Button className="mr-1 text-blue-500">
                            <Link to={`/admin/users/edit/${_id}`}>
                                <FaWrench />
                            </Link>
                        </Button>
                    </div>
                );
            },
        },
    ];

    // Xử lý filter..............
    const filteredData = data1?.filter((item: any) => {
        const lowerCaseSearchText = searchText.toLowerCase();
        return (
            item.email.toLowerCase().includes(lowerCaseSearchText) ||
            item.phone.toLowerCase().includes(lowerCaseSearchText) ||
            item.address.toLowerCase().includes(lowerCaseSearchText) ||
            item.role.toLowerCase().includes(lowerCaseSearchText)
        );
    });
    return (
        <div className="container">
            <h3 className="font-semibold">Danh sách khách hàng </h3>
            <Input
                prefix={<IoSearchSharp style={{ opacity: 0.5 }} />}
                placeholder="Tìm kiếm ..."
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
    );
};

export default Userlist;
