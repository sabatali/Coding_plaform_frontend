import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import DotsLoader from "../Components/DotsLoader/DotsLoader";
import { ToastContainer, toast } from 'react-toastify';
import { local_url } from "../constent";

const Login = () => {
  const { storeToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post(`${local_url}/api/v1/login`, user);
      console.log("🚀 ~ handleSubmit ~ axios:", res);

      

      if (res.data.status === "success") {
        setLoading(false)
        setUser({
          email: "",
          password: "",
        });

        toast.success(res.data.message)

        setTimeout(() => {
            window.location.reload()
        navigate("/dashboard");
          }, 1000);
       
        storeToken(res.data.token);
      }

      if (res.data.status === "fail") {

      toast.error(res.data.message)
      setLoading(false)

      }

    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response.data.message)
      setLoading(false)
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
        <ToastContainer/>
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleInput}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInput}
            />
            <button
              className="w-full text-center py-3 rounded bg-green bg-sky-400 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              {loading 
              ? <DotsLoader/>
              : "Login"
              }
            </button>
          </form>
          <div className="text-grey-dark mt-6">
                        Create new account?
                        <a
                            className="no-underline border-b border-blue text-blue"
                            href="#/register"
                        >
                            Register
                        </a>
                        .
            </div>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Terms of Service
            </a>{" "}
            and
            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;