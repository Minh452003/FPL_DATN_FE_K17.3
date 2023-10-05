import { Pagination } from '@mui/material';
const ProductPage = () => {
  return (
    <div className="px-6 lg:px-0">
      <h5><span className="mt-2 p-2 font-bold text-red-500">Trang chủ</span> -- sản phẩm</h5>
      <div className="mt-2 p-2 text-sm">Bộ lọc sản phẩm</div>
      <div className="mt-2 p-2 text-xs font-bold">giúp bạn tìm sản phẩm nhanh hơn</div>
      <div className="mt-2 p-2 flex ">
        <select id="small" className="block mr-4 p-2 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Nhà Sản Xuất</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <select id="small" className="block mr-4 p-2 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Lọc giá</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        <select id="small" className="block p-2 mb-6 text-sm  text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Loại</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div>
      <div className="flex justify-between "><div className="text-red-500 font-bold text-lg">Tất cả các sản phẩm</div> 
      <select id="small" className=" p-1 w-[75px] pr-3 mb-6 text-sm text-gray-900 border border-orange-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>thứ tự</option>
          <option value="US">1</option>
          <option value="CA">2</option>
          <option value="FR">3</option>
          <option value="DE">4</option>
        </select>
      </div>
      <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div>
        <img
          className="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
          alt=""
        />
        <div className="text-center font-bold justify-center">bàn trang điểm</div>
        <div className="text-center text-red-500">3.500.000 VNĐ</div>
      </div>
      <div>
        <img
          className="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
          alt=""
        />
        <div className="text-center font-bold justify-center">bàn trang điểm</div>
        <div className="text-center text-red-500">3.500.000 VNĐ</div>
      </div>
      <div>
        <img
          className="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
          alt=""
        />
        <div className="text-center font-bold justify-center">bàn trang điểm</div>
        <div className="text-center text-red-500">3.500.000 VNĐ</div>
      </div>
      <div>
        <img
          className="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
          alt=""
        />
        <div className="text-center font-bold justify-center">bàn trang điểm</div>
        <div className="text-center text-red-500">3.500.000 VNĐ</div>
      </div>
      <div>
        <img
          className="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
          alt=""
        />
        <div className="text-center font-bold justify-center">bàn trang điểm</div>
        <div className="text-center text-red-500">3.500.000 VNĐ</div>
      </div>
      <div>
        <img
          className="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
          alt=""
        />
        <div className="text-center font-bold justify-center">bàn trang điểm</div>
        <div className="text-center text-red-500">3.500.000 VNĐ</div>
      </div>
      </div>
      </div>
    <div className='flex w-full py-4 justify-center '>
    <Pagination count={4} variant="outlined" shape="rounded" />
    </div>
    </div>

  );
};

export default ProductPage;
