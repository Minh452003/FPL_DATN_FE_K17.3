import { Button, Form} from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { Upload,  } from 'antd';

const Categoryadd = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4 text-center p-2">Thêm Danh Mục</h5>
                    <form action="" method="post">
                        <div className="card">
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Tên</label>
                                    <input type="text" name="name" value="" className="form-control"
                                        id="exampleInputEmail1" />
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Ảnh</label>
                                    <Form.Item id="images" name="product_images" label="Ảnh" rules={[{ required: true, message: 'Trường ảnh không được để trống' }]}>
                                         <Upload action="https://tclq6w-8080.csb.app/api/images/upload" listType="picture" name='images' multiple>
                                         <Button icon={<UploadOutlined />}>Choose images</Button>
                                      </Upload>
                                     </Form.Item>
                                    <div id="emailHelp" className="form-text text-danger"></div>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary m-2"><a className="text-white" href="/admin/categorys">Danh
                            Sách</a></button>
                        <button type="submit" className="btn btn-success m-2">Thêm</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Categoryadd