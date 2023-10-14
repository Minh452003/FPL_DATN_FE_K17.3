import { IMaterials } from '@/interfaces/materials';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const materialsApi = createApi({
    reducerPath: 'materials',
    tagTypes: ['materials'],
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
        getmaterials: builder.query<IMaterials[], void>({
            query: () => `/materials`,
            providesTags: ['materials']
        }),
        getmaterialsById: builder.query<IMaterials, number | string>({
            query: (id) => `/materials/${id}`,
            providesTags: ['materials']
        }),
        addmaterials: builder.mutation({
            query: (materials: IMaterials)=> ({
                url: '/materials',
                method: "POST",
                body: materials
            }),
            invalidatesTags:['materials']
        }),
        removematerials: builder.mutation({
            query: (id) =>({
                url: `/materials/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['materials']
        }),
        updatematerials: builder.mutation({
            query: (materials: IMaterials)=> ({
                url: `/materials/${materials.id}`,
                method: "PATCH",
                body: materials
            }),
            invalidatesTags:['materials']
        })
    })
});


export const {
    useAddmaterialsMutation,
    useGetmaterialsByIdQuery,
    useGetmaterialsQuery,
    useRemovematerialsMutation,
    useUpdatematerialsMutation
} = materialsApi;
export const materialsReducer = materialsApi.reducer;
export default materialsApi