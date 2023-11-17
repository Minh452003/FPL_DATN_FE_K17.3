import { BiLogoFacebookCircle } from 'react-icons/bi';
import { AiOutlineGoogle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '@/api/authApi';
import { useForm, SubmitHandler } from 'react-hook-form'
import Swal from 'sweetalert2';


type TypeInputs = {
    first_name?: string,
    last_name?: string,

    email?: string,

    password?: string,
    confirmPassword?: string
}

const Signup = () => {
    const [signUp] = useSignUpMutation()
    const { register, handleSubmit } = useForm<TypeInputs>();
    const navigate = useNavigate();
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8088/api/auth/google";
    }
    const handleFacebookLogin = () => {
        window.location.href = "http://localhost:8088/api/auth/facebook";
    }
    const onSubmit: SubmitHandler<TypeInputs> = async data => {

        const response: any = await signUp(data)
        if (response.error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: response.error.data.message,
                showConfirmButton: true,
                timer: 1500
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Vui lòng xác minh tài khoản!',
                showConfirmButton: true,
                timer: 1500
            });
            navigate(`/signup/verifyOTP/${response?.data?.user?._id}`);
        }
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Cuộn mượt
        });
    };
    return (
        <div className="system-ui bg-gray-300">
            <div className="container mx-auto">
                <div className="flex justify-center my-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div
                            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-6/12 bg-cover rounded-l-lg"
                            style={{ backgroundImage: 'url("https://www.quadernionline.it/wp-content/uploads/2021/07/siti-web-parma.jpg")' }}
                        ></div>
                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-3xl text-center">ĐĂNG KÝ TÀI KHOẢN! 👤</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" >
                                            Tên
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="firstName"
                                            type="text"
                                            placeholder="Tên"
                                            required
                                            {...register('first_name', { required: true })}
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" >
                                            Họ
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="text"
                                            placeholder="Họ"
                                            required
                                            {...register('last_name', { required: true })}

                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" >
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        {...register('email', { required: true })}

                                    />
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" >
                                            Mật khẩu
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="******************"
                                            required
                                            {...register('password', { required: true })}

                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700">
                                            Xác nhận mật khẩu
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="c_password"
                                            type="password"
                                            placeholder="******************"
                                            required
                                            {...register('confirmPassword', { required: true })}

                                        />
                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        ĐĂNG KÝ NGAY
                                    </button>
                                </div>
                                <div className="mb-6 text-center relative">
                                    <div className="flex justify-between items-center">
                                        <hr className="border-t w-1/3" />
                                        <p className="text-sm bg-white">HOẶC</p>
                                        <hr className="border-t w-1/3" />
                                    </div>
                                </div>
                                <div className="mb-4 flex justify-between">
                                    <button
                                        className="flex-1 px-3 py-2 text-sm leading-tight text-white bg-red-500 border rounded shadow appearance-none focus:outline-none focus:shadow-outline flex items-center justify-center"
                                    >
                                        <AiOutlineGoogle style={{ marginRight: '4px' }} onClick={handleGoogleLogin} />    Google
                                    </button>
                                    <div className="mx-2"></div>
                                    <button
                                        className="flex-1 px-3 py-2 text-sm leading-tight text-white bg-blue-500 border rounded shadow appearance-none focus:outline-none focus:shadow-outline flex items-center justify-center"
                                        onClick={handleFacebookLogin}
                                    >
                                        <BiLogoFacebookCircle style={{ marginRight: '4px' }} /> Facebook

                                    </button>
                                </div>
                                <div className="text-center">
                                    <span> Bạn đã có tài khoản? </span>
                                    <Link onClick={scrollToTop} to="/signin" className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 no-underline">
                                        Đăng nhập!
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-300 p-4 rounded-b-lg"></div>
        </div>
    )
}
export default Signup
