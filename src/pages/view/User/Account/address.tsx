const AddressPage = () => {
  return (
    <div className="container">
      <div className="header">
        <h1 className="text-2xl font-medium">Chỉnh sửa địa chỉ</h1>
      </div>
      <hr />
          <form action="">
            <table className="w-full border-collapse border-spacing-0 justify-center">
              <tr className="">
                  <label className=" pb-3 py-3 text-lg">Thêm địa chỉ</label>
                    <input
                      type="text"
                      placeholder="Địa chỉ"
                      className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md transition duration-300 hover:ease-in-out"
                    />
              </tr>
              <tr>
                <td className="pr-2 pt-3">
                  <button className="bg-orange-700 px-4 py-2 text-white rounded-full ">
                    lưu
                  </button>
                </td>
              </tr>
            </table>
          </form>
        </div>

  )
}

export default AddressPage