import React, { useState } from "react";
import Homeslides from "@/components/Homeslides";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

const LayoutWebsite = () => {
  const [isMenuHidden, setIsMenuHidden] = useState(true);

  const toggleMenu = () => {
    setIsMenuHidden(!isMenuHidden);
  };
  return (
    <div className="mx-auto top-0 lg:container ">
      <header className="bg-[#fff] lg:container shadow-lg fixed z-50">
        <section className="py-2">
          <div className="md:flex justify-between  max-w-7xl mx-auto p-0 m-0 ">
            <div className="md:flex items-center  ">
              <div className="flex md:p-0 pl-3">
                <img src="https://bizweb.dktcdn.net/100/368/970/themes/740033/assets/logo.png?1693834920118" width={100} alt="" />
              </div>
              <div className="pr-3">
                <form className="pt-2 pl-4 flex justify-items-center  mr-auto">
                  <input
                    className="block w-full h-10 px-5 py-2 outline-none hover:border-secondary border hover:border duration-200 rounded-s-lg"
                    type="text"
                    placeholder="Tim kiếm sản phẩm ..."
                  />
                  <button
                    id="clickShowProduct"
                    type="submit"
                    className="px-5 py-2  rounded d-r-lg bg-secondary"
                    aria-label="Justify"
                  >
                    <HiSearch />
                  </button>
                </form>
              </div>
            </div>
  
            <div className="header-tell pt-2">
              <span className="text-xs text-center pl-2 pt-2 font-medium">
                ĐẶT HÀNG TRỰC TUYẾN HOẶC GỌI CHO CHÚNG TÔI 0932-307-248
              </span>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            {/* Button to toggle menu */}
            <button onClick={toggleMenu} className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" className="bi bi-justify" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>
          </div>
          {/* Menu */}
          <div className={`mx-auto max-w-7xl md:p-0 pl-3  md:flex justify-between justify-items-center ${isMenuHidden ? 'hidden' : ''}`}>
            <ul className="md:flex font-bold sm:mx-3   text-base p-0 m-0 items-center">
              <li><a className="no-underline text-gray-900 hover:text-[#ff7600] mr-2" href="#">Trang chủ</a></li>
              <li><a className="no-underline text-gray-900 hover:text-[#ff7600] mr-2" href="products">Sản phẩm</a></li>
              <li><a className="no-underline text-gray-900 hover:text-[#ff7600] mr-2" href="">Tin tức</a></li>
              <li><a className="no-underline text-gray-900 hover:text-[#ff7600] mr-2" href="">Giới thiệu</a></li>
              <li><a className="no-underline text-gray-900 hover:text-[#ff7600] mr-2" href="">Liên hệ</a></li>
            </ul>
            <div className="flex">
              {/* User Icons */}
              <div className="items-center flex">
                <img src="https://bizweb.dktcdn.net/100/368/970/themes/740033/assets/user.png?1693834920118" width="30px" alt="" />
              </div>
              <div className="ml-2">
                <div>
                  <a href="" className="text-[14px] no-underline text-[#000] hover:text-[#ff7600]">Đăng kí</a>
                </div>
                <div>
                  <a href="" className="text-[14px] no-underline text-[#000] hover:text-[#ff7600]">Đăng Nhập</a>
                </div>
              </div>
              {/* Cart Icon */}
              <div className="ml-2 items-center flex">
                <a href=""><img src="https://bizweb.dktcdn.net/100/368/970/themes/740033/assets/cart.png?1693834920118" width="41px" alt="" /></a>
              </div>
            </div>
          </div>
        </section>
      </header>
      {/* Homeslides */}
      <section className="mx-auto">
        <Homeslides />
      </section>
      {/* Outlet */}
      <section>
        <main className="max-w mx-auto mt-10">
          <Outlet />
        </main>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LayoutWebsite;
