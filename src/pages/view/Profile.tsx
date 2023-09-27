const ProfilePage = () => {
  return (
    <div className="flex justify-between w-[100%] gap-1">
      <div className="w-[300px] flex flex-col justify-center border-e bg-white">
        <div className="grid grid-row-2 pt-2">
          <div className="flex justify-center">
            <img
              alt="avatar"
              src="https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/1200px-Man_Utd_FC_.svg.png"
              className="w-14 h-14 rounded-full"
            />
            <div className="">
              <span className="pl-2 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Thinguyen12
              </span>

              <div className="flex">
                <img
                  src="data:image/png;base64,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"
                  alt=""
                  className="w-5 h-5"
                />
                <a href="" className="no-underline text-gray-900">
                  Sửa hồ sơ
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-20 flex h-screen flex-col justify-between border-e bg-white">
          <ul className="">
            <li>
              <a
                href=""
                className="block rounded-lg px-2  py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Ưu đãi dành riêng cho bạn
              </a>
            </li>
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center rounded-lg px-2 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium">
                    {" "}
                    Tài khoản của tôi{" "}
                  </span>

                  <span className="pl-4 shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Hồ sơ
                    </a>
                  </li>

                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Ngân hàng
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Địa chỉ
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Đổi mật khẩu
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <a
                href=""
                className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Đơn mua
              </a>
            </li>

            <li>
              <a
                href=""
                className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Thông báo
              </a>
            </li>
            <li>
              <a
                href=""
                className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Kho voucher
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <div className="hidden w-full  md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col justify-between p-2 gap-4 md:p-0 mt-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="no-underline block py-2 pl-3  text-red bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Tất cả
              </a>
            </li>
            <li>
              <a
                href="#"
                className="no-underline block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Chờ thanh toán
              </a>
            </li>
            <li>
              <a
                href="#"
                className="no-underline block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Vận chuyển
              </a>
            </li>
            <li>
              <a
                href="#"
                className="no-underline block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Đang giao
              </a>
            </li>
            <li>
              <a
                href="#"
                className="no-underline block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Hoàn thành
              </a>
            </li>
            <li>
              <a
                href="#"
                className="no-underline block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Đã hủy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="no-underline block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Trả hàng/Hoàn tiền
              </a>
            </li>
          </ul>
        </div>

        <div>
          <form>
            <label
              form="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="        Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-center">
          <div className="mt-80">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsjWXF1H-_DeLCzI8hauXW2rH6ACG2XDPQkA&usqp=CAU"
              alt=""
              className="w-40 h-40"
            />
            <span>Chưa có đơn hàng nào</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;