import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BsFillHouseDashFill, BsSearch } from 'react-icons/bs';
import { TbBrandProducthunt } from 'react-icons/tb';
import { MdCategory } from 'react-icons/md';
import { AiFillMessage, AiOutlineComment, AiOutlineMenu, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { RiLogoutCircleLine } from 'react-icons/ri';
import '@/layouts/LayoutAdmin.css'
const LayoutAdmin = () => {
  const [isSidebarHidden, setSidebarHidden] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarHidden(prevState => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 576) {
        setSidebarHidden(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li .a');

    allSideMenu.forEach(item => {
      const li = item.parentElement;

      item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
          i.parentElement?.classList.remove('active');
        })
        li?.classList.add('active');
      })
    });
    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');

    searchButton?.addEventListener('click', function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm?.classList.toggle('show');
        if (searchForm?.classList.contains('show')) {
          searchButtonIcon?.classList.replace('bx-search', 'bx-x');
        } else {
          searchButtonIcon?.classList.replace('bx-x', 'bx-search');
        }
      }
    })
  }, [])

  return (
    <div>
      <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
        <Link className="brand" to={'/'}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ79flUI0JpbQ8CRNNHw13F5o6W0nfs6ZXCvw&usqp=CAU" className="img" />
          <span className="text">Admin</span>
        </Link>
        <ul className="side-menu top">
          <li className="active">
            <Link to={'dashboard'} className="a">
              <span className="icon"><BsFillHouseDashFill /></span>
              <span className="text1">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={'products'} className="a">
              <span className="icon"><TbBrandProducthunt /></span>
              <span className="text1">Products</span>
            </Link>
          </li>
          <li>
            <Link to={'categories'} className="a">
              <span className="icon"><MdCategory /></span>
              <span className="text1">Categories</span>
            </Link>
          </li>
          <li>
            <Link to={'users'} className="a">
              <span className="icon"><AiOutlineUser /></span>
              <span className="text1">Users</span>
            </Link>
          </li>
          <li>
            <Link to={'comments'} className="a">
              <span className="icon"><AiOutlineComment /></span>
              <span className="text1">Comments</span>
            </Link>
          </li>
          <li>
            <Link to={'orders'} className="a">
              <span className="icon"><AiOutlineShoppingCart /></span>
              <span className="text1">Carts</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="logout">
              <span className="icon"><RiLogoutCircleLine /></span>
              <span className="text1" onClick={() => ''}>Logout</span>
            </Link>
          </li>
        </ul>
        {/* */}
      </section>

      <section id="content">
        <nav>
          <span className="menu" onClick={toggleSidebar}><AiOutlineMenu /></span>
          <Link to="#" className="nav-link"></Link>
          <form >
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn"><BsSearch /></button>
            </div>
          </form>

          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <Link to="#" className="notification">
            <AiFillMessage />
            <span className="num">8</span>
          </Link>
          <Link to="#" className="profile">
            <img src="https://i.pinimg.com/170x/6b/62/20/6b6220e809e48ee2226f725edfcbc957.jpg" alt="" />
          </Link>
        </nav>
        <main>
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default LayoutAdmin;
