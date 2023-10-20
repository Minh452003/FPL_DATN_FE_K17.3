import { IUser } from '@/interfaces/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'users',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => '/users',
            providesTags: ['User']
        }),
        getUserById: builder.query<IUser, number>({
            query: (id) => `/users/${id}`,
            providesTags: ['User']
        }),
        // VerifyOTP
        verifyOTP: builder.mutation({
            query: (user: IUser) => ({
                url: '/verifyOTP',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        // Đăng nhập
        signIn: builder.mutation({
            query: (user: IUser) => ({
                url: '/signin',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        // Đăng kí
        signUp: builder.mutation({
            query: (user: IUser) => ({
                url: '/signup',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        removeUser: builder.mutation<IUser, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
        removeUserByAdmin: builder.mutation<IUser, number>({
            query: (id) => ({
                url: `/user/${id}/admin`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: (user: IUser) => ({
                url: `/users/${user.id}`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        updateUserByAdmin: builder.mutation({
            query: (user: IUser) => ({
                url: `/user/${user.id}/admin`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: ['User']
        }),
    
    }),


});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useVerifyOTPMutation,
    useSignInMutation,
    useSignUpMutation,
    useRemoveUserMutation,
    useUpdateUserMutation,
    useRemoveUserByAdminMutation,
    useUpdateUserByAdminMutation,
} = userApi;
export const userReducer = userApi.reducer;
export default userApi