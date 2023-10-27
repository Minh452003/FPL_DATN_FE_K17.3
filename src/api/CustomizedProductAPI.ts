
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


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
            query: (id) => `/customized-products/id/${id}`,
            providesTags: ['customized-products']
        }),
        getCustomizedproductsByUserId: builder.query<any, number | string>({
            query: (userId) => `/customized-products/${userId}`,
            providesTags: ['customized-products']
        }),
 
    })
});

export const {
   useGetCustomizedproductsByIdQuery,
   useGetCustomizedproductsByUserIdQuery
} = customizedProductApi;
export const CustomizedproductsReducer = customizedProductApi.reducer;
export default customizedProductApi