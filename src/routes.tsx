

import { Navigate, createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./layouts/LayoutWebsite";
import LayoutAdmin from "./layouts/LayoutAdmin";
import DashBoardPage from "./pages/admin/dashboard/DashBoardPage";
import News from "./pages/view/News/News";
import CartPage from "./pages/view/Cart/CartPage";
import PayPage from "./pages/view/Pay/PayPage";
import ProfilePage from "./pages/view/Profile/Profile";
import ProductPage from "./pages/view/ProductPage/ProductPage";
import Voucher from "./pages/view/Profile/voucher";
import Purchase from "./pages/view/Profile/purchase";

import Signup from "./pages/view/Auth/Signup";
import Productlist from "./pages/admin/products/Productlist";
import Productadd from "./pages/admin/products/Productadd";
import Productupdate from "./pages/admin/products/Productupdate";
import Categorylist from "./pages/admin/category/Categorylist";
import Categoryadd from "./pages/admin/category/Categoryadd";
import Categoryupdate from "./pages/admin/category/Categoryupdate";
import HomePage from "./pages/view/HomePage/HomePage";
import ForgotPassword from "./pages/view/Sign/ForgotPassword";



export const router = createBrowserRouter([
    {
        path: '/',
        element: < LayoutWebsite />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'cart', element: <CartPage /> },
            { path: 'pay', element: <PayPage /> },
            { path: 'products', element: <ProductPage /> },
            {
                path: 'profile', element: <ProfilePage />, children: [
                    { path: 'purchase', element: <Purchase /> },
                    { path: 'voucher', element: <Voucher /> }
                ]
            },
            { path: 'products', element: <ProductPage /> },
            { path: 'news', element: <News /> },
            { path: 'forgotpassword', element: <ForgotPassword /> },
            { path: 'signup', element: <Signup /> },
        ]
    },
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

        ]
    }
])