import { Button, Form} from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { Upload,  } from 'antd';
const Productadd = () => {
    return (
        <div className="container-fluid mb-7">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4 text-center p-2">Thêm Sản Phẩm</h5>
                    <form action="" method="post">
                        <div className="card">
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Tên</label>
                                    <input type="text" name="name" className="form-control"
                                        id="exampleInputEmail1" placeholder='Tên Sản phẩm' />
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>
                                <div className="mb-3">
                                    
                                    <Form.Item id="images" name="product_images" label="Ảnh" rules={[{ required: true, message: 'Trường ảnh không được để trống' }]}>
                                         <Upload action="https://tclq6w-8080.csb.app/api/images/upload" listType="picture" name='images' multiple>
                                         <Button icon={<UploadOutlined />}>Choose images</Button>
                                      </Upload>
                                     </Form.Item>
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>

                                <div className="row ">
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Giá Niêm Yết</label>
                                        <input type="number" name="tel" className="form-control"
                                            id="exampleInputEmail1" placeholder='399.000' />
                                        <div id="emailHelp" className="form-text text-danger"></div>
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Giá Khuyến Mại</label>
                                        <input type="number" name="tel" className="form-control"
                                            id="exampleInputEmail1" placeholder='290.000' />
                                        <div id="emailHelp" className="form-text text-danger"></div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="selectMenu" className="form-label">Danh Mục</label>
                                    <select id="selectMenu" name="group" className="form-select">
                                        <option disabled selected>[Lựa chọn danh mục]</option>
                                        <option value="Hệ thống">Phòng khách</option>
                                         <option value="Quản lí">Phòng ngủ</option>
                                        <option value="more">Phòng tắm</option>
                                    </select>
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="selectMenu" className="form-label">Thương hiệu</label>
                                    <select id="selectMenu" name="group" className="form-select">
                                        <option disabled selected>[Lựa chọn thương hiệu]</option>
                                        <option value="Hệ thống">Phòng khách</option>
                                         <option value="Quản lí">Phòng ngủ</option>
                                        <option value="more">Phòng tắm</option>
                                    </select>
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>
                                <div className="row  ">
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Số lượng</label>
                                        <input type="number" name="tel" className="form-control"
                                            id="exampleInputEmail1" placeholder='số Lượng' />
                                        <div id="emailHelp" className="form-text text-danger"></div>
                                    </div>
                                    <div className="mb-3 col-6">
                                    <label htmlFor="selectMenu" className="form-label">Màu</label>
                                    <select id="selectMenu" name="group" className="form-select ">
                                        <option disabled selected>[Lựa chọn màu]</option>
                                        <option value="Hệ thống">Xanh</option>
                                         <option value="Quản lí">Đỏ</option>
                                        <option value="more">Đen</option>
                                    </select>
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                   </div>
                              </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Mô tả</label>
                                    <textarea name="" id="" cols={30} className="w-100 form-control p-2"
                                        rows={10} placeholder='Mô tả sản phẩm '></textarea>
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary m-1">Thêm</button>
                        <button type="button" className="btn btn-success m-1"><a className="text-white" href="/admin/products">Danh
                            Sách</a></button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Productadd