import { useGetProductsQuery } from "@/api/productApi";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Search = () => {
  const { data } = useGetProductsQuery();
  const listdata = data?.product.docs;
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onHandleSearch = (e: any) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);
    searchProduct(keyword);
  };

  const searchProduct = (keyword: any) => {
    const results = listdata.filter(
      (item: any) => item.product_name.toLowerCase().includes(keyword)
    );
    setSearchResults(results);
  };

  return (
    <div>
      <div className="pr-3 ">
        <form className="pt-2 pl-8 flex items-center justify-end mr-auto relative">
          <input
            className="block w-full h-10 px-2 py-2 w-[280px] outline-none hover:border-secondary border  duration-200 rounded-lg"
            type="text"
            placeholder="Tim kiếm sản phẩm ..."
            value={searchKeyword}
            onChange={onHandleSearch}
          />
          <button
            id="clickShowProduct"
            type="submit"
            className=" absolute  rounded px-2   block"
            aria-label="Justify"
          >
            <div className="text-zinc-500 text-xl">
            <HiSearch  />
            </div>
          </button>
        </form>
        <div className="keyword">
          {searchKeyword && (
            <div className="rounded-md pl-3 z-50 absolute w-[530px] mt-4" id="listProduct">
              <div className="container">
                <div className="p-2 bg-white rounded-md">
                  {searchResults.length === 0 ? (
                    <div className="text-center">Không tìm thấy sản phẩm nào</div>
                  ) : (
                    searchResults.map((product: any, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-[80px,auto] h-full p-2 border rounded-md border-slate-200 gap-y-5 focus:visible">
                          <div>
                            <Link to={`/products/${product?._id}`}>
                              <img
                                src={product?.image[0].url}
                                alt="ảnh"
                                className="transition duration-200 ease-in-out hover:scale-105 md:h-[30px] md:w-[30px]"
                              />
                            </Link>
                          </div>
                          <div className="gap-y-3">
                            <Link
                              to={`/products/${product?._id}`}
                              className="text-black hover:text-yellow-500 transition duration-200 no-underline	"
                            >
                              {product?.product_name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
