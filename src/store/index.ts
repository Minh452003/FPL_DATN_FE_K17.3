import categoryApi, { categoryReducer } from "@/api/categoryApi";
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


const persistConfig = {
    key: 'root',
    storage,
    whitelist: [''],

}
const rootReducer = combineReducers({
    // Các reducers
    category: categoryReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const additionalMiddlewares: any = [
    // Các middlewares
    categoryApi.middleware,
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
