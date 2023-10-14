
import { ICoupon } from '@/interfaces/coupon';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const couponApi = createApi({
    reducerPath: 'coupons',
    tagTypes: ['Coupon'],
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
        getCoupon: builder.query<ICoupon[], void>({
            query: () => `/coupons`,
            providesTags: ['Coupon']
        }),
        getCouponById: builder.query<ICoupon, number | string>({
            query: (id) => `/coupons/${id}`,
            providesTags: ['Coupon']
        }),
        addCoupon: builder.mutation({
            query: (coupon: ICoupon)=> ({
                url: '/coupons',
                method: "POST",
                body: coupon
            }),
            invalidatesTags:['Coupon']
        }),
        removeCoupon: builder.mutation({
            query: (id) =>({
                url: `/coupons/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Coupon']
        }),
        updateCoupon: builder.mutation({
            query: (coupon: ICoupon)=> ({
                url: `/coupons/${coupon.id}`,
                method: "PATCH",
                body: coupon
            }),
            invalidatesTags:['Coupon']
        })
    })
});

export const {
    useGetCouponQuery, useGetCouponByIdQuery, useAddCouponMutation, useRemoveCouponMutation, useUpdateCouponMutation
} = couponApi;
export const couponReducer = couponApi.reducer;
export default couponApi