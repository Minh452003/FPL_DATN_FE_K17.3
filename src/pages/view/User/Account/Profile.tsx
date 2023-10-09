import { PiUserBold } from "react-icons/pi";
const Profile = () => {
  return (
    <div className="container">
      <div className="header">
        <h1 className="text-2xl font-medium">Hồ sơ của tôi</h1>
        <h3 className="text-lg font-light">Quản Lý thông tin hồ sơ</h3>
      </div>
      <hr />
      <div className="bottom flex">
        <div className="left">
          <form action="">
            <table className="w-[602px] border-collapse border-spacing-0 justify-center">
              <tr className="">
                <td>
                  <label className="pl-4 pb-3 py-3 ">Tên đăng nhập</label>
                </td>
                <td>
                  <div className="">
                    <input
                      type="text"
                      placeholder="duongcb"
                      className="w-full h-9 px-3 py-2 border border-gray-300 rounded-md transition duration-300 hover:ease-in-out"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="pl-4 pb-3 py-3">Tên</label>
                </td>
                <td>
                  <div className="py-4">
                    <input
                      type="text"
                      placeholder="Chu Bach Duong"
                      className="w-full h-9 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="pl-4 pb-3 py-3">Email</label>
                </td>
                <td className="flex">
                  <div className="py-4 px-3">duongcbph21404@gmail.com</div>
                  <div className="py-4 px-3">
                    <a href="">thay đổi</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="pl-4 pb-3 py-3">SĐT</label>
                </td>
                <td>
                  <div className="py-4">
                    <input
                      type="text"
                      placeholder="099999999"
                      className="w-full h-9 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="py-4">
                    <label className="pl-4 pb-3 py-3">Địa chỉ</label>
                  </div>
                </td>
                <td className="flex py-4 ">
                  <div className="py-4">
                    <a href="/user/address">thêm</a>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="pr-2">
                  <button className="bg-orange-700 px-5 py-3 text-white rounded-full ">
                    lưu
                  </button>
                </td>
              </tr>
            </table>
          </form>
        </div>
        <div className="right ml-5 pt-16 pl-14">
          <span className="w-24 h-24 bg-slate-800 ">
            <PiUserBold style={{ fontSize: "7rem", opacity: 0.2 }} />
          </span>
          <input type="file" accept=".jpg,jpeg" />
          <div>Dụng lượng file tối đa 1 MB</div>
          <div>Định dạng:.JPEG, .PNG</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
