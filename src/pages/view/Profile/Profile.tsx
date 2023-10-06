import { Link, Outlet } from "react-router-dom";

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

              <Link
                to="/profile/purchase"
                className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Đơn mua
              </Link>
            </li>

            <li>
              <Link
                to=""
                className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Thông báo
              </Link>
            </li>
            <li>
              <Link
                to="/profile/voucher"
                className="block rounded-lg px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Kho voucher
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ProfilePage;
