import { useGetUserByIdQuery } from "@/api/authApi";

import { getDecodedAccessToken } from "@/decoder";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Profile.css"
const Profile = () => {
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();
  const { data: user } = useGetUserByIdQuery(userId);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Gửi yêu cầu lấy thông tin người dùng từ máy chủ dựa trên token
        const response = await getDecodedAccessToken(); // Assumed function to get user info by token
        setUserId((response as { id: number }).id);

      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng: ", error);
        navigate("/error"); // Chuyển hướng đến trang lỗi nếu không thể lấy thông tin người dùng
      }
    };
    fetchUser(); // Gọi hàm fetchUser khi component được tạo ra
  }, [navigate]); // useEffect sẽ chạy lại khi navigate thay đổi, giúp lấy lại thông tin người dùng khi người dùng đăng xuất và đăng nhập lại

  if (!user) {
    return <div>Loading...</div>; // Hiển thị thông báo loading khi đang lấy thông tin người dùng từ máy chủ
  }


  return (
    <div className="container-xl ">
      <div className="header ">
        <h3 className="text-lg font-semibold mt-4 ml-4">Quản Lý Thông Tin Hồ Sơ</h3>
        <hr />
      </div>
      
      <div className="bottom flex">
        <div className="left">
          <form action="">
            <table className="w-[602px] border-collapse border-spacing-0 justify-center">
              <tr className="">
                <td className="w-20">
                  <label className="pl-4 pb-3 py-3 ">Họ :</label>
                </td>
                <td>
                  <div className="py-4">
                    <input
                      type="text"

                      placeholder={user.first_name}


                      className="w-full h-9 px-3 py-2 border border-gray-300 rounded-md transition duration-300 hover:ease-in-out"
                      disabled
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="pl-4 pb-3 py-3">Tên :</label>
                </td>
                <td>
                  <div className="py-4">
                    <input
                      type="text"

                      placeholder={user.last_name}

                      className="w-full h-9 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                      disabled
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="pl-4 pb-3 py-3">Email :</label>
                </td>
                <td className="flex">

                  <td>
                    <div className="py-4">
                      <input
                        type="text"

                        placeholder={user.email}



                        className="w-full h-9 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                        disabled
                      />
                    </div>
                  </td>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="pl-4 pb-3 py-3">SĐT :</label>
                </td>
                <td>
                  <div className="py-4">
                    <input
                      type="text"

                      placeholder={user.phone}



                      className="w-full h-9 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                      disabled
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="py-4">
                    <label className="pl-4">Địa chỉ :</label>
                  </div>
                </td>
                <td className="flex  ">
                  <div className="py-4">
                    <input
                      type="text py-4"

                      placeholder={user.address}



                      className="w-full h-9 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                      disabled
                    />
                  </div>
                </td>
              </tr>

            </table>
            <button className=" bg-green-500 rounded py-2 px-4 ml-4 mt-4">
              <Link to={""} style={{ textDecoration: "none", color: "black" }}>Cập Nhập</Link>
            </button>
          </form>
        </div>
        {/* <div className="right ml-5 pt-16 pl-14">
          <span className="w-24 h-24 bg-slate-800 ">
            <PiUserBold style={{ fontSize: "7rem", opacity: 0.2 }} />
          </span>
          <input type="file" accept=".jpg,jpeg" />
          <div>Dụng lượng file tối đa 1 MB</div>
          <div>Định dạng:.JPEG, .PNG</div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
