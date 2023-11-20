const CustomProductDetail = () => {
  return (
    
        <div className="mx-auto bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4">
            Sản Phẩm Nội Thất Tùy Chỉnh
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col">
                <div className="flex justify-center">
                <img src="https://gotrangtri.vn/wp-content/uploads/2019/11/bia-3.jpg" alt=""
                className="p-2 border rounded w-full mb-4" 
                />
                </div>
              <div>
              <h2 className="text-xl font-semibold mb-4">Bộ bàn ghế hiện đại</h2>
                <p className="text-gray-700 mb-4">
                Bàn ghế sofa gỗ phòng khách – Mang vẻ đẹp sang trọng và đẳng cấp đến ngôi nhà của bạn!!!
                </p>
              </div>
            </div>

            <div className="px-6 rounded shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                Thông Tin Khách Hàng
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    form="name"
                  >
                    Họ và Tên:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Họ và Tên"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    form="address"
                  >
                    Địa Chỉ:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    placeholder="Địa Chỉ"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    form="phone"
                  >
                    Số Điện Thoại:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="tel"
                    placeholder="Số Điện Thoại"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    form="email"
                  >
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    form="productName"
                  >
                    Tên Sản Phẩm:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="productName"
                    type="text"
                    placeholder="Tên Sản Phẩm"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    form="quantity"
                  >
                    Số Lượng:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="quantity"
                    type="number"
                    placeholder="Số Lượng"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    form="color"
                  >
                    Màu Sắc:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="color"
                    type="text"
                    placeholder="Màu Sắc"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    form="size"
                  >
                    Kích Thước:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="size"
                    type="text"
                    placeholder="Kích Thước"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    form="price"
                  >
                    Giá Tiền (VNĐ):
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    placeholder="Giá Tiền"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    form="paymentMethod"
                  >
                    Phương Thức Thanh Toán:
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="paymentMethod"
                  >
                    <option>Thanh toán khi nhận hàng (COD)</option>
                    <option>Chuyển khoản ngân hàng</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {" "}
                  Đặt Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
  );
};
export default CustomProductDetail;
