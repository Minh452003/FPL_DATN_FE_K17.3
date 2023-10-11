
import categoryApi, { categoryReducer } from "@/api/categoryApi";
import brandApi, {brandReducer} from "@/api/brandApi";
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
    order: orderReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const additionalMiddlewares: any = [
    // Các middlewares
    productApi.middleware,
    categoryApi.middleware,
    brandApi.middleware,
    cartApi.middleware,
    sizeApi.middleware,
    orderApi.middleware
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
