import React from "react";
import Logo from "../assets/RequestManagementSystem.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type IuserSignIn = {
  id: string;
  Name: string;
  EmailAddress: string;
  Password: string;
};
function Login() {
  const navigate = useNavigate();

  const [ASignInUser, setASignInUser] = React.useState({
    id: "",
    Name: "",
    EmailAddress: "",
    Password: "",
  });

  const [EmailAddressmust, setEmailAddressmust] = React.useState("");
  const [Passwordmust, setPasswordmust] = React.useState("");

  const SignInUser = () => {
    if (
      ASignInUser.EmailAddress == "" ||
      ASignInUser.EmailAddress.length < 10 ||
      !ASignInUser.EmailAddress.includes("@")
    ) {
      setEmailAddressmust("Email must contain at least one symbol e.g. @, !");
      return navigate("/Login");
    } else if (ASignInUser.Password == "" || ASignInUser.Password.length < 8) {
      setEmailAddressmust("");
      setPasswordmust("Password is too short (minimum is 6 characters)");
      return navigate("/Login");
    } else {
      setEmailAddressmust("");
      setPasswordmust("");
    }
    axios
      .get("https://655154b37d203ab6626ebeaa.mockapi.io/Management")
      .then((res) => {
        const SignIn = res.data.find((cheek: IuserSignIn) => {
          return (
            // cheek.id == ASignInUser.id &&
            cheek.EmailAddress === ASignInUser.EmailAddress &&
            cheek.Password === ASignInUser.Password
          );
        });
        if (!SignIn) {
          const notify = () => toast.error("Invalid");
          notify();
          navigate("/Login");
        } else if (SignIn === SignIn) {
          localStorage.setItem("id", ASignInUser.id);
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("Name", ASignInUser.Name);
          const notify = () => toast.success("successfully Login !");
          notify();
          navigate("/FormRequests");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex items-center min-h-screen bg-white">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto my-10">
            <div className=" flex justify-center my-11">
              <a href="/">
                <img className="w-20" src={Logo} alt="" />
              </a>
            </div>

            <div className="text-center">
              {/* <h1 className="my-3 text-3xl font-semibold text-[#901DFF] ">
              Login
              </h1> */}
              <p className="text-gray-500 text-2xl">Welcome back!</p>
              <p className="text-gray-400 text-sm py-2">
                We're so excited to see you again!
              </p>
            </div>
            <div className="m-7">
              <form action="">
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-[#901DFF]"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   dark:placeholder-gray-500"
                    onChange={(e) => {
                      setASignInUser({
                        ...ASignInUser,
                        EmailAddress: e.target.value,
                      });
                    }}
                    value={ASignInUser.EmailAddress}
                  />
                  <span className="flex text-[#e05858] text-xs ml-2 my-2">
                    {EmailAddressmust}
                  </span>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-[#901DFF]"
                    >
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   dark:placeholder-gray-500"
                    onChange={(e) => {
                      setASignInUser({
                        ...ASignInUser,
                        Password: e.target.value,
                      });
                    }}
                    value={ASignInUser.Password}
                  />
                  <span className="flex text-[#e05858] text-xs ml-2 my-2">
                    {Passwordmust}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      className="form-checkbox accent-[#901DFF]"
                    />
                    <label
                      htmlFor="remember"
                      className="text-gray-600 ml-2 text-sm"
                    >
                      Remember Me
                    </label>
                  </div>
                  <div className="mb-6 text-[#901DFF]">
                    <a
                      href="ForgotPassword"
                      target="_blank"
                      className="hover:underline text-xs"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="mb-6">
                  <button
                    onClick={() => SignInUser()}
                    type="button"
                    className="w-full px-3 py-4 text-white bg-[#5F00CD] hover:bg-[#901DFF] rounded-md"
                  >
                    Login
                  </button>
                  <Toaster />
                </div>
                <p className="text-sm text-center text-gray-400">
                  Need an account? {"  "}
                  <a
                    href="SignUp"
                    className="text-[#901DFF] focus:outline-none focus:underline focus:text-[#6000cdc7] dark:focus:border-indigo-800"
                  >
                    Sign Up
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
