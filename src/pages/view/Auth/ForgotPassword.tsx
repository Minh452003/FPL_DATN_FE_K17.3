import { useForgotPasswordMutation } from "@/api/authApi";
import { IUser } from "@/interfaces/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const ForgotPassword = () => {
  const [forgotPassword, resultAdd] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IUser>();


  const onSubmit: SubmitHandler<IUser> = async data => {
    console.log(data);

    const response: any = await forgotPassword(data)

    console.log(response);

    if (response.error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: response.error.data.message,
        showConfirmButton: true,
        timer: 1000
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Vui lòng xác minh tài khoản!',
        showConfirmButton: true,
        timer: 1000
      });
      navigate(`/forgotpassword/verifyOTPForgotPassword/${response?.data.otpResponse.data.userId}`);
    }
  }

  return (
    <div className=" mx-auto bg-[url('https://i.pinimg.com/564x/2f/cc/65/2fcc65edb0dfe0d942a3a1e77cce9718.jpg')] bg-cover h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className=" p-8 rounded shadow-md max-w-sm w-full">
          <h1 className="text-2xl font-semibold text-center text-white mb-6">
            Quên mật khẩu
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                form="email"
                className="block text-white text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                type="text"
                id="email"
                placeholder="Nhập email của bạn"
                {...register('email', { required: true })}
              />
            </div>
            {resultAdd.isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin m-auto" />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 w-full  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                Gửi mã OTP
              </button>
            )}
          </form>
          <p className="text-white mt-4">
            Kiểm tra email của bạn để biết hướng dẫn đặt lại mật khẩu.
          </p>
          <Link
            to={'/signin'}
            className="block text-white hover:underline mt-4"
          >
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
