import { useGetCustomizedproductsByIdQuery } from "@/api/CustomizedProductAPI";
import { useGetCategoryQuery } from "@/api/categoryApi";
import { useGetColorsQuery } from "@/api/colorApi";
import { useGetMaterialQuery } from "@/api/materialApi";
import { useGetSizeQuery } from "@/api/sizeApi";
import { Link, useParams } from "react-router-dom"
import "./CustomizedProductAdd.css";
import "./Responsive_CustomizedProductAdd.css";
import { Button, Tooltip } from "antd";
import { useState } from "react";


const Custom_ProductDetail = () => {
  const { id } = useParams();
  const { data }: any = useGetCustomizedproductsByIdQuery(id || "");
  const customProducts = data?.product;
  const [selectedIndex, setSelectedIndex] = useState(false);
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

  const { data: color }: any = useGetColorsQuery();
  const colorList = color?.color;
  const colorLishOne = colorList?.find(
    (colorList: any) => colorList?._id === customProducts?.colorId
  )?.colors_name;

  const { data: size }: any = useGetSizeQuery();
  const sizeLish = size?.size;
  const sizeLishOne = sizeLish?.find(
    (sizeLish: any) => sizeLish?._id === customProducts?.sizeId
  )?.size_name;
  const formatCurrency = (number: { toString: () => string; }) => {
    if (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return "0"; // Giá trị mặc định hoặc xử lý khác
    }
  }

  return (
    <div>
      <div className="content1">
        <div className="flex">
          <h3 className="font-bold pt-10 pl-52 iklm1">
            {customProducts?.product_name}
          </h3>
          <p className="price1">{formatCurrency(customProducts?.product_price)}₫</p>
        </div>
        <div className="grid grid-cols-2 gap-2 np1">
          <div className="product-image1">
            <div className="mb-6s">
              {customProducts?.image?.map((img: any, index: any) => {
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
              className="mb-5s flex list-none flex-col flex-wrap pl-0 md:flex-row"
              id="pills-tab"
              role="tablist"
              data-te-nav-ref>
              {customProducts?.image?.map((img: any, index: any) => (
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
                    <img src={img?.url} className="pill-img1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="product-text1">
            <div className="col-span-2 flex mt-4 efs">
              <div className="text1s">Loại:</div>
              <div className="text2s pl-10 lps">{categoryLishOne}</div>
            </div>
            <div className="col-span-2 flex efs">
              <div className="text1s">Màu:  </div>
              <div className="text2s pl-16 lps">{colorLishOne}</div>
            </div>
            <div className="col-span-2 flex efs">
              <div className="text1s">Kích thước:</div>
              <div className="text2s kjs lps">{sizeLishOne}</div>
            </div>
            <div className="col-span-2 flex efs">
              <div className="text1s">Chất liệu:</div>
              <div className="text2s kjs lps">{materialLishOne}</div>
            </div>
            <div className="flex button1">
              <input
                className="btn4s btn-solid-primary4s btn-ds mn1"
                aria-live="assertive"
                aria-valuenow={1}
                value={customProducts?.stock_quantity}
              />
              <Tooltip title={id ? '' : 'Bạn phải chọn màu, kích thước và nguyên vật liệu'}>
                <Button
                  aria-disabled={!id}
                  className="btn6s btn-solid-primary6s btn-fs hls"
                >
                  Thêm sản phẩm
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

      </div >
    </div >
  )
}
export default Custom_ProductDetail
