import React from 'react';
import { Space, Table } from 'antd';

interface DataType {
  key: string;
  name: string;
  image: string;
  email: string;
  phone: string;
  tags: string[];
}

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text:any) => <a>{text}</a>,
  },
  {
    title: 'Ảnh',
    dataIndex: 'image', // Corrected dataIndex
    key: 'image', // Corrected key
    render: (image:any) => <img src={image} alt="User Avatar" width={100} />,
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
    title: 'Action',
    key: 'action',
    render: (record:any) => (
      <Space size="middle">
        <a className='ml-2 inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'>Update</a>
      </Space>
    ),
  },
];

const Userlist = () => {
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      image: 'https://res.cloudinary.com/dndyxqosg/image/upload/v1676729011/Upload-my-cv/jgcvhqj0fuuf80cehmwr.jpg',
      email: 'tranquyluong1234@gmail.com',
      phone: '0325932836',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      image: 'https://res.cloudinary.com/dndyxqosg/image/upload/v1676729011/Upload-my-cv/jgcvhqj0fuuf80cehmwr.jpg',
      email: 'tranquyluong1234@gmail.com',
      phone: '0325932836',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      image: 'https://res.cloudinary.com/dndyxqosg/image/upload/v1676729011/Upload-my-cv/jgcvhqj0fuuf80cehmwr.jpg',
      email: 'tranquyluong1234@gmail.com',
      phone: '0325932836',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <div><Table columns={columns} dataSource={data} /></div>
  );
}

export default Userlist;
