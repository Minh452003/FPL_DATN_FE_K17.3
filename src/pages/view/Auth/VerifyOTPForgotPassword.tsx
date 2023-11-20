import { useVerifyOTPResetPasswordMutation } from "@/api/authApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

type TypeInputs = {
    OTP1: string,
    OTP2: string,
    OTP3: string,
    OTP4: string,
    OTP5: string,
    OTP6: string,
}

const VerifyOTPForgotPassword = () => {
    const navigate = useNavigate();
    const { userId }: any = useParams();
    const { register, handleSubmit } = useForm<TypeInputs>();
    const [verifyOTPResetPassword] = useVerifyOTPResetPasswordMutation();


    const onSubmit: SubmitHandler<TypeInputs> = async (data: any) => {
        const { OTP1, OTP2, OTP3, OTP4, OTP5, OTP6 } = data;
        const combinedOTP = `${OTP1}${OTP2}${OTP3}${OTP4}${OTP5}${OTP6}`;

        const response: any = await verifyOTPResetPassword({ userId, otp: combinedOTP })
        if (response.error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: response.error.data.message,
                showCancelButton: true,
                timer: 2000
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Xác minh tài khoản thành công, vui lòng đặt lại mật khẩu!",
                showConfirmButton: true,
                timer: 2000
            })
            navigate(`/forgotpassword/resetPassword/${response.data.user._id}`)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center h-screen">
            <h3 className="pt-4 text-3xl text-center mb-4">Nhập mã OTP</h3>
            <div className="flex space-x-4">
                <input
                    type="text"
                    className="w-12 h-12 text-center text-3xl border rounded"
                    maxLength={1}
                    id="OTP1"
                    {...register("OTP1")}

                />
                <input
                    type="text"
                    className="w-12 h-12 text-center text-3xl border rounded"
                    maxLength={1}
                    id="OTP2"
                    {...register("OTP2")}
                />
                <input
                    type="text"
                    className="w-12 h-12 text-center text-3xl border rounded"
                    maxLength={1}
                    id="OTP3"
                    {...register("OTP3")}
                />
                <input
                    type="text"
                    className="w-12 h-12 text-center text-3xl border rounded"
                    maxLength={1}
                    id="OTP4"
                    {...register("OTP4")}
                />
                <input
                    type="text"
                    className="w-12 h-12 text-center text-3xl border rounded"
                    maxLength={1}
                    id="OTP5"
                    {...register("OTP5")}
                />
                <input
                    type="text"
                    className="w-12 h-12 text-center text-3xl border rounded"
                    maxLength={1}
                    id="OTP6"
                    {...register("OTP6")}
                />
            </div>
            <p className="mt-4">Mã xác nhận đã được gửi đến gmail của bạn</p>
            <p className="mt-2">Bạn chưa nhận được mã? <Link to={""}>Gửi lại</Link></p>
            <div className="mt-4 text-center">
                <button
                    className="w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Xác nhận
                </button>
            </div>
        </form>
    );
}


export default VerifyOTPForgotPassword;
