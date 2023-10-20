import { useAddChildProductMutation, useGetChildProductByIdQuery, useUpdateChildProductMutation } from "@/api/chilProductApi";
import { useGetColorsQuery } from "@/api/colorApi";
import { useGetProductsQuery } from "@/api/productApi";
import { useGetSizeQuery } from "@/api/sizeApi";
import { Button, Form, Input, Upload, Select, Spin, InputNumber } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const UpdateChildProduct = () => {
  const { id }: any = useParams();
  const { data: childProducts, isLoading: isLoadingChildProducts }: any = useGetChildProductByIdQuery(id || "");
  const { data: Products, isLoading: isLoadingProducts }: any = useGetProductsQuery();
  const product = childProducts?.product
  const products = isLoadingProducts ? [] : Products.product.docs;
  const { data: Colors, isLoading: isLoadingColors }: any = useGetColorsQuery();
  const { data: Sizes, isLoading: isLoadingSizes }: any = useGetSizeQuery();
  const colors = isLoadingColors ? [] : Colors?.color;
  const sizes = isLoadingSizes ? [] : Sizes?.size;
  const [updateChildProduct] = useUpdateChildProductMutation();
  const navigate = useNavigate()



  useEffect(() => {
    if (childProducts) {
      setFields()
    }
  }, [childProducts])

  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      _id: product?._id,
      productId: product?.productId,
      product_price: product?.product_price,
      stock_quantity: product?.stock_quantity,
      colorId: product?.colorId,
      sizeId: product?.sizeId
    });
  };
  const onFinish = async (values: any) => {
    try {
      await updateChildProduct(values).then((response: any) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thêm thương sản phẩm con thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/admin/products/childProduct/${response.data.data.productId}`)
      });
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    product_price?: number;
    stock_quantity?: number;
    colorsId?: string;
    productId?: string;
    sizeId?: string;
  };

  return (
    <div className="container-fluid mb-7">
      <div className="row">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pl-5  text-3xl">
            Cập Nhật Sản Phẩm Con
          </h5>
          {isLoadingChildProducts && isLoadingColors && isLoadingSizes ? (
            <Spin className="pt-5" tip="Loading" size="large">
              <div></div>
            </Spin>
          ) : (
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 1000, height: 1000 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="" name="_id" style={{ display: 'none' }}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Chọn Sản Phẩm"
                name="productId"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please input your select!" },
                ]}
                style={{ marginLeft: "20px" }}
              >
                <Select>
                  {products.map((product: any) => (
                    <Select.Option
                      key={product._id}
                      value={product._id}
                    >
                      {product.product_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item<FieldType>
                label="Giá Sản Phẩm"
                name="product_price"
                labelCol={{ span: 24 }} // Đặt chiều rộng của label
                wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                rules={[{ required: true, message: "Please input your name!" }]}
                style={{ marginLeft: "20px" }}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item<FieldType>
                label="Số lượng sản phẩm"
                name="stock_quantity"
                labelCol={{ span: 24 }} // Đặt chiều rộng của label
                wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                rules={[{ required: true, message: "Please input your name!" }]}
                style={{ marginLeft: "20px" }}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="colorId"
                label="Danh sách màu"
                labelCol={{ span: 24 }} // Đặt chiều rộng của label
                wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                rules={[
                  { required: true, message: "Please input your select!" },
                ]}
                style={{ marginLeft: "20px" }}
              >
                <Select>
                  {colors.map((color: any) => (
                    <Select.Option key={color._id} value={color._id}>
                      {color.colors_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="sizeId"
                label="Danh sách sizes"
                labelCol={{ span: 24 }} // Đặt chiều rộng của label
                wrapperCol={{ span: 24 }} // Đặt chiều rộng của ô input
                rules={[
                  { required: true, message: "Please input your select!" },
                ]}
                style={{ marginLeft: "20px" }}
              >
                <Select>
                  {sizes.map((size: any) => (
                    <Select.Option key={size._id} value={size._id}>
                      {size.size_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 16 }}>
                <Button
                  className=" h-10 bg-red-500 text-xs text-white ml-5"
                  htmlType="submit"
                >
                  Cập nhật sản phẩm con
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateChildProduct;
