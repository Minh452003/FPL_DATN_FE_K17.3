import {HiOutlineMail} from 'react-icons/hi'
import {BiPhoneCall} from 'react-icons/bi'
const OrderDetail = () => {
  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-[40%,60%] lg:grid-cols-[40%,60%] gap-5">
            <div>
                <div className="flex ">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzQX3xQRwo5hN-LbfNyxrGB2xiN6MgWANe8g&usqp=CAU"
                 alt=""
                 className="w-full h-auto border-solid rounded-xl" />
            </div>
            </div>
            <div className="">
                <div className="mb-4">
                    <h3 className="font-semibold">Bộ bàn ghễ phòng khách hiện đại</h3>
                    <div className="flex gap-5 mt-4 font-bold">
                    <span className="text-red-500">2.300.000đ</span>
                    <span>x1</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  ">
                    <div>
                        <h4 className="font-serif pb-2">Delivery address</h4>
                        <p>Floyd Miles</p>
                        <p>7363 Cynthia Pass</p>
                        <p>Toront, On N3Y 4H8</p>
                    </div>
                    <div>
                        <h4 className="font-serif pb-2">Shipping updates</h4>
                        <p className="hover:text-blue-600 flex items-center gap-2"><HiOutlineMail/> banghe123@gmail.com</p>
                        <p className="pb-3 hover:text-blue-600 flex items-center gap-2"><BiPhoneCall/> 0984555899</p>
                        
                        <a href="#" className="">Edit</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
export default OrderDetail;
