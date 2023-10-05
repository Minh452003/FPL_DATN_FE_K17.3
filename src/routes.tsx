

import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/view/HomePage";
import LayoutWebsite from "./layouts/LayoutWebsite";
import LayoutAdmin from "./layouts/LayoutAdmin";
import DashBoardPage from "./pages/admin/dashboard/DashBoardPage";
import AdminProductsPage from "./pages/admin/products/AdminProductsPage";
import News from "./pages/view/News/News";
import CartPage from "./pages/view/Cart/CartPage";
import PayPage from "./pages/view/Pay/PayPage";
import ProfilePage from "./pages/view/Profile/Profile";
import ProductPage from "./pages/view/ProductPage/ProductPage";
import Voucher from "./pages/view/Profile/voucher";
import Purchase from "./pages/view/Profile/purchase";
import ForgotPassword from "./pages/view/ForgotPassword";


export const router = createBrowserRouter([
    {
        path: '/',
        element: < LayoutWebsite />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'cart', element: <CartPage/>},
            { path: 'pay', element: <PayPage/> },
            { path: 'products', element: <ProductPage /> },
            { path: 'profile', element: <ProfilePage/>,children:[
                {path:'purchase',element:<Purchase/>},
                {path:'voucher',element:<Voucher/>}
            ]},
            { path: 'forgotpassword', element: <ForgotPassword/>},
            { path: 'products', element: <ProductPage/>},
            { path: 'news', element: <News/>},

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
                    { index: true, element: <AdminProductsPage /> },
                ],
            },

        ]
    }
])