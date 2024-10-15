import { useContext, useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import { ToastContainer, toast } from 'react-toastify';
import DotsLoader from "../Components/DotsLoader/DotsLoader";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
    })
    const { storeToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const [otp, setOtp] = useState("")
    const [isOtp, setIsOtpSent] = useState(false)
    console.log("🚀 ~ Register ~ isOtp:", isOtp)

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const res = await axios.post("http://localhost:8000/api/v1/register", formData)
            console.log("🚀 ~ handleSubmit ~ res:", res)

            if (res.data.status === '250') {
                setLoading(false)
                setIsOtpSent(true);
                toast.success("Please Enter OTP");
            }

        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error.message)
            toast.error(error.response.data.message)
            setLoading(false)
        }

    }

    const handleSubmitOTP = async (e) => {
        e.preventDefault();

        try {
            const email = formData.email;
            const res = await axios.post("http://localhost:8000/api/v1/verifyemail", { email, otp });
            console.log("🚀 ~ handleSubmitOTP ~ res:", res);

            if (res.data.status === "201") {
                toast.success(res.data.message);

                setTimeout(() => {
                    navigate("/dashboard");
                    window.location.reload();
                }, 1000);
                storeToken(res.data.token);
            }

        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error);

            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);  // Adjusted for error handling
            } else {
                toast.error("Something went wrong");
            }
        }



    }


    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <ToastContainer />
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    {!isOtp ? (<>
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center font-medium">Sign Up</h1>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInput}
                                    placeholder="Full Name"
                                />

                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInput}
                                    placeholder="User Name"
                                />

                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInput}
                                />


                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="phone"
                                    placeholder="Your Phone Number"
                                    value={formData.phone}
                                    onChange={handleInput}
                                />

                                <input
                                    type="password"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInput}
                                />

                                <button
                                    type="submit"
                                    className="w-full text-center py-3 rounded bg-green bg-sky-400 text-white hover:bg-green-dark focus:outline-none my-1"
                                >
                                    {loading
                                        ? <DotsLoader />
                                        : "Create Account"
                                    }
                                </button>
                            </form>
                        </div>
                    </>) : (<>
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-6 text-3xl text-center  font-medium">Email Verification</h1>
                            <p class="text-[15px] text-slate-500 pb-5">Enter the 6-digit verification code that was sent to your email.</p>
                            <form onSubmit={handleSubmitOTP}>

                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="password"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />

                                <button
                                    type="submit"
                                    className="w-full text-center py-3 rounded bg-green bg-sky-400 text-white hover:bg-green-dark focus:outline-none my-1"
                                >
                                    Verify OTP
                                </button>
                            </form>
                        </div>
                    </>)}


                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <a
                            className="no-underline border-b border-blue text-blue"
                            href="#/login"
                        >
                            Log in
                        </a>
                        .
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
