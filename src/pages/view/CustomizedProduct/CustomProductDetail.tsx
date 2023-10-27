import { useGetCustomizedproductsByIdQuery } from "@/api/CustomizedProductAPI";
import { useGetBrandQuery } from "@/api/brandApi";
import { useGetCategoryQuery } from "@/api/categoryApi";
import { useGetColorsQuery } from "@/api/colorApi";
import { useGetMaterialQuery } from "@/api/materialApi";
import { useGetSizeQuery } from "@/api/sizeApi";
import { useParams } from "react-router-dom"



const Custom_ProductDetail =()=>{
    
    const {id}=useParams();
    console.log(id);
    
    const { data }: any =useGetCustomizedproductsByIdQuery(id || "");
    console.log(data);
    
    const customProducts = data?.product;
    console.log(customProducts);
    
    const { data: brand }: any = useGetBrandQuery();
    const brandList = brand?.brand;
    const brandListOne = brandList?.find(
      (brandList: any) => brandList?._id === customProducts?.brandId
    )?.brand_name;
    

    const { data: catgory }: any = useGetCategoryQuery();
  const categoryLish = catgory?.category.docs;
  const categoryLishOne = categoryLish?.find(
    (categoryLish: any) => categoryLish?._id === customProducts?.categoryId
  )?.category_name;

  const { data: material }: any = useGetMaterialQuery();
  const materialList = material?.material;
  const materialLishOne = materialList?.find(
    (materialList: any) => materialList?._id === customProducts?.materialId
  )?.material_name;

  const {data: color}:any=useGetColorsQuery();
  const colorList = color?.color;
  const colorLishOne=colorList?.find(
    (colorList:any)=>colorList?._id===customProducts?.colorId
  )?.colors_name;

  const {data: size}:any=useGetSizeQuery();
  const sizeLish=size?.size;
  const sizeLishOne=sizeLish?.find(
    (sizeLish:any)=>sizeLish?._id===customProducts?.sizeId
  )?.size_name;
  
    
    return(
        <div>
          <div className="grid grid-cols-2 gap-3 px-4">
            <div className="">
              <h3>{customProducts?.product_name} </h3>
              <div className="flex justify-center border border-solid rounded-md">
              <img src={customProducts?.image.url}
               alt=""
               className="p-2" />
               </div>
               <div>
                <div className="font-bold mt-3">Mô tả:</div>
                <p>{customProducts?.description}</p>
               </div>
            </div>

            <div>
              <h4 className="text-red-500 ml-2 mt-5">{customProducts?.product_price}đ</h4>
              <div className="col-span-2 flex mt-4 ef">
                <div className="text1">Tình trạng:</div>
                <div className="text2 pl-10 lp">Còn hàng</div>
               
              </div>
              <div className="col-span-2 flex ef">
                <div className="text1">Thương hiệu:</div>
                <div className="text2 pl-4 lp">{brandListOne}</div>
              </div>

              <div className="col-span-2 flex ef">
                <div className="text1">Loại:</div>
                <div className="text2 kj lp">{categoryLishOne}</div>
              </div>

              <div className="col-span-2 flex ef">
                <div className="text1">Chất liệu:</div>
                <div className="text2 pl-14 lp">{materialLishOne}</div>
              </div>

              <div className="col-span-2 flex ef">
                <div className="text1">Màu sắc:</div>
                <div className="text2 pl-10 lp">{colorLishOne}</div>
              </div>

              <div className="col-span-2 flex ef">
                <div className="text1">Kích thước:</div>
                <div className="text2 pl-10 lp">{sizeLishOne}</div>
              </div>

            </div>
          </div>
      {/* <div className="container">
       
        <div className="content">
          <div className="flex">
            <h3 className="font-bold pt-10 pl-52 iklm">
              {data?.product_name}
            </h3>
            {childProduct ? <p className="price">{formatCurrency(childProduct?.product?.product_price)}₫</p> : <p className="price">{formatCurrency(listOneData?.product_price)}₫</p>}
          </div>
          <div className="grid grid-cols-2 gap-2 np">
            <div className="product-image">
              <div className="mb-6">
                {listOneData?.image?.map((img: any, index: any) => {
                  if (!selectedIndex && index === 0) {
                    return (
                      < div
                        className='hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block'
                        id={`image-tab-${index}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${index}`}
                        key={`image-content-${index}`}
                        data-te-tab-active
                      >
                        <img src={img?.url} className={`object-cover img1`} />
                      </div>
                    );
                  } else {
                    return (
                      < div
                        className='hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block'
                        id={`image-tab-${index}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${index}`}
                        key={`image-content-${index}`}
                      >
                        <img src={img?.url} className={`object-cover img1`} />
                      </div>
                    )
                  }
                })}
              </div>
              <ul
                className="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row"
                id="pills-tab"
                role="tablist"
                data-te-nav-ref>
                {listOneData?.image?.map((img: any, index: any) => (
                  <li role="presentation">
                    <Link
                      to={`#image-tab-${index}`}
                      className={`test my-2 block rounded bg-neutral-100 text-xs font-medium uppercase leading-tight text-neutral-500 ${selectedIndex === index ? 'bg-primary-100 text-primary-700' : 'bg-neutral-700 text-white'} md:mr-4 `}
                      id={`image-tab-${index}`}
                      data-te-toggle="tab"
                      key={`tab-${index}`}
                      data-te-tab-active={index === 0 ? 'true' : 'false'}
                      role="tab"
                      aria-controls={`image-tab-${index}`}
                      aria-selected='false'
                      onClick={() => setSelectedIndex(true)}
                    >
                      <img src={img?.url} className="pill-img" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="product-text">
              <div className="col-span-2 flex mt-4 ef">
                <div className="text1">Tình trạng:</div>
                <div className="text2 pl-10 lp">Còn hàng</div>
              </div>
              <div className="col-span-2 flex ef">
                <div className="text1">Đã bán:  </div>
                <div className="text2 pl-16 lp">{listOneData?.sold_quantity} chiếc</div>
              </div>
              <div className="col-span-2 flex ef">
                <div className="text1">Thương hiệu:</div>
                <div className="text2 pl-4 lp">{brandListOne}</div>
              </div>
              <div className="col-span-2 flex ef">
                <div className="text1">Loại:</div>
                <div className="text2 kj lp">{categoryLishOne}</div>
              </div>
              <div className="col-span-2 flex ef">
                <div className="text1">Chất liệu:</div>
                <div className="text2 pl-14 lp">{materialLishOne}</div>
              </div>
              <div className="color">
                <p>Màu sắc</p>
                <div className="flex">
                  {childProducts ? childProducts.products.map((color: any) => {
                    const colorname = colors?.color?.find((colors: any) => colors._id === color.colorId);
                    const isActive = color.colorId === activeColor; return (
                      <button
                        key={color.colorId}
                        aria-label="M"
                        aria-disabled="false"
                        className={`btn2 btn-solid-primary2 btn-b ${isActive ? 'active1' : ''}`}
                        onClick={() => handleClickColor(color.colorId)}
                      >
                        {colorname.colors_name}
                      </button>
                    )
                  }) : <p className="sp2">Không có màu</p>}
                </div>
              </div>
              <div className="size">
                <p>Kích thước</p>
                <div className="flex">
                  {childProducts ? childProducts.products.map((size: any) => {
                    const sizesname = sizes?.size?.find((s: any) => s._id == size.sizeId);
                    const isActive = size.sizeId === activeSize;
                    return (
                      <button
                        key={size.sizeId}
                        aria-label="M"
                        aria-disabled="false"
                        className={`btn2 btn-solid-primary2 btn-b ${isActive ? 'active1' : ''}`}
                        onClick={() => handleClickSize(size.sizeId)}
                        type="submit"
                      >
                        {sizesname.size_name}
                      </button>
                    )
                  }) : <p className="sp2">Không có kích thước</p>}
                </div>
              </div>
              {childProduct ? <p className="sp1">Còn {childProduct.product.stock_quantity} sản phẩm</p> : ''}
              <div className="flex button">
                <button
                  aria-label="Decrease"
                  className="btn3 btn-solid-primary3 btn-c"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  className="btn4 btn-solid-primary4 btn-d mn"
                  aria-live="assertive"
                  aria-valuenow={1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <button
                  aria-label="Increase"
                  className="btn5 btn-solid-primary5 btn-e"
                  onClick={increaseQuantity}
                >
                  +
                </button>
                <Tooltip title={id && activeColor && activeSize ? '' : 'Bạn phải chọn màu và kích thước'}>
                  {resultAdd.isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin m-auto" />
                  ) : (
                    <Button
                      aria-disabled={!id || !activeColor || !activeSize}
                      className="btn6 btn-solid-primary6 btn-f hl"
                      onClick={() => {
                        if (id && activeColor && activeSize) {
                          handleAddToCart();
                        }
                      }}
                    >
                      MUA HÀNG
                    </Button>
                  )}
                </Tooltip>
                <button
                  type="button"
                  aria-disabled="false"
                  className="btn10 btn-solid-primary10 btn-p hq"
                >
                  TỰ THIẾT KẾ
                </button>
              </div>
            </div>
          </div>
          
         
        </div >
      </div > */}
    </div >
    )
}
export default Custom_ProductDetail
