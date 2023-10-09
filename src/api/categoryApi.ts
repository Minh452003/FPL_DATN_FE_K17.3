import { ICategory } from "@/interfaces/category";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const categoryApi = createApi({
    reducerPath: 'category',
    tagTypes: ['Category'],
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
        getCategory: builder.query<ICategory[], void>({
            query: () => '/category',
            providesTags: ['Category']
        }),
        
        getCategoryById: builder.query<ICategory, number | string>({
            query: (id) => `/category/${id}`,
            providesTags: ['Category']
        }),
        // 
        addCategory: builder.mutation({
            query: (category: ICategory) => ({
                url: '/category',
                method: 'POST',
                body: category
            }),
            invalidatesTags: ['Category']
        }),
        removeCategory: builder.mutation<ICategory, number>({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation({
            query: (category: ICategory) => ({
                url: `/category/${category.id}`,
                method: 'PATCH',
                body: category
            }),
            invalidatesTags: ['Category']
        })
    })
});

export const {
    useGetCategoryQuery,
    useGetCategoryByIdQuery,
    useAddCategoryMutation,
    useRemoveCategoryMutation,
    useUpdateCategoryMutation
} = categoryApi;
export const categoryReducer = categoryApi.reducer;
export default categoryApi