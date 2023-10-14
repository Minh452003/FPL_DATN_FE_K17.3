

import { Space, Table } from 'antd';

interface DataType {
  key: string;
  name: string;
}

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Tên thương hiệu',
    dataIndex: 'name',
    key: 'name',
    render: (text:any) => <a>{text}</a>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (record:any) => (
      <Space size="middle">
        <a href='brand/edit/:id' className='ml-2 inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'>Update</a>
        <a className='ml-2 inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'>delete</a>
      </Space>
      
    ),
  },
];

const BrandsList = () => {
  const data: DataType[] = [
    {
      key: '1',
      name: 'soffa',
    },
    {
      key: '2',
      name: 'Gỗ',
    },
    {
      key: '3',
      name: 'da lộn'
   
    },
  ];

  return (
    <div>
        <h2 className="text-center text-2xl py-2">Trang danh sách thương hiệu</h2>
        <th className="px-4 py-2">
          <a
            href="/admin/brand/add"
            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Thêm mới
          </a>
        </th>

        <Table className='text-center' columns={columns} dataSource={data} />
    </div>
  );
}

export default BrandsList;
