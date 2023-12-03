import { useState, useEffect } from 'react';
import { useGetUserByIdQuery, useResendNewOTPMutation, useVerifyOTPMutation } from "@/api/authApi";
import { SubmitHandler, useForm } from "react-hook-form";

import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Swal from "sweetalert2";
import { SiMinutemailer } from 'react-icons/si';


type TypeInputs = {
    OTP1: string,
    OTP2: string,
    OTP3: string,
    OTP4: string,
    OTP5: string,
    OTP6: string,
}

const VerifyOTP = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: any }>();
    const { register, handleSubmit } = useForm<TypeInputs>();
    const [verifyOTPRequest] = useVerifyOTPMutation();
    const [resendNewOTP] = useResendNewOTPMutation();
    const { data } = useGetUserByIdQuery(userId || "");
    const email = data?.email
    const [resendEnabled, setResendEnabled] = useState(false);
    const [timer, setTimer] = useState(30); // 2 phút = 120 giây

    // Set thời gian
    useEffect(() => {
        let interval: any;
        if (resendEnabled) {
            interval = setInterval(() => {
                setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [resendEnabled]);

    const startResendTimer = async () => {
      
        try {
          const { OTP1, OTP2, OTP3, OTP4, OTP5, OTP6 } = data;
           const combinedOTP = `${OTP1}${OTP2}${OTP3}${OTP4}${OTP5}${OTP6}`;
           const response: any = await verifyOTPRequest({ userId, otp: combinedOTP }).unwrap();
           if(response){
            toast.success(response.message);
            navigate("/signin")
           }
        } catch (error:any) {
            toast.error(error.data.message);
        }
       
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center h-screen">
            <h3 className="pt-4 text-3xl text-center mb-4">Nhập mã OTP xác minh tài khoản</h3>
            <div className="flex space-x-4">
                <input
                    type="text"
                    className="w-12 h-12 text-center text-3xl border-2 rounded"
                    maxLength={1}
                    id="OTP1"
                    {...register("OTP1")}

                />
                <input
                    type="text"
                    className="w-12 h-12 text-center text-3xl border-2 rounded"
                    maxLength={1}
                    id="OTP2"
                    {...register("OTP2")}
                />
                <input
                    type="text"
                    className="w-12 h-12 text-center text-3xl border-2 rounded"
                    maxLength={1}
                    id="OTP3"
                    {...register("OTP3")}
                />
                <input
                    type="text"
                    className="w-12 h-12 text-center text-3xl border-2 rounded"
                    maxLength={1}
                    id="OTP4"
                    {...register("OTP4")}
                />
                <input
                    type="text"
                    className="w-12 h-12 text-center text-3xl border-2 rounded"
                    maxLength={1}
                    id="OTP5"
                    {...register("OTP5")}
                />
                <input
                    type="text"
                    className="w-12 h-12 text-center text-3xl border-2 rounded"
                    maxLength={1}
                    id="OTP6"
                    {...register("OTP6")}
                />
            </div>
            <div className="mt-4">
                {resendEnabled && timer > 0 ? (
                    <p className="text-center">
                        Bạn chưa nhận được mã?  Thử lại sau {timer} giây.
                    </p>
                ) : (
                    <p className="text-center">
                        Mã xác nhận đã được gửi đến gmail của bạn!
                        <span
                            className="text-blue-500 cursor-pointer ml-2 inline-flex items-center"
                            onClick={startResendTimer}
                        >
                            Gửi lại mã
                            <span className="ml-1">
                                <SiMinutemailer />
                            </span>
                        </span>
                    </p>
                )}
            </div>
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
};

export default VerifyOTP;