import { useResetPasswordMutation } from "@/api/authApi";
import { IResetPassword } from "@/interfaces/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const ResetPassword = () => {
    const [resetPassword, resultAdd] = useResetPasswordMutation();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<IResetPassword>();
    const { userId } = useParams();

    const onSubmit: SubmitHandler<IResetPassword> = async (data: IResetPassword) => {
        const response: any = await resetPassword({
            userId,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
        });
        if (response.error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: response.error.data.message,
                showConfirmButton: true,
                timer: 1500
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Đặt mật khẩu thành công, vui lòng đăng nhập!",
                showConfirmButton: true,
                timer: 1500
            });
            navigate("/signin");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-4xl font-bold mb-8 text-center">Đặt lại mật khẩu</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Mật khẩu mới :
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            placeholder="Mật khẩu mới"
                            className="w-full border rounded-lg py-3 px-4"
                            {...register('newPassword', { required: true })}
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Xác nhận lại mật khẩu mới :
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Xác nhận lại mật khẩu mới"
                            className="w-full border rounded-lg py-3 px-4"
                            {...register('confirmPassword', { required: true })}
                        />
                    </div>
                    <div className="text-center">
                        {resultAdd.isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin m-auto" />
                        ) : (
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg"
                            >
                                Đặt lại mật khẩu
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
