import Homeslides from "@/components/Homeslides"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import {HiSearch} from "react-icons/hi"

const LayoutWebsite = () => {
    return (
    <div className="mx-auto lg:container ">
        <header className="header bg-[#fff] w-full shadow-lg fixed z-50" >
          <section className="py-2">
          <div className=" flex justify-between justify-items-center  max-w-7xl mx-auto p-0 m-0 ">
                <div className="flex ">
                  <div>
                    <img src="https://bizweb.dktcdn.net/100/368/970/themes/740033/assets/logo.png?1693834920118" width={100} alt="" />
                  </div>
                 <div>
                 <form className=" ml-4 flex justify-items-center mr-auto" >
                       <input
                        className="block w-full h-10 px-5 py-2 outline-none hover:border-secondary border hover:border duration-200 rounded-s-lg"
                        type="text"
                        placeholder="Tim kiếm sản phẩm ..."
                       />

                        <button id="clickShowProduct"
                         type="submit"
                         className="px-5 py-2 rounded d-r-lg bg-secondary"
                         aria-label="Justify"
                        >
                         <HiSearch/>
                        </button>
                 </form>
                 </div>
                </div>
                <div className=" header-tell ">
                   <span className="text-xs font-medium">
                    ĐẶT HÀNG TRỰC TUYẾN HOẶC GỌI CHO CHÚNG TÔI 0932-307-248
                  </span>
                  </div>
            </div>
          <div  className="mx-auto max-w-7xl mt-2 flex justify-between justify-items-center" >
                  <ul className="flex  font-bold space-x-4 text-base p-0 m-0 items-center ">
                        <li ><a className="no-underline text-gray-900 hover:text-[#ff7600]" href="#">Trang chủ</a></li>
                        <li><a className="no-underline text-gray-900 hover:text-[#ff7600]" href="">Sản phẩm </a></li>
                        <li><a className="no-underline text-gray-900 hover:text-[#ff7600]" href="">Tin tức</a></li>
                        <li><a className="no-underline text-gray-900 hover:text-[#ff7600]" href="">Giới thiệu </a></li>
                        <li><a className="no-underline text-gray-900 hover:text-[#ff7600]" href="">Liên hệ </a></li>
                  </ul>
                  <div className="flex ">
                  <div className=" items-center flex">
                      <img src="	https://bizweb.dktcdn.net/100/368/970/themes/740033/assets/user.png?1693834920118"
                          width="30px" alt=""/>
                  </div>
                  <div className="ml-2">
                      <div>
                          <a href="" className="text-[14px] no-underline text-[#000] hover:text-[#ff7600]">Đăng kí</a>
                      </div>
                      <div>
                          <a href="" className="text-[14px] no-underline text-[#000] hover:text-[#ff7600]">Đăng Nhập</a>
                      </div>
                  </div>
                  <div className="ml-2 items-center flex">
                      <a href=""><img
                              src="https://bizweb.dktcdn.net/100/368/970/themes/740033/assets/cart.png?1693834920118"
                              width="41px" alt=""/></a>
                  </div>
              </div>
          </div>  
    </section>
        </header>
        <section className=" mx-auto ">
               <Homeslides/>
        </section>
        <section> 
             <main className="max-w-7xl mx-auto mt-10 " >
              <Outlet/>
             </main>
        </section>
        <Footer/>
</div>
    )
}

export default LayoutWebsite