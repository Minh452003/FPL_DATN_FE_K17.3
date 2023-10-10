import { IProduct } from '@/interfaces/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: 'products',
    tagTypes: ['Product'],
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
            providesTags: ['Product']
        }),
        getProductsDelete: builder.query<IProduct, number | string>({
            query: (id) => `/products/delete`,
            providesTags: ['Product']
        }),
        getProductById: builder.query<IProduct, number | string>({
            query: (id) => `/products/${id}`,
            providesTags: ['Product']
        }),
        addProduct: builder.mutation({
            query: (product: IProduct) => ({
                url: '/products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        removeProduct: builder.mutation<IProduct, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
        removeForceProduct: builder.mutation<IProduct, number>({
            query: (id) => ({
                url: `/products/force/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (product: IProduct) => ({
                url: `/products/${product.id}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        updateRestoreProduct: builder.mutation({
            query: (product: IProduct) => ({
                url: `/products/restore/${product.id}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Product']
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetProductsDeleteQuery,
    useAddProductMutation,
    useRemoveProductMutation,
    useUpdateProductMutation,
    useRemoveForceProductMutation,
    useUpdateRestoreProductMutation
} = productApi;
export const productReducer = productApi.reducer;
export default productApi