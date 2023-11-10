import { useGetCouponQuery } from "@/api/couponsApi";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Voucher = () => {
  const { data: coupon }: any = useGetCouponQuery();
  const couponLish = coupon?.coupon;



  return (
    <div className="container">
      <h6 className="text-lg">Kho Voucher</h6>
      <main className='flex items-center justify-center bg-gray-200 py-4'>
        <div className='flex w-96 rounded bg-white'>
          <input className="w-full border-none bg-transparent px-4 py-2 text-gray-900 outline-none" type="search" name="search" id="search" placeholder="search" />
        </div>
        <button className="m-2 rounded bg-gray-400 px-4 py-2 text-white disabled hover:bg-orange-400">Search</button>
      </main>
      <div className='flex items-center bg-gray-200 py-3 mt-3'>
        <a className="px-4 text-xs no-underline text-black cursor-pointer hover:underline hover:font-semibold">Mới nhất</a>
        <a className="px-5 text-xs no-underline text-black cursor-pointer hover:underline hover:font-semibold">Sắp hết hạn</a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-2 px-2 mt-2">
        {couponLish && couponLish.map((couponItem: any, index: number) => (
          <div key={index} className="flex shadow-lg">
            <img className="w-[100px] h-[100px] mt-3 rounded-md" src="https://cf.shopee.vn/file/vn-11134004-7r98o-llyheem4gvz306" alt="" />
            <div className="py-2 px-2 text-sm font-family ">
              <div className="flex py-1">
                <div className="">{couponItem.coupon_name}</div>
              </div>
              <div>Giảm tối đa {couponItem.discount_amount}k</div>
              <div className="mt-3 text-xs font-light">HSD: {format(new Date(couponItem.expiration_date), "dd/MM/yyyy")}</div>
              <Link to={'/pay'} className="text-red-400 cursor-pointer no-underline hover:font-semibold">Dùng ngay </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Voucher