
import { Image } from 'antd';
const Productlist = () => {
    return (
<div className="p-3">
    <h2 className="text-center text-2xl py-2">Trang Sản Phẩm</h2>
<div className="overflow-x-auto drop-shadow-xl rounded-lg">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Tên sản Phẩm 
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Ảnh Sản phẩm
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Danh mục
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Thương hiệu
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Chất liệu
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
         Màu
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Giá
        </th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Số lượng
        </th>
        
        <th className="px-4 py-2">
          <a
            href="/admin/products/add"
            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Thêm mới
          </a>
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
    <tr>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Bàn Ghế Cafe – Ghế Cafe Đầu Trầu GG01</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <Image
        width={100}
       src="https://faha.vn/wp-content/uploads/2023/07/ban-ghe-cafe-ghe-cafe-dau-trau-gg01-6.jpg"
         />
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">GHẾ GỖ CAFE</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">saca</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">gỗ</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">xanh</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-red-500">$120,000</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">40</td>
        <td className="whitespace-nowrap px-4 py-2">
          <a
            href="#"
            className="inline-block rounded bg-red-700 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Delete
          </a>
          <a
            href="#"
            className=" ml-2 inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Update
          </a>
        </td>
      </tr>

      <tr>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Bàn Ghế Cafe – Ghế Cafe Đầu Trầu GG01</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <Image
        width={100}
       src="https://faha.vn/wp-content/uploads/2023/07/ban-ghe-cafe-ghe-cafe-dau-trau-gg01-6.jpg"
         />
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">GHẾ GỖ CAFE</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">saca</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">gỗ</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">xanh</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-red-500">$120,000</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">40</td>
        <td className="whitespace-nowrap px-4 py-2">
          <a
            href="#"
            className="inline-block rounded bg-red-700 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Delete
          </a>
          <a
            href="#"
            className=" ml-2 inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Update
          </a>
        </td>
      </tr>

      <tr>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">Bàn Ghế Cafe – Ghế Cafe Đầu Trầu GG01</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <Image
        width={100}
       src="https://faha.vn/wp-content/uploads/2023/07/ban-ghe-cafe-ghe-cafe-dau-trau-gg01-6.jpg"
         />
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">GHẾ GỖ CAFE</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">saca</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">gỗ</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">xanh</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-red-500">$120,000</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">40</td>
        <td className="whitespace-nowrap px-4 py-2">
          <a
            href="#"
            className="inline-block rounded bg-red-700 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Delete
          </a>
          <a
            href="#"
            className=" ml-2 inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Update
          </a>
        </td>
      </tr>
      
    </tbody>
  </table>
</div>
        </div>
    )
}

export default Productlist