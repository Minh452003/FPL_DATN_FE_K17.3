import { useVerifyOTPResetPasswordMutation } from "@/api/authApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Button } from 'antd';

const VerifyOTPForgotPassword = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [verifyOTPResetPassword] = useVerifyOTPResetPasswordMutation();
    const [form] = Form.useForm();

    const handleContainerPaste = async (e: any) => {
        e.preventDefault();
        try {
            const clipboardText = await navigator.clipboard.readText();
            const otpArray = clipboardText.slice(0, 6).split('');
            otpArray.forEach((value, index) => {
                form.setFieldsValue({ [`OTP${index + 1}`]: value });
            });
        } catch (error) {
            console.error('Error reading from clipboard: ', error);
        }
    };

    const onFinish = async (values: any) => {
        try {
            const { OTP1, OTP2, OTP3, OTP4, OTP5, OTP6 } = values;
            const combinedOTP = `${OTP1}${OTP2}${OTP3}${OTP4}${OTP5}${OTP6}`;
            const response: any = await verifyOTPResetPassword({ userId, otp: combinedOTP }).unwrap();
            if (response) {
                toast.success(response.message);
                navigate(`/forgotpassword/resetPassword/${response.user._id}`)
            }
        } catch (error: any) {
            toast.error(error.data.message);
        }
    };


    return (
        <div className='h-80'>
            <Form onFinish={onFinish} form={form} layout="vertical">
                <h3 className="pt-4 text-3xl text-center mb-4">Nhập mã OTP</h3>
                <div
                    style={{ display: 'flex', justifyContent: 'center' }}
                    onPaste={handleContainerPaste}
                >
                    <div className="flex space-x-4">
                        {[...Array(6).keys()].map((index) => (
                            <Form.Item
                                key={index}
                                name={`OTP${index + 1}`}
                                rules={[{ required: true, message: 'Nhập mã' }]}
                            >
                                <Input
                                    type="text"
                                    maxLength={1}
                                    style={{ width: '40px', textAlign: 'center' }}
                                    onChange={(e) => {
                                        const { value } = e.target;
                                        if (value && index < 5) {
                                            form.setFieldsValue({ [`OTP${index + 2}`]: '' });
                                            form.getFieldInstance(`OTP${index + 2}`)?.focus();
                                        }
                                    }}
                                />
                            </Form.Item>
                        ))}
                    </div>
                </div>
                <p className="mt-4 text-center">Mã xác nhận đã được gửi đến gmail của bạn</p>
                <p className="mt-2 text-center">
                    Bạn chưa nhận được mã? <Link to={""}>Gửi lại</Link>
                </p>
                <div className="mt-4 text-center">
                    <Button
                        htmlType="submit"
                        className="w-80 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none focus:shadow-outline"
                    >
                        Xác nhận
                    </Button>
                </div>
            </Form>
        </div>
    );
}


export default VerifyOTPForgotPassword;
