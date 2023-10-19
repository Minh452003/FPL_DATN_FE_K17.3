
import categoryApi, { categoryReducer } from "@/api/categoryApi";
import brandApi, { brandReducer } from "@/api/brandApi";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productApi, { productReducer } from "@/api/productApi";
import cartApi, { cartReducer } from "@/api/cartApi";
import sizeApi, { sizeReducer } from "@/api/sizeApi";
import orderApi, { orderReducer } from "@/api/orderApi";
import colorApi, { colorReducer } from "@/api/colorApi";
import commentApi, { commentReducer } from "@/api/commentApi";
import userApi, { userReducer } from "@/api/authApi";
import couponApi, { couponReducer } from "@/api/couponsApi";
import statusApi, { statusReducer } from "@/api/statusApi";
import materialsApi, { materialsReducer } from "@/api/materialApi";
import uploadApi, { uploadReducer } from "@/api/uploadApi";
import childProductApi, { childProductReducer } from "@/api/chilProductApi";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: [''],

}
const rootReducer = combineReducers({
    // Các reducers
    products: productReducer,
    category: categoryReducer,
    brands: brandReducer,
    carts: cartReducer,
    size: sizeReducer,
    order: orderReducer,
    colors: colorReducer,
    comment: commentReducer,
    users: userReducer,
    coupons: couponReducer,
    status: statusReducer,
    materials: materialsReducer,
    upload: uploadReducer,
    childProduct: childProductReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const additionalMiddlewares: any = [
    // Các middlewares
    productApi.middleware,
    categoryApi.middleware,
    brandApi.middleware,
    cartApi.middleware,
    sizeApi.middleware,
    orderApi.middleware,
    colorApi.middleware,
    commentApi.middleware,
    userApi.middleware,
    couponApi.middleware,
    statusApi.middleware,
    materialsApi.middleware,
    uploadApi.middleware,
    childProductApi.middleware
];

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(...additionalMiddlewares),
})
export default persistStore(store);
