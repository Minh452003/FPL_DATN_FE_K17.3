import { Button, Form, Input } from 'antd';
import './contactPage.css'
const ContactPage = () => {




    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 22 },
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    const onFinish = (values: any) => {
        console.log(values);
    };
    return (
        <div>
            <div className="App">
                <h2 className='text opacity-90 mb-20 ml-5'>Địa chỉ liên hệ</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7448.881391979301!2d105.7725777764121!3d21.015045600000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454aa6e1ff1f5%3A0xddcadef454134a5a!2zQ-G7rWEgSMOgbmcgTuG7mWkgVGjhuqV0IENhc2E!5e0!3m2!1svi!2s!4v1696931063075!5m2!1svi!2s"
                    width="1500"
                    height="500"
                    style={{ border: 0, margin: 'auto' }}
                    className="custom-iframe"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 ml-4 mt-40">
                <div className="rounded-lg">
                    <div className="title text italic text opacity-70">Nội thất Casa</div>
                    <h4 className="mt-2">BẠN CÓ BẤT KỲ CÂU HỎI NÀO?</h4>
                    <p className="opacity-70 mt-2 mb-10">Nội thất Casa cam kết cung cấp giải pháp thương mại điện tử với trải nghiệm mua sắm tốt nhất cho người tiêu dùng trong định hình phong cách sống hiện đại và mua sắm nội thất tại Việt Nam. Mọi thông tin liên hệ xin gửi vào form dưới đây hoặc liên hệ chúng tôi theo địa chỉ.</p>
                    <div className="font-semibold float-left ">Địa Chỉ : <p className="font-normal ml-1 float-right ">70 Lu Gia, Ward 15, District 11, Ho Chi Minh City</p></div> <br /> <br />
                    <div className="font-semibold float-left ">Điện Thoại : <p className="font-normal ml-1 float-right">1900 6750</p></div> <br /> <br />
                    <div className="font-semibold float-left">Email : <p className="font-normal ml-1 float-right">noithatcasa@gmail.com</p></div> <br />
                </div>
                <div className="rounded-lg mt-12 ">
                    <Form

                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        className="centered-form"

                        validateMessages={validateMessages}
                    >

                        <Form.Item name={['user', 'name']} rules={[{ required: true }]}>
                            <Input placeholder="Họ và tên" style={{ width: '100%', height: '40px' }} />
                        </Form.Item>
                        <Form.Item name={['user', 'email']} rules={[{ type: 'email' }]}>
                            <Input placeholder="Email" style={{ width: '100%', height: '40px' }} />
                        </Form.Item>
                        <Form.Item name={['user', 'website']} >
                            <Input placeholder="Số điện thoại" style={{ width: '100%', height: '40px' }} />
                        </Form.Item>
                        <Form.Item name={['user', 'introduction']} >
                            <Input.TextArea placeholder="Mô tả" style={{ width: '100%', resize: 'vertical', height: '100' }} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button style={{ background: "orange", float: 'right', marginRight: '60px', color: 'white', width: '150px', height: '40px' }} htmlType="submit" >
                                Gửi Tin Nhắn
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ContactPage