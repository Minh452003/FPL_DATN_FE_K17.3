import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/view/HomePage";
import LayoutWebsite from "./layouts/LayoutWebsite";
import LayoutAdmin from "./layouts/LayoutAdmin";
import DashBoardPage from "./pages/admin/dashboard/DashBoardPage";
import AdminProductsPage from "./pages/admin/products/AdminProductsPage";
import Cart from "./pages/view/Cart/Cart";

export const router = createBrowserRouter([
    {
        path: '/',
        element: < LayoutWebsite />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'cart', element: <Cart/>},
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