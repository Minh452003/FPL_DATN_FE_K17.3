import { useGetProductsQuery, useSearchProductsQuery } from "@/api/productApi";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Link } from 'react-router-dom';
import "./Search.css";

const Search = () => {
  
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSearchChange = (event: any) => {
    event.preventDefault();
    setSearchKeyword(event.target.value);
};
const handleSearchReset = () => {
  setSearchKeyword('');
};
const { data: searchProducts }: any = useSearchProductsQuery(searchKeyword);

  const formatCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div>
      <div className="pr-3 ">
        <form className="pt-2 md:pl-8 pl-2 flex items-center justify-end mr-auto relative">
          <input
            className="block h-10 px-2 py-2 w-[250px] outline-none hover:border-secondary border duration-200 rounded-lg pl-2"
            style={{ borderRadius: "30px" }}
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <button
            id="clickShowProduct"
            type="submit"
            className="absolute rounded px-2 block"
            aria-label="Justify"
          >
            <div className="text-zinc-500 text-xl">
              <HiSearch />
            </div>
          </button>
        </form>
        <div className="keyword">
          {searchKeyword && (
            <div className="rounded-md pl-3 z-50 absolute w-[530px] mt-4" id="listProduct" style={{ maxHeight: "400px", overflowY: "scroll" }}>
              <div className="container">
                <div className="p-2 bg-white rounded-md">
                {searchKeyword && searchProducts && searchProducts.product.docs && searchProducts.product.docs.length > 0 ? (
                    searchProducts.product.docs.map((product: any, index: any) => (
                      
                      <div key={index}>
                        <div className="grid grid-cols-[50px,auto] h-full p-1 rounded-md gap-y-5 focus:visible bg-gray-100 mt-1">
                          <div>
                            <Link to={`/products/${product._id}`}>
                              <img
                                src={product.image[0].url}
                                alt="ảnh"
                                className="transition duration-200 ease-in-out hover:scale-105 md:h-[50px] md:w-[50px] ml-2 mt-1"
                              />
                            </Link>
                          </div>
                          <div className="gap-y-3">
                            <Link
                              to={`/products/${product._id}`}
                              onClick={handleSearchReset}
                              className="text-black hover:text-yellow-500 transition duration-200 no-underline ml-4 mt-1 font-semibold"
                            >
                              {product.product_name}
                            </Link>
                            <p className="text-red-500 ml-4 font-semibold">
                              {formatCurrency(product.product_price)}₫
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">Không tìm thấy sản phẩm nào</div>
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
