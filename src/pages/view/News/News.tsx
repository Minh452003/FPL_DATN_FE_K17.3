import { useGetNewsQuery } from "@/api/newsApi";
import { GrNext, GrPrevious } from "react-icons/gr";

const News = () => {
  const { data } = useGetNewsQuery();
  console.log(data);
  const newList = data?.news?.docs;
  console.log(newList);

  return (
    <div className="max-w-7xl mx-auto ">
  
      <h1 className="text-2xl font-bold  py-4">Tin Tức Nội Thất</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        {newList &&
          newList.map((newsItem:any, index:number) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <div className="flex gap-3">
                <a href="#" className=" group flex basis-1/3">
                  <img
                    src={newsItem.new_image.url}
                    alt=""
                    className="object-cover  mx-auto group-hover:scale-105"
                  />
                </a>
                <div className="ml-5">
                  <a href="" className="no-underline">
                    <h3 className="font-sans text-lg text-gray-900   group-hover:underline group-hover:underline-offset-4">
                      {newsItem.new_name}
                    </h3>
                  </a>

                  <p className="mt-2 text-sm  text-gray-700">
                    {newsItem.new_description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        {/* <!-- Thêm các tin tức khác tương tự ở đây --> */}
      </div>

      <div
        aria-label="Page navigation example"
        className="mt-3 flex justify-center"
      >
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <GrPrevious />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <GrNext />
            </a>
          </li>
        </ul>
      </div>

      <h2 className="my-3 text-center text-red-500">TIN NỔI BẬT</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* <!-- Mỗi tin tức sẽ là một thẻ div có className là "bg-white p-4 rounded shadow" --> */}
        <div className="bg-white p-4 rounded shadow">
          <a
            href="/tan-trang-phong-ngu-dep-voi-noi-that-cao-cap-dip-cuoi-nam"
            title="Tân trang phòng ngủ đẹp với nội thất cao cấp dịp cuối năm"
          >
            <img
              className="object-cover w-full rounded aspect-square"
              src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/tan-trang-noi-that-phong-ngu-dep-650x339.jpg?v=1574743741250"
              data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/tan-trang-noi-that-phong-ngu-dep-650x339.jpg?v=1574743741250"
              alt="Tân trang phòng ngủ đẹp với nội thất cao cấp dịp cuối năm"
              data-was-processed="true"
            />
          </a>
          <h3>
            <a
              href="/tan-trang-phong-ngu-dep-voi-noi-that-cao-cap-dip-cuoi-nam"
              title="Tân trang phòng ngủ đẹp với nội thất cao cấp dịp cuối năm"
              className="no-underline text-black text-sm  font-bold leading-none"
            >
              Tân trang phòng ngủ đẹp với nội thất cao cấp dịp cuối năm
            </a>{" "}
          </h3>
          <p className="justify line-3">
            Chỉ còn vài tháng nữa thôi là một năm nữa kết thúc, đây chính là lúc
            mọi người quan tâm đến&nbsp;nội thất&nbsp;và mọi đồ vật xung quanh
            gia đình mình....
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <a
            href="/phong-thay-do-closet-trong-nha-khong-gian-song-nen-co-cua-phu-nu-hien-dai"
            title="Phòng thay đồ (Closet) trong nhà – Không gian sống nên có của phụ nữ hiện đại"
          >
            <img
              className="object-cover w-full rounded aspect-square"
              src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/tin-tuc-650x339.jpg?v=1574743375003"
              data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/tin-tuc-650x339.jpg?v=1574743375003"
              alt="Phòng thay đồ (Closet) trong nhà – Không gian sống nên có của phụ nữ hiện đại"
              data-was-processed="true"
            />
          </a>
          <h3>
            <a
              href="/phong-thay-do-closet-trong-nha-khong-gian-song-nen-co-cua-phu-nu-hien-dai"
              title="Phòng thay đồ (Closet) trong nhà – Không gian sống nên có của phụ nữ hiện đại"
              className="no-underline text-black text-sm font-bold"
            >
              Phòng thay đồ (Closet) trong nhà – Không gian sống nên có của phụ
              nữ hiện đại
            </a>{" "}
          </h3>
          <p className="justify line-3">
            “Phụ nữ hiện đại, ra đường phải ăn mặc như công chúa và sống như một
            nữ thần, là bà hoàng của cuộc đời mình, kiêu hãnh và tỏa hương”.
            Vì...
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <a
            href="/khong-gian-noi-that-dep-voi-chat-lieu-go-cao-cap"
            title="Không gian nội thất đẹp với chất liệu gỗ cao cấp"
          >
            <img
              className="object-cover w-full rounded aspect-square"
              src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/noi-that-go-phong-an-nha-bep-650x339.jpg?v=1574743950557"
              data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/noi-that-go-phong-an-nha-bep-650x339.jpg?v=1574743950557"
              alt="Không gian nội thất đẹp với chất liệu gỗ cao cấp"
              data-was-processed="true"
            />
          </a>
          <h3>
            <a
              href="/khong-gian-noi-that-dep-voi-chat-lieu-go-cao-cap"
              title="Không gian nội thất đẹp với chất liệu gỗ cao cấp"
              className="no-underline text-black text-sm font-bold "
            >
              Không gian nội thất đẹp với chất liệu gỗ cao cấp
            </a>{" "}
          </h3>
          <p className="justify line-3">
            Gỗ là chất liệu quen thuộc và gần gũi với cuộc sống của người Việt
            từ xưa đến nay. Vì thế, trang trí không gian nội thất đẹp với
            chất...
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <a
            href="/tan-trang-phong-ngu-dep-voi-noi-that-cao-cap-dip-cuoi-nam"
            title="Tân trang phòng ngủ đẹp với nội thất cao cấp dịp cuối năm"
          >
            <img
              className="object-cover w-full rounded aspect-square"
              src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/tan-trang-noi-that-phong-ngu-dep-650x339.jpg?v=1574743741250"
              data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/tan-trang-noi-that-phong-ngu-dep-650x339.jpg?v=1574743741250"
              alt="Tân trang phòng ngủ đẹp với nội thất cao cấp dịp cuối năm"
              data-was-processed="true"
            />
          </a>
          <h3>
            <a
              href="/tan-trang-phong-ngu-dep-voi-noi-that-cao-cap-dip-cuoi-nam"
              title="Tân trang phòng ngủ đẹp với nội thất cao cấp dịp cuối năm"
              className="no-underline text-black text-sm font-bold"
            >
              Tân trang phòng ngủ đẹp với nội thất cao cấp dịp cuối năm
            </a>{" "}
          </h3>
          <p className="justify line-3">
            Chỉ còn vài tháng nữa thôi là một năm nữa kết thúc, đây chính là lúc
            mọi người quan tâm đến&nbsp;nội thất&nbsp;và mọi đồ vật xung quanh
            gia đình mình....
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <a
            href="/phong-thay-do-closet-trong-nha-khong-gian-song-nen-co-cua-phu-nu-hien-dai"
            title="Phòng thay đồ (Closet) trong nhà – Không gian sống nên có của phụ nữ hiện đại"
          >
            <img
              className="object-cover w-full rounded aspect-square"
              src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/tin-tuc-650x339.jpg?v=1574743375003"
              data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/tin-tuc-650x339.jpg?v=1574743375003"
              alt="Phòng thay đồ (Closet) trong nhà – Không gian sống nên có của phụ nữ hiện đại"
              data-was-processed="true"
            />
          </a>
          <h3>
            <a
              href="/phong-thay-do-closet-trong-nha-khong-gian-song-nen-co-cua-phu-nu-hien-dai"
              title="Phòng thay đồ (Closet) trong nhà – Không gian sống nên có của phụ nữ hiện đại"
              className="no-underline text-black text-sm font-bold"
            >
              Phòng thay đồ (Closet) trong nhà – Không gian sống nên có của phụ
              nữ hiện đại
            </a>{" "}
          </h3>
          <p className="justify line-3">
            “Phụ nữ hiện đại, ra đường phải ăn mặc như công chúa và sống như một
            nữ thần, là bà hoàng của cuộc đời mình, kiêu hãnh và tỏa hương”.
            Vì...
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <a
            href="/noi-that-phong-khach-nhap-khau-duoc-ua-chuong-trong-2019"
            title="Nội thất phòng khách nhập khẩu được ưa chuộng trong 2019"
          >
            <img
              className="object-cover w-full rounded aspect-square"
              src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/noi-that-phong-khach-nhap-khau-dep4-650x339.jpg?v=1574742714653"
              data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/noi-that-phong-khach-nhap-khau-dep4-650x339.jpg?v=1574742714653"
              alt="Nội thất phòng khách nhập khẩu được ưa chuộng trong 2019"
              data-was-processed="true"
            />
          </a>
          <h3>
            <a
              href="/noi-that-phong-khach-nhap-khau-duoc-ua-chuong-trong-2019"
              title="Nội thất phòng khách nhập khẩu được ưa chuộng trong 2019"
              className="no-underline text-black text-sm font-bold"
            >
              Nội thất phòng khách nhập khẩu được ưa chuộng trong 2019
            </a>{" "}
          </h3>
          <p className="justify line-2">
            Nếu ví ngôi nhà là một cá thể nhất định thì không gian phòng khách
            chính là vẻ bề ngoài còn nội thất của phòng khách thể hiện phần
            nào...
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <a
            href="/thiet-ke-phong-khach-tinh-te-va-sang-trong"
            title="Thiết kế phòng khách tinh tế và sang trọng"
          >
            <img
              className="object-cover w-full rounded aspect-square"
              src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/picture7-650x339.png?v=1574743108017"
              data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/picture7-650x339.png?v=1574743108017"
              alt="Thiết kế phòng khách tinh tế và sang trọng"
              data-was-processed="true"
            />
          </a>
          <h3>
            <a
              href="/thiet-ke-phong-khach-tinh-te-va-sang-trong"
              title="Thiết kế phòng khách tinh tế và sang trọng"
              className="no-underline text-black text-sm font-bold"
            >
              Thiết kế phòng khách tinh tế và sang trọng
            </a>{" "}
          </h3>
          <p className="justify line-3">
            THIẾT KẾ PHÒNG KHÁCH HƯỚNG TỚI SỰ TINH TẾ VÀ SANG TRỌNG CHO GIA CHỦ
            &nbsp; Các giải pháp thiết kế phòng khách: Với bề dày kinh nghiệm từ
            việc thiết kế,...
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <a
            href="/thiet-ke-phong-bep-hien-dai-2020"
            title="Thiết kế phòng bếp hiện đại 2020"
          >
            <img
              className="object-cover w-full rounded aspect-square"
              src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/6-650x339.jpg?v=1574742415567"
              data-src="//bizweb.dktcdn.net/thumb/large/100/368/970/articles/6-650x339.jpg?v=1574742415567"
              alt="Thiết kế phòng bếp hiện đại 2020"
              data-was-processed="true"
            />
          </a>
          <h3>
            <a
              href="/thiet-ke-phong-bep-hien-dai-2020"
              title="Thiết kế phòng bếp hiện đại 2020"
              className="no-underline text-black text-sm font-bold"
            >
              Thiết kế phòng bếp hiện đại 2020
            </a>{" "}
          </h3>
          <p className="justify line-2">
            Phong thủy phòng bếp có ý nghĩa rất quan trọng đối với sự thăng
            tiến, tài lộc cũng như sức khỏe của các thành viên trong gia đình.
            Vì vậy...
          </p>
        </div>

        {/* <!-- Thêm các tin tức khác tương tự ở đây --> */}
      </div>
    </div>
  );
};
export default News;
