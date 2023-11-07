import { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { getDecodedAccessToken } from '@/decoder';
import { useGetUserByIdQuery } from '@/api/authApi';
import { FiUsers } from 'react-icons/fi'

const Header = () => {
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const decodedToken: any = getDecodedAccessToken();
  const iduser = decodedToken ? decodedToken.id : null;
  const { data: user, isLoading, isError } = useGetUserByIdQuery(iduser);

  const toggleMenu = () => {
    setIsMenuHidden(!isMenuHidden);
  };

  return (
    <div>
      <header className="bg-[#fff] lg:container shadow-lg z-50 top-0">
        <section className="py-2">
          <div className="grid grid-cols-3   max-w-7xl mx-auto p-0 m-0 ">
            <div className="md:flex items-center ">
              <div className="flex md:p-0 pl-3">
                <img
                  src="https://bizweb.dktcdn.net/100/368/970/themes/740033/assets/logo.png?1693834920118"
                  width={100}
                  alt=""
                />
              </div>
              <Search />
            </div>

            <div
              className={`mx-auto max-w-7xl md:p-0 pl-3  md:flex justify-between justify-items-center ${isMenuHidden ? 'hidden' : ''
                } `}
            >
              <ul className="md:flex font-bold sm:mx-3 text-base p-0 m-0 items-center">
                <li>
                  <Link
                    className="no-underline text-gray-900 hover:text-[#ff7600] mr-4"
                    to={'/'}
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    className="no-underline text-gray-900 hover:text-[#ff7600] mr-4"
                    to={'/products'}
                  >
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link
                    className="no-underline text-gray-900 hover:text-[#ff7600] mr-4"
                    to={'/news'}
                  >
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link
                    className="no-underline text-gray-900 hover:text-[#ff7600] mr-4"
                    to={'/review'}
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    className="no-underline text-gray-900 hover:text-[#ff7600] mr-4"
                    to={'/contact'}
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>

            </div>
            <div className="flex justify-end">
              {/* User Icons */}
              <div
                className={`nav-user flex items-center menu-item text-[20px] cursor-pointer relative ${user ? 'hover-trigger' : ''
                  }`}
                onMouseEnter={() => setIsMenuHidden(false)}
                onMouseLeave={() => setIsMenuHidden(true)}
              >
                {user ? (
                  <div className='relative mr-5'>

                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.avatar?.url || `https://res.cloudinary.com/dndyxqosg/image/upload/v1699260603/hhegkbrro5wwaxpjkuwx.png`}
                      alt=""
                    />
                    <ul className={`submenu ${isMenuHidden ? 'hidden' : ''}  absolute z-50 w-[180px] bg-white right-[-50px] top-[10px] mt-4 `}>

                      {user.role === 'admin' ? (
                        <li>
                          <Link
                            to="/admin"
                            className="text-[12px] no-underline text-[#000] hover:text-[#ff7600]"
                          >
                            Trang quản trị
                          </Link>
                        </li>
                      ) : (
                        ''
                      )}
                      <li>
                        <Link
                          to="account"
                          className="text-[12px] no-underline text-[#000] hover:text-[#ff7600]"
                        >
                          Thông tin tài khoản
                        </Link>
                      </li>
                      <li>
                        <Link
                          to=""
                          className="text-[12px] no-underline text-[#000] hover:text-[#ff7600]"
                        >
                          Đăng ký
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="changepasswordnew"
                          className="text-[12px] no-underline text-[#000] hover:text-[#ff7600]"
                        >
                          Đổi mật khẩu
                        </Link>
                      </li>
                      <li>
                        <Link
                          to=""
                          className="text-[12px] no-underline text-[#000] hover:text-[#ff7600]"
                        >
                          Đăng xuất
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="mr-5 relative">
                    <div className='text-2xl'>
                      <FiUsers />
                    </div>
                    <div className={`submenu ${isMenuHidden ? 'hidden' : ''}  absolute z-50 w-[150px] bg-white right-[-30px] top-[10px] mt-4 px-3 py-1`} onMouseEnter={() => setIsMenuHidden(false)} onMouseLeave={() => setIsMenuHidden(true)}>
                      <div>
                        <Link to={'/signup'} className="text-[12px] no-underline text-[#000] hover:text-[#ff7600]">
                          Đăng kí
                        </Link>
                      </div>
                      <div>
                        <Link to={'/signin'} className="text-[12px] no-underline text-[#000] hover:text-[#ff7600]">
                          Đăng Nhập
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Cart Icon */}

              <div className="ml-3 items-center flex">
                <Link to={'/carts'}>
                  <img
                    src="https://bizweb.dktcdn.net/100/368/970/themes/740033/assets/cart.png?1693834920118"
                    width="30px"
                    alt=""
                  />
                </Link>

              </div>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            {/* Button to toggle menu */}
            <button onClick={toggleMenu} className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                fill="currentColor"
                className="bi bi-justify"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
          {/* Menu */}

        </section>
      </header>
    </div>
  );
};

export default Header;
