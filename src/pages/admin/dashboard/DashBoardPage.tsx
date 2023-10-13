
const DashBoardPage = () => {
    
    return (
        <div>
        <h3 className="font-semibold">Dashboard</h3> 
      



<div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-6 bg-purple-500 text-white rounded-lg shadow-md flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Số Lượng Sản Phẩm</h3>
                    <p className="text-3xl font-bold">500</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="h-8 w-8 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
            </div>

            
            <div className="p-6 bg-blue-500 text-white rounded-lg shadow-md flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Doanh Thu</h3>
                    <p className="text-3xl font-bold">$50,000</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="h-8 w-8 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
            </div>

          
            <div className="p-6 bg-green-500 text-white rounded-lg shadow-md flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Số Lượng Đơn Hàng</h3>
                    <p className="text-3xl font-bold">200</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="h-8 w-8 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
            </div>

           
            <div className="p-6 bg-yellow-500 text-white rounded-lg shadow-md flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Số Lượng Khách Hàng</h3>
                    <p className="text-3xl font-bold">300</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="h-8 w-8 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
            </div>
        </div>

        
        <div className="mt-8">
            <h3 className="text-3xl font-semibold mb-6">Đơn Hàng Mới</h3>
            <ul>
                <li className="bg-gray-200 p-6 rounded-lg shadow-md mb-4"> 
                    
                    <div className="flex justify-between">
                    <div>
                    <h3 className="text-xl font-semibold mb-2">Đơn Hàng #12345</h3>
                    <p>Sản Phẩm: Bàn Trà Gỗ Sồi</p>
                    <p>Khách Hàng: Nguyễn Văn A</p>
                    <p>Ngày Đặt: 2023-10-13</p>
                    </div>
                    <div>
                        <img src="https://i.pinimg.com/236x/ea/e6/a4/eae6a42a86e3f228c339829e7d8dff4d.jpg" alt="" />
                    </div>
                    </div>
                </li>

                <li className="bg-gray-200 p-6 rounded-lg shadow-md mb-4"> 
                    
                    <div className="flex justify-between">
                    <div>
                    <h3 className="text-xl font-semibold mb-2">Đơn Hàng #12345</h3>
                    <p>Sản Phẩm: Bàn Trà Gỗ Sồi</p>
                    <p>Khách Hàng: Nguyễn Văn A</p>
                    <p>Ngày Đặt: 2023-10-13</p>
                    </div>
                    <div>
                        <img src="https://i.pinimg.com/236x/ea/e6/a4/eae6a42a86e3f228c339829e7d8dff4d.jpg" alt="" />
                    </div>
                    </div>
                </li>

                <li className="bg-gray-200 p-6 rounded-lg shadow-md mb-4"> 
                    
                    <div className="flex justify-between">
                    <div>
                    <h3 className="text-xl font-semibold mb-2">Đơn Hàng #12345</h3>
                    <p>Sản Phẩm: Bàn Trà Gỗ Sồi</p>
                    <p>Khách Hàng: Nguyễn Văn A</p>
                    <p>Ngày Đặt: 2023-10-13</p>
                    </div>
                    <div>
                        <img src="https://i.pinimg.com/236x/ea/e6/a4/eae6a42a86e3f228c339829e7d8dff4d.jpg" alt="" />
                    </div>
                    </div>
                </li>

                <li className="bg-gray-200 p-6 rounded-lg shadow-md mb-4"> 
                    
                    <div className="flex justify-between">
                    <div>
                    <h3 className="text-xl font-semibold mb-2">Đơn Hàng #12345</h3>
                    <p>Sản Phẩm: Bàn Trà Gỗ Sồi</p>
                    <p>Khách Hàng: Nguyễn Văn A</p>
                    <p>Ngày Đặt: 2023-10-13</p>
                    </div>
                    <div>
                        <img src="https://i.pinimg.com/236x/ea/e6/a4/eae6a42a86e3f228c339829e7d8dff4d.jpg" alt="" />
                    </div>
                    </div>
                </li>
              
            </ul>
        </div>
    </div>




    

        </div>
    )
}

export default DashBoardPage