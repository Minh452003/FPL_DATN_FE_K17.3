import { IProduct } from '@/interfaces/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: 'products',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            const accessToken = JSON.parse(localStorage.getItem('accessToken')!);
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }
            return headers;
        },

    }),
    endpoints: (builder) => ({
        getProducts: builder.query<any, void>({
            query: () => '/products',
            providesTags: ['Products']
        }),
        getProductsDelete: builder.query<IProduct, number | string>({
            query: () => `/products/delete`,
            providesTags: ['Products']
        }),
        getProductById: builder.query<IProduct, number | string>({
            query: (id) => `/products/${id}`,
            providesTags: ['Products']
        }),
        getViewProductId: builder.query<IProduct, number | string>({
            query: (id) => `/products/views/${id}`,
            providesTags: ['Products']
        }),
        addProduct: builder.mutation({
            query: (product: IProduct) => ({
                url: '/products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Products']
        }),
        removeProduct: builder.mutation<IProduct, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products']
        }),
        removeForceProduct: builder.mutation<IProduct, number>({
            query: (id) => ({
                url: `/products/force/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products']
        }),
        updateProduct: builder.mutation({
            query: (product: IProduct) => ({
                url: `/products/${product.id}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Products']
        }),
        updateRestoreProduct: builder.mutation({
            query: (product: IProduct) => ({
                url: `/products/restore/${product.id}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Products']
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetProductsDeleteQuery,
    useGetViewProductIdQuery,
    useAddProductMutation,
    useRemoveProductMutation,
    useUpdateProductMutation,
    useRemoveForceProductMutation,
    useUpdateRestoreProductMutation
} = productApi;
export const productReducer = productApi.reducer;
export default productApi