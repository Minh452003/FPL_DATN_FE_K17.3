

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
    title: 'Size',
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

const SizesList = () => {
  const data: DataType[] = [
    {
      key: '1',
      name: '40m',
    },
    {
      key: '2',
      name: '30m',
    },
    {
      key: '3',
      name: '35m'
   
    },
  ];

  return (
    <div>
        <h2 className="text-center text-2xl py-2">Bảng size </h2>
        <th className="px-4 py-2">
          <a
            href="/admin/size/add"
            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Thêm mới
          </a>
        </th>

        <Table className='text-center' columns={columns} dataSource={data} />
    </div>
  );
}

export default SizesList;
