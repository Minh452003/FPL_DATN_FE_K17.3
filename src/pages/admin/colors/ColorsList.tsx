

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
    title: 'Màu',
    dataIndex: 'name',
    key: 'name',
    render: (text:any) => <a>{text}</a>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (record:any) => (
      <Space size="middle">
        <a className='ml-2 inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'>delete</a>
      </Space>
      
    ),
  },
];

const Colorslist = () => {
  const data: DataType[] = [
    {
      key: '1',
      name: 'vàng',
    },
    {
      key: '2',
      name: 'đỏ',
    },
    {
      key: '3',
      name: 'black'
   
    },
  ];

  return (
    <div>
        <h2 className="text-center text-2xl py-2">Bảng màu </h2>
        <th className="px-4 py-2">
          <a
            href="/admin/color/add"
            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Thêm mới
          </a>
        </th>

        <Table className='text-center' columns={columns} dataSource={data} />
    </div>
  );
}

export default Colorslist;