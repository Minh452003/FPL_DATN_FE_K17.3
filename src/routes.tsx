
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
import Order from "./pages/view/Orders/Order";
import ForgotPassword from "./pages/view/Auth/ForgotPassword";
import SignIn from "./pages/view/Auth/SignIn";
import Profile from "./pages/view/User/Account/Profile";
import AddressPage from "./pages/view/User/Account/address";
import Purchase from "./pages/view/User/purchase";
import Voucher from "./pages/view/User/voucher";
import Userlist from "./pages/admin/user/Userlist";
import HomePage from "./pages/view/Home/HomePage";
import Product_Detail from "./pages/view/Product_Detail/Product_Detail";
import OrderDetail from "./pages/view/Orders/Order_Detail";
import BrandAdd from "./pages/admin/brands/BrandAdd";
import BrandsList from "./pages/admin/brands/BrandsList";
import BrandUpdate from "./pages/admin/brands/BrandUpdate";
import ColorsAdd from "./pages/admin/colors/Colorsadd";
import Colorslist from "./pages/admin/colors/ColorsList";
import SizesList from "./pages/admin/sizes/Sizeslist";
import Sizesadd from "./pages/admin/sizes/SizesAdd";
import ReviewPage from "./pages/view/Review/ReviewPage";
import MaterialAdd from "./pages/admin/material/MaterialAdd";
import MaterialUpdate from "./pages/admin/material/MaterialUpdate";
import MaterialList from "./pages/admin/material/MaterialList";
import ColorsUpdate from "./pages/admin/colors/ColorsUpdate";
import SizesUpdate from "./pages/admin/sizes/SizesUpdate";
import UserPage from "./pages/view/User/User";
import ContactPage from "./pages/view/contact/ContactPage";
import CategoryTrash from "./pages/admin/category/CategoryTrash";
import CouponsList from "./pages/admin/coupons/CouponsList";
import CouponsAdd from "./pages/admin/coupons/CouponsAdd";
import CouponsUpdate from "./pages/admin/coupons/CouponsUpdate";
import ListproductChill from "./pages/admin/productchill/ListproductChill";
import AddChildProduct from "./pages/admin/productchill/AddChildProduct";
import UpdateChildProduct from "./pages/admin/productchill/UpdateChildProduct";
import VerifyOTP from "./pages/view/Auth/VerifyOTP";
import OrdersUnconfirmed from "./pages/admin/orders/OrdersUnconfirmed";
import OrdersConfirmed from "./pages/admin/orders/OrdersConfirmed";
import OrdersCompleted from "./pages/admin/orders/OrdersCompleted";
import ProductTrash from "./pages/admin/products/ProductTrash";
import OrdersDetail from "./pages/admin/orders/OrdersDetail";
import CustomizedProductAdd from "./pages/view/CustomizedProduct/CustomizedProductAdd";
import ListCustomizedProduct from "./pages/view/CustomizedProduct/ListCustomizedProduct";
import Custom_ProductDetail from "./pages/view/CustomizedProduct/CustomProductDetail";
import Listcomments from "./pages/admin/comment/Listcomments";

import Commentdetail from "./pages/admin/comment/commentdetail";

import ListCustomizedProductTrash from "./pages/view/CustomizedProduct/ListCustomProductTrash";


export const router = createBrowserRouter([
    {
        path: '/',
        element: < LayoutWebsite />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'cart', element: <CartPage /> },
            { path: 'pay', element: <PayPage /> },
            { path: 'products', element: <ProductPage /> },
            { path: 'products/:idProduct', element: <Product_Detail /> },
            { path: '/customized-products/:id', element: <Custom_ProductDetail /> },
            { path: 'customizedProducts', element: <ListCustomizedProduct /> },
            { path: 'customizedProducts/trash', element: <ListCustomizedProductTrash /> },
            { path: 'customized/:idProduct/add', element: <CustomizedProductAdd /> },
            { path: 'review', element: <ReviewPage /> },
            { path: 'contact', element: <ContactPage /> },
            {
                path: 'user', element: <UserPage />, children: [
                    { index: true, element: <Profile /> },
                    { path: 'purchase', element: <Purchase /> },
                    { path: 'voucher', element: <Voucher /> },
                    {
                        path: 'orders', children: [
                            { index: true, element: <Order /> },
                            { path: ':id/orderdetail', element: <OrderDetail /> }
                        ],
                    },
                    { path: "address", element: <AddressPage /> }
                ]
            },
            { path: 'products', element: <ProductPage /> },
            { path: 'news', element: <News /> },
            { path: 'forgotpassword', element: <ForgotPassword /> },
            {
                path: 'signup', children: [
                    { index: true, element: <Signup /> },
                    { path: 'verifyOTP/:userId', element: <VerifyOTP /> }
                ],
            },
            { path: 'signin', element: <SignIn /> },

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
                    { path: 'childProduct/:productId', element: <ListproductChill /> },
                    { path: 'childProduct/add/:productId', element: <AddChildProduct /> },
                    { path: 'childProduct/:id/edit', element: <UpdateChildProduct /> },
                    { path: 'trash', element: <ProductTrash /> },
                ],
            },
            {
                path: 'categories', children: [
                    { index: true, element: <Categorylist /> },
                    { path: 'add', element: <Categoryadd /> },
                    { path: 'trash', element: <CategoryTrash /> },
                    { path: ':id/edit', element: <Categoryupdate /> },
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
                    { path: 'add', element: <BrandAdd /> },
                    { path: 'edit/:idBrand', element: <BrandUpdate /> },
                ],
            },
            {
                path: 'color', children: [
                    { index: true, element: <Colorslist /> },
                    { path: 'add', element: <ColorsAdd /> },
                    { path: 'edit/:idColor', element: <ColorsUpdate /> },
                ],
            },
            {
                path: 'size', children: [
                    { index: true, element: <SizesList /> },
                    { path: 'add', element: <Sizesadd /> },
                    { path: 'edit/:idSize', element: <SizesUpdate /> },
                ],
            },
            {
                path: 'coupon', children: [
                    { index: true, element: <CouponsList /> },
                    { path: 'add', element: <CouponsAdd /> },
                    { path: 'edit/:idCoupon', element: <CouponsUpdate /> },
                ],
            },
            {
                path: 'order', children: [
                    { path: 'unconfirmed', element: <OrdersUnconfirmed /> },
                    { path: ':id/detail', element: <OrdersDetail /> },
                    { path: 'confirmed', element: <OrdersConfirmed /> },
                    { path: 'completed', element: <OrdersCompleted /> },
                ],
            },
            {
                path: 'material', children: [
                    { index: true, element: <MaterialList /> },
                    { path: 'add', element: <MaterialAdd /> },
                    { path: 'edit/:id', element: <MaterialUpdate /> },
                ],
            },
            {
                path: 'comments', children: [
                    { index: true, element: <Listcomments /> },

                    { path :':id', element: <Commentdetail /> }
                 



                ],
            },
        ]
    }
])