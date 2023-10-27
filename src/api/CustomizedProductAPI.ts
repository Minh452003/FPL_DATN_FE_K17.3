
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICustomizedProduct } from '@/interfaces/customizedproducts';


const  customizedProductApi= createApi({
    reducerPath: 'customizedproducts',
    tagTypes: ['customized-products'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            const storedData = localStorage.getItem('accessToken');
            if (storedData) {
                const { accessToken } = JSON.parse(storedData);
                if (accessToken) {
                    headers.set('Authorization', `Bearer ${accessToken}`);
                }
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({  
        getCustomizedproductsById: builder.query<any, number | string>({
            query: (id) => `/customized-products/${id}`,
            providesTags: ['customized-products']
        }),
        getCustomizedproductsByUserId: builder.query<any, number | string>({
            query: (userId) => `/customized-products/${userId}`,
            providesTags: ['customized-products']
        }),
        addCustomProduct: builder.mutation({
            query: (customizedProduct: ICustomizedProduct) => ({
                url: '/customized-products',
                method: 'POST',
                body: customizedProduct
            }),
            invalidatesTags: ['customized-products']
        }),
        updateCustomProduct: builder.mutation({
            query: (customizedProduct: ICustomizedProduct) => ({
                url: `/customized-products/${customizedProduct.id}`,
                method: 'PATCH',
                body: customizedProduct
            }),
            invalidatesTags: ['customized-products']
        }),
        updateRestoreCustomProduct: builder.mutation({
            query: (customizedProduct: ICustomizedProduct) => ({
                url: `/customized-products/restore/${customizedProduct.id}`,
                method: 'PATCH',
                body: customizedProduct
            }),
            invalidatesTags: ['customized-products']
        })
 
    })
});

export const {
   useGetCustomizedproductsByIdQuery,
   useGetCustomizedproductsByUserIdQuery,
   useAddCustomProductMutation,
   useUpdateCustomProductMutation,
   useUpdateRestoreCustomProductMutation
} = customizedProductApi;
export const CustomizedproductsReducer = customizedProductApi.reducer;
export default customizedProductApi