import { useGetCouponByUserQuery } from "@/api/couponsApi";
import { getDecodedAccessToken } from "@/decoder";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Voucher = () => {
  const decodedToken: any = getDecodedAccessToken();
  const iduser = decodedToken ? decodedToken.id : null;

  const [selectedPriceFilter, setSelectedPriceFilter] = useState("all");
  const [filteredCoupons, setFilteredCoupons] = useState([]);

  const { data: coupon }: any = useGetCouponByUserQuery(iduser);
  const couponLish = coupon?.validCoupons|| [];
  

  // Lọc phiếu giảm giá theo trường min_purchase_amount
  useEffect(() => {
    if (selectedPriceFilter === "all") {
      setFilteredCoupons(couponLish);
    } else {
      const [minAmount, maxAmount] = selectedPriceFilter.split("-");
      const filtered = couponLish.filter(
        (couponItem: any) =>
          couponItem.min_purchase_amount >= parseInt(minAmount) &&
          (maxAmount === "+" || couponItem.min_purchase_amount <= parseInt(maxAmount))
      );
      setFilteredCoupons(filtered);
    }
  }, [selectedPriceFilter]);
  
  // Hàm lọc voucher theo expiration_date
  const filterByExpirationDate = (type: string) => {
    if (type === "newest") {
      const newestCoupons = couponLish.filter(
        (couponItem: any) =>
          new Date(couponItem.expiration_date).getTime() - Date.now() > 2 * 24 * 60 * 60 * 1000 // Lọc các voucher còn trên 2 ngày
      );
      setFilteredCoupons(newestCoupons);
    } else if (type === "endingSoon") {
      const endingSoonCoupons = couponLish.filter(
        (couponItem: any) =>
          new Date(couponItem.expiration_date).getTime() - Date.now() <= 1 * 24 * 60 * 60 * 1000 // Lọc các voucher còn 1 ngày hoặc ít hơn
          
      );
      setFilteredCoupons(endingSoonCoupons);
    }
  };
  useEffect(() => {
    // Lọc voucher mới nhất
    const newestCoupons = couponLish.filter(
      (couponItem: any) =>
      new Date(couponItem.expiration_date).getTime() - Date.now() > 0 // Chỉ lọc các voucher chưa hết hạn
       );
    setFilteredCoupons(newestCoupons);
  }, [couponLish]); // Chỉ khi danh sách voucher thay đổi, useEffect này mới chạy
  

  if (!couponLish || couponLish.length === 0) {
    return <div>
      <div className="grid  px-4 bg-white place-content-center  pb-[400px]" style={{height: "1000px"}}>
  <div className="">
      <img className="w-[200px]  " src="https://symbols.vn/wp-content/uploads/2021/11/Mau-icon-gift-card-dac-sac.png" alt="" />


    <h1
      className="mt-6  font-light tracking-tight text-gray-900 ml-3"
      style={{fontSize: "17px", }}
    >
      Bạn chưa có voucher nào !
    </h1>

  </div>
</div>
    </div>;
  }
  return (
    <div className="container">
      <h6 className="text-lg">Kho Voucher</h6>
      
      <main className='flex items-center justify-center bg-gray-200 py-4'>
        <div className='flex w-96 rounded bg-white'>
          <input className="w-full border-none bg-transparent px-4 py-2 text-gray-900 outline-none" type="search" name="search" id="search" placeholder="search" />
        </div>
        <button className="m-2 rounded bg-gray-400 px-4 py-2 text-white disabled hover:bg-orange-400">Search</button>
      </main>
      
      <div className='flex items-center bg-gray-200 py-3 mt-3 h-20'>
        
      <a
  className="px-4 text-xs no-underline text-black cursor-pointer hover:underline hover:font-semibold"
  onClick={() => filterByExpirationDate('newest')}
>
  Mới nhất
</a>
<a
  className="px-5 text-xs no-underline text-black cursor-pointer hover:underline hover:font-semibold"
  onClick={() => filterByExpirationDate('endingSoon')}
>
  Sắp hết hạn
</a>
        <select
        value={selectedPriceFilter}
        onChange={(e) => setSelectedPriceFilter(e.target.value)}
        className="block mr-4 p-2.5 mb-6 text-sm mt-4"
        style={{borderRadius: "5px", marginLeft: "450px" }}
      >
        <option value="all">Tất cả Voucher</option>
        <option value="10000-100000">Từ 10.000₫ - 100.000₫</option>
        <option value="100000-200000">100.000₫ - 200.000₫</option>
        <option value="200000-5000000">200.000₫ - 500.000₫</option>
        <option value="500000+">500.000₫ trở lên</option>
      </select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-2 px-2 mt-2">
      {filteredCoupons.length > 0 ? (
          filteredCoupons.map((couponItem: any) => (
          <div key={couponItem._id} className="flex shadow-lg rounded-lg">
            <img className="w-[100px] h-[100px] mt-3 rounded-md ml-2 mb-3" src="https://cf.shopee.vn/file/vn-11134004-7r98o-llyheem4gvz306" alt="" />
            <div className="py-2 px-2 text-sm font-family ">
              <div className="flex py-1">
                <div className="" style={{fontSize: "16px"}}><strong>{couponItem.coupon_name}</strong></div>
              </div>
              <div className="mb-2"><i>{couponItem.coupon_content}</i></div>
              <Link to={'/pay'} className="text-red-400 cursor-pointer no-underline hover:font-semibold ">Dùng ngay</Link>
              <div className="mt-1 text-xs text-gray-400">HSD: {format(new Date(couponItem.expiration_date), "dd/MM/yyyy")}</div>
              
            </div>
          </div>
         ))
         ) : (
           <div>Không có phiếu giảm giá phù hợp</div>
         )}
      </div>
    </div>
  );
}

export default Voucher