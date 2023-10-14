
import { Navigate, createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./layouts/LayoutWebsite";
import LayoutAdmin from "./layouts/LayoutAdmin";
import DashBoardPage from "./pages/admin/dashboard/DashBoardPage";
import News from "./pages/view/News/News";
import CartPage from "./pages/view/Cart/CartPage";
import PayPage from "./pages/view/Pay/PayPage";
import ProductPage from "./pages/view/ProductPage/ProductPage";
import Signup from "./pages/view/Auth/Signup";
import Productlist from "./pages/admin/products/Productlist";
import Productadd from "./pages/admin/products/Productadd";
import Productupdate from "./pages/admin/products/Productupdate";
import Categorylist from "./pages/admin/category/Categorylist";
import Categoryadd from "./pages/admin/category/Categoryadd";
import Categoryupdate from "./pages/admin/category/Categoryupdate";
import Order from "./pages/view/Cart/Order";
import ForgotPassword from "./pages/view/Sign/ForgotPassword";
import Login from "./pages/view/Auth/Login";
import UserPage from "./pages/view/User/User";
import Profile from "./pages/view/User/Account/Profile";
import AddressPage from "./pages/view/User/Account/address";
import Purchase from "./pages/view/User/purchase";
import Voucher from "./pages/view/User/voucher";
import Userlist from "./pages/admin/user/Userlist";
import HomePage from "./pages/view/Home/HomePage";
import Product_Detail from "./pages/view/Product_Detail/Product_Detail";
import OrderDetail from "./pages/view/Cart/Order_Detail";
import BrandAdd from "./pages/admin/brands/BrandAdd";
import BrandsList from "./pages/admin/brands/BrandsList";
import BrandUpdate from "./pages/admin/brands/BrandUpdate";
import ContactPage from "./pages/view/contact/ContactPage";
import ReviewPage from "./pages/view/Review/ReviewPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: < LayoutWebsite />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'cart', element: <CartPage /> },
            { path: 'pay', element: <PayPage /> },
            { path: 'products', element: <ProductPage /> },
            {path: 'products/:idProduct', element: <Product_Detail />},
            {path: 'review', element: <ReviewPage />},

            { path: 'user', element: <UserPage/>,children:[
                {path:'purchase',element:<Purchase/>},
                {path:'voucher',element:<Voucher/>},
                {path:'profile',element:<Profile/>},
                {path:"address",element:<AddressPage/>}
            ]},
            { path: 'products', element: <ProductPage /> },
            { path: 'news', element: <News /> },
            { path: 'forgotpassword', element: <ForgotPassword /> },
            {
                path: 'order', children: [
                    { index: true, element: <Order /> },
                    {path:'orderdetail', element:<OrderDetail/>}
                ],
            },
          
        ]
    },
    { path: 'signup', element: <Signup /> },
    { path: 'login', element: <Login /> },
    {
        path: '/admin',
        element: < LayoutAdmin />,
        children: [
            { index: true, element: <Navigate to='dashboard' /> },
            { path: 'dashboard', element: <DashBoardPage /> },
            {
                path: 'products', children: [
                    { index: true, element: <Productlist /> },
                    { path: 'add', element: <Productadd /> },
                    { path: 'edit/:id', element: <Productupdate /> },
                ],
            },
            {
                path: 'categories', children: [
                    { index: true, element: <Categorylist /> },
                    { path: 'add', element: <Categoryadd /> },
                    { path: 'edit/:id', element: <Categoryupdate /> },
                ],
            },
            {
                path: 'users', children: [
                    { index: true, element: <Userlist /> },
                  
                ],
            },
            {
                path: 'brand', children: [
                    { index: true, element: <BrandsList /> },
                    { path :'add', element: <BrandAdd /> },
                    { path :'edit/:id', element: <BrandUpdate /> },
                ],
            },
        ]
    }
])