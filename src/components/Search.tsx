import { useGetProductsQuery } from "@/api/productApi";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Search = () => {
  const { data } = useGetProductsQuery();
  const listdata = data?.product.docs;
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const onHandleSearch = (e:any) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);
    searchProduct(keyword);
  };

  const searchProduct = (keyword:any) => {
    const results = listdata.filter(
      (item:any) => item.product_name.toLowerCase().includes(keyword)
    );
    setSearchResults(results);
  };

  return (
    <div>
      <div className="pr-3">
        <form className="pt-2 pl-4 flex justify-items-center mr-auto">
          <input
            className="block w-full h-10 px-5 py-2 outline-none hover:border-secondary border hover:border duration-200 rounded-s-lg"
            type="text"
            placeholder="Tim kiếm sản phẩm ..."
            value={searchKeyword}
            onChange={onHandleSearch}
          />
          <button
            id="clickShowProduct"
            type="submit"
            className="px-5 py-2  rounded d-r-lg bg-secondary"
            aria-label="Justify"
          >
            <HiSearch />
          </button>
        </form>

        <div className="keyword">
          {searchKeyword && (
            <div className="rounded-md z-50 absolute w-[530px] mt-5" id="listProduct">
              <div className="container">
                <div className="p-2 bg-white rounded-md">
                  {/* Check if there are search results */}
                  {searchResults.length === 0 ? (
                    <div className="text-center">Không tìm thấy sản phẩm nào</div>
                  ) : (
                    searchResults.map((product:any, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-[80px,auto] h-full p-2 border rounded-md border-slate-200 gap-y-5 focus:visible">
                          <div>
                            <Link to={`/products/${product?._id}`}>
                              <img
                                src={product?.image.url}
                                alt="ảnh"
                                className="transition duration-200 ease-in-out hover:scale-105 md:h-[30px] md:w-[30px]"
                              />
                            </Link>
                          </div>
                          <div className="gap-y-3">
                            <Link
                              to={`/products/${product?._id}`}
                              className="hover:text-yellow-500 transition duration-200"
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
