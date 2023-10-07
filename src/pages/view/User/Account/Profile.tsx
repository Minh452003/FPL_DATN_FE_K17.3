
const Profile = () => {


  return (
    <div className="container">
      <div className="header">
        <h1 className="text-2xl font-medium">Hồ sơ của tôi</h1>
        <h3 className="text-lg font-light">Quản Lý thông tin hồ sơ</h3>
      </div>
      <hr />
      <div className="bottom">
        <div className="left">
            <form action="">
                <table className="w-[602px] border-collapse border-spacing-0 justify-center">
                    <tr>
                        <td>
                            <label className="pt-12" >Tên đăng nhập</label>
                        </td>
                        <td>
                            <div>
                                <input type="text" placeholder="cbd" />
                            </div>
                            <div>
                                tên đăng nhập chỉ có 1 lần 
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><label className="pt-12" >Tên</label></td>
                        <td>
                            <div>
                                <input type="text" placeholder="cbd" />
                            </div>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div className="right"></div>
      </div>

      

    </div>
  );
};

export default Profile;
