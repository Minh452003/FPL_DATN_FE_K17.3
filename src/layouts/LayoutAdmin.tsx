import { Outlet } from "react-router-dom";
import {FaUser} from 'react-icons/fa'
import {AiFillHome,AiOutlineAreaChart} from 'react-icons/ai'
import {PiNotePencilFill} from 'react-icons/pi'
import {BiSolidReport} from 'react-icons/bi'
import {TiThMenu} from 'react-icons/ti'
const LayoutAdmin = () => {
  return (
    <div>
      <aside>
        <div className="flex justify-between gap-1">
          <div className="w-[260px] flex flex-col border-e bg-white">
          <div className="grid grid-row-2 pt-2">
              <div className="flex justify-center">
                <img
                  alt="avatar"
                  src="https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/1200px-Man_Utd_FC_.svg.png"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex justify-center">
                  <span className="ml-2 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Nội Thất Faha
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-row-2 pt-3">
              <div className="flex justify-center">
                <img
                  alt="avatar"
                  src="https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/1200px-Man_Utd_FC_.svg.png"
                  className="w-14 h-14 rounded-full"
                />
                <div className="">
                  <span className="pl-2 self-center text-1xl font-semibold whitespace-nowrap dark:text-white ">
                    Well come,
                  </span>

                  <div className="flex pl-2 self-center text-1xl font-semibold whitespace-nowrap dark:text-white">
                    <a href="" className="no-underline text-blue">
                     Thi
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className=" mt-10 flex h-screen flex-col justify-between ">
              <ul className="">
              
              <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center rounded-lg px-2 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <div className="flex flex-row">
                        <a href="" className="text-black pr-1"><AiFillHome/></a>
                      </div>
                      <span className="text-sm font-medium w-50">
                        {" "}
                        Home{" "}
                      </span>

                      <span className="pl-6 shrink-0 transition duration-300 group-open:-rotate-180">
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
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center  rounded-lg px-2 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <div className="flex flex-row">
                        <a href="" className="text-black pr-1"><PiNotePencilFill/></a>
                      </div>
                      <span className="text-sm font-medium w-50">
                        {" "}
                        Quản lý{" "}
                      </span>

                      <span className="pl-6 shrink-0 transition duration-300 group-open:-rotate-180">
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
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center rounded-lg px-2 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <div className="flex flex-row">
                        <a href="" className="text-black pr-1"><BiSolidReport/></a>
                      </div>
                      <span className="text-sm font-medium w-50">
                        {" "}
                            Báo cáo{" "}
                      </span>

                      <span className="pl-6 shrink-0 transition duration-300 group-open:-rotate-180">
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
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center rounded-lg px-2 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <div className="flex flex-row">
                        <a href="" className="text-black pr-1"><AiOutlineAreaChart/></a>
                      </div>
                      <span className="text-sm font-medium w-50">
                        {" "}
                        Thống kê{" "}
                      </span>

                      <span className="pl-6 shrink-0 transition duration-300 group-open:-rotate-180">
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
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center rounded-lg px-2 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <div className="flex flex-row">
                        <a href="" className="text-black pr-1"><FaUser/></a>
                      </div>
                      <span className="text-sm font-medium w-50">
                        {" "}
                        Tài khoản{" "}
                      </span>

                      <span className="pl-6 shrink-0 transition duration-300 group-open:-rotate-180">
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

              </ul>
            </div>
          </div>
          <div className="flex-1">
            <div className=" w-full bg-gray-300 flex justify-between md:h-auto  md:w-auto"id="">
                <div className="py-2.5 px-2">
                <TiThMenu size={25}/>
                </div>
                 <div className="flex flex-row justify-end py-1">
              <div className="">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsjWXF1H-_DeLCzI8hauXW2rH6ACG2XDPQkA&usqp=CAU"
                  alt=""
                  className="w-10 h-10"
                />
               </div>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center rounded-lg px-2 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                      <span className="text-sm font-medium ">
                        {" "}
                        Thi nguyen{" "}
                      </span>

                      <span className="pl-1 shrink-0 transition duration-300 group-open:-rotate-180">
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
                          className=" block rounded-lg px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                          Đăng xuất
                        </a>
                      </li>
                    </ul>
                  </details>
            </div>
            </div>
            <div className=" flex justify-between w-auto h-9 px-2 my-2 border-e bg-white">
                <div className="py-1">
            <span  className="pl-4"  />Danh mục sản phẩm
            </div>
            <div className="flex flex-row">
                <input type="text" placeholder="Tên sản phẩm" className="my-2" />
            <button type="submit" className="pr-4"> <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg></button>
            </div>
          </div>
          </div>
          
        </div>
        
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
